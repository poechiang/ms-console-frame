<script setup lang="ts">
import { useAsideStore, useEnvStore } from '@store';
import { ConfigProvider, Menu } from 'ant-design-vue';
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

const selectedKeys = computed(() => (aside.selectedMenuKey?.length ? [aside.selectedMenuKey] : []));
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
  const item = menuList.value.find(x => x.key === e.key);
  aside.selectedMenuKey = item?.key!;
  if (item?.onClick) {
    item?.onClick(item);
  } else if (item?.path) {
    router.push(item.path);
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
}
</style>
