import React, { type JSX } from "react"
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons/lib/icons"
import { MoodInsightLogo } from "../../utils/constant/staticFile"

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="bg-primary p-10 md:p-16 lg:p-28 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 container mx-auto">
        <div className="p-4 w-full lg:w-[80%] flex flex-col gap-y-5">
          <div className="flex gap-x-3 items-center">
            <div className="bg-white rounded-full p-2">
              <img src={MoodInsightLogo} alt="Mood Insight" className="w-11" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold">Mood Insight</h1>
          </div>
          <p className="text-justify font-extralight">
            Mood insight adalah pusat kesehatan mental yang penuh kasih dan
            holistik yang didedikasikan untuk memberikan perawatan yang
            dipersonalisasi bagi individu yang mencari kesejahteraan emosional
            dan kedamaian batin
          </p>
          <div className="flex gap-x-3 text-2xl">
            <InstagramOutlined />
            <LinkedinOutlined />
            <WhatsAppOutlined />
            <GithubOutlined />
          </div>
        </div>
        <div className=" p-4 grid grid-cols-3 gap-5">
          <ul>
            <li>
              <h2 className="font-bold text-xl mb-3">Company</h2>
            </li>
            <div className="flex flex-col gap-y-1.5 [&>li]:hover:text-gray-300 text-xs md:text-base">
              <li className="cursor-pointer">Tentang Kami</li>
              <li className="cursor-pointer">Karir</li>
              <li className="cursor-pointer">FAQs</li>
              <li className="cursor-pointer">Tim</li>
              <li className="cursor-pointer">Kontak</li>
            </div>
          </ul>
          <ul>
            <li>
              <h2 className="font-bold text-xl mb-3">Dukungan</h2>
            </li>
            <div className="flex flex-col gap-y-1.5 [&>li]:hover:text-gray-300 text-xs md:text-base">
              <li className="cursor-pointer">Layanan Kami</li>
              <li className="cursor-pointer">Testimoni</li>
              <li className="cursor-pointer">Postingan Blog</li>
            </div>
          </ul>
          <ul>
            <li>
              <h2 className="font-bold text-xl mb-3">Terhubung</h2>
            </li>
            <div className="flex flex-col gap-y-1.5 [&>li]:hover:text-gray-300 text-xs md:text-base">
              <li className="cursor-pointer">Notifikasi Email</li>
              <li className="cursor-pointer">Penawaran Baru</li>
              <li className="cursor-pointer">Info Kesehatan</li>
              <li className="cursor-pointer">Berika Kegiatan</li>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
