import React, { useState, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import Container from "../../components/Content/Container"
import { App, Button, Checkbox, Divider, type GetProp } from "antd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SymptomService } from "../../service/symptom.service"
import type { IGetSymptom } from "../../types/interface/ISymptom.interface"
import type {
  ICreateConsultation,
  IResCreateConsultation,
} from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"
import { useNavigate, type NavigateFunction } from "react-router-dom"

const Consultation: React.FC = (): JSX.Element => {
  const [symptomIds, setSymptomIds] = useState<string[]>([])
  const { notification } = App.useApp()

  const navigate: NavigateFunction = useNavigate()

  const { data, error } = useQuery({
    queryKey: ["symptom"],
    queryFn: () => SymptomService.getAllSymptom().then((res) => res.data),
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setSymptomIds(checkedValues as string[])
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["check-depression"],
    mutationFn: async (
      data: ICreateConsultation
    ): Promise<IResCreateConsultation> => {
      const response: IResCreateConsultation =
        await ConsultationService.createConsultation(data).then(
          (res) => res.data
        )
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return response
    },
    onSuccess: (response: IResCreateConsultation): void | Promise<void> =>
      navigate(`/dashboard/hasil-diagnosa/${response.consultationId}`),
    onError: (error: any): void =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
  })

  return (
    <>
      <UseTitle title='Cek Depresi' />
      <BreadCrumb items={[{ title: "Konsultasi" }, { title: "Cek Depresi" }]} />
      <Container>
        <div className='flex flex-col gap-y-1'>
          <h1 className='font-bold text-3xl'>Konsultasi Depresi Pengguna</h1>
          <p className='text-gray-500'>Silahkan pilih gejala yang dialami :</p>
        </div>
        <Divider />
        <div className='mb-5'>
          <Checkbox.Group onChange={onChange}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {data?.length
                ? data.map(
                    (symptom: IGetSymptom): JSX.Element => (
                      <div
                        key={symptom.id}
                        className='p-3 border border-gray-300 bg-gray-50 hover:shadow-md transition-all ease-in-out duration-150 rounded-lg'
                      >
                        <Checkbox value={symptom.id}>
                          {symptom.symptom}
                        </Checkbox>
                      </div>
                    )
                  )
                : null}
            </div>
          </Checkbox.Group>
        </div>
        <Button
          type='primary'
          size='large'
          loading={isPending}
          onClick={(): void => {
            if (!symptomIds.length)
              return notification.error({
                message: "Error",
                description: "Pilih gejala depresi terlebih dahulu!",
              })

            mutate({ symptomIds })
          }}
        >
          Submit
        </Button>
      </Container>
    </>
  )
}

export default Consultation
