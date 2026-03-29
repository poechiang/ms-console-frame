<script setup lang="ts">
import { Menu, MenuItem } from 'ant-design-vue';
const SubMenuItem = Menu.SubMenu;

defineProps<{ menuItem: any }>();
</script>

<template>
  <!-- 如果有子路由，渲染为 sub-menu -->
  <SubMenuItem :title="menuItem.label" v-if="menuItem.children?.length > 0" :key="menuItem.key + '-sub'">
    <template #icon>
      <img :src="menuItem.icon" alt="" v-if="menuItem.icon" />
    </template>
    <template #title>
      {{ menuItem.label }}
    </template>
    <SubMenu v-for="item in menuItem.children" :key="item.key" :menuItem="item" />
  </SubMenuItem>

  <!-- 如果没有子路由，渲染为 menu-item -->
  <MenuItem :key="menuItem.key" v-else>
    <template #icon>
      <img :src="menuItem.icon" alt="" v-if="menuItem.icon" />
    </template>
    {{ menuItem.label }}
  </MenuItem>
</template>
