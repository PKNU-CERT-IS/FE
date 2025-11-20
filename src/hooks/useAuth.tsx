import { useEffect, useRef, useState } from "react";
import { GenderType, LoginFormData, SignupFormData } from "@/types/login";
import { MembersGradeCategoryType } from "@/types/members";

export const useAuth = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    id: "",
    password: "",
    rememberId: false,
    autoLogin: false,
  });

  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    grade: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    major: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gradeDropdownOpen, setGradeDropdownOpen] = useState<boolean>(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState<boolean>(false);
  const isSamePassword =
    signupFormData.password === signupFormData.confirmPassword;

  const updateSignupField = (field: keyof SignupFormData, value: string) => {
    setSignupFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // 학년 선택
  const selectGrade = (grade: MembersGradeCategoryType) => {
    updateSignupField("grade", grade);
    setGradeDropdownOpen(false);
  };

  // 성별 선택
  const selectGender = (gender: GenderType) => {
    updateSignupField("gender", gender);
    setGenderDropdownOpen(false);
  };

  // 드롭 다운 ref
  const gradeDropdownRef = useRef<HTMLDivElement>(null);
  const genderDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gradeDropdownRef.current &&
        !gradeDropdownRef.current.contains(event.target as Node)
      ) {
        setGradeDropdownOpen(false);
      }
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target as Node)
      ) {
        setGenderDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    loginFormData,
    setLoginFormData,
    signupFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSamePassword,
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
  };
};
