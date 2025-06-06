import type {
  ICreateKnowledgeBase,
  IGetKnowledgeBase,
  IUpdateKnowledgeBase,
} from "../types/interface/IKnowledgeBase"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../types/interface/IResponse.interface"
import { api } from "./global/api.instance"

export class KnowledgeBaseService {
  public static async createKnowledgeBase(
    data: ICreateKnowledgeBase
  ): Promise<ResponseEntity<IGetKnowledgeBase>> {
    return api.post(
      "knowledge-base",
      {
        details: [data],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
  }

  public static async getAllKnowledgeBase(): Promise<
    ResponseEntity<IGetKnowledgeBase[]>
  > {
    return api.get("knowledge-base", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }

  public static async updateKnowledgeBase(
    id: string,
    data: IUpdateKnowledgeBase
  ): Promise<ResponseEntity<IGetKnowledgeBase>> {
    const stringWeight: string = data.weight.toString()
    const weight: number = parseFloat(stringWeight)

    return api.put(
      `knowledge-base/${id}`,
      {
        weight,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
  }

  public static async deleteKnowledgeBase(
    id: string
  ): Promise<ResponseMessageEntity> {
    return api.delete(`knowledge-base/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  }
}
