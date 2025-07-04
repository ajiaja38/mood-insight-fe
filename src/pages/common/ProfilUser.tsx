import React, { useEffect, useState, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import {
  App,
  Form,
  Input,
  Modal,
  type FormInstance,
  type FormProps,
} from "antd"
import type {
  IDetailUser,
  IUpdateUserPayload,
} from "../../types/interface/IUser.interface"
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { UserService } from "../../service/user.service"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"
import type { IRegisterResponse } from "../../types/interface/IAuth.interface"
import ProfileUser from "../../components/Profile"

const ProfilUser: React.FC = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { notification } = App.useApp()

  const [form]: [FormInstance<IUpdateUserPayload>] =
    Form.useForm<IUpdateUserPayload>()

  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["profile-user"],
    queryFn: (): Promise<IDetailUser> =>
      UserService.getProfile().then((res) => res.data),
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const handleOpenMOdal = (): void => setOpenModal(true)

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["updateProfileUser"],
    mutationFn: async (
      payload: IUpdateUserPayload
    ): Promise<ResponseEntity<IRegisterResponse>> => {
      const res: ResponseEntity<IRegisterResponse> =
        await UserService.updateUser(payload)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (): void => {
      setOpenModal(false)
      notification.success({
        message: "Success",
        description: "Berhasil update profile",
      })
      queryClient.invalidateQueries({ queryKey: ["profile-user"] })
      form.resetFields()
    },
    onError: (error: any): void => {
      notification.error({
        message: "Error",
        description: error.response.data.message,
      })
      form.resetFields()
    },
  })

  const onSubmit: FormProps<IUpdateUserPayload>["onFinish"] = (values): void =>
    updateProfile(values)

  useEffect((): void => {
    if (data)
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
      })
  }, [data, form])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="bg-gray-100 content-padding">
        <UseTitle title="Profile" />
        <div className="container mx-auto">
          <ProfileUser
            data={data}
            handleOpenMOdal={handleOpenMOdal}
            isUser={true}
          />
        </div>
      </div>
      <Modal
        title="Update data pengguna"
        open={openModal}
        confirmLoading={isPending}
        onOk={(): void => form.submit()}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={(): void => setOpenModal(false)}
      >
        <Form
          form={form}
          name="add-disorder"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item<IUpdateUserPayload>
            label="Nama Anda"
            name="name"
            rules={[{ required: true, message: "Harap masukkan nama anda!" }]}
          >
            <Input placeholder="Masukkan nama anda" />
          </Form.Item>

          <Form.Item<IUpdateUserPayload>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Harap masukkan email anda!" },
              { type: "email", message: "Email tidak valid!" },
            ]}
          >
            <Input type="email" placeholder="Masukkan email" />
          </Form.Item>

          <Form.Item<IUpdateUserPayload>
            label="Nomor Telepon"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Tolong masukkan nomor telepon anda!",
              },
              {
                pattern: /^\+62\d{9,13}$/,
                message:
                  "Nomor Telepon harus diawali dengan +62 dan terdiri dari 9-13 angka",
              },
            ]}
          >
            <Input placeholder="Masukkan nomor telepon anda, contoh: +628123456789" />
          </Form.Item>

          <Form.Item<IUpdateUserPayload>
            label="Alamat"
            name="address"
            rules={[{ required: true, message: "Harap masukkan alamat anda!" }]}
          >
            <Input type="text" placeholder="Masukkan alamat" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ProfilUser
