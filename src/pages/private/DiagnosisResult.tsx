import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import { useQuery } from "@tanstack/react-query"
import { ConsultationService } from "../../service/consultation.service"
import { App, Button, type TableProps } from "antd"
import type { IConsultation } from "../../types/interface/IConsultation.interface"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"
import { NavLink } from "react-router-dom"
import { timeIdFormat } from "../../utils/pipe/timeIdFormat.pipe"

const DiagnosisResult: React.FC = (): JSX.Element => {
  const { notification } = App.useApp()

  const { data, error } = useQuery({
    queryKey: ["diagnosis-result"],
    queryFn: (): Promise<IConsultation[]> =>
      ConsultationService.getConsultation().then((res) => res.data),
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const columns: TableProps<IConsultation>["columns"] = [
    {
      title: "ID Konsultasi",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Nama Pengguna",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Hasil",
      dataIndex: "result",
      key: "result",
      sorter: (a, b) => a.result.localeCompare(b.result),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Tanggal Konsultasi",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      ellipsis: {
        showTitle: false,
      },
      render: (_, { createdAt }) => timeIdFormat(new Date(createdAt)),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <NavLink to={`/hasil-diagnosa/${record.id}`}>
          <Button color="primary" variant="solid">
            Detail
          </Button>
        </NavLink>
      ),
    },
  ]

  return (
    <>
      <UseTitle title="Hasil Diagnosa" />
      <BreadCrumb
        items={[{ title: "Konsultasi" }, { title: "Hasil Diagnosa" }]}
      />
      <Container>
        <ContainerTable<IConsultation>
          title="Daftar Hasil Diagnosa"
          columns={columns}
          data={data}
        />
      </Container>
    </>
  )
}

export default DiagnosisResult
