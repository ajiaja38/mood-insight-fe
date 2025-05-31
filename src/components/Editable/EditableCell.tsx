import React, { useContext, useEffect, useRef, useState } from "react"
import { Form, Input } from "antd"
import type { InputRef } from "antd"
import EditableContext from "../../context/EditableCell/EditableCellContext"

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  dataIndex: string
  record: any
  handleSave: (record: any) => void
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  dataIndex,
  record,
  handleSave,
  children,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (err) {
      console.log("Save error:", err)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} tidak boleh kosong.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

export default EditableCell
