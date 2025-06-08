import React, { useState, useEffect, type JSX } from "react"
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
import { motion } from "framer-motion"

const Jumbotron: React.FC = (): JSX.Element => {
  const [offsetY, setOffsetY] = useState<number>(0)

  const [banner] = useState<string[]>([Banner1, Banner2, Banner3, Banner4])
  const { isAuthenticated } = useAuth()
  const navigate: NavigateFunction = useNavigate()

  const handleScroll = () => setOffsetY(window.scrollY)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 w-full mb-10 lg:mb-20">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center gap-7 w-full h-full text-center md:text-left"
        style={{
          translateY: offsetY * -0.3,
        }}
      >
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
      </motion.div>

      <motion.div
        style={{
          translateY: offsetY * 0.3,
        }}
        className="grid grid-cols-2 gap-4 md:gap-6 w-full"
      >
        {banner.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="banner"
            className="w-full md:h-80 rounded-4xl object-cover"
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Jumbotron
