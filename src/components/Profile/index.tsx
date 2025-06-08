import { Button, Tag, Typography } from "antd"
import React, { type JSX } from "react"
import type { IDetailUser } from "../../types/interface/IUser.interface"
import Container from "../Content/Container"
import { ERole } from "../../types/enum/ERole.enum"
import { EGender } from "../../types/enum/EGender.enum"

interface props {
  data: IDetailUser | undefined
  handleOpenMOdal: () => void
  isUser?: boolean
}

const ProfileUser: React.FC<props> = ({
  data,
  handleOpenMOdal,
  isUser,
}): JSX.Element => {
  return (
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
            isUser={isUser}
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
  isUser?: boolean
}> = ({ label, color, data, isUser }) => {
  return (
    <div className="flex flex-col" hidden={isUser}>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <div>
        <Tag color={color}>{data}</Tag>
      </div>
    </div>
  )
}

export default ProfileUser
