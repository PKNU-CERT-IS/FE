"server-only";

import Link from "next/link";
import NavBarItems from "@/components/nav/navBarItems";
import LogoSVG from "/public/icons/logo-white.svg";
import LoginButton from "@/components/nav/loginButton";
import HamburgerMenu from "@/components/nav/hamburgerMenu";

const navBarList = [
  { name: "Home", href: "/admin" },
  { name: "Schedule", href: "/admin/schedule" },
  { name: "Study", href: "/admin/study" },
  { name: "Project", href: "/admin/project" },
  { name: "Blog", href: "/admin/blog" },
  { name: "Members", href: "/admin/members" },
];

export default function AdminNavigationBar() {
  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-gray-200 top-0 z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-2 flex justify-between items-center">
          <Link href="/admin" className="flex items-center group h-16 ">
            <div className="relative w-10 h-10 mr-2">
              <LogoSVG
                width={30}
                className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              />
              <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cert-dark-red/20" />
            </div>
            <div className="flex flex-col min-w-[13.75rem] max-w-fit whitespace-nowrap">
              <span className="text-2xl font-bold text-gray-900 tracking-wider drop-shadow-lg">
                CERT-IS
              </span>
            </div>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex flex-row items-center">
            <NavBarItems navBarList={navBarList} />
            <div className="pl-6 ml-2 border-l border-gray-300">
              <LoginButton href="/admin/login" className="text-sm" />
            </div>
          </div>

          {/* 모바일 메뉴 */}
          <HamburgerMenu navBarList={navBarList} />
        </div>
      </nav>
    </>
  );
}
