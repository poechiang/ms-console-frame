import type { AsideMenuItem } from '@shared/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
export const useAsideStore = defineStore(
  'aside',
  () => {
    const menuItems = ref<AsideMenuItem[]>([]);

    const selectedMenuKey = ref<string>('');

    const visible = ref(true);

    watch([selectedMenuKey], ([key]) => {
      console.log(`[ASIDE] toggleMenuKey to ${key}`);
    });
    return {
      menuItems,
      selectedMenuKey,
      visible,
    };
  },
  { persist: true },
);
