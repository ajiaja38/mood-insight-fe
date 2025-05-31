import React from "react"
import { Form } from "antd"
import EditableContext from "../../context/EditableCell/EditableCellContext"

const EditableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props}>{children}</tr>
      </EditableContext.Provider>
    </Form>
  )
}

export default EditableRow
