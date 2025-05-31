import type { ResponseEntity } from "../types/interface/IResponse.interface"
import type { IGetSymptom } from "../types/interface/ISymptom.interface"
import { api } from "./global/api.instance"

export class SymptomService {
  public static async getAllSymptom(): Promise<ResponseEntity<IGetSymptom[]>> {
    return api.get("symptom")
  }
}
