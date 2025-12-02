"use client";

import { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminScheduleCreateRequest,
  ScheduleCreateRequest,
  ScheduleInfo,
} from "@/types/schedule";
import { formatDate, formatTime } from "@/utils/formatDateUtil";
import { getTypeLabel, labelToType } from "@/utils/scheduleUtils";
import { toOffset } from "@/utils/transformRequestValue";
import {
  createAdminSchedule,
  deleteAdminSchedule,
} from "@/app/api/schedule/CCAdminScheduleApi";
import {
  createSchedule,
  deleteSchedule,
} from "@/app/api/schedule/CCScheduleApi";
import CCScheduleModalDropdown from "@/components/schedule/CCScheduleModalDropdown";
import AlertModal from "@/components/ui/defaultAlertModal";
import DefaultButton from "@/components/ui/defaultButton";
import { useModal } from "@/hooks/useModal";
import { useSchedule } from "@/hooks/useSchedule";
import { X } from "lucide-react";

interface ScheduleFormModalProps {
  closeModal: () => void;
  schedule?: ScheduleInfo;
  modalRef?: RefObject<HTMLDivElement | null>;
  isAdmin?: boolean;
}

const TYPE_LABELS = ["정기 모임", "회의", "스터디", "컨퍼런스"];

export default function CCScheduleFormModal({
  closeModal,
  schedule,
  modalRef,
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
    timeError,
  } = useModal();

  const { timeOptions } = useSchedule();

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState(isAdmin ? "" : "동아리방");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "warning">("warning");

  useEffect(() => {
    if (!schedule) return;
    if (schedule) {
      setTitle(schedule.title);
      setPlace(schedule.place ?? "동아리방");
      setDate(formatDate(schedule.startedAt, "short"));
      setDescription(schedule.description ?? "");
      handleType(getTypeLabel(schedule.type));
      handleStartTime(formatTime(schedule.startedAt, "hm"));
      handleEndTime(formatTime(schedule.endedAt, "hm"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const start = new Date(`${date}T${selectedStartTime}:00+09:00`);
    const end = new Date(`${date}T${selectedEndTime}:00+09:00`);

    let durationHours = 0;

    if (end < start) {
      // 자정을 넘긴 경우 -> 다음날로 보정
      end.setDate(end.getDate() + 1);
      durationHours = (end.getTime() - start.getTime()) / 3_600_000;

      // 23시간 초과 차단
      if (durationHours > 23) {
        setAlertMessage("자정을 넘기는 예약은 최대 23시간까지만 허용됩니다.");
        setAlertType("warning");
        setAlertOpen(true);
        return;
      }
    } else {
      // 같은 날 케이스 -> 그냥 차이만 구함
      durationHours = (end.getTime() - start.getTime()) / 3_600_000;
    }

    // 동일 시간 체크
    if (durationHours <= 0) {
      setAlertMessage("시작시간과 종료시간은 같을 수 없습니다.");
      setAlertType("warning");
      setAlertOpen(true);
      return;
    }

    const startedAt = toOffset(start.toISOString());
    const endedAt = toOffset(end.toISOString());

    try {
      if (isAdmin) {
        if (schedule?.scheduleId) {
          await deleteAdminSchedule(schedule.scheduleId);
        }
        const adminData: AdminScheduleCreateRequest = {
          title,
          description,
          type: typeValue,
          startedAt,
          endedAt,
          place,
        };
        await createAdminSchedule(adminData);
      } else {
        if (schedule?.scheduleId) {
          await deleteSchedule(schedule.scheduleId);
        }
        const userData: ScheduleCreateRequest = {
          title,
          description,
          type: typeValue,
          startedAt,
          endedAt,
        };
        await createSchedule(userData);
      }

      router.refresh();
      closeModal();
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-30"
      >
        <div className="rounded-lg border shadow-sm w-96 relative animate-pop-in dark-default">
          <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center cursor-pointer"
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
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-sm h-10 w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 cursor-pointer justify-between"
                    required
                  />
                </div>

                <CCScheduleModalDropdown
                  label="활동 유형"
                  selectedValue={selectedType}
                  options={TYPE_LABELS}
                  isOpen={isTypeDropdownOpen}
                  onToggle={toggleDropdown}
                  onSelect={handleType}
                  dropdownRef={typeDropdownRef}
                />
              </div>

              {/* 시작/종료 시간 */}
              <div className="grid grid-cols-2 gap-4 z-10">
                <CCScheduleModalDropdown
                  label="시작 시간"
                  selectedValue={selectedStartTime}
                  options={timeOptions}
                  isOpen={isStartTimeDropdownOpen}
                  onToggle={toggleStartTimeDropdown}
                  onSelect={handleStartTime}
                  dropdownRef={startTimeDropdownRef}
                />

                <CCScheduleModalDropdown
                  label="종료 시간"
                  selectedValue={selectedEndTime}
                  options={timeOptions}
                  isOpen={isEndTimeDropdownOpen}
                  onToggle={toggleEndTimeDropdown}
                  onSelect={handleEndTime}
                  dropdownRef={endTimeDropdownRef}
                />
              </div>
              {timeError && (
                <p className="text-cert-red text-sm">⚠️ {timeError}</p>
              )}
            </div>

            <DefaultButton
              type="submit"
              className="w-full mt-2"
              disabled={!isValidForm}
              onClick={handleSubmit}
            >
              {isAdmin ? "추가" : "신청"}
            </DefaultButton>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        type={alertType}
        duration={2500}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
