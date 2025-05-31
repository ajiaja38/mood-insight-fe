import type { EKBWeight } from "../enum/EKBWeight.enum"

export interface ICreateKnowledgeBase extends IUpdateKnowledgeBase {
  symptomId: string
  disorderId: string
}

export interface IUpdateKnowledgeBase {
  weight: EKBWeight
}

export interface IGetKnowledgeBase extends ICreateKnowledgeBase {
  id: string
  symptom: string
  disorder: string
  createdAt: string
  updatedAt: string
}
