import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const Consultation: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Cek Depresi" />
      <BreadCrumb items={[{ title: "Konsultasi" }, { title: "Cek Depresi" }]} />
    </>
  )
}

export default Consultation
