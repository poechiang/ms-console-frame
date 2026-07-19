import antdLogo from "@assets/images/antd-vue.svg?url"
import vueLogo from "@assets/images/vue.svg?url"
import { Button, Typography } from "ant-design-vue"
import { defineComponent, ref } from "vue"
import styles from "./About.module.less"

const { Link } = Typography

export default defineComponent({
  setup() {
    const count = ref(0)

    return () => (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" class={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src={vueLogo} class={[styles.logo, styles.logoVue]} alt="Vue logo" />
          </a>
          <a href="https://antdv.com/docs/vue/introduce-cn" target="_blank">
            <img src={antdLogo} class={[styles.logo, styles.logoAntd]} alt="antd for vue logo" />
          </a>
        </div>

        <h1>Vite + Vue + AntD</h1>
        <div class={styles.card}>
          <Button onClick={() => count.value++}>count is {count.value}</Button>
          <p>
            Edit <code>components/HelloWorld.vue</code> to test HMR
          </p>
        </div>

        <p>
          Check out{" "}
          <Link href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
            create-vue
          </Link>
          , the official Vue + Vite starter
        </p>
        <p>
          Learn more about IDE Support for Vue in the{" "}
          <Link href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">
            Vue Docs Scaling up Guide
          </Link>
          .
        </p>
        <p class={styles.readTheDocs}>Click on the Vite and Vue logos to learn more</p>
      </>
    )
  },
})
