<script setup lang="ts">
import { useEnvStore } from '@store';
import { ConfigProvider } from 'ant-design-vue';
import { computed } from 'vue';

const env = useEnvStore();
const theme = computed(() => ({
  token: { colorPrimary: env.coloring, colorLink: env.coloring },
  algorithm: env.algorithm,
}));
</script>

<template>
  <ConfigProvider :theme="theme">
    <RouterView />
    <footer>ms-sub@0.0.0 | ms-frame@0.0.0 | ms-base@0.0.0</footer>
  </ConfigProvider>
</template>
<style lang="less" scoped>
footer {
  position: fixed;
  inset-inline-end: 0;
  bottom: 0;
  color: gray;
  pointer-events: none;
  z-index: 100020;
  text-align: left;
  padding: 24px;
  font-size: 12px;
  p {
    margin-block: 0 0.1em;
  }
}
</style>
