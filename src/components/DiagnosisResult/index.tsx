import React, { type JSX } from "react"
import type {
  diagnosisResult,
  IDetailConsultation,
} from "../../types/interface/IConsultation.interface"
import Container from "../Content/Container"
import { Timeline, Typography } from "antd"
import { timeIdFormat } from "../../utils/pipe/timeIdFormat.pipe"

interface props {
  data: IDetailConsultation | undefined
  highestBeliefDiagnosis: diagnosisResult | undefined
}

const DiagnosisResult: React.FC<props> = ({
  data,
  highestBeliefDiagnosis,
}): JSX.Element => {
  return (
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
                {data?.createdAt ? timeIdFormat(new Date(data.createdAt)) : "-"}
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
  )
}

export default DiagnosisResult
