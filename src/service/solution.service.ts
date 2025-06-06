import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import type {
  ICreateSolution,
  IGetSolution,
} from "../types/interface/ISolution.interface"
import { api } from "./global/api.instance"

export class SolutionSerice {
  public static async createSolution(
    data: ICreateSolution
  ): Promise<ResponseEntity<IGetSolution>> {
    return await api.post("solution", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async getSolution(): Promise<ResponseEntity<IGetSolution[]>> {
    return await api.get("solution", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async updateSolution(
    id: string,
    data: ICreateSolution
  ): Promise<ResponseEntity<IGetSolution>> {
    return await api.put(`solution/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async deleteSolution(
    id: string
  ): Promise<ResponseMessageEntity> {
    return await api.delete(`solution/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }
}
