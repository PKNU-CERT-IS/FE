"use client";

import { useEffect, useRef, useState } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // 모달 내 드롭다운
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const [isStartTimeDropdownOpen, setIsStartTimeDropdownOpen] =
    useState<boolean>(false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] =
    useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("선택");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("선택");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("선택");

  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const startTimeDropdownRef = useRef<HTMLDivElement | null>(null);
  const endTimeDropdownRef = useRef<HTMLDivElement | null>(null);

  const modalOutsideRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsTypeDropdownOpen((prev) => !prev);
  };

  const toggleStartTimeDropdown = () => {
    setIsStartTimeDropdownOpen((prev) => !prev);
  };

  const toggleEndTimeDropdown = () => {
    setIsEndTimeDropdownOpen((prev) => !prev);
  };

  const handleType = (type: string) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
  };

  const handleStartTime = (time: string) => {
    setSelectedStartTime(time);
    setIsStartTimeDropdownOpen(false);
  };

  const handleEndTime = (time: string) => {
    setSelectedEndTime(time);
    setIsEndTimeDropdownOpen(false);
  };

  const handleClickDropdownOutside = (e: MouseEvent) => {
    if (
      typeDropdownRef.current &&
      !typeDropdownRef.current.contains(e.target as Node)
    ) {
      setIsTypeDropdownOpen(false);
    }
    if (
      startTimeDropdownRef.current &&
      !startTimeDropdownRef.current.contains(e.target as Node)
    ) {
      setIsStartTimeDropdownOpen(false);
    }
    if (
      endTimeDropdownRef.current &&
      !endTimeDropdownRef.current.contains(e.target as Node)
    ) {
      setIsEndTimeDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (
      isTypeDropdownOpen ||
      isStartTimeDropdownOpen ||
      isEndTimeDropdownOpen
    ) {
      window.addEventListener("click", handleClickDropdownOutside);
    }
    return () =>
      window.removeEventListener("click", handleClickDropdownOutside);
  }, [isTypeDropdownOpen, isStartTimeDropdownOpen, isEndTimeDropdownOpen]);

  useEffect(() => {
    const clickedModalOutside = (e: MouseEvent) => {
      if (modalOutsideRef.current && e.target === modalOutsideRef.current) {
        setIsOpenModal(false);
      }
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpenModal(false);
      }
    };
    if (isOpenModal) {
      document.addEventListener("mousedown", clickedModalOutside);
      document.addEventListener("keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("mousedown", clickedModalOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpenModal]);

  return {
    isTypeDropdownOpen,
    toggleDropdown,
    selectedType,
    setIsTypeDropdownOpen,
    handleType,
    startTimeDropdownRef,
    toggleStartTimeDropdown,
    selectedStartTime,
    isStartTimeDropdownOpen,
    handleStartTime,
    endTimeDropdownRef,
    toggleEndTimeDropdown,
    selectedEndTime,
    isEndTimeDropdownOpen,
    handleEndTime,
    isOpenModal,
    setIsOpenModal,
    modalOutsideRef,
    typeDropdownRef,
  };
};
