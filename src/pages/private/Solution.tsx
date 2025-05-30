import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Solution: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Solusi" />
      <BreadCrumb items={[{ title: "Solusi" }]} />
    </>
  )
}

export default Solution
