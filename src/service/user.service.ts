import type {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
} from "../types/interface/IAuth.interface"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import type {
  IDetailUser,
  IGetAllUser,
  IUpdateUserPayload,
} from "../types/interface/IUser.interface"
import { api } from "./global/api.instance"

export class UserService {
  public static async login(
    data: ILoginPayload
  ): Promise<ResponseEntity<ILoginResponse>> {
    return api.post("auth/login", data)
  }

  public static async registerAdmin(
    data: IRegisterPayload
  ): Promise<ResponseEntity<IRegisterResponse>> {
    return api.post("user/admin", data)
  }

  public static async registerUser(
    data: IRegisterPayload
  ): Promise<ResponseEntity<IRegisterResponse>> {
    return api.post("user", data)
  }

  public static async getAllUser(): Promise<ResponseEntity<IGetAllUser[]>> {
    return api.get("user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async getDetailUser(
    id: string
  ): Promise<ResponseEntity<IDetailUser>> {
    return api.get(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async getProfile(): Promise<ResponseEntity<IDetailUser>> {
    return api.get("user/data/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async updateUser(
    payload: IUpdateUserPayload
  ): Promise<ResponseEntity<IRegisterResponse>> {
    return api.put(`user`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async deleteUser(id: string): Promise<ResponseMessageEntity> {
    return api.delete(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }
}
