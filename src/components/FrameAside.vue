<script setup lang="ts">
import { useAsideStore, useEnvStore } from '@store';
import { ConfigProvider, Menu } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/_util/type';
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { computed, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../routes';
import SubMenu from './SubMenu.vue';

const root = document.documentElement;
const colorPrimary = inject('colorPrimary', '#41b883');
const { t } = useI18n();
const env = useEnvStore();
const aside = useAsideStore();

const selectedKeys = computed(() => {
  const keys = aside.selectedMenuKeys ?? [];
  return [keys[keys.length - 1]].filter(Boolean) as string[];
});
const openKeys = computed(() => {
  const keys = aside.selectedMenuKeys ?? [];
  return keys.slice(0, keys.length - 1) as string[];
});
const menuList = computed(() => {
  if (env.isMfe) {
    return aside.menuItems;
  } else {
    return [
      {
        key: 'Overview',
        label: t('总览'),
        path: '/overview',
      },
      {
        key: 'Document',
        label: t('文档'),
        path: '/document',
      },
      {
        key: 'About',
        label: t('关于'),
        path: '/about',
      },
      {
        key: 'Help',
        label: t('帮助'),
        path: '/help',
      },
    ];
  }
});
watch(
  () => aside.visible !== false && menuList.value.length,
  v => {
    if (v) {
      root.removeAttribute('no-aside');
    } else {
      root.setAttribute('no-aside', '');
    }
  },
  { immediate: true },
);

const handleMenuClick: SelectEventHandler = e => {
  let list = menuList.value;
  let item: any;
  e.keyPath?.forEach((key: Key, _, __) => {
    item = list.find(x => x.key === key);
    if (item?.children) {
      list = item.children;
    }
  });
  if (item) {
    aside.selectedMenuKeys = e.keyPath as string[];
    if (item.onClick) {
      item.onClick(item);
    } else if (item.path) {
      router.push(item.path);
    }
  }
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
          colorSubItemBg: 'transparent',
          colorItemTextSelected: colorPrimary,
          colorBorderBg: 'red',
        },
      },
      algorithm: env.algorithm,
    }"
    :prefixCls="'cf'"
  >
    <Menu
      style="width: 256px"
      mode="inline"
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      :selectable="true"
      :multiple="false"
      :theme="env.currentTheme"
      @select="handleMenuClick"
      v-if="aside.visible !== false"
    >
      <SubMenu v-for="item in menuList" :key="item.key" :menuItem="item" />
    </Menu>
  </ConfigProvider>
</template>
<style lang="less" scoped>
.cf-menu {
  position: fixed;
  inset-inline-start: 0;
  top: 72px;
  /deep/ .cf-menu-item-selected::after {
    border: 3px solid;
    transform: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    left: 0;
    top: 50%;
    transform: translate(10px, -3px);
  }
}
</style>
