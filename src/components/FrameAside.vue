<script setup lang="ts">
import { useNavigator } from '@hooks/useNavigator';
import { useTheme } from '@hooks/useTheme';
import { ConfigProvider, Menu, type ItemType } from 'ant-design-vue';
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { computed, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../routes';

const props = inject<{ items?: ItemType[]; visible?: boolean }>('props', { items: [], visible: true });
const root = document.documentElement;
const colorPrimary = inject('colorPrimary', '#41b883');

const [selectedKeys] = useNavigator('overview');
const { algorithm, currentMode } = useTheme();
const { t } = useI18n();
const menuList = computed(() => {
  if (props.items?.length) {
    return props.items;
  }
  if (!window.__FRAME_IN_MFE__) {
    return [
      {
        key: 'Overview',
        label: t('总览'),
        onClick: () => router.push({ path: '/overview' }),
      },
      {
        key: 'Document',
        label: t('文档'),
        onClick: () => router.push({ path: '/document' }),
      },
      {
        key: 'About',
        label: t('关于'),
        onClick: () => router.push({ path: '/about' }),
      },
      {
        key: 'Help',
        label: t('帮助'),
        onClick: () => router.push({ path: '/help' }),
      },
    ];
  } else {
    return [];
  }
});

watch(
  () => props.visible !== false && menuList.value.length,
  v => {
    if (v) {
      root.removeAttribute('no-aside');
    } else {
      root.setAttribute('no-aside', '');
    }
  },
  { immediate: true },
);
const handleMenuClick: SelectEventHandler = e => e.item.onClick?.(new MouseEvent('click'));
</script>

<template>
  <ConfigProvider
    :theme="{
      token: { colorPrimary, colorBgLayout: 'transparent' },
      components: {
        Menu: {
          colorBgContainer: 'transparent',
          colorFillQuaternary: 'transparent',
          colorItemBg: 'transparent',
          colorItemBgSelected: 'transparent',
        },
      },
      algorithm,
    }"
  >
    <Menu
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :multiple="false"
      :items="menuList"
      :theme="currentMode"
      @select="handleMenuClick"
      v-if="props.visible !== false"
    ></Menu>
  </ConfigProvider>
</template>
<style lang="less" scoped>
.ant-menu {
  position: fixed;
  inset-inline-start: 0;
  top: 72px;
}
</style>
