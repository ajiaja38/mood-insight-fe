import React, { useEffect, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { useParams } from "react-router-dom"
import { App } from "antd"
import { useQuery } from "@tanstack/react-query"
import type { IDetailConsultation } from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"

const DetailDiagnosisResult: React.FC = (): JSX.Element => {
  const { id } = useParams()

  const { notification } = App.useApp()

  const { data, error } = useQuery({
    queryKey: ["detail-diagnosis-result", id],
    queryFn: (): Promise<IDetailConsultation> =>
      ConsultationService.getDetailConsultation(id as string).then(
        (res) => res.data
      ),
  })

  if (error) {
    notification.error({
      message: "Error",
      description: error.message,
    })
  }

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

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
