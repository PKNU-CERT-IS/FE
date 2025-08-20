"use client";

import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
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
} from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import { useAuth } from "@/hooks/useAuth";
import { signupAction } from "@/actions/auth/SignUpServerAction";
import { GENDER_OPTIONS } from "@/types/login";
import { membersGradeCategories } from "@/types/members";

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

  const isSamePassword =
    signupFormData.password === signupFormData.confirmPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSignupField(name as keyof typeof signupFormData, value);
  };

  const selectedGradeLabel = signupFormData.grade || "학년을 선택해주세요";
  const selectedGenderLabel = signupFormData.gender || "성별을 선택해주세요";

  return (
    <form action={signupAction} className="space-y-4">
      {/* hidden inputs for server action */}
      <input type="hidden" name="grade" value={signupFormData.grade} />
      <input type="hidden" name="gender" value={signupFormData.gender} />
      {/* 이름 */}
      <div className="space-y-2">
        <label htmlFor="name" className="font-medium text-gray-700">
          이름
        </label>
        <div className="relative">
          <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={signupFormData.name}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="홍길동"
            required
          />
        </div>
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* 아이디 */}
      <div className="space-y-2">
        <label htmlFor="id" className="font-medium text-gray-700">
          아이디
        </label>
        <div className="relative">
          <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="id"
            name="id"
            type="text"
            value={signupFormData.id}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.id ? "border-red-500" : ""
            }`}
            placeholder="example"
            required
          />
        </div>
        {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-2">
        <label htmlFor="password" className="font-medium text-gray-700">
          비밀번호
        </label>
        <div className="relative">
          <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={signupFormData.password}
            onChange={handleInputChange}
            className={`h-10 pl-10 pr-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="최소 8자 이상"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
        <label htmlFor="confirmPassword" className="font-medium text-gray-700">
          비밀번호 확인
        </label>
        <div className="relative">
          <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={signupFormData.confirmPassword}
            onChange={handleInputChange}
            className={`h-10 pl-10 pr-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.confirmPassword || !isSamePassword ? "border-red-500" : ""
            }`}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
          <p className="text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      {/* 학번 */}
      <div className="space-y-2">
        <label htmlFor="studentId" className="font-medium text-gray-700">
          학번
        </label>
        <div className="relative">
          <IdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="studentId"
            name="studentId"
            type="text"
            value={signupFormData.studentId}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.studentId ? "border-red-500" : ""
            }`}
            placeholder="2024123456"
            required
          />
        </div>
        {errors.studentId && (
          <p className="text-sm text-red-500">{errors.studentId}</p>
        )}
      </div>

      {/* 학년, 성별 (한 줄에 나란히) */}
      <div className="grid grid-cols-2 gap-4">
        {/* 학년 */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">학년</label>
          <div className="relative" ref={gradeDropdownRef}>
            <button
              type="button"
              onClick={() => setGradeDropdownOpen(!gradeDropdownOpen)}
              className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left flex items-center justify-between focus:border-cert-red focus:outline-none ${
                errors.grade ? "border-red-500" : ""
              }`}
            >
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                <span
                  className={
                    signupFormData.grade ? "text-gray-900" : "text-gray-400"
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
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {membersGradeCategories.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => selectGrade(grade)}
                    className="w-full px-3 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
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
          <label className="font-medium text-gray-700">성별</label>
          <div className="relative" ref={genderDropdownRef}>
            <button
              type="button"
              onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
              className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left flex items-center justify-between focus:border-cert-red focus:outline-none ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span
                  className={
                    signupFormData.gender ? "text-gray-900" : "text-gray-400"
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
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {GENDER_OPTIONS.map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => selectGender(gender)}
                    className="w-full px-3 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
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
        <label htmlFor="birthDate" className="font-medium text-gray-700">
          생년월일
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={signupFormData.birthDate}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm focus:border-cert-red focus:outline-none ${
              errors.birthDate ? "border-red-500" : ""
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
        <label htmlFor="phone" className="font-medium text-gray-700">
          전화번호
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={signupFormData.phone}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="010-1234-5678"
            required
          />
        </div>
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* 이메일 */}
      <div className="space-y-2">
        <label htmlFor="email" className="font-medium text-gray-700">
          이메일
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={signupFormData.email}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="example@gmail.com"
            required
          />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* 전공 */}
      <div className="space-y-2 pb-6">
        <label htmlFor="major" className="font-medium text-gray-700">
          전공
        </label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="major"
            name="major"
            type="text"
            value={signupFormData.major}
            onChange={handleInputChange}
            className={`h-10 pl-10 w-full rounded-md border border-gray-300 text-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-cert-red focus:outline-none ${
              errors.major ? "border-red-500" : ""
            }`}
            placeholder="예: 컴퓨터공학과"
            required
          />
        </div>
        {errors.major && <p className="text-sm text-red-500">{errors.major}</p>}
      </div>

      <DefaultButton
        type="submit"
        className="w-full h-12 text-white font-medium transition-all duration-300 shadow-lg cursor-pointer hover:shadow-xl"
      >
        <UserPlus className="w-4 h-4 mr-1" />
        회원가입
      </DefaultButton>
    </form>
  );
}
