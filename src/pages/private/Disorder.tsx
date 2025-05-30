import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Disorder: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Penyakit" />
      <BreadCrumb items={[{ title: "Penyakit" }]} />
    </>
  )
}

export default Disorder
