import React, { type JSX } from 'react';
import {
  CoffeeOutlined,
  LockOutlined,
  SafetyOutlined,
  SisternodeOutlined,
} from '@ant-design/icons/lib/icons';
import { Divider } from 'antd';

interface WhyItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const items: WhyItemProps[] = [
  {
    icon: <SafetyOutlined />,
    title: 'Disesuaikan untuk Anda',
    description:
      'Kami menyediakan service yang disesuaikan untuk Anda, dengan fokus pada pemahaman dan penyembuhan akar penyebab tantangan kesehatan mental.',
  },
  {
    icon: <SisternodeOutlined />,
    title: 'Opsi Konsultasi yang Fleksibel',
    description:
      'Opsi konsultasi kami yang fleksibel membuat Anda lebih mudah mendapatkan dukungan yang Anda butuhkan sesuai keinginan Anda.',
  },
  {
    icon: <CoffeeOutlined />,
    title: 'Lingkungan yang Modern dan Menenangkan',
    description:
      'Dirancang dengan mengutamakan kenyamanan Anda, suasana tenang kami mendorong relaksasi dan keamanan emosional sejak Anda masuk.',
  },
  {
    icon: <LockOutlined />,
    title: 'Rahasia & Aman',
    description:
      'Privasi dan keamanan Anda adalah prioritas utama kami. Semua konsultasi dilakukan dengan standar kerahasiaan tertinggi.',
  },
];

const WhyChooseUs: React.FC = (): JSX.Element => {
  return (
    <div className='py-20 p-4 lg:px-9 3xl:px-0 container mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-y-1'>
          <p className='text-primary text-lg lg:ml-1'>Kenapa pilih kami</p>
          <h1 className='text-3xl lg:text-5xl font-bold'>
            Perjalanan Unik Menuju Kesembuhan
          </h1>
        </div>
        <div className='flex justify-center items-center'>
          <p className='text-xl text-gray-500'>
            Layanan sistem berlisensi kesehatan mental kami membawa banyak
            pengetahuan dan empati untuk memandu Anda dalam perjalanan kesehatan
            Anda.
          </p>
        </div>
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        {items.map((item, index) => (
          <WhyItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

const WhyItem: React.FC<WhyItemProps> = ({ icon, title, description }) => {
  return (
    <div className='flex flex-col gap-y-2.5'>
      <span className='text-primary text-5xl'>{icon}</span>
      <h3 className='text-3xl'>{title}</h3>
      <p className='text-lg text-gray-500 lg:w-[80%]'>{description}</p>
    </div>
  );
};

export default WhyChooseUs;
