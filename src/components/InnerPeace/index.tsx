import React, { type JSX } from "react"
import { innerPeace } from "../../utils/constant/staticFile"
import { Button } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons/lib/icons"

const InnerPeace: React.FC = (): JSX.Element => {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto py-20 p-4 lg:px-9 3xl:px-0 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-y-2.5">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Temukan Jalanmu Menuju Kedamaian Batin
          </h1>
          <p className="text-lg text-gray-500 text-justify">
            Di Mood Insight, kami menawarkan berbagai layanan sistem yang
            dirancang untuk mendukung perjalanan Anda menuju kesejahteraan
            emosional. Para profesional kami yang berpengalaman berdedikasi
            untuk membantu Anda menemukan jalan yang tepat untuk kebutuhan unik
            Anda.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 mt-3.5">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-2xl font-bold">Konseling Individu</h2>
              <p className="text-lg text-gray-500">
                Sesi yang dipersonalisasi untuk mengatasi tantangan emosional
                Anda dan mendorong kedamaian diri.
              </p>
              <div>
                <Button
                  variant="dashed"
                  color="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                >
                  Baca Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <h2 className="text-2xl font-bold">Konseling perusahaan</h2>
              <p className="text-lg text-gray-500">
                Sesi yang didedikasikan untuk membantu perusahaan Anda dalam
                mengatasi tantangan emosional tim.
              </p>
              <div>
                <Button
                  variant="dashed"
                  color="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                >
                  Baca Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img src={innerPeace} alt="Inner Peace" className="w-96" />
        </div>
      </div>
    </div>
  )
}

export default InnerPeace
