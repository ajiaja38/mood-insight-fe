import React, { type JSX } from "react"
import { Breadcrumb } from "antd"

interface payloadProps {
  title: string
}

interface props {
  items: payloadProps[]
}

const BreadCrumb: React.FC<props> = ({ items }): JSX.Element => {
  return (
    <Breadcrumb
      items={[
        { title: "Mood Insight" },
        ...items.map((item) => ({ title: item.title })),
      ]}
      style={{ marginBottom: 10 }}
    />
  )
}

export default BreadCrumb
