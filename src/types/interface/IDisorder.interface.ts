export interface ICreateDisorder {
  name: string
  description: string
}

export interface IGetDisorder extends ICreateDisorder {
  id: string
}
