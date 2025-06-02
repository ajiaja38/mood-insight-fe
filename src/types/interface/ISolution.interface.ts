export interface ICreateSolution extends IUpdateSolution {
  disorderId: string
}

export interface IUpdateSolution {
  solution: string
}

export interface IGetSolution {
  id: string
  solution: string
  disorder: {
    id: string
    name: string
  }
}
