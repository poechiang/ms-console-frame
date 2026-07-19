import { FilterOutlined, SortAscendingOutlined } from "@ant-design/icons-vue"
import { useHeaderStore } from "@store"
import { Avatar, Button, ConfigProvider, Drawer, Empty, InputSearch, List, ListItemMeta } from "ant-design-vue"
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const store = useHeaderStore()
    const { t } = useI18n()

    return () => (
      <ConfigProvider theme={{ token: { zIndexPopupBase: 1002 } }}>
        <Drawer
          class="ms-wrapper"
          placement="left"
          closable={false}
          autofocus={false}
          open={props.open}
          onClose={() => emit("update:open", false)}
        >
          {{
            title: () => <div style={{ height: "25px" }} />,
            default: () => (
              <>
                <header class="flexable" style={{ gap: "4px" }}>
                  <InputSearch placeholder={t("服务名称、描述")} allowClear />
                  <Button>
                    <FilterOutlined />
                  </Button>
                  <Button>
                    <SortAscendingOutlined />
                  </Button>
                </header>
                <article>
                  <List itemLayout="horizontal" dataSource={store.services}>
                    {{
                      renderItem: ({ item }: any) => (
                        <ListItemMeta description={item.description}>
                          {{
                            title: () => <a href={item.link}>{item.title}</a>,
                            avatar: () => <Avatar src={item.logo} />,
                          }}
                        </ListItemMeta>
                      ),
                      default: () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
                    }}
                  </List>
                </article>
              </>
            ),
          }}
        </Drawer>
      </ConfigProvider>
    )
  },
})
