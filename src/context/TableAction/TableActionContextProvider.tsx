import React, { useMemo, type ReactNode } from "react"
import { TableActionContext } from "./TableActionContext"

const TableActionContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deletedId, setDeletedId] = React.useState<string | null>(null)
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  const value = useMemo(() => {
    return { deletedId, setDeletedId, openModal, setOpenModal }
  }, [deletedId, setDeletedId, openModal, setOpenModal])

  return (
    <TableActionContext.Provider value={value}>
      {children}
    </TableActionContext.Provider>
  )
}

export default TableActionContextProvider
