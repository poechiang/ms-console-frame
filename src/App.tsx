import { useAsideStore, useEnvStore } from "@store"
import { ConfigProvider } from "ant-design-vue"
import { computed, defineComponent, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { RouterView } from "vue-router"

export default defineComponent({
  setup() {
    const env = useEnvStore()
    const aside = useAsideStore()

    const themeConfig = computed(() => ({
      token: { colorPrimary: env.coloring, colorLink: env.coloring },
      algorithm: env.algorithm,
    }))

    const { t } = useI18n()
    onMounted(() => {
      aside.menuItems = [
        { key: "Overview", label: t("总览"), path: "/overview" },
        { key: "Module", label: t("服务模块"), path: "/modules" },
        { key: "Document", label: t("文档"), path: "/document" },
        { key: "About", label: t("关于"), path: "/about" },
        { key: "Help", label: t("帮助"), path: "/help" },
      ]
    })

    return () => (
      <ConfigProvider theme={themeConfig.value}>
        <RouterView />
        <footer
          style={{
            position: "fixed",
            insetInlineEnd: 0,
            bottom: 0,
            color: "gray",
            pointerEvents: "none",
            zIndex: 100020,
            textAlign: "left",
            padding: "24px",
            fontSize: "12px",
          }}
        >
          <p class="mb-0.1-em">ms-sub@0.0.0 | ms-frame@0.0.0 | ms-base@0.0.0</p>
        </footer>
      </ConfigProvider>
    )
  },
})
