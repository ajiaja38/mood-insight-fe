import React, { type JSX } from "react"
import { App, ConfigProvider, Menu, type MenuProps } from "antd"
import Sider from "antd/es/layout/Sider"
import {
  LogoutOutlined,
  HomeOutlined,
  ExperimentOutlined,
  TeamOutlined,
  ForkOutlined,
  ExceptionOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  ScanOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons"
import {
  useLocation,
  useNavigate,
  type Location,
  type NavigateFunction,
} from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import type { IAuthContext } from "../../context/auth/AuthContext"
import { ERole } from "../../types/enum/ERole.enum"

interface props {
  collapsed: boolean
}

type MenuItem = Required<MenuProps>["items"][number]

const Sidebar: React.FC<props> = ({ collapsed }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()
  const auth: IAuthContext = useAuth()

  const { modal } = App.useApp()

  const itemAdmin: MenuItem[] = [
    {
      key: "/users",
      icon: <TeamOutlined />,
      label: "Pengguna",
    },
    {
      key: "/penyakit",
      icon: <ExperimentOutlined />,
      label: "Penyakit",
    },
    {
      key: "/gejala",
      icon: <ForkOutlined />,
      label: "Gejala",
    },
    {
      key: "/knowledge-base",
      icon: <ReadOutlined />,
      label: "Basis Pengetahuan",
    },
    {
      key: "/solusi",
      icon: <SafetyCertificateOutlined />,
      label: "Solusi",
    },
  ]

  const items: MenuItem[] = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    ...(auth.getRole() === ERole.ADMIN ? itemAdmin : []),
    {
      key: "/consult",
      icon: <ScanOutlined />,
      label: "konsultasi",
      children: [
        {
          key: "/konsultasi",
          label: "Cek Depresi",
          icon: <MedicineBoxOutlined />,
        },
        {
          key: "/hasil-diagnosa",
          label: "Hasil Diagnosa",
          icon: <ExceptionOutlined />,
        },
      ],
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ]

  const onClick: MenuProps["onClick"] = (e) => navigate(e.key)

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        <h1 className="text-slate-200 font-bold text-center my-4">
          Mood Insight
        </h1>
      </div>
      <div className="flex flex-col h-[calc(100vh-4.9rem)] justify-between">
        <Menu
          style={{ paddingInline: "10px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          onClick={onClick}
        />

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemHoverBg: "#A02334",
              },
            },
          }}
        >
          <Menu
            style={{ paddingInline: "10px" }}
            theme="dark"
            mode="inline"
            selectedKeys={[]}
            items={[
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Logout",
              },
            ]}
            onClick={() => {
              modal.confirm({
                title: "Logout",
                content: "Apakah anda yakin ingin logout?",
                okText: "Logout",
                okButtonProps: {
                  danger: true,
                },
                cancelButtonProps: {
                  className: "hover:!border-primary hover:!text-primary",
                },
                cancelText: "Batal",
                onOk: () => {
                  auth.logout()
                  navigate("/login")
                },
              })
            }}
          />
        </ConfigProvider>
      </div>
    </Sider>
  )
}

export default Sidebar
