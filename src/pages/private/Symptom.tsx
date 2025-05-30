import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Symptom: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Gejala" />
      <BreadCrumb items={[{ title: "Gejala" }]} />
    </>
  )
}

export default Symptom
