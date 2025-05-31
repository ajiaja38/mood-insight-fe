import { Button, Grid, Layout, theme, type Breakpoint } from "antd"
import React, { useEffect, useState, type JSX } from "react"
import { Outlet } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import Sidebar from "../components/sidebar"

const { Header, Content } = Layout
const { useBreakpoint } = Grid

const DashboardLayout: React.FC = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const screen: Partial<Record<Breakpoint, boolean>> = useBreakpoint()

  useEffect(() => {
    if (screen.lg || screen.xl || screen.xxl) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }, [screen])

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 9,
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "16px",
            background: "#f1f5f9",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
