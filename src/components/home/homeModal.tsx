"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MousePointerClick, X } from "lucide-react";
import RecruitPoster from "/public/icons/recruit-poster.png";

export default function HomeModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hideModal = document.cookie.includes("hideModalToday=true");
    if (!hideModal) {
      setIsOpenPopUp(true);
    }
  }, []);

  const setCookie = (name: string, value: string, exDay: number) => {
    const date = new Date();
    date.setTime(date.getTime() + exDay * 24 * 60 * 60 * 1000); // 1일
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const handleClose = () => {
    if (dontShowToday) {
      setCookie("hideModalToday", "true", 1);
    }
    setIsOpenPopUp(false);
  };

  const handleGoToRecruit = () => {
    setIsOpenPopUp(false);

    requestAnimationFrame(() => {
      document
        .getElementById("recruit-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  if (!mounted || !isOpenPopUp) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20">
      <div className="relative w-80 md:w-120 sm:w-96 rounded-xl bg-white p-3">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-50 cursor-pointer"
        >
          <X className="w-6 h-6 stroke-gray-400 hover:stroke-gray-600 stroke-2 transition-all duration-200" />
        </button>

        <Image
          src={RecruitPoster}
          alt="recruit-poster"
          className="w-full rounded-md object-contain"
        />

        <button
          className="action-button flex justify-center gap-2 mt-3 w-full py-2"
          onClick={handleGoToRecruit}
        >
          <MousePointerClick className="w-5 h-5" />
          지원하러 가기
        </button>
        <div className="flex justify-between">
          <label className="inline-flex gap-2 items-center mt-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="accent-cert-dark-red w-3.5 h-3.5"
            />
            <p className="text-sm">하루동안 보지 않기</p>
          </label>
          <p
            className="text-sm mt-1.5 mr-2 text-gray-500 underline cursor-pointer hover:text-gray-700 transition-all duration-200"
            onClick={handleClose}
          >
            닫기
          </p>
        </div>
      </div>
    </div>
  );
}
