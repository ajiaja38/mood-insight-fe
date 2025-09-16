import React, { type JSX } from "react"
import { Button, Grid, type Breakpoint } from "antd"
import { ForkOutlined } from "@ant-design/icons/lib/icons"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, type NavigateFunction } from "react-router-dom"

const { useBreakpoint } = Grid

const CallToAction: React.FC = (): JSX.Element => {
  const screen: Partial<Record<Breakpoint, boolean>> = useBreakpoint()
  const { isAuthenticated } = useAuth()
  const navigate: NavigateFunction = useNavigate()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 container mx-auto py-28 p-4 lg:px-9 3xl:px-0'>
      <div className='flex flex-col gap-y-5'>
        <h1 className='text-3xl lg:text-5xl font-extrabold lg:mb-2.5'>
          Mulailah Penyembuhan Mental Anda Sekarang Juga!
        </h1>
        <p className='text-base lg:text-2xl text-gray-400'>
          Tidak ada kata terlalu dini atau terlambat untuk mencari bantuan,
          Kecerdasan sistem kami siap memandu Anda di setiap langkahnya.
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <Button
          variant='solid'
          color='primary'
          size='large'
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem",
            width: screen.lg ? "auto" : "100%",
          }}
          icon={<ForkOutlined />}
          onClick={() =>
            isAuthenticated
              ? navigate("/konsultasi-pengguna")
              : navigate("/auth/login")
          }
        >
          Konsultasi Sekarang
        </Button>
      </div>
    </div>
  )
}

export default CallToAction
