"use client";

import { RefObject, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { ScheduleInfo } from "@/types/schedule";
import { useSchedule } from "@/hooks/useSchedule";
import { getTypeLabel } from "@/utils/scheduleUtils";
import { ChevronDown, X } from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface ScheduleFormModalProps {
  closeModal: () => void;
  schedule?: ScheduleInfo;
  modalRef?: RefObject<HTMLDivElement | null>;
}

export default function CCScheduleFormModal({
  closeModal,
  schedule,
  modalRef,
}: ScheduleFormModalProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const {
    activityDropdownRef,
    toggleDropdown,
    selectedActivity,
    isActivityDropdownOpen,
    handleActivity,
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
  } = useModal();

  const { timeOptions } = useSchedule();
  const ACTIVITY_LABELS = ["정기 모임", "회의", "스터디", "컨퍼런스"];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    const submitData = {
      title,
      location,
      date,
      activity: selectedActivity,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };
    console.log("Submit data:", submitData);

    // 추후 api 요청 시 admin, main에 따라 다르게 보내게끔 수정할 예정
    // const endpoint = isAdmin
    //   ? "/api/admin/schedule" // 관리자용 API
    //   : "/api/clubroom/reservation"; // 일반 사용자용 API

    // try {
    //   const res = await fetch(endpoint, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(submitData),
    //   });

    //   if (!res.ok) {
    //     throw new Error("서버 오류 발생");
    //   }

    //   const result = await res.json();
    //   console.log("✅ 제출 성공:", result);
    // } catch (error) {
    //   console.error("❌ 제출 실패:", error);
    // }
  };

  useEffect(() => {
    if (schedule) {
      handleActivity(getTypeLabel(schedule.type));
      handleStartTime(schedule.startTime);
      handleEndTime(schedule.endTime);
      setTitle(schedule.title);
      setLocation(schedule.location);
      setDate(schedule.date);
    }
  }, [schedule]);

  const isValidForm =
    title &&
    location &&
    date &&
    selectedActivity !== "선택" &&
    selectedStartTime !== "선택" &&
    selectedEndTime !== "선택";

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-20"
    >
      <div className="rounded-lg border bg-white border-gray-200 shadow-sm w-96 relative animate-pop-in">
        <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-md text-gray-400 hover:text-gray-600 flex items-center justify-center"
            >
              <X />
            </button>
            <p className="text-gray-900">
              {isAdmin ? "새 일정" : "동아리방 예약"}
            </p>
            <p className="text-gray-500 text-sm">
              {isAdmin
                ? "새 일정 정보를 입력해주세요."
                : "동아리방 예약 정보를 입력해주세요."}
            </p>
          </div>

          <div className="space-y-4 text-left my-6">
            <div>
              <p className="text-sm mb-1.5">활동명</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isAdmin ? "예: 9월 정기회의" : "예: 해킹 스터디"}
                className="text-sm required flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
                required
              />
            </div>

            <div>
              <p className="text-sm mb-1.5">장소</p>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={isAdmin ? "예: 장보고관" : "동아리방"}
                className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 z-10">
              <div>
                <p className="text-sm mb-1.5">이용 날짜</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 cursor-pointer"
                  required
                />
              </div>

              <div className="relative z-10" ref={activityDropdownRef}>
                <p className="text-sm mb-1.5">활동 유형</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
                  )}
                  onClick={toggleDropdown}
                >
                  <span className="text-gray-700 truncate">
                    {selectedActivity}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isActivityDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isActivityDropdownOpen && (
                  <div className="absolute border border-gray-300 bg-white w-full rounded-md">
                    {ACTIVITY_LABELS.map((label) => (
                      <button
                        key={label}
                        onClick={() => handleActivity(label)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-cert-red hover:text-white duration-100"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 z-10">
              <div className="relative" ref={startTimeDropdownRef}>
                <p className="text-sm mb-1.5">시작 시간</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
                  )}
                  onClick={toggleStartTimeDropdown}
                >
                  <span className="text-gray-700 truncate">
                    {selectedStartTime}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isStartTimeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isStartTimeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 shadow-md max-h-48 overflow-y-auto rounded-md">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleStartTime(time)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-cert-red hover:text-white duration-100"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={endTimeDropdownRef}>
                <p className="text-sm mb-1.5">종료 시간</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
                  )}
                  onClick={toggleEndTimeDropdown}
                >
                  <span className="text-gray-700 truncate">
                    {selectedEndTime}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isEndTimeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isEndTimeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 shadow-md max-h-48 overflow-y-auto rounded-md">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleEndTime(time)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-cert-red hover:text-white duration-100"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DefaultButton
            type="submit"
            className="w-full mt-4"
            disabled={!isValidForm}
            onClick={() => {
              closeModal();
              handleSubmit();
            }}
          >
            {isAdmin ? "추가" : "신청"}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
