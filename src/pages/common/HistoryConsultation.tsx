import React, { useEffect, type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import { useQuery } from "@tanstack/react-query"
import { App, Button, type TableProps } from "antd"
import type { IConsultation } from "../../types/interface/IConsultation.interface"
import { ConsultationService } from "../../service/consultation.service"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"
import { timeIdFormat } from "../../utils/pipe/timeIdFormat.pipe"
import { NavLink } from "react-router-dom"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"

const HistoryConsultation: React.FC = (): JSX.Element => {
  const { notification } = App.useApp()

  const { data, error } = useQuery({
    queryKey: ["diagnosis-result"],
    queryFn: (): Promise<IConsultation[]> =>
      ConsultationService.getConsultation(true).then(
        (res: ResponseEntity<IConsultation[]>) => res.data
      ),
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const columns: TableProps<IConsultation>["columns"] = [
    {
      title: "Hasil",
      dataIndex: "result",
      key: "result",
      sorter: (a, b): number => a.result.localeCompare(b.result),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Tanggal Konsultasi",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b): number => a.createdAt.localeCompare(b.createdAt),
      ellipsis: {
        showTitle: false,
      },
      render: (_, { createdAt }) => timeIdFormat(new Date(createdAt)),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record): JSX.Element => (
        <NavLink to={`/detail-konsultasi/${record.id}`}>
          <Button color="primary" variant="solid">
            Detail
          </Button>
        </NavLink>
      ),
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-gray-100 content-padding">
      <UseTitle title="Riwayat Konsultasi" />
      <div className="container mx-auto">
        <Container>
          <ContainerTable<IConsultation>
            title="Daftar Hasil Diagnosa"
            columns={columns}
            data={data}
          />
        </Container>
      </div>
    </div>
  )
}

export default HistoryConsultation
