import { createContext } from "react"

export interface ITableActionContext {
  deletedId: string | null
  setDeletedId: React.Dispatch<React.SetStateAction<string | null>>
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableActionContext = createContext<ITableActionContext | null>(
  null
)
