import React, { useState, type JSX } from "react"
import { Button } from "antd"
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
} from "../../utils/constant/staticFile"

const Jumbotron: React.FC = (): JSX.Element => {
  const [banner] = useState<string[]>([Banner1, Banner2, Banner3, Banner4])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10 md:mt-32">
      <div className="flex flex-col justify-center gap-7 w-full h-96 md:h-full text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-semibold">
          Find Your Path to Emotional Wellness Today
        </h1>
        <p className="text-2xl lg:text-4xl text-gray-500">
          We believe in creating a safe, supportive space for individuals
          seeking mental and emotional healing
        </p>
        <div>
          <Button variant="solid" color="primary" size="large">
            Konsultasi Sekarang!
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {banner.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="banner"
            className="w-full md:h-[24rem] rounded-4xl object-cover"
          />
        ))}
      </div>
    </div>
  )
}

export default Jumbotron
