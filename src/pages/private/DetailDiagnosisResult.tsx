import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { useParams } from "react-router-dom"

const DetailDiagnosisResult: React.FC = (): JSX.Element => {
  const { id } = useParams()

  return (
    <>
      <UseTitle title="Detail Diagnosis Result" />
      <BreadCrumb
        items={[
          { title: "Konsultasi" },
          { title: "Hasil Diagnosa" },
          { title: id as string },
        ]}
      />
    </>
  )
}

export default DetailDiagnosisResult
