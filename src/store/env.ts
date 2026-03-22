import type { ThemeMode } from '@shared/types';
import { ConfigProvider, theme } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const root = document.documentElement;
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
export const useEnvStore = defineStore('header', () => {
  const isMfe = ref<boolean>(window.__FRAME_IN_MFE__ ?? false);
  const coloring = ref<string>('#41b883');
  const themeMode = ref<ThemeMode>('auto');

  const isSystemDark = computed(() => mediaQuery.matches);
  const algorithm = computed(() => {
    if (themeMode.value === 'auto') {
      return isSystemDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
    } else {
      return themeMode.value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;
    }
  });

  const followSystem = computed(() => themeMode.value === 'auto');
  const currentTheme = computed(() => {
    return themeMode.value === 'auto' ? (isSystemDark.value ? 'dark' : 'light') : themeMode.value;
  });

  const standalone = computed(() => !window.__FRAME_IN_MFE__);

  watch([coloring], ([primaryColor]) => {
    ConfigProvider.config({ theme: { primaryColor } });
  });

  watch([themeMode], ([mode]) => {
    root.removeAttribute('theme-dark');
    root.removeAttribute('theme-light');
    if (mode !== 'auto') {
      root.setAttribute(`theme-${mode}`, '');
    }
  });
  return {
    algorithm,
    isMfe,
    themeMode,
    currentTheme,
    coloring,
    followSystem,
    standalone,
  };
});
