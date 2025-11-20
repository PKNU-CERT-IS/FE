"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BugReport from "@/components/nav/bugReport";
import LoginButton from "@/components/nav/loginButton";
import DefaultButton from "@/components/ui/defaultButton";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

interface HamburgerMenuProps {
  navBarList: NavItem[];
}

export default function HamburgerMenu({ navBarList }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const pathname = usePathname();

  const isOpenRef = useRef(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      isOpenRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpenRef.current) {
      handleClose();
    }
  }, [pathname, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* 햄버거 버튼 */}
      <div className="flex md:hidden relative z-10">
        <DefaultButton
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isOpen) {
              handleClose();
            } else {
              setIsOpen(true);
              isOpenRef.current = true;
            }
          }}
          className="text-gray-900 p-2 transition-all duration-300 hover:text-cert-dark-red hover:bg-cert-dark-red/5 dark:text-gray-200 dark:hover:text-cert-red/30"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </DefaultButton>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={`fixed left-0 top-16 w-full h-screen z-50 md:hidden bg-white dark:bg-gray-900 transition-colors duration-300 ${
            isClosing ? "animate-slide-out" : "animate-slide-in"
          }`}
        >
          <div className="px-4 pt-3 pb-5 space-y-2 border-t border-gray-200 dark:border-gray-700 h-full text-center">
            {navBarList.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href + "/") &&
                  item.href !== "/admin");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleClose}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg relative group
                    ${
                      isActive
                        ? "text-cert-dark-red bg-cert-dark-red/5 shadow-md dark:text-cert-red"
                        : "text-gray-900 dark:text-gray-200"
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
                    ></div>
                  )}
                </Link>
              );
            })}

            {/* 구분선 */}
            <div className="border-t border-gray-300 dark:border-gray-700 mt-4 mx-6" />

            {/* 하단 버튼 */}
            <div className="grid grid-cols-2 items-center justify-center mt-6 px-12 gap-2">
              <BugReport className="w-full h-10 min-w-0 text-md rounded-md flex items-center justify-center" />
              <LoginButton className="w-full h-10 min-w-0 text-md rounded-md flex items-center justify-center" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
