import type { AsideMenuItem, UseAsideStore } from '@shared/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useEnvStore } from './env';

export const useAsideStore = defineStore<string, UseAsideStore>(
  'aside',
  () => {
    const env = useEnvStore();
    const items = env.isMfe
      ? []
      : [
          {
            key: 'Overview',
            label: '总览',
            path: '/overview',
          },
          {
            key: 'Document',
            label: '文档',
            path: '/document',
          },
          {
            key: 'About',
            label: '关于',
            path: '/about',
          },
          {
            key: 'Help',
            label: '帮助',
            path: '/help',
          },
        ];

    const menuItems = ref<AsideMenuItem[]>(items);
    const addMenuItems = (...values: AsideMenuItem[]) => {
      const exists = menuItems.value;
      menuItems.value = [...exists, ...values];
    };
    const resetMenuItems = (...values: AsideMenuItem[]) => {
      menuItems.value = values;
    };

    const selectedMenuKey = ref<string>('');
    const toggleMenuKey = (value: string) => {
      console.log(`[ASIDE] toggleMenuKey to ${value}`);
      selectedMenuKey.value = value;
    };

    const visible = ref(true);
    const setVisible = (value: boolean) => {
      visible.value = value;
    };

    return {
      menuItems,
      addMenuItems,
      resetMenuItems,
      selectedMenuKey,
      toggleMenuKey,
      visible,
      setVisible,
    };
  },
  { persist: true },
);
