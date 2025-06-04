import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { App, Statistic } from "antd"
import { TeamOutlined, ExceptionOutlined } from "@ant-design/icons"
import Container from "../../components/Content/Container"
import { COLOR } from "../../utils/constant/color.constant"
import { useQuery } from "@tanstack/react-query"
import { UserService } from "../../service/user.service"
import type { IConsultation } from "../../types/interface/IConsultation.interface"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"
import { ConsultationService } from "../../service/consultation.service"

const DashboardHome: React.FC = (): JSX.Element => {
  const { notification } = App.useApp()

  const { data: users, error: errorUsers } = useQuery({
    queryKey: ["users-length"],
    queryFn: () => UserService.getAllUser().then((res) => res.data),
  })

  const { data: consultations, error: errorConsultation } = useQuery({
    queryKey: ["diagnosis-result"],
    queryFn: (): Promise<IConsultation[]> =>
      ConsultationService.getConsultation().then(
        (res: ResponseEntity<IConsultation[]>) => res.data
      ),
  })

  if (errorUsers)
    notification.error({
      message: "Error",
      description: errorUsers.message,
    })

  if (errorConsultation)
    notification.error({
      message: "Error",
      description: errorConsultation.message,
    })

  return (
    <>
      <UseTitle title="Dashboard" />
      <BreadCrumb items={[{ title: "Home" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Container>
          <Statistic
            title="Pengguna Terdaftar"
            value={users?.length}
            valueStyle={{ color: COLOR.primary }}
            prefix={<TeamOutlined />}
            suffix=" Pengguna"
          />
        </Container>
        <Container>
          <Statistic
            title="Total Konsultasi"
            value={consultations?.length}
            valueStyle={{ color: COLOR.secodray }}
            prefix={<ExceptionOutlined />}
            suffix=" Konsultasi"
          />
        </Container>
      </div>
    </>
  )
}

export default DashboardHome
