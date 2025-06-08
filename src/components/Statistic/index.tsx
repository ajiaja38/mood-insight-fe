import React, { type JSX } from "react"
import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
}

const Statistic: React.FC = (): JSX.Element => {
  return (
    <motion.div
      id="statistic"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: false, amount: 0.3 }}
      className="bg-slate-100 p-10 md:p-16 lg:p-28 relative z-50"
      style={{ scrollMarginTop: "4rem" }}
    >
      <div className="container mx-auto flex flex-col gap-11 md:gap-0 md:flex-row md:justify-around">
        <StatisticInfo
          title="1000+"
          subtitle1="Perbaikan"
          subtitle2="Kesehatan Mental"
        />
        <StatisticInfo title="95%" subtitle1="Kepuasan" subtitle2="Pelanggan" />
        <StatisticInfo
          title="Top 10"
          subtitle1="Pusat"
          subtitle2="Kesehatan Mental"
        />
      </div>
    </motion.div>
  )
}

const StatisticInfo: React.FC<{
  title: string
  subtitle1: string
  subtitle2: string
}> = ({ title, subtitle1, subtitle2 }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex justify-center items-center flex-col md:grid md:grid-cols-2 gap-3"
    >
      <h3 className="font-bold text-4xl lg:text-5xl">{title}</h3>
      <p className="flex flex-row md:flex-col text-gray-500 text-lg">
        <span>{subtitle1}</span>
        <span>{subtitle2}</span>
      </p>
    </motion.div>
  )
}

export default Statistic
