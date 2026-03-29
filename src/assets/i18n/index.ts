import type { LocaleKeys } from '@shared/types';
import antArEG from 'ant-design-vue/es/locale/ar_EG';
import antEnUS from 'ant-design-vue/es/locale/en_US';
import antEsES from 'ant-design-vue/es/locale/es_ES';
import antFrFR from 'ant-design-vue/es/locale/fr_FR';
import antRuRU from 'ant-design-vue/es/locale/ru_RU';
import antZhCN from 'ant-design-vue/es/locale/zh_CN';
import { createI18n } from 'vue-i18n';
import arEG from './ar-EG';
import enUs from './en-US';
import esES from './es-ES';
import frFR from './fr-FR';
import ruRU from './ru-RU';
import zhCN from './zh-CN';

const messages: Record<LocaleKeys, any> = {
  'ar-EG': arEG,
  'en-US': enUs,
  'es-ES': esES,
  'fr-FR': frFR,
  'ru-RU': ruRU,
  'zh-CN': zhCN,
};

export const antdLocaleData: Record<LocaleKeys, any> = {
  'ar-EG': antArEG,
  'en-US': antEnUS,
  'es-ES': antEsES,
  'fr-FR': antFrFR,
  'ru-RU': antRuRU,
  'zh-CN': antZhCN,
};

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ?? 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  missingWarn: false,
});
