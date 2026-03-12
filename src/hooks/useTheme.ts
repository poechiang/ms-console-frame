import { ConfigProvider, theme } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';

export type ThemeMode = 'dark' | 'light' | 'auto';

ConfigProvider.config({
  theme: {
    primaryColor: '#41b883',
  },
});

const mode = ref<ThemeMode>('auto');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isSystemDark = ref(mediaQuery.matches);
const root = document.documentElement;

mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
  isSystemDark.value = e.matches;
});
export const useTheme = () => {
  const algorithm = computed(() => {
    if (mode.value === 'auto') {
      return isSystemDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
    } else {
      return mode.value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;
    }
  });

  watch([mode], ([m]) => {
    root.removeAttribute('theme-dark');
    root.removeAttribute('theme-light');
    if (m !== 'auto') {
      root.setAttribute(`theme-${m}`, '');
    }
  });

  const setThemeMode = (value: ThemeMode) => {
    mode.value = value;

    localStorage.setItem('theme-mode', value);
  };

  const followSystem = computed(() => {
    return mode.value === 'auto';
  });

  setThemeMode((localStorage.getItem('theme-mode') as ThemeMode) ?? 'auto');
  const currentMode = computed(() => {
    return mode.value === 'auto' ? (isSystemDark.value ? 'dark' : 'light') : mode.value;
  });
  return {
    currentMode,
    followSystem,
    algorithm,
    setThemeMode,
  };
};
