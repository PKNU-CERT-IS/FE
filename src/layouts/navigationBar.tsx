import Link from "next/link";
import BugReport from "@/components/nav/bugReport";
import NavBarItems from "@/components/nav/navBarItems";
import LogoSVG from "/public/icons/logo-white.svg";

const navBarList = [
  { name: "Home", href: "/" },
  { name: "Board", href: "/board" },
  { name: "Schedule", href: "/schedule" },
  { name: "Study", href: "/study" },
  { name: "Blog", href: "/blog" },
  { name: "Members", href: "/members" },
  { name: "Profile", href: "/profile" },
];
const NavigationBar = () => {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-gray-200 top-0 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group ">
              <div className="relative w-10 h-10 mr-2">
                <LogoSVG
                  width={30}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                />
                <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cert-dark-red-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-wider drop-shadow-lg transition-colors duration-300">
                  CERT-IS
                </span>
                <span className="text-xs text-gray-600 -mt-1 font-mono transition-colors duration-300">
                  Computer Emergency Response Team <br />
                  Information Security
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-row items-center">
          <NavBarItems navBarList={navBarList} />
          <BugReport />
        </div>

        {/* 햄버거 메뉴 추가 예정 */}
        <div className="flex md:hidden">
          <span className="top-0"> </span>
          <span className="top-2"> </span>
          <span className="bottom-0"> </span>
          <div>햄버거</div>
        </div>
      </div>
    </nav>
  );
};
export default NavigationBar;
