import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import useTableAction from "../../hooks/useTableAction"
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  type FormProps,
} from "antd"
import type {
  ICreateSymptom,
  IGetSymptom,
} from "../../types/interface/ISymptom.interface"
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { SymptomService } from "../../service/symptom.service"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../../types/interface/IResponse.interface"
import type { ColumnType } from "antd/es/table"
import LoadingOverlay from "../../components/loading/LoadingOverlay"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"

const Symptom: React.FC = (): JSX.Element => {
  const { deletedId, setDeletedId, openModal, setOpenModal } = useTableAction()

  const [form] = Form.useForm<ICreateSymptom>()

  const { notification } = App.useApp()
  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["symptom"],
    queryFn: () =>
      SymptomService.getAllSymptom().then(
        (res: ResponseEntity<IGetSymptom[]>) => res.data
      ),
  })

  if (error) {
    notification.error({
      message: "Error",
      description: error.message,
    })
  }

  const { mutate: deleteSymptom } = useMutation({
    mutationFn: async (id: string): Promise<ResponseMessageEntity> => {
      setDeletedId(id)
      const res: ResponseMessageEntity = await SymptomService.deleteSymptom(id)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Data Gejala berhasil dihapus",
      })
      queryClient.invalidateQueries({ queryKey: ["symptom"] })
      form.resetFields()
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description: error.message,
      })
    },
    onSettled: () => {
      setDeletedId(null)
    },
  })

  const handleOpenModal = () => setOpenModal(true)

  const { mutate: createSymptom, isPending } = useMutation({
    mutationKey: ["createSymptom"],
    mutationFn: async (
      data: ICreateSymptom
    ): Promise<ResponseEntity<IGetSymptom>> => {
      const res: ResponseEntity<IGetSymptom> =
        await SymptomService.createSymptom(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Berhasil menambahkan gejala",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["symptom"] })
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description: error.message,
      })
    },
    onSettled: () => {
      setDeletedId(null)
    },
  })

  const onSubmit: FormProps<ICreateSymptom>["onFinish"] = (values) => {
    createSymptom(values)
  }

  const { mutate: updateSymptom, isPending: isUpdatePending } = useMutation({
    mutationKey: ["updateSymptom"],
    mutationFn: async (
      data: IGetSymptom
    ): Promise<ResponseEntity<IGetSymptom>> => {
      const res: ResponseEntity<IGetSymptom> =
        await SymptomService.updateSymptom(data.id, { symptom: data.symptom })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Berhasil memperbarui Gejala",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["symptom"] })
    },
    onError: (error) =>
      notification.error({
        message: "Error",
        description: error.message,
      }),
    onSettled: () => setDeletedId(null),
  })

  const handleSave = (row: IGetSymptom) => updateSymptom(row)

  const defaultColumns: (ColumnType<IGetSymptom> & { editable?: boolean })[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Nama Gejala",
      dataIndex: "symptom",
      key: "symptom",
      sorter: (a, b) => a.symptom.localeCompare(b.symptom),
      ellipsis: {
        showTitle: false,
      },
      editable: true,
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record: IGetSymptom) => (
        <Popconfirm
          title="Hapus Data Gejala?"
          description={`Hapus data gejala ${record.id}?`}
          onConfirm={() => deleteSymptom(record.id)}
          okText="Hapus"
          cancelText="Batal"
          okButtonProps={{ danger: true }}
        >
          <Button color="red" variant="solid" loading={deletedId === record.id}>
            {deletedId === record.id ? null : "Hapus"}
          </Button>
        </Popconfirm>
      ),
    },
  ]

  const columns = defaultColumns.map((col) => {
    if (!col.editable) return col
    return {
      ...col,
      onCell: (record: IGetSymptom) =>
        ({
          record,
          editable: true,
          dataIndex: col.dataIndex as string,
          title: col.title,
          handleSave,
        } as React.HTMLAttributes<HTMLElement>),
    }
  })

  return (
    <>
      {isUpdatePending && <LoadingOverlay />}
      <UseTitle title="Gejala" />
      <BreadCrumb items={[{ title: "Gejala" }]} />
      <Container>
        <ContainerTable
          title="Data Gejala"
          data={data}
          columns={columns}
          isAdd={true}
          callback={handleOpenModal}
        />
      </Container>
      <Modal
        title="Tambah Data Gejala"
        open={openModal}
        confirmLoading={isPending}
        onOk={() => form.submit()}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={() => setOpenModal(false)}
      >
        <Form
          form={form}
          name="add-disorder"
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ remember: true }}
        >
          <Form.Item<ICreateSymptom>
            label="Nama Gejala"
            name="symptom"
            rules={[{ required: true, message: "Harap masukkan nama gejala!" }]}
          >
            <Input placeholder="Masukkan nama gejala" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Symptom
