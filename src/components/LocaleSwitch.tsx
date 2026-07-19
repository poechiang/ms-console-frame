import type { LocaleKeys } from "@shared/types"
import { useHeaderStore } from "@store"
import { Button, Dropdown, Menu, MenuItem } from "ant-design-vue"
import { computed, defineComponent, ref } from "vue"

const langList = [
  { key: "zh-CN", icon: new URL("../assets/images/locale/zh-cn.svg", import.meta.url).href, label: "简体中文" },
  { key: "en-US", icon: new URL("../assets/images/locale/en-us.svg", import.meta.url).href, label: "English" },
  { key: "fr-FR", icon: new URL("../assets/images/locale/fr-fr.svg", import.meta.url).href, label: "Français" },
  { key: "ru-RU", icon: new URL("../assets/images/locale/ru-ru.svg", import.meta.url).href, label: "Русский" },
  { key: "es-ES", icon: new URL("../assets/images/locale/es-es.svg", import.meta.url).href, label: "Español" },
  { key: "ar-EG", icon: new URL("../assets/images/locale/ar-eg.svg", import.meta.url).href, label: "العربي" },
]

const iconStyle = {
  width: "1.3em",
  height: "1.3em",
}

export default defineComponent({
  setup() {
    const root = document.querySelector(":root") as HTMLHtmlElement
    const header = useHeaderStore()
    const lang = ref([header.locale ?? "zh-CN"])

    const currLangItem = computed(() => {
      return langList.find((x) => x.key === lang.value[0])
    })

    const handleMenuClick = (e: any) => {
      const localeKey = e.key as LocaleKeys
      header.locale = localeKey
      if (root) {
        root.setAttribute("lang", localeKey)
        root.style.direction = currLangItem.value?.key === "ar-EG" ? "rtl" : ""
      }
    }
    const overlay = (
      <Menu v-model:selectedKeys={lang.value} onSelect={handleMenuClick} selectable>
        {langList.map((item) => (
          <MenuItem key={item.key} icon={<img src={item.icon} style={iconStyle} alt={item.key} />}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    )
    return () => (
      <Dropdown overlay={overlay}>
        <Button class="flexable --cross-center" style={{ width: "130px", gap: "0.5em" }} type="text" size="large">
          <img src={currLangItem.value?.icon} style={iconStyle} alt={currLangItem.value?.key} />
          {currLangItem.value?.label}
        </Button>
      </Dropdown>
    )
  },
})
