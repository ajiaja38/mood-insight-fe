import type {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
} from "../types/interface/IAuth.interface"
import type { ResponseEntity } from "../types/interface/IResponse.interface"
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
    return api.post("admin", data)
  }

  public static async registerUser(
    data: IRegisterPayload
  ): Promise<ResponseEntity<IRegisterResponse>> {
    return api.post("user", data)
  }
}
