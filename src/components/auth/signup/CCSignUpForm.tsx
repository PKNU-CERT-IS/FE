"use client";

import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  IdCard,
  UserPlus,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  User,
  Loader2,
} from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import { useAuth } from "@/hooks/useAuth";
import { signupAction } from "@/actions/auth/SignUpServerAction";
import { GENDER_OPTIONS } from "@/types/login";
import { membersGradeCategories } from "@/types/members";
import AlertModal from "@/components/ui/defaultAlertModal";
import { useState, useTransition, useEffect } from "react";

export default function CCSignUpForm() {
  const {
    signupFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    gradeDropdownOpen,
    setGradeDropdownOpen,
    genderDropdownOpen,
    setGenderDropdownOpen,
    updateSignupField,
    selectGrade,
    selectGender,
    gradeDropdownRef,
    genderDropdownRef,
  } = useAuth();

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [formattedPhone, setFormattedPhone] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // signupFormData.phone이 변경될 때 formattedPhone 업데이트
  useEffect(() => {
    if (signupFormData.phone) {
      setFormattedPhone(formatPhoneNumber(signupFormData.phone));
    }
  }, [signupFormData.phone]);

  const isSamePassword =
    signupFormData.password === signupFormData.confirmPassword;

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string): string => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, "");

    // 빈 문자열이면 그대로 반환
    if (!numbers) return "";

    // 길이에 따른 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 전화번호 필드인 경우 포맷팅 적용
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormattedPhone(formattedPhone);
      // 숫자만 추출해서 원본 데이터에 저장 (서버 전송용)
      const numbersOnly = formattedPhone.replace(/\D/g, "");
      updateSignupField(name as keyof typeof signupFormData, numbersOnly);
    } else {
      updateSignupField(name as keyof typeof signupFormData, value);
    }
  };

  const selectedGradeLabel = signupFormData.grade || "학년을 선택해주세요";
  const selectedGenderLabel = signupFormData.gender || "성별을 선택해주세요";

  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await signupAction(formData);

      if (result.success) {
        router.push("/login");
      } else {
        setAlertOpen(false);
        setTimeout(() => {
          setAlertMessage(result.message);
          setAlertOpen(true);
        }, 100);
      }
    });
  }

  return (
    <>
      <form action={handleSubmit} className="space-y-4 flex flex-col gap-2">
        {/* hidden inputs for server action */}
        <input type="hidden" name="grade" value={signupFormData.grade} />
        <input type="hidden" name="gender" value={signupFormData.gender} />
        <input type="hidden" name="phone" value={signupFormData.phone} />

        {/* 이름 */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            이름
          </label>
          <div className="relative mt-1">
            <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400 dark:stroke-cert-red" />
            <input
              id="name"
              name="name"
              type="text"
              value={signupFormData.name}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.name ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="홍길동"
              required
            />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* 아이디 */}
        <div className="space-y-2">
          <label
            htmlFor="id"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            아이디
          </label>
          <div className="relative mt-1">
            <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400 dark:stroke-cert-red" />
            <input
              id="id"
              name="id"
              type="text"
              value={signupFormData.id}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.id ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="example"
              required
            />
          </div>
          {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            비밀번호
          </label>
          <div className="relative mt-1">
            <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400 dark:stroke-cert-red" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={signupFormData.password}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.password ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="최소 8자 이상"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            비밀번호 확인
          </label>
          <div className="relative mt-1">
            <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400 dark:stroke-cert-red" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={signupFormData.confirmPassword}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.confirmPassword || !isSamePassword
                  ? "border-red-500"
                  : "dark:border-gray-600"
              }`}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
          {!isSamePassword && (
            <p className="text-sm text-red-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        {/* 학번 */}
        <div className="space-y-2">
          <label
            htmlFor="studentId"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            학번
          </label>
          <div className="relative mt-1">
            <IdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:stroke-cert-red" />
            <input
              id="studentId"
              name="studentId"
              type="text"
              value={signupFormData.studentId}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.studentId ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="2024123456"
              required
            />
          </div>
          {errors.studentId && (
            <p className="text-sm text-red-500">{errors.studentId}</p>
          )}
        </div>

        {/* 학년, 성별 */}
        <div className="grid grid-cols-2 gap-4 ">
          {/* 학년 */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-200">
              학년
            </label>
            <div className="relative mt-1" ref={gradeDropdownRef}>
              <button
                type="button"
                onClick={() => setGradeDropdownOpen(!gradeDropdownOpen)}
                className={`input-default  px-3 py-2 text-sm text-left flex items-center justify-between cursor-pointer ${
                  errors.grade ? "border-red-500" : "dark:border-gray-600"
                }`}
              >
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 text-gray-400 dark:stroke-cert-red mr-2" />
                  <span
                    className={
                      signupFormData.grade
                        ? "text-gray-900 dark:text-gray-200"
                        : "text-gray-400"
                    }
                  >
                    {selectedGradeLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transform transition-transform ${
                    gradeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {gradeDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                  {membersGradeCategories.map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => selectGrade(grade)}
                      className="w-full px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red first:rounded-t-md last:rounded-b-md cursor-pointer"
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.grade && (
              <p className="text-sm text-red-500">{errors.grade}</p>
            )}
          </div>

          {/* 성별 */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-200">
              성별
            </label>
            <div className="relative mt-1" ref={genderDropdownRef}>
              <button
                type="button"
                onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between cursor-pointer ${
                  errors.gender ? "border-red-500" : "dark:border-gray-600"
                }`}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 dark:stroke-cert-red mr-2" />
                  <span
                    className={
                      signupFormData.gender
                        ? "text-gray-900 dark:text-gray-200"
                        : "text-gray-400"
                    }
                  >
                    {selectedGenderLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transform transition-transform ${
                    genderDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {genderDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                  {GENDER_OPTIONS.map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => selectGender(gender)}
                      className="w-full px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red first:rounded-t-md last:rounded-b-md cursor-pointer"
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>
        </div>

        {/* 생년월일 */}
        <div className="space-y-2">
          <label
            htmlFor="birthDate"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            생년월일
          </label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:stroke-cert-red" />
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              max="9999-12-31"
              value={signupFormData.birthDate}
              onChange={handleInputChange}
              className={`h-10 pl-10  w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm focus:border-cert-red focus:outline-none cursor-pointer ${
                errors.birthDate
                  ? "border-red-500"
                  : "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              }`}
              required
            />
          </div>
          {errors.birthDate && (
            <p className="text-sm text-red-500">{errors.birthDate}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            전화번호
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:stroke-cert-red" />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formattedPhone}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.phone ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="010-1234-5678"
              maxLength={13} // 010-1234-5678 최대 길이
              required
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* 이메일 */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            이메일
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:stroke-cert-red" />
            <input
              id="email"
              name="email"
              type="email"
              value={signupFormData.email}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.email ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="example@gmail.com"
              required
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* 전공 */}
        <div className="space-y-2 pb-6">
          <label
            htmlFor="major"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            전공
          </label>
          <div className="relative mt-1">
            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:stroke-cert-red" />
            <input
              id="major"
              name="major"
              type="text"
              value={signupFormData.major}
              onChange={handleInputChange}
              className={`input-default pl-10 ${
                errors.major ? "border-red-500" : "dark:border-gray-600"
              }`}
              placeholder="예: 컴퓨터공학과"
              required
            />
          </div>
          {errors.major && (
            <p className="text-sm text-red-500">{errors.major}</p>
          )}
        </div>

        <DefaultButton
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-white font-medium transition-all duration-300 shadow-lg cursor-pointer hover:shadow-xl flex justify-center items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              회원가입 중...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-1" />
              회원가입
            </>
          )}
        </DefaultButton>
      </form>
      <AlertModal
        key={alertMessage}
        isOpen={alertOpen}
        message={alertMessage}
        type="error"
        duration={6000}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
