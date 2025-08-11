"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { mockProfileData } from "@/mocks/mockProfileData";
import { gradeOptions } from "@/utils/membersUtils";
import { MembersDataType } from "@/types/members";
import Image from "next/image";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { X, Upload, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultBadge from "@/components/ui/defaultBadge";
import { ProfileDataType } from "@/types/profile";

interface ModalProps {
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement | null>;
  onSave?: (profile: MembersDataType) => void;
}

export default function CCProfileModal({
  closeModal,
  modalRef,
  onSave,
}: ModalProps) {
  const user = mockProfileData[0] as ProfileDataType;
  const [editedUser, setEditedUser] = useState<ProfileDataType>(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profileImage || null
  );
  const [showGradeDropdown, setShowGradeDropdown] = useState<boolean>(false);

  const gradeRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = useCallback(() => {
    setShowGradeDropdown(false);
  }, []);

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (gradeRef.current?.contains(target)) return;
      closeAllDropdowns();
    };
    if (showGradeDropdown) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [showGradeDropdown, closeAllDropdowns]);

  const onChange =
    <K extends keyof ProfileDataType>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setEditedUser((prev) => ({
        ...prev,
        [key]: e.target.value as ProfileDataType[K],
      }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크
      if (file.size > 1 * 1024 * 1024) {
        alert("파일 크기는 1MB 이하로 업로드해주세요.");
        return;
      }
      // 이미지 파일 타입 체크
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, PNG 파일만 업로드 가능합니다. (GIF 제외)");
        return;
      }

      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        setEditedUser({
          ...editedUser,
          profileImage: imageUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImageFile(null);
    setPreviewImage(null);
    setEditedUser((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleSave = () => {
    onSave?.(editedUser);
    console.log("save profile:", editedUser);
    closeModal();
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-20"
    >
      <div className="w-[90vw] max-w-[30rem] rounded-lg border bg-white border-gray-200 shadow-sm relative animate-pop-in flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-md text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            <X />
          </button>
          <p className="text-gray-900 text-base font-medium">프로필 수정</p>
          <p className="text-gray-500 text-sm">
            People 카드에서 이렇게 보입니다.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* 프로필 사진 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              프로필 사진
            </label>
            <div className="flex gap-4 items-center">
              <div className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16 border border-gray-200">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="프로필 미리보기"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-full">
                    {editedUser.name?.[0] || "사진"}
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex items-center h-8 gap-1 px-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent">
                    <Upload className="w-3 h-3" />
                    업로드
                  </div>
                </label>
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex items-center gap-1 px-2 h-8 text-xs text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <Trash2 className="w-3 h-3" />
                  제거
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG 파일만 업로드 가능합니다. (최대 1MB)
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 이름 */}
              <div>
                <p className="text-sm mb-1.5">이름</p>
                <input
                  value={editedUser.name}
                  onChange={onChange("name")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>

              {/* 전공 */}
              <div>
                <p className="text-sm mb-1.5">전공</p>
                <input
                  value={editedUser.major}
                  onChange={onChange("major")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                  placeholder="예: 컴퓨터공학과 소프트웨어전공"
                />
              </div>

              {/* 학년 */}
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
                        (option) => option.value === (editedUser.grade ?? "")
                      )?.label || "선택"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                        showGradeDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </DefaultButton>

                  {showGradeDropdown && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                      {gradeOptions
                        .filter((option) => option.value !== "")
                        .map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                            onClick={() => {
                              setEditedUser((prev) => ({
                                ...prev,
                                grade: option.value as MembersDataType["grade"],
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

              {/* 생년월일 */}
              <div>
                <p className="text-sm mb-1.5">생년월일</p>
                <input
                  type="date"
                  value={editedUser.birthday}
                  onChange={onChange("birthday")}
                  className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>

              {/* 전화번호 */}
              <div>
                <p className="text-sm mb-1.5">전화번호</p>
                <input
                  value={editedUser.phoneNumber}
                  onChange={onChange("phoneNumber")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                  placeholder="010-0000-0000"
                />
              </div>

              {/* 학번 */}
              <div>
                <p className="text-sm mb-1.5">학번</p>
                <input
                  value={editedUser.studentId}
                  onChange={onChange("studentId")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 소개 */}
          <div className="space-y-2">
            <p className="text-sm">소개</p>
            <textarea
              value={editedUser.description ?? ""}
              onChange={onChange("description")}
              className="w-full h-16 text-sm rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
              placeholder="간단한 소개를 입력하세요"
            />
          </div>

          {/* 기술스택 (항상 표시) */}
          <div className="space-y-2">
            <p className="text-sm">기술스택</p>
            <input
              value={(editedUser.skills ?? []).join(", ")}
              onChange={(e) =>
                setEditedUser((prev) => ({
                  ...prev,
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
              placeholder="React, Node.js, Python (쉼표로 구분)"
            />
          </div>

          <details className="group rounded-lg border border-gray-300">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-800 flex items-center justify-between">
              이메일 및 링크 (펼쳐서 수정)
              <span className="transition-transform group-open:rotate-180">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </span>
            </summary>

            <div className="px-4 pb-4 grid grid-cols-1 gap-4">
              {/* 이메일 */}
              <div>
                <p className="text-sm mb-1.5">이메일</p>
                <input
                  type="email"
                  value={editedUser.email ?? ""}
                  onChange={onChange("email")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
              {/* GitHub */}
              <div>
                <p className="text-sm mb-1.5">GitHub URL</p>
                <input
                  type="url"
                  value={editedUser.githubUrl ?? ""}
                  onChange={onChange("githubUrl")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                  placeholder="https://github.com/username"
                />
              </div>
              {/* LinkedIn */}
              <div>
                <p className="text-sm mb-1.5">LinkedIn URL</p>
                <input
                  type="url"
                  value={editedUser.linkedinUrl ?? ""}
                  onChange={onChange("linkedinUrl")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>
            </div>
          </details>

          {/* 미리보기 */}
          <div className="mt-2 p-4 flex flex-col border rounded-lg bg-gray-50 border-gray-200 transition-colors duration-300">
            <h4 className="text-sm font-medium text-gray-900 mb-2">미리보기</h4>
            <div className="p-6 rounded-lg border text-card-foreground shadow-sm bg-white border-gray-200">
              <div className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12 mx-auto mb-2 border border-gray-200">
                <div className="aspect-square h-full w-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt={`${editedUser.name} 프로필`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="bg-gray-100 text-gray-500 text-xs w-full h-full flex items-center justify-center rounded-full">
                        {editedUser.name?.[0] || "사진"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center pb-1 text-black">
                {editedUser.name}
              </div>
              <div className="text-xs text-center text-gray-600">
                {editedUser.grade ? `${editedUser.grade}학년 · ` : ""}
                {editedUser.major}
              </div>
              <div className="text-xs text-center text-gray-600 mt-1">
                {editedUser.description}
              </div>
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {editedUser.skills?.map((skill) => (
                  <DefaultBadge
                    key={skill}
                    variant="outline"
                    className="text-xs bg-gray-100 text-gray-600 border-gray-200"
                  >
                    {skill}
                  </DefaultBadge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <div className="flex justify-end gap-2">
            <DefaultButton
              variant="outline"
              onClick={closeModal}
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
