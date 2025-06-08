import React, { useEffect, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { App } from "antd"
import type { IDetailConsultation } from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"
import SkeletonDetailDiagnosis from "../../components/skeleton/SkeletonDetailDiagnosis"
import DiagnosisResult from "../../components/DiagnosisResult"

const DetailConsultationUser: React.FC = (): JSX.Element => {
  const { id } = useParams()

  const { notification } = App.useApp()

  const { data, error, isLoading } = useQuery({
    queryKey: ["detail-diagnosis-result-user", id],
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-100 content-padding">
        <div className="container mx-auto">
          <SkeletonDetailDiagnosis />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 content-padding">
      <UseTitle title={`Detail Konsultasi ${id}`} />
      <div className="container mx-auto">
        <DiagnosisResult
          data={data}
          highestBeliefDiagnosis={highestBeliefDiagnosis}
        />
      </div>
    </div>
  )
}

export default DetailConsultationUser
