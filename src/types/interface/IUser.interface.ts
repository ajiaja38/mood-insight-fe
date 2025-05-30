import type { EGender } from "../enum/EGender"
import type { ERole } from "../enum/ERole"

export interface IGetAllUser {
  id: string
  email: string
  phoneNumber: string
  name: string
  address: string
  role: ERole
  gender: EGender
}

export interface IDetailUser extends IGetAllUser {
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateUserPayload {
  name: string
  email: string
  phoneNumber: string
  address: string
}
