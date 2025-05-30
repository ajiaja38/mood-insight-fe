import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Profile: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Profile" />
      <BreadCrumb items={[{ title: "Profile" }]} />
    </>
  )
}

export default Profile
