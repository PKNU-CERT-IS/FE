"use client";
import BugReport from "@/components/nav/bugReport";
import LoginButton from "@/components/nav/loginButton";
import DefaultButton from "@/components/ui/defaultButton";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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

  // isOpen 상태가 변경될 때 ref도 업데이트
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // pathname이 변경될 때 메뉴 닫기
  useEffect(() => {
    if (isOpenRef.current) {
      handleClose();
    }
  }, [pathname, handleClose]); // handleClose를 의존성 배열에 추가

  return (
    <>
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
          className="text-gray-900 p-2 transition-all duration-300 hover:text-cert-dark-red hover:bg-cert-dark-red/5"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </DefaultButton>
      </div>

      {isOpen && (
        <div
          className={`fixed left-0 top-16 w-full h-screen z-50 md:hidden bg-white ${
            isClosing ? "animate-slide-out" : "animate-slide-in"
          }`}
        >
          <div className="px-4 pt-3 pb-5 space-y-2 border-t text-center border-gray-200 bg-white h-full transition-colors duration-300">
            {navBarList.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-cert-dark-red/5 ${
                  pathname === item.href
                    ? "text-cert-dark-red bg-cert-dark-red/5 shadow-lg"
                    : "text-gray-900"
                }
                `}
                onClick={handleClose}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-300 mt-4 mx-6" />
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
