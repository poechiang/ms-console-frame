<script setup lang="ts">
import { PoweroffOutlined } from '@ant-design/icons-vue';
import ThemeSwitch from '@components/ThemeSwitch.vue';
import { useTheme } from '@hooks/useTheme';
import { Button, ConfigProvider, Drawer, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { computed, inject, ref } from 'vue';

const title = inject('title');
const standalone = inject('standalone', false);
const colorPrimary = inject('colorPrimary', '#41b883');
const { algorithm } = useTheme();

const open = ref(false);

const langList = [
  { key: 'zh-CN', icon: new URL('../assets/images/locale/zh-cn.svg', import.meta.url).href, label: '简体中文' },
  { key: 'en-US', icon: new URL('../assets/images/locale/en-us.svg', import.meta.url).href, label: 'English' },
  { key: 'fr-FR', icon: new URL('../assets/images/locale/fr-fr.svg', import.meta.url).href, label: 'Français' },
  { key: 'ru-RU', icon: new URL('../assets/images/locale/ru-ru.svg', import.meta.url).href, label: 'Русский' },
  { key: 'es-ES', icon: new URL('../assets/images/locale/es-es.svg', import.meta.url).href, label: 'Español' },
  { key: 'ar-SA', icon: new URL('../assets/images/locale/ar-sa.svg', import.meta.url).href, label: 'العربي' },
];
const lang = ref([localStorage.getItem('locale') ?? 'zh-CN']);

const handleMenuClick: SelectEventHandler = e => {
  localStorage.setItem('locale', e.key as string);
};
const currLangItem = computed(() => {
  return langList.find(x => x.key === lang.value[0]);
});
</script>

<template>
  <ConfigProvider :theme="{ token: { colorPrimary }, algorithm }">
    <header class="flexable --cross-center">
      <h3 class="web-title" @click="open = !open">
        {{ title }}
        <span class="tag" v-if="standalone" :style="{ backgroundColor: colorPrimary }">standalone</span>
      </h3>
      <Drawer placement="left" :closable="false" :autofocus="false" :open="open">
        <template #title><div :style="{ height: '25px' }"></div></template>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <span class="flex-auto"></span>
      <Dropdown>
        <Button type="text" size="large">
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

      <ThemeSwitch />
      <Button type="text" size="large">
        <PoweroffOutlined />
      </Button>
    </header>
  </ConfigProvider>
</template>

<style lang="less" scoped>
header {
  gap: 12px;
  padding: 0 24px;
  line-height: 48px;
  z-index: 1001;
  height: 48px;
  .web-title {
    margin-block: 0;
    position: relative;
    cursor: pointer;
    .tag {
      position: absolute;
      font-size: 12px;
      font-weight: normal;
      padding: 2px 4px;
      border-radius: 4px;
      line-height: 16px;
      left: calc(100% + 8px);
      top: 8px;
    }
  }
}
.locale-icon {
  width: 1.3em;
  height: 1.3em;
  margin-inline-end: 0.5em;
}
</style>
