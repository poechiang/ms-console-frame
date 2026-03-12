import FrameAside from '@components/FrameAside.vue';
import FrameHeader from '@components/FrameHeader.vue';
import { createApp, ref } from 'vue';
import App from './App.vue';
import { getService } from './core/services';
import router from './routes';
import './style.less';

let headerAppRef: ReturnType<typeof createApp> | null = null;
let asideAppRef: ReturnType<typeof createApp> | null = null;

/**
 * 挂载函数：供基座调用
 * @param container  基座提供的挂载容器选择器
 */
const createAppCore = (C: Parameters<typeof createApp>[0]) => {
  try {
    let app: ReturnType<typeof createApp> | null = null;
    app = createApp(C);
    app.provide('standalone', !window.__IS_MFE__);
    const colorPrimary = ref('#41b883');
    app.provide('colorPrimary', colorPrimary);

    return app;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const mount = (app: ReturnType<typeof createApp>, container: string | HTMLElement) => {
  const wrapper = typeof container === 'string' ? document.querySelector(container) : container;
  if (wrapper) {
    app.mount(wrapper);
    console.info(`[${app._component.__name}] ${__IS_MFE__ ? '[MFE]' : ''} mounted in ${app._container?.tagName} successfully`);
  }
};

const unmount = (app: ReturnType<typeof createApp>) => {
  app.unmount();
  app._container?.remove();

  console.info(`[${app._component.__name}] unmounted successfully`);
};

export const header = {
  mount: (container: string | HTMLElement, title?: string) => {
    headerAppRef = createAppCore(FrameHeader);
    headerAppRef?.provide('title', title);
    mount(headerAppRef!, container);
  },
  unmount: () => headerAppRef && unmount(headerAppRef),
};
export const aside = {
  mount: (container: string | HTMLElement, title?: string) => {
    asideAppRef = createAppCore(FrameAside);
    if (asideAppRef) {
      asideAppRef.provide('title', title);
      mount(asideAppRef, container);
    }
  },
  unmount: () => asideAppRef && unmount(asideAppRef),
};

window.getConsoleService = (name: ServiceKey) => getService(name);

if (!__IS_MFE__) {
  header.mount('frame-header', 'Console X');
  aside.mount('frame-aside');

  const app = createAppCore(App);
  if (app) {
    app.use(router);
    mount(app, '#app');
  }
  console.info(`App mounted in div#app successfully`);
}
