<script setup lang="ts">
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const langList = [
  { key: 'zh-CN', icon: new URL('../assets/images/locale/zh-cn.svg', import.meta.url).href, label: '简体中文' },
  { key: 'en-US', icon: new URL('../assets/images/locale/en-us.svg', import.meta.url).href, label: 'English' },
  { key: 'fr-FR', icon: new URL('../assets/images/locale/fr-fr.svg', import.meta.url).href, label: 'Français' },
  { key: 'ru-RU', icon: new URL('../assets/images/locale/ru-ru.svg', import.meta.url).href, label: 'Русский' },
  { key: 'es-ES', icon: new URL('../assets/images/locale/es-es.svg', import.meta.url).href, label: 'Español' },
  { key: 'ar-EG', icon: new URL('../assets/images/locale/ar-eg.svg', import.meta.url).href, label: 'العربي' },
];
const lang = ref([localStorage.getItem('locale') ?? 'zh-CN']);

const currLangItem = computed(() => {
  return langList.find(x => x.key === lang.value[0]);
});

const root = document.querySelector(':root') as HTMLHtmlElement;
const handleMenuClick = (e: any) => {
  const localeKey = e.key as string;
  locale.value = localeKey;
  localStorage.setItem('locale', localeKey);

  if (root) {
    root.setAttribute('lang', localeKey);
    root.style.direction = currLangItem.value?.key === 'ar-EG' ? 'rtl' : '';
  }
};
handleMenuClick({ key: lang.value[0] });
</script>

<template>
  <Dropdown>
    <Button class="locale-host" type="text" size="large">
      <img :src="currLangItem?.icon" class="locale-icon" :alt="currLangItem?.key" />{{ currLangItem?.label }}
    </Button>
    <template #overlay>
      <Menu v-model:selectedKeys="lang" @select="handleMenuClick" selectable>
        <MenuItem :key="lang.key" v-for="lang in langList">
          <template #icon><img :src="lang.icon" class="locale-icon" :alt="lang.key" /></template>{{ lang.label }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<style lang="less" scoped>
.locale-host {
  display: flex;
  align-items: center;
}
.locale-icon {
  width: 1.3em;
  height: 1.3em;
  margin-inline-end: 0.5em;
}
</style>
