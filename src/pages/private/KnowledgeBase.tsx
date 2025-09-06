import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { KnowledgeBaseService } from "../../service/knowledgeBase.service"
import {
  App,
  Button,
  Form,
  Modal,
  Popconfirm,
  Select,
  type FormProps,
} from "antd"
import type {
  ICreateKnowledgeBase,
  IGetKnowledgeBase,
} from "../../types/interface/IKnowledgeBase"
import useTableAction from "../../hooks/useTableAction"
import type {
  ResponseEntity,
  ResponseMessageEntity,
} from "../../types/interface/IResponse.interface"
import type { ColumnType } from "antd/es/table"
import LoadingOverlay from "../../components/loading/LoadingOverlay"
import Container from "../../components/Content/Container"
import ContainerTable from "../../components/Content/ContainerTable"
import { DisorderService } from "../../service/disorder.service"
import type { IGetDisorder } from "../../types/interface/IDisorder.interface"
import type { IGetSymptom } from "../../types/interface/ISymptom.interface"
import { SymptomService } from "../../service/symptom.service"
import { DATA_WEIGHT } from "../../utils/constant/dataWeight.constan"

const { Option } = Select

const KnowledgeBase: React.FC = (): JSX.Element => {
  const { deletedId, setDeletedId, openModal, setOpenModal } = useTableAction()
  const [form] = Form.useForm<ICreateKnowledgeBase>()

  const { notification } = App.useApp()

  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ["knowledgeBase"],
    queryFn: () =>
      KnowledgeBaseService.getAllKnowledgeBase().then(
        (res: ResponseEntity<IGetKnowledgeBase[]>): IGetKnowledgeBase[] =>
          res.data
      ),
  })

  const { data: disorders, error: errorDisorder } = useQuery({
    queryKey: ["disorderList"],
    queryFn: (): Promise<IGetDisorder[]> =>
      DisorderService.getAllDisorder().then(
        (res: ResponseEntity<IGetDisorder[]>): IGetDisorder[] => res.data
      ),
    enabled: openModal,
  })

  const { data: symptoms, error: errorSymptom } = useQuery({
    queryKey: ["symptomList"],
    queryFn: () =>
      SymptomService.getAllSymptom().then(
        (res: ResponseEntity<IGetSymptom[]>): IGetSymptom[] => res.data
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

  if (errorSymptom)
    notification.error({
      message: "Error",
      description: errorSymptom.message,
    })

  const { mutate: deleteKnowledgeBase } = useMutation({
    mutationFn: async (id: string): Promise<ResponseMessageEntity> => {
      setDeletedId(id)
      const res: ResponseMessageEntity =
        await KnowledgeBaseService.deleteKnowledgeBase(id)
      await new Promise((resolve): number => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (): void => {
      notification.success({
        message: "Success",
        description: "Basis Pengetahuan telah dihapus",
      })
      queryClient.invalidateQueries({ queryKey: ["knowledgeBase"] })
    },
    onError: (error: any): void =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
    onSettled: (): void => setDeletedId(null),
  })

  const handleOpenModal = (): void => setOpenModal(true)

  const { mutate: createKnowledgeBase, isPending } = useMutation({
    mutationKey: ["createKnowledgeBase"],
    mutationFn: async (
      data: ICreateKnowledgeBase
    ): Promise<ResponseEntity<IGetKnowledgeBase>> => {
      const res: ResponseEntity<IGetKnowledgeBase> =
        await KnowledgeBaseService.createKnowledgeBase(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: (): void => {
      notification.success({
        message: "Success",
        description: "Berhasil menambahkan Basis Pengetahuan",
      })
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["knowledgeBase"] })
      form.resetFields()
    },
    onError: (error: any): void =>
      notification.error({
        message: "Error",
        description: error.response.data.message,
      }),
    onSettled: (): void => setDeletedId(null),
  })

  const onSubmit: FormProps<ICreateKnowledgeBase>["onFinish"] = (
    values
  ): void => createKnowledgeBase(values)

  const { mutate: updateKnowledgeBase, isPending: isUpdatePending } =
    useMutation({
      mutationKey: ["updateKnowledgeBase"],
      mutationFn: async (
        data: IGetKnowledgeBase
      ): Promise<ResponseEntity<IGetKnowledgeBase>> => {
        const res: ResponseEntity<IGetKnowledgeBase> =
          await KnowledgeBaseService.updateKnowledgeBase(data.id, {
            weight: data.weight,
          })
        await new Promise((resolve): number => setTimeout(resolve, 2000))
        return res
      },
      onSuccess: (): void => {
        notification.success({
          message: "Success",
          description: "Berhasil memperbarui knowledge base",
        })
        setOpenModal(false)
        queryClient.invalidateQueries({ queryKey: ["knowledgeBase"] })
      },
      onError: (error: any): void =>
        notification.error({
          message: "Error",
          description: error.response.data.message,
        }),
      onSettled: (): void => setDeletedId(null),
    })

  const handleSave: (row: IGetKnowledgeBase) => void = (
    row: IGetKnowledgeBase
  ): void => updateKnowledgeBase(row)

  const defaultColumns: (ColumnType<IGetKnowledgeBase> & {
    editable?: boolean
  })[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: IGetKnowledgeBase, b: IGetKnowledgeBase): number =>
        a.id.localeCompare(b.id),
    },
    {
      title: "Gejala",
      dataIndex: "symptom",
      key: "name",
      sorter: (a, b): number => a.symptom.localeCompare(b.symptom),
    },
    {
      title: "Penyakit",
      dataIndex: "disorder",
      key: "disorder",
      sorter: (a, b): number => a.disorder.localeCompare(b.disorder),
    },
    {
      title: "Bobot",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b): number => a.weight - b.weight,
      editable: true,
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record: IGetKnowledgeBase): JSX.Element => (
        <Popconfirm
          title='Hapus data Basis Pengetahuan?'
          description={`Hapus data Basis Pengetahuan ${record.id}?`}
          onConfirm={(): void => deleteKnowledgeBase(record.id)}
          okText='Hapus'
          cancelText='Batal'
          okButtonProps={{ danger: true }}
        >
          <Button color='red' variant='solid' loading={deletedId === record.id}>
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
      onCell: (record: IGetKnowledgeBase) =>
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
      <UseTitle title='Basis Pengetahuan' />
      <BreadCrumb items={[{ title: "Basis Pengetahuan" }]} />
      <Container>
        <ContainerTable
          title='Data Basis Pengetahuan'
          data={data}
          columns={columns}
          isAdd={true}
          callback={handleOpenModal}
        />
        <div>
          <p className='font-bold'>
            Data Basis Pengetahuan di buat oleh psikolog:
          </p>
          <p>Nama: Azola Arcilia Fajuita</p>
          <p>Nomor Telepon: +62 813-3145-4133</p>
        </div>
      </Container>
      <Modal
        title='Tambah Data Basis Pengetahuan'
        open={openModal}
        confirmLoading={isPending}
        onOk={(): void => form.submit()}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={(): void => setOpenModal(false)}
      >
        <Form
          form={form}
          name='add-knowledge-base'
          layout='vertical'
          onFinish={onSubmit}
          initialValues={{ remember: true }}
        >
          <Form.Item<ICreateKnowledgeBase>
            label='Data Penyakit'
            name='disorderId'
            rules={[
              {
                required: true,
                message: "Tolong masukkan data penyakit!",
              },
            ]}
          >
            <Select placeholder='Pilih data penyakit'>
              {disorders?.length
                ? disorders.map(
                    (
                      { id, name }: IGetDisorder,
                      index: number
                    ): JSX.Element => (
                      <Option key={index} value={id}>
                        {id} - {name}
                      </Option>
                    )
                  )
                : null}
            </Select>
          </Form.Item>
          <Form.Item<ICreateKnowledgeBase>
            label='Data Gejala'
            name='symptomId'
            rules={[
              {
                required: true,
                message: "Tolong masukkan data gejala!",
              },
            ]}
          >
            <Select
              placeholder='Pilih data gejala'
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              virtual={false}
            >
              {symptoms?.length
                ? symptoms.map(
                    ({ id, symptom }: IGetSymptom): JSX.Element => (
                      <Option key={id} value={id}>
                        {id} - {symptom}
                      </Option>
                    )
                  )
                : null}
            </Select>
          </Form.Item>
          <Form.Item<ICreateKnowledgeBase>
            label='Bobot'
            name='weight'
            rules={[
              {
                required: true,
                message: "Tolong masukkan bobot Basis Pengetahuan!",
              },
            ]}
          >
            <Select
              placeholder='Pilih bobot Basis Pengetahuan'
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              virtual={false}
            >
              {DATA_WEIGHT.map(
                (weight: number, index: number): JSX.Element => (
                  <Option key={index} value={weight}>
                    {weight}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default KnowledgeBase
