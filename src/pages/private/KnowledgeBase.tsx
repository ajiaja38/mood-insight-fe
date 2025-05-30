import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const KnowledgeBase: React.FC = (): JSX.Element => {
  return (
    <>
      <UseTitle title="Basis Pengetahuan" />
      <BreadCrumb items={[{ title: "Basis Pengetahuan" }]} />
    </>
  )
}

export default KnowledgeBase
