"use client";

import { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";
import { ScheduleCreateRequest, ScheduleInfo } from "@/types/schedule";
import { formatDate, formatTime } from "@/utils/formatDateUtil";
import { useModal } from "@/hooks/useModal";
import { useSchedule } from "@/hooks/useSchedule";
import { getTypeLabel, labelToType } from "@/utils/scheduleUtils";
import { createSchedule } from "@/actions/admin/schedule/CreateScheduleServerAction";

interface ScheduleFormModalProps {
  closeModal: () => void;
  schedule?: ScheduleInfo;
  modalRef?: RefObject<HTMLDivElement | null>;
  onAdd?: (data: ScheduleCreateRequest) => void;
  isAdmin?: boolean;
}

export default function CCScheduleFormModal({
  closeModal,
  schedule,
  modalRef,
  onAdd,
  isAdmin,
}: ScheduleFormModalProps) {
  const router = useRouter();

  const {
    typeDropdownRef,
    toggleDropdown,
    selectedType,
    isTypeDropdownOpen,
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
  } = useModal();

  const { timeOptions } = useSchedule();
  const TYPE_LABELS = ["정기 모임", "회의", "스터디", "컨퍼런스"];
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("동아리방");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!schedule) return;
    if (schedule) {
      setTitle(schedule.title);
      setPlace(schedule.place ?? "동아리방");
      setDate(formatDate(schedule.started_at, "short"));
      setDescription(schedule.description ?? "");
      handleType(getTypeLabel(schedule.type));
      handleStartTime(formatTime(schedule.started_at, "hm"));
      handleEndTime(formatTime(schedule.ended_at, "hm"));
    }
  }, [schedule]);

  const isValidForm =
    title &&
    description &&
    date &&
    selectedType !== "선택" &&
    selectedStartTime !== "선택" &&
    selectedEndTime !== "선택";

  const handleSubmit = async () => {
    const typeValue = labelToType(selectedType);
    if (!typeValue || !isValidForm) return;

    const started_at = `${date} ${selectedStartTime}:00+00`;
    const ended_at = `${date} ${selectedEndTime}:00+00`;

    const submitData: ScheduleCreateRequest = {
      title,
      description,
      type: typeValue,
      place,
      started_at,
      ended_at,
    };

    try {
      if (isAdmin) {
        await createSchedule(submitData);
        closeModal();
        router.refresh();
      } else {
        onAdd?.(submitData);
        closeModal();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-30"
    >
      <div className="rounded-lg border shadow-sm w-96 relative animate-pop-in dark-default">
        <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center"
            >
              <X />
            </button>
            <p className="text-gray-900 dark:text-gray-200">
              {isAdmin ? "새 일정" : "동아리방 예약"}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {isAdmin
                ? "새 일정 정보를 입력해주세요."
                : "동아리방 예약 정보를 입력해주세요."}
            </p>
          </div>

          <div className="space-y-4 text-left my-6">
            <div>
              <p className="text-sm mb-1.5 dark:text-gray-200">활동명</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isAdmin ? "예: 9월 정기회의" : "예: 해킹 스터디"}
                className="text-sm required flex h-10 w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                required
              />
            </div>

            {isAdmin ? (
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">장소</p>
                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="예: 장보고관"
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  required
                />
              </div>
            ) : (
              ""
            )}

            <div>
              <p className="text-sm mb-1.5 dark:text-gray-200">설명</p>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isAdmin
                    ? "예: 9월 정기모임을 위한 행사입니다."
                    : "예: 해킹 스터디를 위한 동아리방 예약입니다."
                }
                className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                required
              />
            </div>

            {/* 날짜 + 활동 유형 */}
            <div className="grid grid-cols-2 gap-4 z-10">
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">이용 날짜</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-sm h-10 w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 cursor-pointer justify-between"
                  required
                />
              </div>

              <div className="relative z-10" ref={typeDropdownRef}>
                <p className="text-sm mb-1.5 dark:text-gray-200">활동 유형</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={toggleDropdown}
                >
                  <span className="text-gray-700 dark:text-gray-200 truncate">
                    {selectedType}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isTypeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isTypeDropdownOpen && (
                  <div className="absolute border border-gray-300 bg-white w-full rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                    {TYPE_LABELS.map((label) => (
                      <button
                        key={label}
                        onClick={() => handleType(label)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 dark:text-gray-200 hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100 cursor-pointer"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 시작/종료 시간 */}
            <div className="grid grid-cols-2 gap-4 z-10">
              <div className="relative" ref={startTimeDropdownRef}>
                <p className="text-sm mb-1.5 dark:text-gray-200">시작 시간</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={toggleStartTimeDropdown}
                >
                  <span className="text-gray-700 dark:text-gray-200 truncate">
                    {selectedStartTime}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isStartTimeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isStartTimeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 shadow-md max-h-48 overflow-y-auto rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleStartTime(time)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 dark:text-gray-200 hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100 cursor-pointer"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={endTimeDropdownRef}>
                <p className="text-sm mb-1.5 dark:text-gray-200">종료 시간</p>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  )}
                  onClick={toggleEndTimeDropdown}
                >
                  <span className="text-gray-700 dark:text-gray-200 truncate">
                    {selectedEndTime}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      isEndTimeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>
                {isEndTimeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 shadow-md max-h-48 overflow-y-auto rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleEndTime(time)}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 dark:text-gray-200 hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100 cursor-pointer"
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
            onClick={handleSubmit}
          >
            {isAdmin ? "추가" : "신청"}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
