"use server";

import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const studentId = formData.get("studentId") as string;
  const grade = formData.get("grade") as string;
  const gender = formData.get("gender") as string;
  const birthDate = formData.get("birthDate") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // 유효성 검사 예시
  if (!name || !id || !password || !confirmPassword || !studentId) {
    throw new Error("모든 항목을 입력해주세요.");
  }
  if (studentId.length !== 9) {
    throw new Error("전체 학번을 입력해주세요.");
  }

  if (password !== confirmPassword) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  if (password.length < 8) {
    throw new Error("비밀번호는 최소 8자 이상이어야 합니다.");
  }

  // 학년 검증
  const validGrades = ["1학년", "2학년", "3학년", "4학년", "졸업생", "휴학생"];
  if (!grade || !validGrades.includes(grade)) {
    throw new Error("학년을 선택해주세요.");
  }

  // 성별 검증
  const validGenders = ["남", "여"];
  if (!gender || !validGenders.includes(gender)) {
    throw new Error("성별을 선택해주세요.");
  }

  // 검증 (빈 문자열 체크)
  if (!major.trim()) {
    throw new Error("전공을 입력해주세요.");
  }

  if (!birthDate.trim()) {
    throw new Error("생년월일을 입력해주세요.");
  }

  if (!phone.trim()) {
    throw new Error("전화번호를 입력해주세요.");
  }

  if (!email.trim()) {
    throw new Error("이메일을 입력해주세요.");
  }

  // 실제 가입 로직: DB 저장, 중복 체크 등
  redirect("/login");
}
