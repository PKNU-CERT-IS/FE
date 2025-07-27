"use client";

import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
import { Eye, EyeOff, IdCard, UserPlus } from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import { useAuth } from "@/hooks/useAuth";
import { signupAction } from "@/actions/auth/SignUpServerAction";

export default function CCSignUpForm() {
  const {
    signupFormData,
    setSignupFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
  } = useAuth();

  const isSamePassword =
    signupFormData.password === signupFormData.confirmPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form action={signupAction}>
      <div className="space-y-2">
        <label htmlFor="name" className="font-medium text-gray-700">
          이름
        </label>
        <div className="relative mt-2">
          <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={signupFormData.name}
            onChange={handleInputChange}
            className={`text-sm text-gray-700 pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.name ? "border-red-500 " : ""
            }`}
            placeholder="홍길동"
            required
          />
        </div>
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2 pt-3">
        <label htmlFor="studentId" className="font-medium text-gray-700">
          학번
        </label>
        <div className="relative mt-2">
          <IdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="studentId"
            name="studentId"
            type="number"
            value={signupFormData.studentId}
            onChange={handleInputChange}
            className={`text-sm text-gray-700 pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
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

      <div className="space-y-2 pt-3">
        <label htmlFor="id" className="font-medium text-gray-700">
          아이디
        </label>
        <div className="relative mt-2">
          <ProfileSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="id"
            name="id"
            value={signupFormData.id}
            onChange={handleInputChange}
            className={`text-sm text-gray-700 pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="example"
            required
          />
        </div>
        {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
      </div>

      <div className="space-y-2 pt-3">
        <label htmlFor="password" className="font-medium text-gray-700">
          비밀번호
        </label>
        <div className="relative mt-2">
          <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={signupFormData.password}
            onChange={handleInputChange}
            className={`text-sm text-gray-700 pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
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

      <div className="space-y-2 pt-3 pb-6">
        <label htmlFor="confirmPassword" className="font-medium text-gray-700">
          비밀번호 확인
        </label>
        <div className="relative mt-2">
          <LockSVG className="absolute left-3 top-3 h-4 w-4 stroke-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={signupFormData.confirmPassword}
            onChange={handleInputChange}
            className={`text-sm text-gray-700 pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
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

      <DefaultButton
        type="submit"
        className="w-full h-12 text-white font-medium transition-all duration-300 shadow-lg cursor-pointer hover:shadow-xl "
      >
        <UserPlus className="w-4 h-4 mr-1" />
        회원가입
      </DefaultButton>
    </form>
  );
}
