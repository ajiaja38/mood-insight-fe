import React, { type JSX } from "react"
import { Button, Form, Input } from "antd"
import type { FormProps } from "antd"

type FieldType = {
  username?: string
  password?: string
}

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <div className="h-screen bg-slate-200 flex flex-col justify-center items-center">
      <div className="p-3 bg-white rounded-xl w-[30rem] shadow-xl px-7">
        <h1 className="font-bold text-center text-xl">Silahkan Masuk</h1>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password wajib diisi!" },
              { min: 6, message: "Password minimal 6 karakter!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
