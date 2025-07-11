import { useState, type JSX } from 'react';
import { Button, Table, Typography, type TableProps } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import EditableCell from '../Editable/EditableCell';
import EditableRow from '../Editable/EditableRow';

interface props<T> {
  title: string;
  data: T[] | undefined;
  columns: TableProps<T>['columns'];
  isAdd?: boolean;
  callback?: () => void;
}

const ContainerTable = <T,>({
  title,
  data,
  columns,
  isAdd,
  callback,
}: props<T>): JSX.Element => {
  const [pageSize, setPageSize] = useState<number>(5);

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <Typography.Title level={3}>{title}</Typography.Title>
        {isAdd ? (
          <Button
            type='primary'
            icon={<AppstoreAddOutlined />}
            onClick={callback}
          >
            Tambah Data
          </Button>
        ) : null}
      </div>
      <Table<T>
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={{
          pageSize,
          showSizeChanger: true,
          onShowSizeChange: (_current, size) => setPageSize(size),
          pageSizeOptions: ['5', '10', '20', '50'],
          position: ['bottomRight'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} dari ${total} data`,
        }}
        size='small'
        rowKey={(record) => (record as any).id}
        bordered
      />
    </>
  );
};

export default ContainerTable;
