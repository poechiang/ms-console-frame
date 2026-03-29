import type { HeaderMenuItem, LocaleKeys, MacroService } from '@shared/types';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEnvStore } from './env';
import { useEventStore } from './event';

export const useHeaderStore = defineStore(
  'header',
  () => {
    const events = useEventStore();
    const env = useEnvStore();
    const { locale } = useI18n();
    const title = ref('Console Frame');
    const services = ref<MacroService[]>([]);
    const menuItems = ref<HeaderMenuItem[]>([]);
    const selectedMenuKey = ref<string>('');
    const localeKey = ref<LocaleKeys>('zh-CN');

    watch(selectedMenuKey, key => {
      console.log(`[HEADER] toggle menu key to ${key}`);
      events.emit('menu:change', key, 'header');
    });
    watch(localeKey, key => {
      locale.value = key;
      console.log(`[HEADER] toggle locale key to ${key}`);
      events.emit('locale:change', key);
    });

    return {
      title,
      services,
      menuItems,
      selectedMenuKey,
      locale: localeKey,
      theme: computed(() => env.currentTheme),
    };
  },
  {
    persist: {
      pick: ['selectedMenuKey', 'locale'],
    },
  },
);
