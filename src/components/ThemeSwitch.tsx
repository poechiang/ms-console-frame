import { CheckOutlined } from "@ant-design/icons-vue"
import LockIcon from "@assets/icons/lock.svg"
import UnLockIcon from "@assets/icons/unlock.svg"
import { useEnvStore } from "@store"
import { Button, Dropdown, Menu, MenuItem, theme } from "ant-design-vue"
import type { SelectEventHandler } from "ant-design-vue/es/menu/src/interface"
import { computed, defineComponent, ref } from "vue"
import { useI18n } from "vue-i18n"
import styles from "./ThemeSwitch.module.less"

const colorList = [
  { color: "#e84749", label: "common.themeColors.red" },
  { color: "#e87040", label: "common.themeColors.volcano" },
  { color: "#e89a3c", label: "common.themeColors.orange" },
  { color: "#a9d134", label: "common.themeColors.lime" },
  { color: "#e8b339", label: "common.themeColors.gold" },
  { color: "#e8d639", label: "common.themeColors.yellow" },
  { color: "#6abe39", label: "common.themeColors.green" },
  { color: "#33bcb7", label: "common.themeColors.cyan" },
  { color: "#3c89e8", label: "common.themeColors.blue" },
  { color: "#5273e0", label: "common.themeColors.geek" },
  { color: "#854eca", label: "common.themeColors.purple" },
  { color: "#e0529c", label: "common.themeColors.magenta" },
]

export default defineComponent({
  name: "ThemeSwitch",
  props: {
    size: { type: Number, default: 26 },
  },
  setup(props) {
    const env = useEnvStore()
    const { token } = theme.useToken()
    const { t } = useI18n()

    const checked = computed(() => env.algorithm === theme.darkAlgorithm)

    const lockBtnStyle = computed(() => ({
      width: `${props.size}px`,
      height: `${props.size}px`,
      borderColor: "transparent",
      backgroundColor: token.value.colorPrimaryBgHover,
    }))

    const switchStyle = computed(() => ({
      width: `${props.size! * 2}px`,
      height: `${props.size}px`,
      borderColor: "transparent",
      backgroundColor: token.value.colorPrimaryBgHover,
    }))

    const bulletStyle = computed(() => ({
      width: `${props.size! - 6}px`,
      height: `${props.size! - 6}px`,
      left: checked.value ? `${props.size! + 2}px` : "2px",
      background: checked.value ? "transparent" : "linear-gradient(40deg, #ff0080, #ff8c00 70%)",
      boxShadow: checked.value ? "inset -3px -3px 5px -2px #8983f7,inset -4px -4px 0px 0px #a3daff" : "0 0 5px #ff0080",
      filter: env.followSystem ? "grayscale(1)" : checked.value ? "drop-shadow(0 0 2px #8983f7)" : "none",
    }))

    const coloring = ref([env.coloring])

    const handleColoringChange: SelectEventHandler = (e) => {
      const value = e.key as string
      coloring.value = [value]
      env.coloring = value
    }

    const overlay = (
      <Menu selectable selectedKeys={coloring.value} onSelect={handleColoringChange}>
        {colorList.map((x) => (
          <MenuItem key={x.color}>
            <div class="flexable --cross-center" style={{ width: "100px" }}>
              <span class={styles.colorJelly} style={{ backgroundColor: x.color + "99" }} />
              <span class="flex-auto">{t(x.label)}</span>
              {x.color === coloring.value[0] && <CheckOutlined />}
            </div>
          </MenuItem>
        ))}
      </Menu>
    )
    return () => (
      <Dropdown placement="bottomRight" overlay={overlay}>
        <span class={styles.themeSwitchWrapper}>
          <Button
            shape="circle"
            size="small"
            style={lockBtnStyle.value}
            onClick={() => (env.themeMode = env.followSystem ? (checked.value ? "dark" : "light") : "auto")}
          >
            {env.followSystem ? (
              <span class={styles.iconWrap}>
                <LockIcon />
              </span>
            ) : (
              <span class={styles.iconWrap}>
                <UnLockIcon />
              </span>
            )}
          </Button>
          <Button
            class={styles.themeSwitchHost}
            shape="round"
            disabled={env.followSystem}
            style={switchStyle.value}
            onClick={() => (env.themeMode = checked.value ? "light" : "dark")}
          >
            <span class={styles.bullet} style={bulletStyle.value} />
          </Button>
        </span>
      </Dropdown>
    )
  },
})
