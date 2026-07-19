import { useAsideStore, useEnvStore } from "@store"
import { ConfigProvider, Menu } from "ant-design-vue"
import type { Key } from "ant-design-vue/es/_util/type"
import type { SelectEventHandler } from "ant-design-vue/es/menu/src/interface"
import { defineComponent, watch } from "vue"
import router from "../routes"
import styles from "./FrameAside.module.less"
import SubMenu from "./SubMenu"

export default defineComponent({
  setup() {
    const root = document.documentElement
    const env = useEnvStore()
    const aside = useAsideStore()

    watch(
      () => aside.visible !== false && aside.menuItems.length,
      (v) => {
        if (v) {
          root.removeAttribute("no-aside")
        } else {
          root.setAttribute("no-aside", "")
        }
      },
      { immediate: true },
    )

    const handleMenuClick: SelectEventHandler = (e) => {
      let list = aside.menuItems
      let item: any
      e.keyPath?.forEach((key: Key) => {
        item = list.find((x) => x.key === key)
        if (item?.children) {
          list = item.children
        }
      })
      if (item) {
        aside.selectedMenuKeys = e.keyPath as string[]
        if (item.onClick) {
          item.onClick(item)
        } else if (item.path) {
          router.push(item.path)
        }
      }
    }

    return () => {
      if (aside.visible === false) return null

      return (
        <ConfigProvider
          theme={{
            token: { colorPrimary: env.coloring, colorBgLayout: "transparent" },
            components: {
              Menu: {
                colorBgContainer: "transparent",
                colorFillQuaternary: "transparent",
                colorItemBg: "transparent",
                colorItemBgSelected: "transparent",
                colorSubItemBg: "transparent",
                colorItemTextSelected: env.coloring,
                colorBorderBg: "red",
              },
            },
            algorithm: env.algorithm,
          }}
          prefixCls="cf"
        >
          <Menu
            class={styles.cfMenu}
            style={{ width: "256px" }}
            mode="inline"
            selectedKeys={aside.selectedMenuKeys}
            openKeys={aside.selectedMenuKeys}
            selectable
            multiple={false}
            theme={env.currentTheme}
            onSelect={handleMenuClick}
          >
            {aside.menuItems.map((item) => (
              <SubMenu key={item.key} menuItem={item} />
            ))}
          </Menu>
        </ConfigProvider>
      )
    }
  },
})
