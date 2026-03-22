import type { HeaderMenuItem, LocaleKeys, MacroService, UseHeaderStore } from '@shared/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useEnvStore } from './env';

export const useHeaderStore = defineStore<string, UseHeaderStore>(
  'header',
  () => {
    const envStore = useEnvStore();
    const menuList = !envStore.isMfe
      ? [
          {
            key: 'Document',
            text: '文档',
          },
          {
            key: 'About',
            text: '关于',
          },
          {
            key: 'Help',
            text: '帮助',
          },
        ]
      : [];

    const title = ref('Console X');
    const setTitle = (value: string) => {
      title.value = value;
    };

    const services = ref<MacroService[]>([]);
    const addServices = (...values: MacroService[]) => {
      const exists = services.value;
      services.value = [...exists, ...values];
    };
    const resetServices = (...values: MacroService[]) => {
      services.value = values;
    };

    const menuItems = ref<HeaderMenuItem[]>(menuList);
    const addMenuItems = (...values: HeaderMenuItem[]) => {
      const exists = menuItems.value;
      menuItems.value = [...exists, ...values];
    };
    const resetMenuItems = (...values: HeaderMenuItem[]) => {
      menuItems.value = values;
    };

    const selectedMenuKey = ref<string>('');
    const toggleMenuKey = (value: string) => {
      console.log(`[HEADER] toggleMenuKey to ${value}`);
      selectedMenuKey.value = value;
    };

    const locale = ref<LocaleKeys>('zh-CN');
    const setLocale = (value: LocaleKeys) => {
      locale.value = value;
    };

    return {
      title,
      setTitle,
      services,
      addServices,
      resetServices,
      menuItems,
      addMenuItems,
      resetMenuItems,
      selectedMenuKey,
      toggleMenuKey,
      locale,
      setLocale,
    };
  },
  { persist: true },
);
