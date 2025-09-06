'use client';
import Image from "next/image";

interface LoginButtonProps {
  provider: 'kakao' | 'naver' | 'google';
  onClick?: () => void;
}

export default function LoginButton({ provider, onClick }: LoginButtonProps) {
  const providerConfig = {
    kakao: {
      name: '카카오 계정으로 계속하기',
      logo: 'https://zighang.com/mail/kakao.png',
      alt: 'kakao logo',
      className: 'rounded-[4px]'
    },
    naver: {
      name: '네이버 계정으로 계속하기',
      logo: 'https://zighang.com/naver.png',
      alt: 'naver logo',
      className: 'rounded-[4px]'
    },
    google: {
      name: '구글 계정으로 계속하기',
      logo: 'https://zighang.com/google.png',
      alt: 'google logo',
      className: 'rounded-[4px] border border-[#EDEDED] p-0.5'
    }
  };

  const config = providerConfig[provider];

  return (
    <div 
      className="flex h-14 w-full cursor-pointer flex-row items-center justify-center rounded-lg border border-[#D5D7DA] bg-white hover:bg-zinc-100/60 active:bg-zinc-100"
      onClick={onClick}
    >
      <div className="mr-4 h-7 w-7">
        <Image
          alt={config.alt}
          width={28}
          height={28}
          className={config.className}
          src={config.logo}
        />
      </div>
      <div className="text-start text-base font-medium text-[#414651]">
        {config.name}
      </div>
    </div>
  );
}
