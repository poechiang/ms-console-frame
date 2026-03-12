<script setup lang="ts">
import { Button, ConfigProvider, theme } from 'ant-design-vue';
import { computed } from 'vue';
import LockIcon from '@assets/icons/lock.svg';
import UnLockIcon from '@assets/icons/unlock.svg';
import { useTheme } from '@hooks/useTheme';
withDefaults(defineProps<{ size?: number }>(), {
  size: 26,
});

const { followSystem, algorithm, setThemeMode } = useTheme();
const { token } = theme.useToken();
const checked = computed(() => {
  return algorithm.value === theme.darkAlgorithm;
});
</script>

<template>
  <span class="theme-switch-wrapper">
    <ConfigProvider
      :theme="{
        components: {
          Button: {
            padding: 2.5,
            colorBorder: 'transparent',
            colorBgContainer: token.colorPrimaryBgHover,
          },
        },
        algorithm: algorithm,
      }"
    >
      <Button
        shape="circle"
        size="small"
        @click="setThemeMode(followSystem ? (checked ? 'dark' : 'light') : 'auto')"
        :style="{
          padding: '2.5px',
          width: `${size}px`,
          height: `${size}px`,
        }"
      >
        <LockIcon :style="{ color: token.colorPrimary }" v-if="followSystem" />
        <UnLockIcon :style="{ color: token.colorPrimary }" v-if="!followSystem" />
      </Button>
    </ConfigProvider>
    <ConfigProvider
      :theme="{
        components: {
          Button: {
            padding: 0,
            colorBorder: 'transparent',
            colorBgContainer: token.colorPrimaryBgHover,
          },
        },
        algorithm: algorithm,
      }"
    >
      <!-- <Dropdown :style="{ lineHeight: 0 }"> -->
      <Button
        class="theme-switch-host"
        shape="round"
        :disabled="followSystem"
        @click="setThemeMode(checked ? 'light' : 'dark')"
        :style="{
          width: `${size * 2}px`,
          height: `${size}px`,
        }"
      >
        <span
          class="bullet"
          :style="{
            width: `${size - 6}px`,
            height: `${size - 6}px`,
            left: checked ? `${size + 2}px` : '2px',
            background: checked ? 'transparent' : 'linear-gradient(40deg, #ff0080, #ff8c00 70%)',
            boxShadow: checked ? 'inset -3px -3px 5px -2px #8983f7,inset -4px -4px 0px 0px #a3daff' : '0 0 5px #ff0080',
            filter: followSystem ? 'grayscale(1)' : checked ? 'drop-shadow(0 0 2px #8983f7)' : 'none',
          }"
        ></span
      ></Button>
      <!-- <template #overlay>
          <Menu>
            <MenuItem key="zh-CN"> <img src="@assets/images/locale/zh-cn.svg" class="loclae-icon" alt="zh-CN" /> 简体中文 </MenuItem>
            <MenuItem key="en-US"> <img src="@assets/images/locale/en-us.svg" class="loclae-icon" alt="en-US" /> English </MenuItem>
            <MenuItem key="fr-FR"> <img src="@assets/images/locale/fr-fr.svg" class="loclae-icon" alt="fr-FR" /> Français </MenuItem>
            <MenuItem key="ru-RU"> <img src="@assets/images/locale/ru-ru.svg" class="loclae-icon" alt="ru-RU" /> Русский </MenuItem>
            <MenuItem key="es-ES"> <img src="@assets/images/locale/es-es.svg" class="loclae-icon" alt="es-ES" /> Español </MenuItem>
            <MenuItem key="ar-SA"> <img src="@assets/images/locale/ar-sa.svg" class="loclae-icon" alt="ar-SA" /> العربية</MenuItem>
          </Menu>
        </template>
      </Dropdown> -->
    </ConfigProvider></span
  >
</template>

<style lang="less" scoped>
.theme-switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.theme-switch-host {
  position: relative;
  & > .bullet {
    position: absolute;
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.4s;
    top: 2px;
  }
}
.icon {
  width: 1em;
  height: 1em;
}
</style>
