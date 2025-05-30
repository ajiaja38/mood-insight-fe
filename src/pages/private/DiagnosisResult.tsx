import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const DiagnosisResult: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Hasil Diagnosa" />
      <BreadCrumb
        items={[{ title: "Konsultasi" }, { title: "Hasil Diagnosa" }]}
      />
    </>
  )
}

export default DiagnosisResult
