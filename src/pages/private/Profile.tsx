import React, { useEffect, useState, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { UserService } from "../../service/user.service"
import type {
  IDetailUser,
  IUpdateUserPayload,
} from "../../types/interface/IUser.interface"
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Tag,
  Typography,
  type FormInstance,
  type FormProps,
} from "antd"
import Container from "../../components/Content/Container"
import { ERole } from "../../types/enum/ERole.enum"
import { EGender } from "../../types/enum/EGender.enum"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"
import type { IRegisterResponse } from "../../types/interface/IAuth.interface"

const Profile: React.FC = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { notification } = App.useApp()

  const [form]: [FormInstance<IUpdateUserPayload>] =
    Form.useForm<IUpdateUserPayload>()

  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["profile"],
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
    mutationKey: ["updateProfile"],
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
        description: "Berhasil memperbarui profile",
      })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
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

  return (
    <>
      <UseTitle title="Profile" />
      <BreadCrumb items={[{ title: "Profile" }]} />
      <Container>
        <Typography.Title level={2}>Informasi Pasien</Typography.Title>
        <div className="mt-3 flex flex-col gap-y-3">
          <UserInfo label="Nama:" value={data?.name} />
          <UserInfo label="Email:" value={data?.email} />
          <UserInfo label="Nomor Telepon:" value={data?.phoneNumber} />
          <UserInfo label="Alamat:" value={data?.address} />
          <div className="flex gap-2">
            <IUserInfoTag
              label="Role:"
              color={data?.role === ERole.ADMIN ? "gold" : "purple"}
              data={data?.role}
            />
            <IUserInfoTag
              label="Jenis Kelamin:"
              color={data?.gender === EGender.LAKI_LAKI ? "blue" : "lime"}
              data={data?.gender}
            />
          </div>
          <div className="my-4">
            <Button type="primary" onClick={handleOpenMOdal}>
              Update Profile
            </Button>
          </div>
        </div>
      </Container>
      <Modal
        title="Tambah Data Penyakit"
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

interface IUserInfo {
  label: string
  value?: string
}

const UserInfo: React.FC<IUserInfo> = ({ label, value }): JSX.Element => {
  return (
    <div className="flex flex-col">
      <Typography.Text type="secondary">{label}:</Typography.Text>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  )
}

const IUserInfoTag: React.FC<{
  label: string
  color?: string
  data?: string
}> = ({ label, color, data }) => {
  return (
    <div className="flex flex-col">
      <Typography.Text type="secondary">{label}</Typography.Text>
      <div>
        <Tag color={color}>{data}</Tag>
      </div>
    </div>
  )
}

export default Profile
