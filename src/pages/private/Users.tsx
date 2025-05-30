import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Users: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Users" />
      <BreadCrumb items={[{ title: "Pengguna" }]} />
      <div>Users</div>
    </>
  )
}

export default Users
