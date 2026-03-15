<script setup lang="ts">
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons-vue';
import type { FrameHeaderInjection } from '@shared/types';
import { Avatar, Button, Drawer, Empty, InputSearch, List, ListItemMeta } from 'ant-design-vue';
import { inject } from 'vue';

const props = inject<FrameHeaderInjection>('props', { services: [] });

defineModel('open', { default: false });
</script>

<template>
  <Drawer placement="left" :closable="false" :autofocus="false" :open="open" @close="$emit('update:open', false)">
    <template #title><div :style="{ height: '25px' }"></div></template>

    <header class="flexable" :style="{ gap: '4px' }">
      <InputSearch :placeholder="$t('服务名称、描述')" allow-clear> </InputSearch>
      <Button><FilterOutlined /></Button>
      <Button><SortAscendingOutlined /></Button>
    </header>

    <article>
      <List item-layout="horizontal" :data-source="props.services">
        <template #renderItem="{ item }">
          <ListItemMeta :description="item.description">
            <template #title>
              <a :href="item.link">{{ item.title }}</a>
            </template>
            <template #avatar>
              <Avatar :src="item.logo" />
            </template>
          </ListItemMeta>
        </template>
        <template #default>
          <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
        </template>
      </List>
    </article>
  </Drawer>
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
