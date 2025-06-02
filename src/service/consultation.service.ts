import type {
  IConsultation,
  ICreateConsultation,
  IDetailConsultation,
} from "../types/interface/IConsultation.interface"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import { api } from "./global/api.instance"

export class ConsultationService {
  public static async createConsultation(
    data: ICreateConsultation
  ): Promise<ResponseMessageEntity> {
    return await api.post("consultation", data)
  }

  public static async getConsultation(
    isUser?: boolean
  ): Promise<ResponseEntity<IConsultation[]>> {
    const path: string = isUser ? "consultation/user" : "consultation"

    return await api.get(path)
  }

  public static async getDetailConsultation(
    id: string
  ): Promise<ResponseEntity<IDetailConsultation>> {
    return await api.get(`consultation/${id}`)
  }
}
