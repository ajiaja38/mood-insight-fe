import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { useParams } from "react-router-dom"
import { App, Divider, Skeleton, Timeline, Typography } from "antd"
import { useQuery } from "@tanstack/react-query"
import type { IDetailConsultation } from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"
import Container from "../../components/Content/Container"
import { timeIdFormat } from "../../utils/pipe/timeIdFormat.pipe"

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

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Container>
          <Skeleton active />
        </Container>
        <Container>
          <Skeleton active />
        </Container>
        <div className="lg:col-span-2">
          <Container>
            <Skeleton active />
            <Divider />
            <div className="flex flex-col gap-y-1.5">
              <Skeleton.Input
                active
                size="small"
                style={{
                  width: "100%",
                }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{
                  width: "100%",
                }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </Container>
        </div>
      </div>
    )

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
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Container>
          <Typography.Title level={2}>Daftar Gejala</Typography.Title>
          <Typography.Text type="secondary">
            Berikut daftar gejala yang dipilih pasien :
          </Typography.Text>
          <Timeline
            style={{
              marginTop: 40,
            }}
            items={data?.symptoms.map((symptom): { children: string } => ({
              children: symptom.symptom,
            }))}
          />
        </Container>
        <div className="order-first lg:order-none">
          <Container>
            <Typography.Title level={2}>Informasi Pasien</Typography.Title>
            <div className="mt-3 flex flex-col gap-y-3">
              <div className="flex flex-col">
                <Typography.Text type="secondary">Nama: </Typography.Text>
                <p className="font-semibold text-lg">{data?.user}</p>
              </div>
              <div className="flex flex-col">
                <Typography.Text type="secondary">Email: </Typography.Text>
                <p className="font-semibold text-lg">{data?.userEmail}</p>
              </div>
              <div className="flex flex-col">
                <Typography.Text type="secondary">
                  Nomor Telepon:{" "}
                </Typography.Text>
                <p className="font-semibold text-lg">{data?.userPhoneNumber}</p>
              </div>
              <div className="flex flex-col">
                <Typography.Text type="secondary">Alamat: </Typography.Text>
                <p className="font-semibold text-lg">{data?.userAddress}</p>
              </div>
            </div>
          </Container>
        </div>
        <div className="lg:col-span-2">
          <Container>
            <Typography.Title level={2}>Hasil Diagnosa</Typography.Title>
            <div className="mt-3 flex flex-col gap-y-3">
              <div className="flex flex-col">
                <Typography.Text type="secondary">
                  Tanggal Diagnosa:
                </Typography.Text>
                <p className="font-semibold text-lg">
                  {data?.createdAt
                    ? timeIdFormat(new Date(data.createdAt))
                    : "-"}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-y-3">
              <div className="flex flex-col">
                <Typography.Text type="secondary">
                  Persentase Diagnosa:
                </Typography.Text>
                <p className="font-semibold text-lg">
                  {highestBeliefDiagnosis
                    ? `${(highestBeliefDiagnosis.belief_value * 100).toFixed(
                        0
                      )} % - ${highestBeliefDiagnosis.disorder
                        .map((d) => d.name)
                        .join(", ")}`
                    : "-"}
                </p>
              </div>
              <hr className="border-gray-200" />
              <div className="flex flex-col">
                <Typography.Title level={2}>Solusi:</Typography.Title>
                <div className="flex flex-col gap-3">
                  {data?.solution.map(
                    (solution: string, index: number): JSX.Element => (
                      <div key={index} className="p-3 bg-quaternary rounded-lg">
                        <p className="text-lg text-gray-900 font-semibold">
                          {solution}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}

export default DetailDiagnosisResult
