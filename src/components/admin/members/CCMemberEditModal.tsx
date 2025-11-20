"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import {
  MembersGradeCategoryType,
  MembersRoleCategoryType,
  membersGradeCategories,
  membersRoleCategories,
} from "@/types/members";
import {
  translateKoreanToGrade,
  translateKoreanToRole,
} from "@/utils/transformRequestValue";
import { translateGradeToKorean } from "@/utils/transfromResponseValue";
import { updateMemberGradeRole } from "@/app/api/member/CCadminMemberApi";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown, X } from "lucide-react";

interface CCRoleEditModalProps {
  member: AdminMemberDetailInfoType;
  isOpen: boolean;
  closeModal: () => void;
  onSave: (updatedMember: AdminMemberDetailInfoType) => void;
  modalRef?: RefObject<HTMLDivElement | null>;
}

export default function CCRoleEditModal({
  member,
  isOpen,
  closeModal,
  onSave,
  modalRef,
}: CCRoleEditModalProps) {
  const [editedMember, setEditedMember] =
    useState<AdminMemberDetailInfoType>(member);

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);

  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const gradeRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    setEditedMember(member);
  }, [member]);

  const closeAllDropdowns = useCallback(() => {
    setShowRoleDropdown(false);
    setShowGradeDropdown(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (roleRef.current?.contains(target)) return;
      if (gradeRef.current?.contains(target)) return;
      closeAllDropdowns();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAllDropdowns, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    // 학년: 드롭다운에서 바꿨으면 editedMember.grade, 아니면 원래 member.grade
    const newGrade = translateKoreanToGrade(editedMember.grade) || member.grade;

    // 직급: 드롭다운에서 바꿨으면 editedMember.role, 아니면 원래 member.role
    const newRole = translateKoreanToRole(editedMember.role) || member.role;

    await updateMemberGradeRole({
      targetMemberId: editedMember.memberId,
      newGrade,
      newRole,
    });

    onSave(editedMember);
    router.refresh();
    closeModal();
  };

  const handleCancel = () => {
    setEditedMember(member);
    closeModal();
  };

  const roleOptions = membersRoleCategories.map((value) => ({
    value,
    label: value,
  }));

  const gradeOptions = membersGradeCategories.map((value) => ({
    value,
    label: value,
  }));
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-30"
    >
      <div className="rounded-lg border shadow-sm w-96 relative animate-pop-in dark-default">
        <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center"
            >
              <X />
            </button>
            <p className="text-gray-900 dark:text-gray-200">학년 / 직급 수정</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {member.name}님의 학년 및 직급을 수정합니다.
            </p>
          </div>

          <div className="space-y-4 text-left my-6">
            {/* 학년 */}
            <div>
              <p className="text-sm mb-1.5 font-medium text-gray-700 dark:text-gray-200">
                학년
              </p>
              <div className="relative" ref={gradeRef}>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer h-10",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
                  )}
                  onClick={() => {
                    setShowGradeDropdown((p) => !p);
                    setShowRoleDropdown(false);
                  }}
                >
                  <span className="text-gray-900 truncate pr-1 text-sm dark:text-gray-200">
                    {gradeOptions.find(
                      (option) =>
                        option.value ===
                        (translateGradeToKorean(
                          editedMember.grade,
                        ) as MembersGradeCategoryType),
                    )?.label || editedMember.grade}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 dark:text-gray-300 ${
                      showGradeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>

                {showGradeDropdown && (
                  <div className="absolute border border-gray-300 bg-white w-full rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 z-20 max-h-48 overflow-y-auto">
                    {gradeOptions.map((option) => (
                      <button
                        key={option.value}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 dark:text-gray-200 hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100 cursor-pointer"
                        onClick={() => {
                          setEditedMember((prev) => ({
                            ...prev,
                            grade: option.value as MembersGradeCategoryType,
                          }));
                          closeAllDropdowns();
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 직급 */}
            <div>
              <p className="text-sm mb-1.5 dark:text-gray-200">직급</p>
              <div className="relative" ref={roleRef}>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer h-10",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
                  )}
                  onClick={() => {
                    setShowRoleDropdown((p) => !p);
                    setShowGradeDropdown(false);
                  }}
                >
                  <span className="text-gray-700 dark:text-gray-200 truncate">
                    {editedMember.role}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 dark:text-gray-300 ${
                      showRoleDropdown ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>

                {showRoleDropdown && (
                  <div className="absolute border border-gray-300 bg-white w-full rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 z-20 max-h-48 overflow-y-auto">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 text-gray-900 dark:text-gray-200 hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100 cursor-pointer"
                        onClick={() => {
                          setEditedMember((prev) => ({
                            ...prev,
                            role: option.value as MembersRoleCategoryType,
                          }));
                          closeAllDropdowns();
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <DefaultButton variant="outline" onClick={handleCancel}>
              취소
            </DefaultButton>
            <DefaultButton
              className="bg-cert-red hover:bg-red-700 text-white"
              onClick={handleSave}
            >
              저장
            </DefaultButton>
          </div>
        </div>
      </div>
    </div>
  );
}
