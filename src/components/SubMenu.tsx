import { Menu } from "ant-design-vue"
import { defineComponent } from "vue"

const { SubMenu: AntSubMenu, Item: MenuItem } = Menu

const SubMenuComp = defineComponent({
  name: "SubMenu",
  props: {
    menuItem: { type: Object, required: true },
  },
  setup(props) {
    return () => {
      const { menuItem } = props

      if (menuItem.children?.length > 0) {
        return (
          <AntSubMenu key={menuItem.key} title={menuItem.label}>
            {{
              icon: () => menuItem.icon && <img src={menuItem.icon} alt="" />,
              default: () => menuItem.children.map((item: any) => <SubMenuComp key={item.key} menuItem={item} />),
            }}
          </AntSubMenu>
        )
      }

      return (
        <MenuItem key={menuItem.key}>
          {{
            icon: () => menuItem.icon && <img src={menuItem.icon} alt="" />,
            default: () => menuItem.label,
          }}
        </MenuItem>
      )
    }
  },
})

export default SubMenuComp
