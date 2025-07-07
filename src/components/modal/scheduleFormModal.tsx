"use client";

import AngleSVG from "@/icons/angle.svg";
import { useModal } from "@/hooks/useModal";
import { ScheduleInfo } from "@/types/schedule";

interface ModalProps {
  closeModal: () => void;
  schedule?: ScheduleInfo;
}
const ScheduleFormModal = ({ closeModal, schedule }: ModalProps) => {
  const {
    dropdownOutsideRef,
    toggleDropdown,
    selectedActivity,
    isActivityDropdownOpen,
    handleActivity,
    startTimeDropdownRef,
    toggleStartTimeDropdown,
    selectedStartTime,
    isStartTimeDropdownOpen,
    timeOptions,
    handleStartTimeSelect,
    endTimeDropdownRef,
    toggleEndTimeDropdown,
    selectedEndTime,
    isEndTimeDropdownOpen,
    handleEndTimeSelect,
    addSchedule,
  } = useModal();

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-20">
      <div className="rounded-lg border bg-white border-gray-200 shadow-sm w-96 relative">
        <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-md hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              X
            </button>
            <p className="text-gray-900">새 일정</p>
            <p className="text-gray-500 text-sm">
              새 일정 정보를 입력해주세요.
            </p>
          </div>
          <div className="space-y-4 text-left my-6">
            <div>
              <p className="text-sm mb-1.5">활동명</p>
              <input
                defaultValue={schedule?.title ?? ""}
                className="required flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <p className="text-sm mb-1.5">장소</p>
              <input
                defaultValue={schedule?.location ?? ""}
                className="flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 z-10"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1.5">이용 날짜</p>
                <input
                  type="date"
                  placeholder="날짜를 선택해주세요."
                  defaultValue={schedule?.date ?? ""}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 cursor-pointer`}
                />
              </div>

              <div className="relative z-10" ref={dropdownOutsideRef}>
                <p className="text-sm mb-1.5">활동 유형</p>
                <button
                  onClick={toggleDropdown}
                  defaultValue={schedule?.type ?? ""}
                  className="flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 justify-between cursor-pointer"
                >
                  {selectedActivity}
                  <AngleSVG width={14} />
                </button>

                {isActivityDropdownOpen && (
                  <>
                    <div className="absolute border border-gray-300 p-1 bg-white w-full  rounded-md ">
                      {["정기 모임", "회의", "스터디"].map((label) => (
                        <button
                          key={label}
                          onClick={() => handleActivity(label)}
                          className="flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-cert-red hover:text-white"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 z-10">
              <div className="relative" ref={startTimeDropdownRef}>
                <p className="text-sm mb-1.5">시작 시간</p>
                <button
                  onClick={toggleStartTimeDropdown}
                  className="flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 justify-between cursor-pointer"
                >
                  {selectedStartTime}
                  <AngleSVG width={14} />
                </button>
                {isStartTimeDropdownOpen && (
                  <div className="absolute top-full left-0 rounded-md right-0 z-10 bg-white border border-gray-300 p-1 shadow-md max-h-48 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleStartTimeSelect(time)}
                        defaultValue={schedule?.startTime ?? ""}
                        className="flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-red-500 hover:text-white"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={endTimeDropdownRef}>
                <p className="text-sm mb-1.5">종료 시간</p>
                <button
                  onClick={toggleEndTimeDropdown}
                  className="flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 justify-between cursor-pointer"
                >
                  {selectedEndTime}
                  <AngleSVG width={14} />
                </button>
                {isEndTimeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 p-1 shadow-md max-h-48 overflow-y-auto rounded-md">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleEndTimeSelect(time)}
                        defaultValue={schedule?.endTime ?? ""}
                        className="flex h-10 w-full rounded-md px-3 py-2 text-gray-900 hover:bg-red-500 hover:text-white"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              addSchedule();
              closeModal();
            }}
            className="w-full rounded-md py-2.5 bg-cert-red text-white hover:opacity-90 cursor-pointer"
          >
            일정 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFormModal;
