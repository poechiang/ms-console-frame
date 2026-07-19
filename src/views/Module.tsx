import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PauseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue"
import PageWrapper from "@components/PageWrapper"
import { Avatar, Button, Flex, Input, Popconfirm, Space, Table, Tag, message } from "ant-design-vue"
import type { ColumnType } from "ant-design-vue/es/table"
import { defineComponent, ref } from "vue"

interface ModuleItem {
  key: string
  icon: string
  name: string
  description: string
  status: "online" | "offline" | "frozen"
}

const statusMap: Record<string, { color: string; label: string }> = {
  online: { color: "green", label: "已上线" },
  offline: { color: "default", label: "已下线" },
  frozen: { color: "orange", label: "已冻结" },
}

export default defineComponent({
  setup() {
    const searchText = ref("")

    const dataSource = ref<ModuleItem[]>([
      { key: "1", icon: "🔐", name: "认证中心", description: "统一身份认证与授权管理", status: "online" },
      { key: "2", icon: "👤", name: "用户服务", description: "用户信息管理与账号服务", status: "online" },
      { key: "3", icon: "📦", name: "订单服务", description: "订单处理与生命周期管理", status: "offline" },
      { key: "4", icon: "💰", name: "支付服务", description: "支付网关与交易流水", status: "frozen" },
      { key: "5", icon: "📢", name: "消息通知", description: "站内信与实时消息推送", status: "online" },
    ])

    const columns: ColumnType<ModuleItem>[] = [
      { title: "模块图标", dataIndex: "icon", width: 120, align: "center" },
      { title: "模块名称", dataIndex: "name", width: 160 },
      { title: "模块描述", dataIndex: "description", ellipsis: true },
      { title: "状态", dataIndex: "status", width: 100 },
      { title: "操作", key: "action", width: 280, fixed: "right" },
    ]

    const handleSearch = () => message.info(`搜索: ${searchText.value}`)
    const handleAdd = () => message.info("新增模块")
    const handleExport = () => message.info("导出数据")
    const handleEdit = (record: Record<string, any>) => message.info(`编辑: ${record.name}`)
    const handleOnline = (record: Record<string, any>) => {
      record.status = "online"
      message.success(`${record.name} 已上线`)
    }
    const handleOffline = (record: Record<string, any>) => {
      record.status = "offline"
      message.success(`${record.name} 已下线`)
    }
    const handleDelete = (record: Record<string, any>) => {
      const idx = dataSource.value.findIndex((x) => x.key === record.key)
      if (idx > -1) dataSource.value.splice(idx, 1)
      message.success(`${record.name} 已删除`)
    }
    const handleFreeze = (record: Record<string, any>) => {
      record.status = "frozen"
      message.success(`${record.name} 已冻结`)
    }

    const renderAction = (record: Record<string, any>) => (
      <Space size={4}>
        <Button type="link" size="small" onClick={() => handleEdit(record)}>
          <EditOutlined /> 编辑
        </Button>
        {record.status !== "online" && (
          <Popconfirm title="确认上线该模块？" onConfirm={() => handleOnline(record)}>
            <Button type="link" size="small">
              <CloudUploadOutlined /> 上线
            </Button>
          </Popconfirm>
        )}
        {record.status === "online" && (
          <Popconfirm title="确认下线该模块？" onConfirm={() => handleOffline(record)}>
            <Button type="link" size="small">
              <CloudDownloadOutlined /> 下线
            </Button>
          </Popconfirm>
        )}
        {record.status !== "frozen" && (
          <Popconfirm title="确认冻结该模块？" onConfirm={() => handleFreeze(record)}>
            <Button type="link" size="small">
              <PauseCircleOutlined /> 冻结
            </Button>
          </Popconfirm>
        )}
        <Popconfirm title="确认删除该模块？删除后数据不可恢复。" onConfirm={() => handleDelete(record)}>
          <Button type="link" size="small" danger>
            <DeleteOutlined /> 删除
          </Button>
        </Popconfirm>
      </Space>
    )

    return () => (
      <PageWrapper
        title="微服务模块管理"
        aside="当前已注册的微服务模块列表"
        extra={
          <Button type="text">
            <SettingOutlined />
          </Button>
        }
      >
        <>
          <Flex class="mb-16" gap={8}>
            <Button onClick={handleAdd}>
              <PlusOutlined /> 新增
            </Button>
            <span style={{ flex: "auto" }} />
            <Input
              v-model:value={searchText.value}
              placeholder="输入模块名称、描述模糊搜索"
              allowClear
              style={{ width: "280px" }}
              onPressEnter={handleSearch}
              v-slots={{ prefix: () => <SearchOutlined style={{ color: "#bfbfbf" }} /> }}
            />
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleExport}>
              <ExportOutlined /> 导出
            </Button>
          </Flex>

          <Table
            dataSource={dataSource.value}
            columns={columns}
            pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }}
            rowKey="key"
            v-slots={{
              bodyCell: ({ column, record }: any) => {
                if (column.key === "action") return renderAction(record)
                if (column.dataIndex === "status") return <Tag color={statusMap[record.status]?.color}>{statusMap[record.status]?.label}</Tag>
                if (column.dataIndex === "icon")
                  return (
                    <Avatar size={32} shape="square" style={{ backgroundColor: "var(--color-primary, #3c89e8)" }}>
                      {record.icon}
                    </Avatar>
                  )
                return null
              },
            }}
          />
        </>
      </PageWrapper>
    )
  },
})
