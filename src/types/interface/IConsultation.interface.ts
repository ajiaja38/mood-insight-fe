export interface ICreateConsultation {
  symptomIds: string[]
}

export interface IResCreateConsultation {
  consultationId: string
  result: {
    disorders: string[]
    belief: number
  }
}

export interface IConsultation {
  id: string
  user: string
  result: string
  createdAt: string
}

interface symptom {
  symptomId: string
  symptom: string
}

interface disorder {
  id: string
  name: string
}

interface diagnosisResult {
  id: string
  belief_value: number
  plausability_value: number
  disorder: disorder[]
}

export interface IDetailConsultation {
  id: string
  userId: string
  user: string
  userAddress: string
  userEmail: string
  userPhoneNumber: string
  symptoms: symptom[]
  diagnosisResult: diagnosisResult[]
  solution: string[]
  createdAt: string
}
