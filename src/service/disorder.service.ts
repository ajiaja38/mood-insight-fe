import type {
  ICreateDisorder,
  IGetDisorder,
} from "../types/interface/IDisorder.interface"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import { api } from "./global/api.instance"

export class DisorderService {
  public static async createDisorder(
    data: ICreateDisorder
  ): Promise<ResponseEntity<IGetDisorder>> {
    return api.post("disorder", data)
  }

  public static async getAllDisorder(): Promise<
    ResponseEntity<IGetDisorder[]>
  > {
    return api.get("disorder")
  }

  public static async updateDisorder(
    id: string,
    data: ICreateDisorder
  ): Promise<ResponseEntity<IGetDisorder>> {
    return api.put(`disorder/${id}`, data)
  }

  public static async deleteDisorder(
    id: string
  ): Promise<ResponseMessageEntity> {
    return api.delete(`disorder/${id}`)
  }
}
