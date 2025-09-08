"use client";

import LoginButton from "./LoginButton";
import { useLogin } from "@/app/_api/auth/useLogin";

export default function LoginButtons() {
  const login = useLogin();
  const handleKakaoLogin = () => login.mutate({ provider: "kakao" });
  const handleNaverLogin = () => login.mutate({ provider: "naver" });
  const handleGoogleLogin = () => login.mutate({ provider: "google" });

  return (
    <div className="flex w-full flex-col items-center gap-2 px-7 md:gap-3 md:px-24">
      <LoginButton provider="kakao" onClick={handleKakaoLogin} />
      <LoginButton provider="naver" onClick={handleNaverLogin} />
      <LoginButton provider="google" onClick={handleGoogleLogin} />
    </div>
  );
}
