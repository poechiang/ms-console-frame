<script setup lang="ts">
import { PoweroffOutlined } from '@ant-design/icons-vue';
import { antdLocaleData } from '@assets/i18n';
import ThemeSwitch from '@components/ThemeSwitch.vue';
import { useTheme } from '@hooks/useTheme';
import type { FrameHeaderInjection, LocaleKeys } from '@shared/types';
import { Button, ConfigProvider } from 'ant-design-vue';
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LocaleSwitch from './LocaleSwitch.vue';
import ServicePanel from './ServicePanel.vue';

const props = inject<FrameHeaderInjection>('props', { title: 'Console X', services: [] });

const standalone = inject('standalone', false);
const colorPrimary = inject('colorPrimary', '#41b883');
const { algorithm } = useTheme();
const { locale } = useI18n();
const localeData = computed(() => antdLocaleData[locale.value as LocaleKeys]);
const open = ref(false);
</script>

<template>
  <ConfigProvider :theme="{ token: { colorPrimary }, algorithm }" :locale="localeData">
    <header class="header-wrapper flexable --cross-center">
      <h3 class="web-title" @click="open = !open">
        {{ props?.title }}
        <span class="tag" v-if="standalone" :style="{ backgroundColor: colorPrimary }">{{ $t('独立版') }}</span>
      </h3>
      <ServicePanel v-model:open="open" />
      <span class="flex-auto"></span>
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
