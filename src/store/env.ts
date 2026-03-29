import type { ThemeMode } from '@shared/types';
import { ConfigProvider, theme } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useEventStore } from './event';

const root = document.documentElement;

export const useEnvStore = defineStore(
  'env',
  () => {
    const isMfe = computed<boolean>(() => window.__FRAME_IN_MFE__ ?? false);
    const events = useEventStore();
    const coloring = ref<string>('#41b883');
    const themeMode = ref<ThemeMode>('auto');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isSystemDark = ref(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
      isSystemDark.value = e.matches;
    });
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

    watch(
      () => window.matchMedia('(prefers-color-scheme: dark)').matches,
      isDark => {
        isSystemDark.value = isDark;
      },
    );
    watch(coloring, primaryColor => {
      ConfigProvider.config({ theme: { primaryColor } });
    });

    watch(themeMode, mode => {
      root.removeAttribute('theme-dark');
      root.removeAttribute('theme-light');
      if (mode !== 'auto') {
        root.setAttribute(`theme-${mode}`, '');
      }
    });

    watch([currentTheme, coloring], ([theme, color]) => {
      events.emit('theme:change', theme, color);
    });
    return {
      algorithm,
      isMfe,
      themeMode,
      currentTheme,
      coloring,
      followSystem,
    };
  },
  {
    persist: {
      omit: ['isMfe', 'isSystemDark'],
    },
  },
);
