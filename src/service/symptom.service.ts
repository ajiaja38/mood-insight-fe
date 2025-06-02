import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import type {
  ICreateSymptom,
  IGetSymptom,
  IUpdateSymptom,
} from "../types/interface/ISymptom.interface"
import { api } from "./global/api.instance"

export class SymptomService {
  public static async createSymptom(
    data: ICreateSymptom
  ): Promise<ResponseEntity<IGetSymptom>> {
    return api.post("symptom", data)
  }

  public static async getAllSymptom(): Promise<ResponseEntity<IGetSymptom[]>> {
    return api.get("symptom")
  }

  public static async updateSymptom(
    id: string,
    data: IUpdateSymptom
  ): Promise<ResponseEntity<IGetSymptom>> {
    return api.put(`symptom/${id}`, data)
  }

  public static async deleteSymptom(
    id: string
  ): Promise<ResponseMessageEntity> {
    return api.delete(`symptom/${id}`)
  }
}
