<script setup lang="ts">
import { PoweroffOutlined } from '@ant-design/icons-vue';
import { antdLocaleData } from '@assets/i18n';
import ThemeSwitch from '@components/ThemeSwitch.vue';
import type { HeaderMenuItem, LocaleKeys } from '@shared/types';
import { useEnvStore } from '@store';
import { useHeaderStore } from '@store/header';
import { Button, ConfigProvider } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LocaleSwitch from './LocaleSwitch.vue';
import ServicePanel from './ServicePanel.vue';

const env = useEnvStore();
const { locale, t } = useI18n();
const localeData = computed(() => antdLocaleData[locale.value as LocaleKeys]);
const open = ref(false);

const store = useHeaderStore();

const menuList = computed(() => {
  if (env.isMfe) {
    return store.menuItems;
  } else {
    return [
      {
        key: 'Document',
        label: t('文档'),
      },
      {
        key: 'About',
        label: t('关于'),
      },
      {
        key: 'Help',
        label: t('帮助'),
      },
    ];
  }
});
const handleMenuItemClick = (item: HeaderMenuItem) => {
  store.selectedMenuKey = item.key;
  item.onClick?.(item);
};
</script>

<template>
  <ConfigProvider
    :theme="{ token: { colorPrimary: env.coloring, colorInfo: env.coloring }, algorithm: env.algorithm }"
    :locale="localeData"
    :prefix-cls="'cf'"
  >
    <header class="header-wrapper flexable --cross-center">
      <h3 class="web-title" @click="open = !open">
        {{ store.title }}
        <span class="tag" v-if="!env.isMfe" :style="{ backgroundColor: env.coloring }">{{ $t('独立版') }}</span>
      </h3>
      <ServicePanel v-model:open="open" />
      <span class="flex-auto"></span>

      <Button
        :class="{ 'hd-menu-item': true, active: store.selectedMenuKey === item.key }"
        :type="store.selectedMenuKey === item.key ? 'link' : 'text'"
        size="large"
        v-for="item in menuList"
        @click="handleMenuItemClick(item)"
      >
        <img :src="item.icon" :alt="item.label" v-if="item.icon" />
        {{ item.label }}
        <span class="bullet"></span>
      </Button>
      <LocaleSwitch />
      <ThemeSwitch />
      <Button type="text" size="large">
        <PoweroffOutlined />
      </Button>
    </header>
  </ConfigProvider>
</template>

<style lang="less" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
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
      inset-inline-start: calc(100% + 8px);
      top: 8px;
      white-space: nowrap;
    }
  }
  .hd-menu-item {
    position: relative;
    .bullet {
      position: absolute;
      height: 4px;
      border-bottom: 4px solid;
      border-radius: 2px;
      left: 50%;
      bottom: 0;
      width: 0;
      transition:
        width 0.2s cubic-bezier(1, 1.61, 0.58, 1),
        left 0.2s cubic-bezier(1, 1.64, 0.58, 1);
    }
    &.active .bullet {
      width: 90%;
      left: 5%;
    }
    &:focus-visible {
      outline: none;
    }
  }
}
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
