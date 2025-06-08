import React, { useEffect, useState, type JSX } from "react"
import { MoodInsightLogo } from "../../utils/constant/staticFile"
import { App, Button, Dropdown, type MenuProps } from "antd"
import {
  NavLink,
  useLocation,
  useNavigate,
  type NavigateFunction,
} from "react-router-dom"
import { MenuOutlined } from "@ant-design/icons/lib/icons"
import { useAuth } from "../../hooks/useAuth"

const Navbar: React.FC = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const { isAuthenticated, logout } = useAuth()
  const { modal } = App.useApp()
  const navigate: NavigateFunction = useNavigate()
  const location = useLocation()

  const itemsNavAuthenticated: MenuProps["items"] = [
    {
      key: "consultation",
      label: <NavLink to="/konsultasi-pengguna">Konsultasi</NavLink>,
    },
    {
      key: "logout",
      label: <div onClick={(): void => logoutFunc()}>Logout</div>,
    },
  ]

  const itemsNavNotAuthenticated: MenuProps["items"] = [
    {
      key: "login",
      label: <NavLink to="/auth/login">Masuk</NavLink>,
    },
    {
      key: "register",
      label: <NavLink to="/auth/register">Daftar</NavLink>,
    },
  ]

  const itemsNav: MenuProps["items"] = [
    {
      key: "home",
      label: <div onClick={() => returnLocation()}>Beranda</div>,
    },
    {
      key: "about",
      label: <a>Tentang</a>,
    },
    {
      key: "contact",
      label: <a>Kontak</a>,
    },
    ...(isAuthenticated ? itemsNavAuthenticated : itemsNavNotAuthenticated),
  ]

  const logoutFunc = (): void => {
    modal.confirm({
      title: "Keluar",
      content: "Apakah anda yakin ingin keluar?",
      okText: "Keluar",
      okButtonProps: {
        danger: true,
      },
      cancelButtonProps: {
        className: "hover:!border-primary hover:!text-primary",
      },
      cancelText: "Batal",
      onOk: () => {
        logout()
      },
    })
  }

  const returnLocation: () => void | Promise<void> = () =>
    location.pathname === "/" ? window.scrollTo(0, 0) : navigate("/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 top-0 bg-white/50 backdrop-blur-lg z-[99] ${
        isScrolled ? "border-b border-gray-100" : "border-none"
      }`}
    >
      <div className="flex p-4 md:py-5 lg:px-9 3xl:px-0 w-full justify-between items-center container mx-auto">
        <div
          onClick={() => returnLocation()}
          className="flex items-center gap-x-2 cursor-pointer"
        >
          <img src={MoodInsightLogo} alt="Mood Insight" className="w-6 h-6" />
          <h1 className="font-extrabold text-teal-600 text-2xl">
            Mood Insight
          </h1>
        </div>
        <ul
          className="hidden lg:flex gap-x-6 
        [&>li]:cursor-pointer
        [&>li]:transition-colors
        [&>li]:duration-300 
        [&>li]:hover:text-teal-600"
        >
          <li onClick={() => returnLocation()}>Beranda</li>
          <li>Tentang</li>
          <li hidden={!isAuthenticated} onClick={() => navigate("/riwayat")}>
            Riwayat
          </li>
          <li
            hidden={!isAuthenticated}
            onClick={() => navigate("/profile-pengguna")}
          >
            Profile
          </li>
        </ul>
        <div className="lg:flex lg:gap-x-1 hidden">
          <NavLink to="/auth/login" hidden={isAuthenticated}>
            <Button type="primary">Masuk</Button>
          </NavLink>
          <NavLink to="/auth/register" hidden={isAuthenticated}>
            <Button type="text">Daftar</Button>
          </NavLink>
          <NavLink to="/konsultasi-pengguna" hidden={!isAuthenticated}>
            <Button variant="solid" color="primary">
              Konsultasi
            </Button>
          </NavLink>
          <Button
            color="red"
            variant="text"
            onClick={(): void => logoutFunc()}
            hidden={!isAuthenticated}
          >
            Logout
          </Button>
        </div>
        <div className="lg:hidden">
          <Dropdown
            menu={{ items: itemsNav }}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <Button type="primary" icon={<MenuOutlined />} />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Navbar
