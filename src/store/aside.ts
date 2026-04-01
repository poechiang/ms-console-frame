import type { AsideMenuItem } from '@shared/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
export const useAsideStore = defineStore(
  'aside',
  () => {
    const menuItems = ref<AsideMenuItem[]>([]);

    const selectedMenuKeys = ref<string[]>([]);

    const visible = ref(true);

    watch([selectedMenuKeys], ([keys]) => {
      console.log(`[ASIDE] toggleMenuKeys to ${keys.join(', ')}`);
    });
    return {
      menuItems,
      selectedMenuKeys,
      visible,
    };
  },
  { persist: true },
);
