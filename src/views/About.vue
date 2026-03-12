<script setup lang="ts">
import { Button, Typography } from 'ant-design-vue';
import { ref } from 'vue';

const Link = Typography.Link;
const count = ref(0);
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@assets/images/vue.svg?url" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://antdv.com/docs/vue/introduce-cn" target="_blank">
      <img src="@assets/images/antd-vue.svg?url" class="logo antd" alt="antd for vue logo" />
    </a>
  </div>

  <h1>Vite + Vue + AntD</h1>
  <div class="card">
    <Button @click="count++">count is {{ count }}</Button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <Link href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</Link>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <Link href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</Link>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style lang="less" scoped>
a {
  font-weight: 500;

  text-decoration: none;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.antd:hover {
  filter: drop-shadow(0 0 2em #148bffaa);
}

.read-the-docs {
  color: #888;
}

.card {
  padding: 2em;
}
</style>
