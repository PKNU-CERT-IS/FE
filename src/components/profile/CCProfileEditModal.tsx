"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/errorResponse";
import { COLLEGE_DATA, SelectedMajorInfo, getMajorUtils } from "@/types/major";
import { MembersDataType, MembersGradeCategoryType } from "@/types/members";
import { ProfileDataType } from "@/types/profile";
import { formatPhoneNumber, parseMajorString } from "@/utils/formEditUtils";
import { getRoleBadgeStyle, gradeOptions } from "@/utils/membersUtils";
import { toOffsetDateTime } from "@/utils/transformRequestValue";
import { translateKoreanToGrade } from "@/utils/transformRequestValue";
import {
  translateGradeToKorean,
  // fromOffsetDateTime,
  translateMemberRole,
} from "@/utils/transfromResponseValue";
import { updateProfile } from "@/app/api/profile/CCprofileApi";
import { cn } from "@/lib/utils";
import DefaultBadge from "@/components/ui/defaultBadge";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown, Trash2, Upload, X } from "lucide-react";

interface ModalProps {
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement | null>;
  onSave?: (profile: MembersDataType) => void;
  initialProfileData: ProfileDataType;
}

export default function CCProfileModal({
  closeModal,
  modalRef,
  onSave,
  initialProfileData,
}: ModalProps) {
  const router = useRouter();

  // 초기 전공 파싱
  const parsedMajor = parseMajorString(initialProfileData.major);
  const initialMajorInfo: SelectedMajorInfo = {
    college: parsedMajor.college
      ? COLLEGE_DATA.find((c) => c.name === parsedMajor.college)?.id
      : undefined,
    department: parsedMajor.department
      ? COLLEGE_DATA.flatMap((c) => c.departments).find(
          (d) => d.name === parsedMajor.department,
        )?.id
      : undefined,
    major: parsedMajor.major
      ? COLLEGE_DATA.flatMap((c) => c.departments)
          .flatMap((d) => d.majors)
          .find((m) => m.name === parsedMajor.major)?.id
      : undefined,
  };

  const [editedUser, setEditedUser] = useState<ProfileDataType>({
    ...initialProfileData,
    studentNumber: initialProfileData.studentNumber ?? "",
    birthday: initialProfileData.birthday?.split("T")[0] ?? "",
    phoneNumber: initialProfileData.phoneNumber ?? "",
    memberGrade: translateGradeToKorean(initialProfileData.memberGrade) ?? "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    initialProfileData.profileImage || null,
  );
  const [showGradeDropdown, setShowGradeDropdown] = useState<boolean>(false);
  const [formattedPhone, setFormattedPhone] = useState<string>(
    formatPhoneNumber(initialProfileData.phoneNumber ?? ""),
  );
  const [selectedMajorInfo, setSelectedMajorInfo] =
    useState<SelectedMajorInfo>(initialMajorInfo);
  const [majorDropdownState, setMajorDropdownState] = useState({
    collegeOpen: false,
    departmentOpen: false,
    majorOpen: false,
  });

  const gradeRef = useRef<HTMLDivElement>(null);
  const collegeDropdownRef = useRef<HTMLDivElement>(null);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const majorDropdownRef = useRef<HTMLDivElement>(null);

  const [skillInput, setSkillInput] = useState<string>(
    editedUser.skills?.join(", ") || "",
  );

  const role = translateMemberRole(editedUser.memberRole);

  const closeAllDropdowns = useCallback(() => {
    setShowGradeDropdown(false);
    setMajorDropdownState({
      collegeOpen: false,
      departmentOpen: false,
      majorOpen: false,
    });
  }, []);

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        gradeRef.current?.contains(target) ||
        collegeDropdownRef.current?.contains(target) ||
        departmentDropdownRef.current?.contains(target) ||
        majorDropdownRef.current?.contains(target)
      )
        return;
      closeAllDropdowns();
    };

    if (
      showGradeDropdown ||
      majorDropdownState.collegeOpen ||
      majorDropdownState.departmentOpen ||
      majorDropdownState.majorOpen
    ) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [showGradeDropdown, majorDropdownState, closeAllDropdowns]);

  const onChange =
    <K extends keyof ProfileDataType>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setEditedUser((prev) => ({
        ...prev,
        [key]: e.target.value as ProfileDataType[K],
      }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormattedPhone(formatted);
    setEditedUser((prev) => ({
      ...prev,
      phoneNumber: formatted,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("파일 크기는 1MB 이하로 업로드해주세요.");
        return;
      }
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, PNG 파일만 업로드 가능합니다. (GIF 제외)");
        return;
      }

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
    setPreviewImage(null);
    setEditedUser((prev) => ({ ...prev, profileImage: "" }));
  };

  // 전공 선택 함수들
  const toggleMajorDropdown = (type: keyof typeof majorDropdownState) => {
    setMajorDropdownState((prev) => ({
      collegeOpen: type === "collegeOpen" ? !prev.collegeOpen : false,
      departmentOpen: type === "departmentOpen" ? !prev.departmentOpen : false,
      majorOpen: type === "majorOpen" ? !prev.majorOpen : false,
    }));
  };

  const selectCollege = (collegeId: string) => {
    setSelectedMajorInfo({ college: collegeId });
    setMajorDropdownState((prev) => ({ ...prev, collegeOpen: false }));
  };

  const selectDepartment = (departmentId: string) => {
    setSelectedMajorInfo((prev) => ({
      ...prev,
      department: departmentId,
      major: undefined,
    }));
    setMajorDropdownState((prev) => ({ ...prev, departmentOpen: false }));
  };

  const selectMajor = (majorId: string) => {
    setSelectedMajorInfo((prev) => ({
      ...prev,
      major: majorId,
    }));
    setMajorDropdownState((prev) => ({ ...prev, majorOpen: false }));
  };

  const getDisplayText = (type: "college" | "department" | "major") => {
    switch (type) {
      case "college":
        return selectedMajorInfo.college
          ? getMajorUtils.getCollegeName(selectedMajorInfo.college)
          : "대학을 선택해주세요";
      case "department":
        return selectedMajorInfo.department
          ? getMajorUtils.getDepartmentName(selectedMajorInfo.department)
          : "학부를 선택해주세요";
      case "major":
        return selectedMajorInfo.major
          ? getMajorUtils.getMajorName(selectedMajorInfo.major)
          : "전공을 선택해주세요";
      default:
        return "";
    }
  };

  const availableDepartments = selectedMajorInfo.college
    ? getMajorUtils.getDepartmentsByCollege(selectedMajorInfo.college)
    : [];

  const availableMajors = selectedMajorInfo.department
    ? getMajorUtils.getMajorsByDepartment(selectedMajorInfo.department)
    : [];

  const handleSave = async () => {
    try {
      const majorString = [
        selectedMajorInfo.college
          ? getMajorUtils.getCollegeName(selectedMajorInfo.college)
          : null,
        selectedMajorInfo.department
          ? getMajorUtils.getDepartmentName(selectedMajorInfo.department)
          : null,
        selectedMajorInfo.major
          ? getMajorUtils.getMajorName(selectedMajorInfo.major)
          : null,
      ]
        .filter(Boolean)
        .join("-");

      await updateProfile({
        name: editedUser.name,
        description: editedUser.description,
        profileImage: editedUser.profileImage,
        major: majorString,
        birthday: toOffsetDateTime(editedUser.birthday),
        phoneNumber: editedUser.phoneNumber,
        studentNumber: editedUser.studentNumber,
        skills: skillInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        grade: translateKoreanToGrade(editedUser.memberGrade),
        email: editedUser.email,
        githubUrl: editedUser.githubUrl,
        linkedinUrl: editedUser.linkedinUrl,
      });

      onSave?.({
        ...editedUser,
        major: majorString,
      });

      router.refresh();
      closeModal();
      alert("프로필이 정상적으로 수정되었습니다.");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const msg =
        err.response?.data?.message || "프로필 수정 중 오류가 발생했습니다.";
      alert(msg);
    }
  };
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50 flex justify-center items-center z-30"
    >
      <div className="w-[90vw] max-w-[30rem] rounded-lg border bg-white border-gray-200 shadow-sm relative animate-pop-in flex flex-col dark:bg-gray-800 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative dark:border-gray-700">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            aria-label="닫기"
          >
            <X />
          </button>
          <p className="text-gray-900 text-base font-medium dark:text-gray-200">
            프로필 수정
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            People 카드에서 이렇게 보입니다.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* 프로필 사진 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              프로필 사진
            </label>
            <div className="flex gap-4 items-center">
              <div className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16 border border-gray-200 dark:border-gray-600">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="프로필 미리보기"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs rounded-full">
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
                  <div className="flex items-center h-8 gap-1 px-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-900 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent">
                    <Upload className="w-3 h-3" />
                    업로드
                  </div>
                </label>
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex items-center gap-1 px-2 h-8 text-xs text-cert-red border border-red-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <Trash2 className="w-3 h-3" />
                  제거
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              JPG, PNG 파일만 업로드 가능합니다. (최대 1MB)
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 이름 */}
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">이름</p>
                <input
                  value={editedUser.name}
                  onChange={onChange("name")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

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
                    onClick={() => setShowGradeDropdown((p) => !p)}
                  >
                    <span className="text-gray-900 truncate pr-1 text-sm dark:text-gray-200">
                      {gradeOptions.find(
                        (option) =>
                          option.value === (editedUser.memberGrade ?? ""),
                      )?.label || "선택"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                        showGradeDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </DefaultButton>

                  {showGradeDropdown && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                      {gradeOptions
                        .filter((option) => option.value !== "")
                        .map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100"
                            onClick={() => {
                              setEditedUser((prev) => ({
                                ...prev,
                                memberGrade:
                                  option.value as MembersGradeCategoryType,
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
                <p className="text-sm mb-1.5 dark:text-gray-200">생년월일</p>
                <input
                  type="date"
                  value={editedUser.birthday}
                  onChange={onChange("birthday")}
                  className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              {/* 전화번호 */}
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">전화번호</p>
                <input
                  type="tel"
                  value={formattedPhone}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                  placeholder="010-1234-5678"
                />
              </div>

              {/* 학번 */}
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">학번</p>
                <input
                  value={editedUser.studentNumber}
                  onChange={onChange("studentNumber")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
            </div>
            {/* 대학 */}
            <div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600 dark:text-gray-400">
                  대학
                </label>
                <div className="relative" ref={collegeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => toggleMajorDropdown("collegeOpen")}
                    className="input-default px-3 py-2 text-sm text-left flex items-center justify-between w-full h-10"
                  >
                    <span
                      className={
                        selectedMajorInfo.college
                          ? "text-gray-900 dark:text-gray-200"
                          : "text-gray-400"
                      }
                    >
                      {getDisplayText("college")}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transform transition-transform ${
                        majorDropdownState.collegeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {majorDropdownState.collegeOpen && (
                    <div
                      className="absolute z-20 w-full mt-1 bg-white border border-gray-300 
                      rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 
                      max-h-60 overflow-y-auto"
                    >
                      {COLLEGE_DATA.map((college) => (
                        <button
                          key={college.id}
                          type="button"
                          onClick={() => selectCollege(college.id)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 
                       dark:hover:bg-cert-red cursor-pointer"
                        >
                          {college.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 학부(과) */}
              <div className="space-y-2 mt-3">
                <label className="text-xs text-gray-600 dark:text-gray-400">
                  학부(과)
                </label>
                <div className="relative" ref={departmentDropdownRef}>
                  <button
                    type="button"
                    onClick={() => toggleMajorDropdown("departmentOpen")}
                    disabled={!selectedMajorInfo.college}
                    className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between w-full h-10 ${
                      !selectedMajorInfo.college
                        ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        selectedMajorInfo.department
                          ? "text-gray-900 dark:text-gray-200"
                          : "text-gray-400"
                      }
                    >
                      {getDisplayText("department")}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transform transition-transform ${
                        majorDropdownState.departmentOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {majorDropdownState.departmentOpen &&
                    selectedMajorInfo.college && (
                      <div
                        className="absolute z-20 w-full mt-1 bg-white border border-gray-300 
                      rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 
                      max-h-60 overflow-y-auto"
                      >
                        {availableDepartments.map((department) => (
                          <button
                            key={department.id}
                            type="button"
                            onClick={() => selectDepartment(department.id)}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 
                       dark:hover:bg-cert-red cursor-pointer"
                          >
                            {department.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* 전공 */}
              <div className="space-y-2 mt-3">
                <label className="text-xs text-gray-600 dark:text-gray-400">
                  전공
                </label>
                <div className="relative" ref={majorDropdownRef}>
                  <button
                    type="button"
                    onClick={() => toggleMajorDropdown("majorOpen")}
                    disabled={!selectedMajorInfo.department}
                    className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between w-full h-10 ${
                      !selectedMajorInfo.department
                        ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        selectedMajorInfo.major
                          ? "text-gray-900 dark:text-gray-200"
                          : "text-gray-400"
                      }
                    >
                      {getDisplayText("major")}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transform transition-transform ${
                        majorDropdownState.majorOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {majorDropdownState.majorOpen &&
                    selectedMajorInfo.department && (
                      <div
                        className="absolute z-20 w-full mt-1 bg-white border border-gray-300 
                      rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 
                      max-h-60 overflow-y-auto"
                      >
                        {availableMajors.map((major) => (
                          <button
                            key={major.id}
                            type="button"
                            onClick={() => selectMajor(major.id)}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 
                       dark:hover:bg-cert-red cursor-pointer"
                          >
                            {major.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* 소개 */}
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-200">소개</p>
            <textarea
              value={editedUser.description ?? ""}
              onChange={onChange("description")}
              className="w-full h-16 text-sm rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              placeholder="간단한 소개를 입력하세요"
            />
          </div>

          {/* 기술스택 */}
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-200">기술스택</p>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              placeholder="React, Node.js, Python (쉼표로 구분)"
            />
          </div>

          {/* 이메일 및 링크 */}
          <details className="group rounded-lg border border-gray-300 dark:border-gray-600">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm text-gray-800 dark:text-gray-200 flex items-center justify-between">
              이메일 및 링크 (펼쳐서 수정)
              <span className="transition-transform group-open:rotate-180">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </span>
            </summary>

            <div className="px-4 pb-4 grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">이메일</p>
                <input
                  type="email"
                  value={editedUser.email ?? ""}
                  onChange={onChange("email")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">GitHub URL</p>
                <input
                  type="url"
                  value={editedUser.githubUrl ?? ""}
                  onChange={onChange("githubUrl")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <p className="text-sm mb-1.5 dark:text-gray-200">
                  LinkedIn URL
                </p>
                <input
                  type="url"
                  value={editedUser.linkedinUrl ?? ""}
                  onChange={onChange("linkedinUrl")}
                  className="text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>
            </div>
          </details>

          {/* 미리보기 */}
          <div className="mt-2 p-4 flex flex-col border rounded-lg bg-gray-50 border-gray-200 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-900 mb-2 dark:text-gray-200">
              미리보기
            </h4>
            <div className="p-6 rounded-lg border text-card-foreground shadow-sm bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              {/* 프로필 아바타 */}
              <div className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12 mx-auto mb-2 border border-gray-200 dark:border-gray-600">
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
                      <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs w-full h-full flex items-center justify-center rounded-full">
                        {editedUser.name?.[0] || "사진"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center pb-1 text-black dark:text-gray-200">
                {editedUser.name}
              </div>
              <div className="flex justify-center mt-1">
                <DefaultBadge
                  variant="custom"
                  className={getRoleBadgeStyle(role)}
                >
                  {role}
                </DefaultBadge>
              </div>
              <div className="text-xs text-center text-gray-500 mt-2 dark:text-gray-300">
                <p>
                  {editedUser.memberGrade} •{" "}
                  {[
                    selectedMajorInfo.college
                      ? getMajorUtils.getCollegeName(selectedMajorInfo.college)
                      : null,
                    selectedMajorInfo.department
                      ? getMajorUtils.getDepartmentName(
                          selectedMajorInfo.department,
                        )
                      : null,
                    selectedMajorInfo.major
                      ? getMajorUtils.getMajorName(selectedMajorInfo.major)
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" - ")}{" "}
                </p>
              </div>
              <div className="text-xs text-center text-gray-600 mt-3 dark:text-gray-300">
                {editedUser.description}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2 dark:text-gray-300 transition-colors duration-300 mt-4">
                  기술 스택
                </p>
                <div className="flex flex-wrap gap-1">
                  {editedUser.skills?.map((skill) => (
                    <DefaultBadge
                      key={skill}
                      variant="outline"
                      className="text-xs bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-400"
                    >
                      {skill}
                    </DefaultBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 sticky bottom-0 dark:border-gray-700">
          <div className="flex justify-end gap-2">
            <DefaultButton variant="outline" onClick={closeModal}>
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
