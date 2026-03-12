<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';
import { ConfigProvider } from 'ant-design-vue';
import { inject } from 'vue';

const colorPrimary = inject('colorPrimary', '#41b883');
const { algorithm } = useTheme();
</script>

<template>
  <ConfigProvider
    :theme="{
      token: { colorPrimary: colorPrimary, colorLink: colorPrimary },
      algorithm,
    }"
  >
    <RouterView />
    <footer>
      <p>macro-service-sub@0.0.0</p>
      <p>macro-service-frame@0.0.0</p>
      <p>macro-service-base@0.0.0</p>
    </footer>
  </ConfigProvider>
</template>
<style lang="less" scoped>
footer {
  position: fixed;
  right: 0;
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
