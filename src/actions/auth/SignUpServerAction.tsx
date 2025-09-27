"use server";

import { toOffsetDateTime, toGenderCode } from "@/utils/transformRequestValue";

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const studentNumber = formData.get("studentId") as string;
  const grade = formData.get("grade") as string;
  const rawGender = formData.get("gender") as string;
  const rawBirthday = formData.get("birthDate") as string;
  const phoneNumber = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const accountNumber = formData.get("id") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const birthday = toOffsetDateTime(rawBirthday);
  const gender = toGenderCode(rawGender);

  if (password !== confirmPassword) {
    return { success: false, message: "비밀번호가 일치하지 않습니다." };
  }

  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      accountNumber,
      password,
      studentNumber,
      grade,
      major,
      phoneNumber,
      email,
      birthday,
      gender,
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    return { success: false, message: data?.message || "회원가입 실패" };
  }

  return { success: true };
}
