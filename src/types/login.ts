import { MembersGradeCategoryType } from "@/types/members";

export interface LoginFormData {
  id: string;
  password: string;
  rememberId: boolean;
  autoLogin: boolean;
}

export const GENDER_OPTIONS = ["남", "여"] as const;
export type GenderType = (typeof GENDER_OPTIONS)[number] | "";

export interface SignupFormData {
  name: string;
  id: string;
  password: string;
  confirmPassword: string;
  studentId: string;
  grade: MembersGradeCategoryType;
  gender: GenderType;
  birthDate: string; // YYYY-MM-DD 형식
  phone: string;
  email: string;
  major: string; // 직접 입력
}
