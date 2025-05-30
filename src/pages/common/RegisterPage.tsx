import React, { type JSX } from "react"
import { App, Button, Form, Input, Select, type FormProps } from "antd"
import { NavLink, useNavigate, type NavigateFunction } from "react-router-dom"
import { EGender } from "../../types/enum/EGender"
import type {
  IRegisterPayload,
  IRegisterResponse,
} from "../../types/interface/IAuth.interface"
import { useMutation } from "@tanstack/react-query"
import { UserService } from "../../service/user.service"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"

const { Option } = Select

const RegisterPage: React.FC = (): JSX.Element => {
  const { notification } = App.useApp()
  const navigate: NavigateFunction = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (
      data: IRegisterPayload
    ): Promise<ResponseEntity<IRegisterResponse>> => {
      const res: ResponseEntity<IRegisterResponse> =
        await UserService.registerUser(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Sukses",
        description: "Pendaftaran berhasil, silahkan login!",
      })
      navigate("/login")
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error.response.data.message,
      })
    },
  })

  const onFinish: FormProps<IRegisterPayload>["onFinish"] = (values) => {
    mutate(values)
  }

  return (
    <>
      <h1 className="font-bold text-xl mb-5">Silahkan Mendaftar</h1>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex flex-col md:flex-row md:gap-3">
          <Form.Item<IRegisterPayload>
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Tolong masukkan nama anda!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Masukkan nama anda" />
          </Form.Item>

          <Form.Item<IRegisterPayload>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Tolong masukkan email anda!" },
              { type: "email", message: "Email tidak valid!" },
            ]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Masukkan email anda" />
          </Form.Item>
        </div>

        <Form.Item<IRegisterPayload>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password wajib diisi!" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                "Password harus terdiri dari minimal 6 karakter, mengandung huruf kecil, huruf besar, angka, dan simbol [@$!%*?&]",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item<IRegisterPayload>
          label="Nomor Telepon"
          name="phoneNumber"
          rules={[
            { required: true, message: "Tolong masukkan nomor telepon anda!" },
            {
              pattern: /^\+62\d{9,13}$/,
              message:
                "Nomor Telepon harus diawali dengan +62 dan terdiri dari 9-13 angka",
            },
          ]}
        >
          <Input placeholder="Masukkan nomor telepon anda, contoh: +628123456789" />
        </Form.Item>

        <Form.Item<IRegisterPayload>
          label="Alamat"
          name="address"
          rules={[{ required: true, message: "Tolong masukkan alamat anda!" }]}
        >
          <Input placeholder="Masukkan alamat anda" />
        </Form.Item>

        <Form.Item<IRegisterPayload>
          label="Jenis Kelamin"
          name="gender"
          rules={[
            { required: true, message: "Tolong masukkan jenis kelamin anda!" },
          ]}
        >
          <Select placeholder="Pilih jenis kelamin anda">
            <Option value={EGender.LAKI_LAKI}>Laki-laki</Option>
            <Option value={EGender.PEREMPUAN}>Perempuan</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex flex-col gap-y-3">
            <p>
              Sudah terdaftar?,
              <NavLink to="/login"> Login disini</NavLink>
            </p>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "5rem", padding: "1.2rem" }}
              loading={isPending}
            >
              {isPending ? null : "Daftar"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

export default RegisterPage
