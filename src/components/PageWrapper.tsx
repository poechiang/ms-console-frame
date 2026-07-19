import { defineComponent, type ExtractPropTypes } from "vue"
import styles from "./PageWrapper.module.less"

const pageWrapperProp = () => ({
  title: { type: String, default: "A new page" },
  aside: [String, Object],
  extra: [String, Object],
})
export type PageWrapperProp = Partial<ExtractPropTypes<ReturnType<typeof pageWrapperProp>>>
export default defineComponent({
  props: pageWrapperProp(),
  setup(props: PageWrapperProp, { slots }) {
    return () => (
      <>
        <header class={styles.cfPageHead}>
          <h2>{props.title ?? "A new page"}</h2>
          <span class={styles.flexAuto} />
          <span class={styles.cfPageExtra}>{slots.extra ? slots.extra() : props.extra}</span>
        </header>
        {(slots.aside || props.aside) && <aside class={styles.cfPageAside}>{slots.aside ? slots.aside() : props.aside}</aside>}
        <article class={styles.cfPageBody}>{slots.default?.()}</article>
      </>
    )
  },
})
