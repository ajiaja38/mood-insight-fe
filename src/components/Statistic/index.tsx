import React, { type JSX } from "react"

const Statistic: React.FC = (): JSX.Element => {
  return (
    <div className="bg-slate-100 p-10 md:p-16 lg:p-28 absolute inset-x-0">
      <div className="container mx-auto flex flex-col gap-11 md:gap-0 md:flex-row md:justify-around">
        <StatisticInfo
          title="1000+"
          subtitle1="Lives"
          subtitle2="Transformed"
        />
        <StatisticInfo
          title="95%"
          subtitle1="Client"
          subtitle2="Satisfaction"
        />
        <StatisticInfo
          title="Top 10"
          subtitle1="Mental Health"
          subtitle2="Center"
        />
      </div>
    </div>
  )
}

const StatisticInfo: React.FC<{
  title: string
  subtitle1: string
  subtitle2: string
}> = ({ title, subtitle1, subtitle2 }) => {
  return (
    <div className="flex justify-center items-center flex-col md:grid md:grid-cols-2 gap-3">
      <h3 className="font-bold text-4xl lg:text-5xl">{title}</h3>
      <p className="flex flex-row md:flex-col text-gray-500">
        <span>{subtitle1}</span>
        <span>{subtitle2}</span>
      </p>
    </div>
  )
}

export default Statistic
