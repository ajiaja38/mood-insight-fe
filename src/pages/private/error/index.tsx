import { Button, Result } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

const Dashboard404: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman tidak ditemukan."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Kembali
        </Button>
      }
    />
  )
}

export default Dashboard404
