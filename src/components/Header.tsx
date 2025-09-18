"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "./Icons/Profile";
import ProfileDropdown from "./ProfileDropdown";
import HeaderBookmark from "./Icons/bookMark";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("zh_access_token");
    localStorage.removeItem("zh_refresh_token");
    localStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
    window.location.reload();
  };

  const handlePersonalClick = () => {
    if (isLoggedIn) {
      router.push("/personal");
    } else {
      router.push("/join");
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("zh_access_token");
      setIsLoggedIn(Boolean(token));
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "zh_access_token") {
        setIsLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <>
      <header className="relative w-full md:px-10">
        <div className="relative z-50 box-border flex w-full flex-row items-center justify-between py-3 md:py-3">
          <div className="ml-3 flex items-center gap-5">
            <Link href="/" className="mr-4 flex-shrink-0 md:flex-shrink">
              <Image
                alt="logo"
                width={76}
                height={40}
                className="h-[24px] w-[60.5px] md:h-[40px] md:w-[76px]"
                src="https://zighang.com/header_logo_new.svg"
              />
            </Link>
            <div className="flex items-center gap-8">
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link href="/" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">채용 공고</div>
                </Link>
                {pathname === "/" && (
                  <div className="absolute w-full border border-primary/80"></div>
                )}
              </div>
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link href="/company" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">기업별</div>
                </Link>
                {pathname === "/company" && (
                  <div className="absolute w-full border border-primary/80"></div>
                )}
              </div>
              <div className="relative hidden sm:block">
                <Link href="/today" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">실시간 공고</div>
                </Link>
                {pathname === "/today" && (
                  <div className="absolute w-full border border-primary/80"></div>
                )}
              </div>
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <button
                  onClick={handlePersonalClick}
                  className="pointer-events-auto relative cursor-pointer"
                >
                  <div className="text-[#353535] ds-web-navi">맞춤 공고</div>
                </button>
                {pathname === "/personal" && (
                  <div className="absolute w-full border border-primary/80"></div>
                )}
              </div>
            </div>
          </div>
          <section className="flex flex-1 items-center justify-end gap-3 md:gap-6">
            <div>
              <div className="relative hidden sm:block">
                <Link href="/hiring" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">기업회원</div>
                </Link>
                {pathname === "/hiring" && (
                  <div className="absolute w-full border border-primary/80"></div>
                )}
              </div>
            </div>
            {isLoggedIn && (
              <div className="hidden md:block mb-1">
                <HeaderBookmark />
              </div>
            )}
            {isLoggedIn ? (
              <div className="relative hidden md:block z-50">
                <button
                  onClick={toggleProfileDropdown}
                  aria-label="내 프로필"
                  className="relative cursor-pointer"
                >
                  <Profile />
                </button>
                <ProfileDropdown
                  isOpen={isProfileDropdownOpen}
                  onClose={closeProfileDropdown}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link href="/join" rel="nofollow" className="hidden md:block">
                <div className="flex min-h-8 items-center justify-center px-2 text-[#6F00B6] md:min-h-10 md:rounded-lg md:border md:border-line md:px-4 md:py-[0px] ds-Button2-16sb">
                  로그인 / 회원가입
                </div>
              </Link>
            )}

            {isLoggedIn ? (
              <div className="relative block md:hidden z-50">
                <button
                  onClick={toggleProfileDropdown}
                  aria-label="내 프로필"
                  className="relative"
                >
                  <Profile />
                </button>
                <ProfileDropdown
                  isOpen={isProfileDropdownOpen}
                  onClose={closeProfileDropdown}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link href="/join" rel="nofollow" className="block md:hidden">
                <div className="text-[#6F00B6] font-semibold">로그인</div>
              </Link>
            )}

            <button
              className="mr-3 rounded-md bg-transparent p-1 pb-1.5 hover:bg-gray-200 active:bg-gray-300 md:hidden"
              type="button"
              onClick={toggleSidebar}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-2xl text-black"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>
          </section>
        </div>
      </header>

      {/* 사이드바 오버레이 */}
      <div
        className={`fixed left-0 top-0 h-screen w-screen bg-black transition-opacity duration-300 ease-in-out z-[1000] md:hidden ${
          isSidebarOpen
            ? "opacity-20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* 사이드바 */}
      <div
        className={`w-2/3 md:w-auto fixed rounded-l-2xl bg-white h-full right-0 z-[1001] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pointer-events-auto box-border flex h-full w-full flex-col items-start gap-1.5 p-4">
          <button
            className="mb-4 rounded-full bg-transparent p-2 hover:bg-gray-200 active:bg-gray-300"
            type="button"
            onClick={closeSidebar}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-2xl text-black"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>

          <Link
            href="/"
            className={`pointer-events-auto box-border flex w-full px-2 py-2 text-base font-semibold ${
              pathname === "/" ? "text-primary" : "text-[#353535]"
            }`}
            onClick={closeSidebar}
          >
            <div className={pathname === "/" ? "border-b border-primary" : ""}>
              채용 공고
            </div>
          </Link>

          <Link
            href="/company"
            className={`pointer-events-auto box-border flex w-full px-2 py-2 text-base font-semibold ${
              pathname === "/company" ? "text-primary" : "text-[#353535]"
            }`}
            onClick={closeSidebar}
          >
            <div
              className={
                pathname === "/company" ? "border-b border-primary" : ""
              }
            >
              기업별
            </div>
          </Link>

          <Link
            href="/today"
            className={`pointer-events-auto box-border flex w-full px-2 py-2 text-base font-semibold ${
              pathname === "/today" ? "text-primary" : "text-[#353535]"
            }`}
            onClick={closeSidebar}
          >
            <div
              className={pathname === "/today" ? "border-b border-primary" : ""}
            >
              실시간 공고
            </div>
          </Link>

          <Link
            href="/personal"
            className={`pointer-events-auto box-border flex w-full px-2 py-2 text-base font-semibold ${
              pathname === "/personal" ? "text-primary" : "text-[#353535]"
            }`}
            onClick={closeSidebar}
          >
            <div
              className={
                pathname === "/personal" ? "border-b border-primary" : ""
              }
            >
              맞춤 공고
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
