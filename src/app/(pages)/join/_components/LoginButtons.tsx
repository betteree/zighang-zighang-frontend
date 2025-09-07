"use client";

import LoginButton from "./LoginButton";

export default function LoginButtons() {
  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  const handleNaverLogin = () => {
    console.log("네이버 로그인");
  };

  const handleGoogleLogin = () => {
    console.log("구글 로그인");
  };

  return (
    <div className="flex w-full flex-col items-center gap-2 px-7 md:gap-3 md:px-24">
      <LoginButton provider="kakao" onClick={handleKakaoLogin} />
      <LoginButton provider="naver" onClick={handleNaverLogin} />
      <LoginButton provider="google" onClick={handleGoogleLogin} />
    </div>
  );
}
