<script setup lang="ts">
import { useAsideStore, useEnvStore } from '@store';
import { ConfigProvider, Menu } from 'ant-design-vue';
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { computed, inject, watch } from 'vue';
import router from '../routes';
import SubMenu from './SubMenu.vue';

const root = document.documentElement;
const colorPrimary = inject('colorPrimary', '#41b883');

const env = useEnvStore();
const aside = useAsideStore();

watch(
  () => aside.visible !== false && aside.menuItems.length,
  v => {
    if (v) {
      root.removeAttribute('no-aside');
    } else {
      root.setAttribute('no-aside', '');
    }
  },
  { immediate: true },
);

const selectedKeys = computed(() => (aside.selectedMenuKey?.length ? [aside.selectedMenuKey] : []));
const handleMenuClick: SelectEventHandler = e => {
  const item = aside.menuItems.find(x => x.key === e.key);
  aside.toggleMenuKey(e.key as string);
  item?.path && router.push(item.path);
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
      algorithm: env.algorithm,
    }"
  >
    <Menu
      style="width: 256px"
      mode="inline"
      :selectedKeys="selectedKeys"
      :selectable="true"
      :multiple="false"
      :theme="env.currentTheme"
      @select="handleMenuClick"
      v-if="aside.visible !== false"
    >
      <SubMenu v-for="item in aside.menuItems" :key="item.key" :menuItem="item" />
    </Menu>
  </ConfigProvider>
</template>
<style lang="less" scoped>
.ant-menu {
  position: fixed;
  inset-inline-start: 0;
  top: 72px;
}
</style>
