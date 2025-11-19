"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

interface Props {
  navBarList: NavItem[];
  pathname: string;
}

export default function NavBarItems({ navBarList, pathname }: Props) {
  const [pendingPath, setPendingPath] = useState("");
  useEffect(() => {
    setPendingPath("");
  }, [pathname]);
  return (
    <>
      {navBarList.map((item) => {
        const isActive =
          (pendingPath && pendingPath === item.href) ||
          (!pendingPath &&
            (pathname === item.href ||
              (pathname.startsWith(item.href + "/") &&
                item.href !== "/admin")));

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setPendingPath(item.href)} // 즉시 active 반영
            className={`px-4 py-2 text-sm mx-0.5 transition-all duration-300 rounded-lg relative group
              ${
                isActive
                  ? "text-cert-dark-red bg-cert-dark-red/5 shadow-cert-navbar dark:text-cert-red"
                  : ""
              }
              hover:text-cert-dark-red hover:bg-cert-dark-red/5 dark:hover:text-cert-red`}
          >
            <div className="relative z-10">{item.name}</div>

            {isActive && (
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background:
                    "linear-gradient(to right, rgba(158, 1, 1, 0.2), rgba(158, 1, 1, 0.1))",
                }}
              />
            )}

            <div className="absolute bg-cert-dark-red bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full" />
          </Link>
        );
      })}
    </>
  );
}
