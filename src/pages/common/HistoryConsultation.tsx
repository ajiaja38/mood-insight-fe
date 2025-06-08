import React, { type JSX } from "react"
import UseTitle from "../../hooks/useTitle"

const HistoryConsultation: React.FC = (): JSX.Element => {
  return (
    <div className="bg-gray-100 content-padding">
      <UseTitle title="Riwayat Konsultasi" />
      <div className="container mx-auto"></div>
    </div>
  )
}

export default HistoryConsultation
