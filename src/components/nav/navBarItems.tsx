"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

interface NavBarItemsProps {
  navBarList: NavItem[];
}

const NavBarItems = ({ navBarList }: NavBarItemsProps) => {
  const pathname = usePathname();
  return (
    <>
      {navBarList.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/"); // 현재 경로가 해당 링크와 일치하거나, 해당 링크의 하위 경로인 경우 css 적용
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`px-4 py-2 text-sm mx-0.5 transition-all duration-300 rounded-lg relative group overflow-hidden
              ${
                isActive
                  ? "text-cert-dark-red bg-cert-dark-red/5 shadow-cert-navbar"
                  : ""
              }
              hover:text-cert-dark-red hover:bg-cert-dark-red/5`}
          >
            <div className="relative z-10">{item.name}</div>
            {isActive && (
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background:
                    "linear-gradient(to right, rgba(158, 1, 1, 0.2), rgba(158, 1, 1, 0.1))",
                }}
              ></div>
            )}
            <div className="absolute bg-cert-dark-red bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full" />
          </Link>
        );
      })}
    </>
  );
};

export default NavBarItems;
