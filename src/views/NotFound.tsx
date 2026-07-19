import { Result } from "ant-design-vue"
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  setup() {
    const { t } = useI18n()
    return () => <Result status="404" title="404" subTitle={t("common.pageStatus.404")} />
  },
})
