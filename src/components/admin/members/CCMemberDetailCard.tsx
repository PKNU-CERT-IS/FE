"use client";

import { useEffect, useState } from "react";
import DefaultBadge from "@/components/ui/defaultBadge";
import { User, Minus, Plus, X, Cake, Phone, Mail } from "lucide-react";
import EditSVG from "/public/icons/edit.svg";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import CCMemberEditModal from "@/components/admin/members/CCMemberEditModal";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { penaltyGracePeriod } from "@/utils/adminPenaltyGracePeriodUtils";
import { useModal } from "@/hooks/useModal";

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
  const [isOpenPenaltyModal, setIsOpenPenaltyModal] = useState<boolean>(false);
  const [isOpenKickModal, setIsOpenKickModal] = useState<boolean>(false);

  const [penaltyCount, setPenaltyCount] = useState(0);
  const { setIsOpenModal, isOpenModal, modalOutsideRef } = useModal();

  useEffect(() => {
    if (selectedMember) {
      setPenaltyCount(selectedMember.penalty);
    }
  }, [selectedMember]);

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModal]);

  const handlePenaltyScoreIncrement = () => {
    setPenaltyCount((prev) => prev + 1);
  };

  const handlePenaltyScoreDecrement = () => {
    setPenaltyCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleUpdateMember = (updatedMember: AdminMemberDetailInfoType) => {
    if (onUpdateMember) {
      onUpdateMember(updatedMember);
    }
    setSelectedMember(updatedMember);
  };

  if (!selectedMember) return null;

  return (
    <div className="w-72 space-y-4">
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <div className="relative pb-3 flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium">{selectedMember.name}</div>
              <DefaultBadge
                variant="outline"
                className="ml-3 text-xs flex items-center"
              >
                {selectedMember.role}
              </DefaultBadge>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsOpenModal(true)}>
                <EditSVG className="w-4 h-4 stroke-gray-400 hover:stroke-gray-600" />
              </button>
              <button onClick={() => setSelectedMember(null)}>
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          <div className="text-sm">{selectedMember.major}</div>

          <div className="text-xs flex flex-row items-center text-gray-600">
            <User className="w-3 h-3 mr-1" />
            {selectedMember.grade}학년, {selectedMember.gender}자
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600">
            <Cake className="w-3 h-3 mr-1" />
            {selectedMember.birthday}
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600">
            <Phone className="w-3 h-3 mr-1" />
            {selectedMember.phoneNumber}
          </div>

          <div className="text-xs flex flex-row items-center text-gray-600">
            <Mail className="w-3 h-3 mr-1" />
            {selectedMember.email}
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          {/* 활동 */}
          <div className="space-y-2">
            <div className="text-sm font-medium">현재 참여 중인 활동</div>
            <div className="space-y-1">
              {selectedMember.currentStudies.map((study, index) => (
                <div
                  key={`study-${index}`}
                  className="text-xs p-2 bg-green-50 rounded border border-green-200"
                >
                  📚 {study}
                </div>
              ))}
              {selectedMember.currentProjects.map((project, index) => (
                <div
                  key={`project-${index}`}
                  className="text-xs p-2 bg-blue-50 rounded border border-blue-200"
                >
                  🚀 {project}
                </div>
              ))}
              {selectedMember.currentProjects.length === 0 &&
                selectedMember.currentStudies.length === 0 && (
                  <div className="text-xs text-gray-400 p-2">
                    참여 중인 활동 없음
                  </div>
                )}
            </div>
          </div>

          {/* 벌점 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">벌점</div>
              <div className="flex items-center gap-2">
                <DefaultButton
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 bg-transparent cursor-pointer"
                  onClick={handlePenaltyScoreDecrement}
                >
                  <Minus className="w-3 h-3" />
                </DefaultButton>
                <span className="font-medium text-lg px-2 py-1 rounded">
                  {penaltyCount}점
                </span>
                <DefaultButton
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 bg-transparent cursor-pointer"
                  onClick={handlePenaltyScoreIncrement}
                >
                  <Plus className="w-3 h-3" />
                </DefaultButton>
              </div>
            </div>
            <div>
              <DefaultButton
                className="w-full h-8 text-xs action-button cursor-pointer"
                onClick={() => setIsOpenPenaltyModal(true)}
              >
                벌점 부여
              </DefaultButton>
              <ConfirmModal
                isOpen={isOpenPenaltyModal}
                title="벌점 부여 확인"
                message={`${selectedMember.name}에게 벌점을 부여하시겠습니까?`}
                confirmText="확인"
                cancelText="취소"
                onConfirm={() => {
                  setIsOpenPenaltyModal(false);
                }}
                onCancel={() => setIsOpenPenaltyModal(false)}
              />
            </div>
          </div>

          {/* 유예 기간 */}
          <div className="space-y-2">
            <div className="text-sm font-medium">유예 기간</div>
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded border border-gray-300">
              {penaltyGracePeriod(selectedMember.gracePeriod)} (
              {selectedMember.gracePeriod})
            </div>
          </div>

          <div>
            <DefaultButton
              className="action-button w-full h-8 text-xs cursor-pointer"
              onClick={() => setIsOpenKickModal(true)}
            >
              탈퇴 처리
            </DefaultButton>
            <ConfirmModal
              isOpen={isOpenKickModal}
              title="탈퇴 처리"
              message={`${selectedMember.name}을 탈퇴 처리하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
              confirmText="확인"
              cancelText="취소"
              onConfirm={() => {
                setIsOpenKickModal(false);
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
