import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  type FormInstance,
  type FormProps,
} from "antd"
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { DisorderService } from "../../service/disorder.service"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../../types/interface/IResponse.interface"
import type {
  ICreateDisorder,
  IGetDisorder,
} from "../../types/interface/IDisorder.interface"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"
import type { ColumnType } from "antd/es/table"
import LoadingOverlay from "../../components/loading/LoadingOverlay"
import useTableAction from "../../hooks/useTableAction"

const Disorder: React.FC = (): JSX.Element => {
  const { deletedId, setDeletedId, openModal, setOpenModal } = useTableAction()

  const [form]: [FormInstance<ICreateDisorder>] =
    Form.useForm<ICreateDisorder>()

  const { notification } = App.useApp()
  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["disorders"],
    queryFn: (): Promise<IGetDisorder[]> =>
      DisorderService.getAllDisorder().then(
        (res: ResponseEntity<IGetDisorder[]>): IGetDisorder[] => res.data
      ),
  })

  if (error)
    notification.error({
      message: "Error",
      description: error.message,
    })

  const { mutate: deleteDisorder } = useMutation({
    mutationFn: async (id: string): Promise<ResponseMessageEntity> => {
      setDeletedId(id)
      const res: ResponseMessageEntity = await DisorderService.deleteDisorder(
        id
      )
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (): void => {
      notification.success({
        message: "Success",
        description: "Data Penyakit berhasil dihapus",
      })
      queryClient.invalidateQueries({ queryKey: ["disorders"] })
      form.resetFields()
    },
    onError: (error): void =>
      notification.error({
        message: "Error",
        description: error.message,
      }),
    onSettled: (): void => setDeletedId(null),
  })

  const handleOpenModal = (): void => setOpenModal(true)

  const { mutate: createDisorder, isPending } = useMutation({
    mutationKey: ["createDisorder"],
    mutationFn: async (
      data: ICreateDisorder
    ): Promise<ResponseEntity<IGetDisorder>> => {
      const res: ResponseEntity<IGetDisorder> =
        await DisorderService.createDisorder(data)
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (): void => {
      notification.success({
        message: "Success",
        description: "Berhasil menambahkan penyakit",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["disorders"] })
    },
    onError: (error): void =>
      notification.error({
        message: "Error",
        description: error.message,
      }),
    onSettled: (): void => setDeletedId(null),
  })

  const onSubmit: FormProps<ICreateDisorder>["onFinish"] = (values): void =>
    createDisorder(values)

  const { mutate: updateDisorder, isPending: isUpdatePending } = useMutation({
    mutationKey: ["updateDisorder"],
    mutationFn: async (
      data: IGetDisorder
    ): Promise<ResponseEntity<IGetDisorder>> => {
      const res: ResponseEntity<IGetDisorder> =
        await DisorderService.updateDisorder(data.id, {
          name: data.name,
          description: data.description,
        })
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (res: ResponseEntity<IGetDisorder>): void => {
      notification.success({
        message: "Success",
        description: `Berhasil memperbarui ${res.data.name}`,
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["disorders"] })
    },
    onError: (error): void =>
      notification.error({
        message: "Error",
        description: error.message,
      }),
    onSettled: (): void => setDeletedId(null),
  })

  const handleSave = (row: IGetDisorder): void => updateDisorder(row)

  const defaultColumns: (ColumnType<IGetDisorder> & { editable?: boolean })[] =
    [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b): number => a.id.localeCompare(b.id),
      },
      {
        title: "Nama Penyakit",
        dataIndex: "name",
        key: "name",
        sorter: (a, b): number => a.name.localeCompare(b.name),
        ellipsis: {
          showTitle: false,
        },
        editable: true,
      },
      {
        title: "Deskripsi",
        dataIndex: "description",
        key: "description",
        render: (_, { description }): JSX.Element => (
          <p className="text-justify">{description}</p>
        ),
        editable: true,
      },
      {
        title: "Aksi",
        key: "action",
        render: (_, record: IGetDisorder): JSX.Element => (
          <Popconfirm
            title="Hapus Data Penyakit?"
            description={`Hapus data penyakit ${record.name}?`}
            onConfirm={(): void => deleteDisorder(record.id)}
            okText="Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
          >
            <Button
              color="red"
              variant="solid"
              loading={deletedId === record.id}
            >
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
      onCell: (record: IGetDisorder): React.HTMLAttributes<HTMLElement> =>
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
      <UseTitle title="Penyakit" />
      <BreadCrumb items={[{ title: "Penyakit" }]} />
      <Container>
        <ContainerTable
          title="Data Penyakit"
          data={data}
          columns={columns}
          isAdd={true}
          callback={handleOpenModal}
        />
      </Container>
      <Modal
        title="Tambah Data Penyakit"
        open={openModal}
        confirmLoading={isPending}
        onOk={(): void => form.submit()}
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
          <Form.Item<ICreateDisorder>
            label="Nama Penyakit"
            name="name"
            rules={[
              { required: true, message: "Harap masukkan nama penyakit!" },
            ]}
          >
            <Input placeholder="Masukkan nama penyakit" />
          </Form.Item>

          <Form.Item<ICreateDisorder>
            label="Deskripsi"
            name="description"
            rules={[
              { required: true, message: "Harap masukkan deskripsi penyakit!" },
            ]}
          >
            <Input.TextArea
              placeholder="Masukkan deskripsi penyakit"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Disorder
