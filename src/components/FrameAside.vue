<script setup lang="ts">
import { useNavigator } from '@/hooks/useNavigator';
import { useTheme } from '@hooks/useTheme';
import { ConfigProvider, Menu } from 'ant-design-vue';
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { inject } from 'vue';
import router from '../routes';

const colorPrimary = inject('colorPrimary', '#41b883');
const { algorithm, currentMode } = useTheme();
const [selectedKeys] = useNavigator('overview');

const items = inject('menuItem', [
  {
    key: 'overview',
    label: '总览',
    path: '/overview',
  },
  {
    key: 'document',
    label: '文档',
    path: '/document',
  },
  {
    key: 'about',
    label: '关于',
    path: '/about',
  },
  {
    key: 'help',
    label: '帮助',
    path: '/help',
  },
]);

const handleMenuClick: SelectEventHandler = e => {
  const {
    item: { path },
  } = e;
  router.push({ path });
};
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
      :items="items"
      :theme="currentMode"
      @select="handleMenuClick"
    ></Menu>
  </ConfigProvider>
</template>
