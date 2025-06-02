export interface IGetSymptom {
  id: string
  symptom: string
}

export interface ICreateSymptom {
  symptom: string
}

export type IUpdateSymptom = ICreateSymptom
