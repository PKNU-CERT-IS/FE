"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { RefObject, useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { cn } from "@/lib/utils";
import {
  membersRoleCategories,
  MembersRoleCategoryType,
  membersGradeCategories,
  MembersGradeCategoryType,
} from "@/types/members";

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

  const handleSave = () => {
    onSave(editedMember);
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
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-20"
    >
      <div className="flex flex-col space-y-1.5 p-6 text-center rounded-lg border bg-white border-gray-200 shadow-sm w-96 relative animate-pop-in">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-md text-gray-400 hover:text-gray-600 flex items-center justify-center"
          >
            <X />
          </button>
          <p className="text-gray-900">학년 / 직급 수정</p>
          <p className="text-gray-500 text-sm">
            {member.name}님의 학년 및 직급을 수정합니다.
          </p>
        </div>

        <div className="space-y-4 text-left pt-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm mb-1.5 font-medium text-gray-700">학년</p>
              <div className="relative" ref={gradeRef}>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer h-10",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
                  )}
                  onClick={() => setShowGradeDropdown((p) => !p)}
                >
                  <span className="text-gray-900 truncate pr-1 text-sm">
                    {gradeOptions.find(
                      (option) =>
                        option.value ===
                        (editedMember.grade as MembersGradeCategoryType)
                    )?.label || editedMember.grade}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      showGradeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>

                {showGradeDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {gradeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                        onClick={() => {
                          setEditedMember((prev) => ({
                            ...prev,
                            grade: option.value as MembersGradeCategoryType,
                          }));
                          closeAllDropdowns();
                        }}
                      >
                        {option.label}학년
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm mb-1.5 font-medium text-gray-700">직급</p>
              <div className="relative" ref={roleRef}>
                <DefaultButton
                  variant="outline"
                  size="default"
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer h-10",
                    "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                    "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
                  )}
                  onClick={() => setShowRoleDropdown((p) => !p)}
                >
                  <span className="text-gray-900 truncate pr-1 text-sm">
                    {editedMember.role}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      showRoleDropdown ? "rotate-180" : ""
                    }`}
                  />
                </DefaultButton>

                {showRoleDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
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
            <DefaultButton
              variant="outline"
              onClick={handleCancel}
              className="border-gray-300 text-gray-600 hover:border-red-400 hover:bg-cert-red/0 hover:text-red-600"
            >
              취소
            </DefaultButton>
            <DefaultButton
              className="bg-red-600 hover:bg-red-700 text-white"
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
