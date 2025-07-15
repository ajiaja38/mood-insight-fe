import { useContext } from 'react';
import {
  TableActionContext,
  type ITableActionContext,
} from '../context/TableAction/TableActionContext';

const useTableAction = () => {
  const context: ITableActionContext | null = useContext(TableActionContext);

  if (!context)
    throw new Error(
      'useTableAction must be used within a Table Action Provider'
    );

  return context;
};

export default useTableAction;
