import type { EGender } from "../enum/EGender.enum"
import type { ERole } from "../enum/ERole.enum"

export interface IRegisterPayload {
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
  gender: EGender
}

export interface IRegisterResponse {
  id: string
  name: string
  email: string
  phoneNumber: string
  address: string
  gender: EGender
  role: ERole
  createdAt: Date
  updatedAt: Date
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}

export interface ILoginRefreshResponse {
  accessToken: string
  refreshToken: string
}
