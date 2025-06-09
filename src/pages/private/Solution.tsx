import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import useTableAction from "../../hooks/useTableAction"
import type {
  ICreateSolution,
  IGetSolution,
} from "../../types/interface/ISolution.interface"
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  type FormProps,
} from "antd"
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { SolutionSerice } from "../../service/solution.service"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../../types/interface/IResponse.interface"
import { DisorderService } from "../../service/disorder.service"
import type { IGetDisorder } from "../../types/interface/IDisorder.interface"
import type { ColumnType } from "antd/es/table"
import LoadingOverlay from "../../components/loading/LoadingOverlay"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"

interface IDataTable {
  id: string
  solution: string
  disorder: string
}

const Solution: React.FC = (): JSX.Element => {
  const { deletedId, setDeletedId, openModal, setOpenModal } = useTableAction()
  const [form] = Form.useForm<ICreateSolution>()

  const { notification } = App.useApp()

  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["solution"],
    queryFn: (): Promise<IDataTable[]> =>
      SolutionSerice.getSolution().then((res: ResponseEntity<IGetSolution[]>) =>
        res.data.map((item: IGetSolution) => ({
          id: item.id,
          solution: item.solution,
          disorder: item.disorder.name,
        }))
      ),
  })

  const { data: disorders, error: errorDisorder } = useQuery({
    queryKey: ["disorderList"],
    queryFn: (): Promise<IGetDisorder[]> =>
      DisorderService.getAllDisorder().then(
        (res: ResponseEntity<IGetDisorder[]>) => res.data
      ),
    enabled: openModal,
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  if (errorDisorder)
    notification.error({
      message: "Error",
      description: errorDisorder.message,
    })

  const { mutate: deleteSolution } = useMutation({
    mutationFn: async (id: string): Promise<ResponseMessageEntity> => {
      setDeletedId(id)
      const res: ResponseMessageEntity = await SolutionSerice.deleteSolution(id)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Solusi berhasil dihapus",
      })
      queryClient.invalidateQueries({ queryKey: ["solution"] })
    },
    onError: (error: any) =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
    onSettled: () => setDeletedId(null),
  })

  const handleOpenModal = () => setOpenModal(true)

  const { mutate: createSolution, isPending } = useMutation({
    mutationKey: ["createKnowledgeBase"],
    mutationFn: async (
      data: ICreateSolution
    ): Promise<ResponseEntity<IGetSolution>> => {
      const res: ResponseEntity<IGetSolution> =
        await SolutionSerice.createSolution(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Berhasil menambahkan solusi",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["solution"] })
      form.resetFields()
    },
    onError: (error: any) =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
    onSettled: () => setDeletedId(null),
  })

  const onSubmit: FormProps<ICreateSolution>["onFinish"] = (values) =>
    createSolution(values)

  const { mutate: updateSolution, isPending: isUpdatePending } = useMutation({
    mutationKey: ["updateSolution"],
    mutationFn: async (
      data: IGetSolution
    ): Promise<ResponseEntity<IGetSolution>> => {
      const res: ResponseEntity<IGetSolution> =
        await SolutionSerice.updateSolution(data.id, {
          disorderId: data.disorder.id,
          solution: data.solution,
        })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Berhasil memperbarui solusi",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["solution"] })
    },
    onError: (error: any) =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
    onSettled: () => setDeletedId(null),
  })

  const handleSave: (row: IGetSolution) => void = (row: IGetSolution) =>
    updateSolution(row)

  const defaultColumns: (ColumnType<IDataTable> & {
    editable?: boolean
  })[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Solusi",
      dataIndex: "solution",
      key: "solution",
      sorter: (a, b) => a.solution.localeCompare(b.solution),
      editable: true,
    },
    {
      title: "Penyakit",
      dataIndex: "disorder",
      key: "disorder",
      sorter: (a, b) => a.disorder.localeCompare(b.disorder),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record: IDataTable): JSX.Element => (
        <Popconfirm
          title="Hapus data Solusi?"
          description={`Hapus data Solusi ${record.id}?`}
          onConfirm={(): void => deleteSolution(record.id)}
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
      onCell: (record: IDataTable) =>
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
      <UseTitle title="Solusi" />
      <BreadCrumb items={[{ title: "Solusi" }]} />
      <Container>
        <ContainerTable
          title="Data Solusi"
          data={data}
          columns={columns}
          isAdd={true}
          callback={handleOpenModal}
        />
      </Container>
      <Modal
        title="Tambah Data Solusi"
        open={openModal}
        confirmLoading={isPending}
        onOk={() => form.submit()}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={() => setOpenModal(false)}
      >
        <Form
          form={form}
          name="add-knowledge-base"
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ remember: true }}
        >
          <Form.Item<ICreateSolution>
            label="Data Penyakit"
            name="disorderId"
            rules={[
              {
                required: true,
                message: "Tolong masukkan data penyakit!",
              },
            ]}
          >
            <Select placeholder="Pilih data penyakit">
              {disorders?.length
                ? disorders.map(({ id, name }: IGetDisorder, index: number) => (
                    <Select.Option key={index} value={id}>
                      {id} - {name}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item<ICreateSolution>
            label="Solusi"
            name="solution"
            rules={[{ required: true, message: "Harap masukkan nama gejala!" }]}
          >
            <Input placeholder="Masukkan data solusi" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Solution
