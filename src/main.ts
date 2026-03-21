import FrameAside from '@components/FrameAside.vue';
import FrameHeader from '@components/FrameHeader.vue';
import type { FrameAsideInjection } from '@shared/types';
import { createApp, reactive, ref } from 'vue';
import App from './App.vue';
import i18n from './assets/i18n';
import { getService } from './core/services';
import router from './routes';
import './style.less';
/**
 * 挂载函数：供基座调用
 * @param container  基座提供的挂载容器选择器
 */
const createAppCore = (C: Parameters<typeof createApp>[0], props?: any) => {
  try {
    let app: ReturnType<typeof createApp> | null = null;
    app = createApp(C);
    app.provide('standalone', !window.__FRAME_IN_MFE__);
    const colorPrimary = ref('#41b883');
    app.provide('colorPrimary', colorPrimary);
    app.provide('props', props);
    app.use(i18n);

    return app;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const mount = (app: ReturnType<typeof createApp>, container: string | HTMLElement) => {
  let wrapper;
  if (typeof container === 'string') {
    wrapper = document.querySelector(container) ?? document.createElement(container);
    document.body.prepend(wrapper);
  } else {
    wrapper = container;
  }
  if (wrapper) {
    app.mount(wrapper);
    console.info(`[${app._component.__name}] ${window.__FRAME_IN_MFE__ ? '[MFE]' : ''} mounted in ${app._container?.tagName} successfully`);
  }
};

const unmount = (app: ReturnType<typeof createApp>) => {
  app.unmount();
  app._container?.remove();

  console.info(`[${app._component.__name}] unmounted successfully`);
};

window.getConsoleService = (name: ServiceKey) => getService(name);

const headerProps = reactive({ title: 'Console X' });
const headerAppRef: ReturnType<typeof createApp> | null = createAppCore(FrameHeader, headerProps);
if (headerAppRef) {
  mount(headerAppRef, 'frame-header');
}

export { i18n };
export const header = {
  unmount: () => headerAppRef && unmount(headerAppRef),
  get props() {
    return headerProps;
  },
};

const asideProps = reactive<FrameAsideInjection>({ items: [] });
const asideAppRef: ReturnType<typeof createApp> | null = createAppCore(FrameAside, asideProps);
if (asideAppRef) {
  mount(asideAppRef, 'frame-aside');
}

export const aside = {
  unmount: () => asideAppRef && unmount(asideAppRef),
  get props() {
    return asideProps;
  },
};

export * from '@hooks/useNavigator';
if (!window.__FRAME_IN_MFE__) {
  const app = createAppCore(App);
  if (app) {
    app.use(router);
    mount(app, '#app');
  }

  console.info(`App mounted in div#app successfully`);
}
