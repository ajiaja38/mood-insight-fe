import React, { type JSX } from 'react'
import UseTitle from '../../hooks/useTitle'
import BreadCrumb from '../../components/Breadcumb'
import { App, Button, Popconfirm, Tag, type TableProps } from 'antd'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { UserService } from '../../service/user.service'
import Container from '../../components/Content/Container'
import type { IGetAllUser } from '../../types/interface/IUser.interface'
import { EGender } from '../../types/enum/EGender.enum'
import { ERole } from '../../types/enum/ERole.enum'
import type { ResponseMessageEntity } from '../../types/interface/IResponse.interface'
import ContainerTable from '../../components/Content/ContainerTable'
import useTableAction from '../../hooks/useTableAction'

interface DataTypes extends IGetAllUser {
  key: number
}

const Users: React.FC = (): JSX.Element => {
  const { deletedId, setDeletedId } = useTableAction()

  const { notification } = App.useApp()
  const queryClient: QueryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getAllUser(),
    select: (data): DataTypes[] => {
      return data.data.map((user: IGetAllUser, index: number) => ({
        key: index + 1,
        ...user,
      }))
    },
  })

  if (error)
    notification.error({
      message: 'Error',
      description: error.message,
    })

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id: string): Promise<ResponseMessageEntity> => {
      setDeletedId(id)
      const res: ResponseMessageEntity = await UserService.deleteUser(id)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return res
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Pengguna berhasil dihapus',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      notification.error({
        message: 'Error',
        description: error.message,
      })
    },
    onSettled: () => {
      setDeletedId(null)
    },
  })

  const columns: TableProps<DataTypes>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Nomor Telepon',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Alamat Pengguna',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, { role }) => (
        <Tag color={role === ERole.ADMIN ? 'gold' : 'purple'}>{role}</Tag>
      ),
      filters: [
        { text: EGender.LAKI_LAKI, value: EGender.LAKI_LAKI },
        { text: EGender.PEREMPUAN, value: EGender.PEREMPUAN },
      ],
      onFilter: (value, record) => record.gender === value,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Jenis Kelamin',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, { gender }) => (
        <Tag color={gender === EGender.LAKI_LAKI ? 'blue' : 'green'}>
          {gender}
        </Tag>
      ),
      filters: [
        { text: EGender.LAKI_LAKI, value: EGender.LAKI_LAKI },
        { text: EGender.PEREMPUAN, value: EGender.PEREMPUAN },
      ],
      onFilter: (value, record) => record.gender === value,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, record: DataTypes) =>
        record.role !== ERole.ADMIN ? (
          <Popconfirm
            title='Hapus Pengguna'
            description={`Hapus ${record.name}?`}
            onConfirm={() => deleteUser(record.id)}
            okText='Hapus'
            cancelText='Batal'
            okButtonProps={{ danger: true }}
          >
            <Button
              color='red'
              variant='solid'
              loading={deletedId === record.id}
            >
              {deletedId === record.id ? null : 'Hapus'}
            </Button>
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <>
      <UseTitle title='Users' />
      <BreadCrumb items={[{ title: 'Pengguna' }]} />
      <Container>
        <ContainerTable<DataTypes>
          title='Data Pengguna'
          columns={columns}
          data={data}
        />
      </Container>
    </>
  )
}

export default Users
