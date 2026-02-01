"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { translateGradeToKorean } from "@/utils/transfromResponseValue";
import { translateGenderToKorean } from "@/utils/transfromResponseValue";
import { deleteMember } from "@/app/api/member/CCadminMemberApi";
import CCMemberEditModal from "@/components/admin/members/CCMemberEditModal";
import DefaultBadge from "@/components/ui/defaultBadge";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { useModal } from "@/hooks/useModal";
import { Cake, Mail, Phone, User, X } from "lucide-react";
import EditSVG from "/public/icons/edit.svg";

interface CCMemberDetailCardProps {
  selectedMember: AdminMemberDetailInfoType | null;
  setSelectedMember: (member: AdminMemberDetailInfoType | null) => void;
  onUpdateMember?: (member: AdminMemberDetailInfoType) => void;
}

export default function CCMemberDetailCard({
  selectedMember,
  setSelectedMember,
  onUpdateMember,
}: CCMemberDetailCardProps) {
  const router = useRouter();

  const [isOpenKickModal, setIsOpenKickModal] = useState(false);

  const { setIsOpenModal, isOpenModal, modalOutsideRef } = useModal();

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
  }, [isOpenModal]);

  const handleUpdateMember = (updatedMember: AdminMemberDetailInfoType) => {
    onUpdateMember?.(updatedMember);
    setSelectedMember(updatedMember);
  };

  if (!selectedMember) return null;

  return (
    <div className="w-72 space-y-4">
      <div className="border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="relative pb-3 flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                {selectedMember.name}
              </div>

              <DefaultBadge
                variant="outline"
                className="ml-3 text-xs flex items-center border-gray-300 dark:border-gray-600 dark:text-gray-200"
              >
                {selectedMember.role}
              </DefaultBadge>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpenModal(true)}
                className="cursor-pointer"
              >
                <EditSVG className="w-4 h-4 stroke-gray-400 hover:stroke-gray-600 dark:stroke-gray-500 dark:hover:stroke-gray-300" />
              </button>

              <button
                onClick={() => setSelectedMember(null)}
                className="cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            {selectedMember.major}
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400">
            <User className="w-3 h-3 mr-1" />
            {translateGradeToKorean(selectedMember.grade)},{" "}
            {translateGenderToKorean(selectedMember.gender)}자
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400">
            <Cake className="w-3 h-3 mr-1" />
            {selectedMember.birthday}
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400">
            <Phone className="w-3 h-3 mr-1" />
            {selectedMember.phoneNumber}
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400">
            <Mail className="w-3 h-3 mr-1" />
            {selectedMember.email}
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          {/* 활동 */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              현재 참여 중인 활동
            </div>

            <div className="space-y-1">
              {selectedMember.activeStudies.map((study, index) => (
                <div
                  key={`study-${index}`}
                  className="text-xs p-2 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200"
                >
                  📚 {study}
                </div>
              ))}

              {selectedMember.activeProjects.map((project, index) => (
                <div
                  key={`project-${index}`}
                  className="text-xs p-2 bg-blue-50 dark:bg-blue-900/40 rounded border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200"
                >
                  🚀 {project}
                </div>
              ))}
              {selectedMember.activeProjects.length === 0 &&
                selectedMember.activeStudies.length === 0 && (
                  <div className="text-xs text-gray-400 dark:text-gray-500 p-2">
                    참여 중인 활동 없음
                  </div>
                )}
            </div>
          </div>
          <div className="border-b-1 border-gray-200 dark:border-gray-700 pb-1.5" />

          {/* 탈퇴 처리 */}
          <div>
            <DefaultButton
              className="w-full h-8 text-xs action-button"
              onClick={() => setIsOpenKickModal(true)}
            >
              탈퇴 처리
            </DefaultButton>
            <ConfirmModal
              isOpen={isOpenKickModal}
              title="탈퇴 처리"
              message={`${selectedMember.name}님을 탈퇴 처리하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
              confirmText="확인"
              cancelText="취소"
              onConfirm={async () => {
                setIsOpenKickModal(false);
                await deleteMember(selectedMember.memberId);
                setSelectedMember(null);
                router.refresh();
              }}
              onCancel={() => setIsOpenKickModal(false)}
            />
          </div>

          {/* 회원 정보 수정 모달 */}
          {isOpenModal && (
            <CCMemberEditModal
              member={selectedMember}
              isOpen={isOpenModal}
              closeModal={() => setIsOpenModal(false)}
              onSave={handleUpdateMember}
              modalRef={modalOutsideRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}
