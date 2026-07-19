import { PoweroffOutlined } from "@ant-design/icons-vue"
import { antdLocaleData } from "@assets/i18n"
import Logo from "@assets/icons/logo.svg"
import ThemeSwitch from "@components/ThemeSwitch"
import type { HeaderMenuItem, LocaleKeys } from "@shared/types"
import { useEnvStore } from "@store"
import { useHeaderStore } from "@store/header"
import { Button, ConfigProvider } from "ant-design-vue"
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import styles from "./FrameHeader.module.less"
import LocaleSwitch from "./LocaleSwitch"
import ServicePanel from "./ServicePanel"

export default defineComponent({
  name: "FrameHeader",
  setup() {
    const env = useEnvStore()
    const { locale, t } = useI18n()
    const localeData = computed(() => antdLocaleData[locale.value as LocaleKeys])
    const open = ref(false)
    const scrolled = ref(false)

    const store = useHeaderStore()

    const menuList = computed(() => {
      if (env.isMfe) {
        return store.menuItems
      }
      return [
        { key: "Document", label: t("文档") },
        { key: "About", label: t("关于") },
        { key: "Help", label: t("帮助") },
      ]
    })

    const handleMenuItemClick = (item: HeaderMenuItem) => {
      store.selectedMenuKey = item.key
      item.onClick?.(item)
    }

    onMounted(() => {
      document.onscroll = () => {
        scrolled.value = window.scrollY > 90
      }
    })
    onUnmounted(() => {
      document.onscroll = null
    })

    return () => (
      <ConfigProvider
        theme={{
          token: { colorPrimary: env.coloring, colorInfo: env.coloring },
          algorithm: env.algorithm,
        }}
        locale={localeData.value}
        prefixCls="cf"
      >
        <span class={styles.webLogo} onClick={() => (open.value = !open.value)}>
          <Logo />
        </span>
        <h1 class={styles.webTitle}>
          {store.title}
          {!env.isMfe && (
            <span class={styles.tag} style={{ backgroundColor: env.coloring }}>
              {t("独立版")}
            </span>
          )}
        </h1>
        <ServicePanel v-model:open={open.value} />
        <header class={[styles.headerWrapper, "flexable", "--cross-center", scrolled.value && styles.scrolled]}>
          <span class="flex-auto" />
          {menuList.value.map((item) => (
            <Button
              key={item.key}
              class={[styles.hdMenuItem, store.selectedMenuKey === item.key && styles.active]}
              type={store.selectedMenuKey === item.key ? "link" : "text"}
              size="large"
              onClick={() => handleMenuItemClick(item)}
            >
              {item.icon && <img src={item.icon} alt={item.label} />}
              {item.label}
              <span class={styles.bullet} />
            </Button>
          ))}
          <LocaleSwitch />
          <ThemeSwitch />
          <Button type="text" size="large">
            <PoweroffOutlined />
          </Button>
        </header>
      </ConfigProvider>
    )
  },
})
