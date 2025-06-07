import React, { useEffect, useState, type JSX } from "react"
import { Button, Form, Input } from "antd"
import type { FormProps } from "antd"
import { NavLink, useNavigate, type NavigateFunction } from "react-router-dom"
import type { ILoginPayload } from "../../types/interface/IAuth.interface"
import { useAuth } from "../../hooks/useAuth"
import type { IAuthContext } from "../../context/auth/AuthContext"
import LocalStorageService from "../../service/localStorage.service"
import { ERole } from "../../types/enum/ERole.enum"

const LoginPage: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)

  const auth: IAuthContext = useAuth()
  const navigate: NavigateFunction = useNavigate()

  const onFinish: FormProps<ILoginPayload>["onFinish"] = async (
    values: ILoginPayload
  ) => {
    setLoading(true)
    setTimeout(async (): Promise<void> => {
      await auth.login(values)

      if (auth.getRole() === ERole.ADMIN) navigate("/dashboard")
      if (auth.getRole() === ERole.USER) navigate("/")

      setLoading(false)
    }, 1500)
  }

  useEffect((): void => LocalStorageService.remove(), [])

  return (
    <>
      <h1 className="font-bold text-center text-xl">Silahkan Masuk</h1>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<ILoginPayload>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Tolong masukkan email anda!" },
            { type: "email", message: "Email tidak valid!" },
          ]}
        >
          <Input placeholder="Masukkan email anda" type="email" />
        </Form.Item>

        <Form.Item<ILoginPayload>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password wajib diisi!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <div className="flex flex-col gap-y-3">
            <p>
              Belum terdaftar?,
              <NavLink to="/auth/register"> Daftar disini</NavLink>
            </p>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "5rem", padding: "1.2rem" }}
              loading={loading}
            >
              {loading ? null : "Login"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginPage
