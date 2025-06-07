import React, { useState, type JSX } from "react"
import { Button } from "antd"
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
} from "../../utils/constant/staticFile"
import { ForkOutlined } from "@ant-design/icons/lib/icons"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, type NavigateFunction } from "react-router-dom"

const Jumbotron: React.FC = (): JSX.Element => {
  const [banner] = useState<string[]>([Banner1, Banner2, Banner3, Banner4])

  const { isAuthenticated } = useAuth()
  const navigate: NavigateFunction = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 w-full mb-10 lg:mb-20">
      <div className="flex flex-col justify-center gap-7 w-full h-full text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Wujudkan kesehatan emosional Anda, mulai sekarang.
        </h1>
        <p className="text-lg lg:text-2xl text-gray-500">
          Kami di sini untuk jadi tempat yang nyaman dan suportif buat kamu yang
          ingin sembuh secara mental dan emosional.
        </p>
        <div>
          <Button
            variant="solid"
            color="primary"
            size="large"
            style={{ fontSize: "1.5rem", padding: "1.5rem" }}
            icon={<ForkOutlined />}
            onClick={() =>
              isAuthenticated
                ? navigate("/konsultasi-pengguna")
                : navigate("/auth/login")
            }
          >
            Konsultasi Sekarang!
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
        {banner.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="banner"
            className="w-full md:h-80 rounded-4xl object-cover"
          />
        ))}
      </div>
    </div>
  )
}

export default Jumbotron
