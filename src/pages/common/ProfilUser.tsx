import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"

const ProfilUser: React.FC = (): JSX.Element => {
  return (
    <div className="bg-gray-100 content-padding">
      <UseTitle title="Profile" />
      <div className="container mx-auto"></div>
    </div>
  )
}

export default ProfilUser
