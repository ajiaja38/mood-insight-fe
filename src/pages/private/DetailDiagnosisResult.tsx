import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { useParams } from "react-router-dom"
import { App } from "antd"
import { useQuery } from "@tanstack/react-query"
import type { IDetailConsultation } from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"
import SkeletonDetailDiagnosis from "../../components/skeleton/SkeletonDetailDiagnosis"
import DiagnosisResult from "../../components/DiagnosisResult"

const DetailDiagnosisResult: React.FC = (): JSX.Element => {
  const { id } = useParams()

  const { notification } = App.useApp()

  const { data, error, isLoading } = useQuery({
    queryKey: ["detail-diagnosis-result", id],
    queryFn: async (): Promise<IDetailConsultation> => {
      const response: Promise<IDetailConsultation> =
        ConsultationService.getDetailConsultation(id as string).then(
          (res) => res.data
        )
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return response
    },
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const highestBeliefDiagnosis = data?.diagnosisResult.reduce(
    (max, current) => {
      return current.belief_value > max.belief_value ? current : max
    },
    data?.diagnosisResult[0]
  )

  if (isLoading) return <SkeletonDetailDiagnosis />

  return (
    <>
      <UseTitle title="Detail Diagnosa" />
      <BreadCrumb
        items={[
          { title: "Konsultasi" },
          { title: "Hasil Diagnosa" },
          { title: id as string },
        ]}
      />
      <DiagnosisResult
        data={data}
        highestBeliefDiagnosis={highestBeliefDiagnosis}
      />
    </>
  )
}

export default DetailDiagnosisResult
