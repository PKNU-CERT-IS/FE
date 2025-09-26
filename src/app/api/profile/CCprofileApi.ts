import { apiClient } from "@/lib/clientIntercept";

export interface ProfileUpdateRequest {
  name?: string;
  description?: string;
  profileImage?: string;
  major?: string;
  birthday?: string; // OffsetDateTime → string (ISO 8601, e.g. "2025-09-20T09:55:17.306Z")
  phoneNumber?: string;
  studentNumber?: string;
  skills?: string[];
  grade?: string; // MemberGrade (Enum)
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export async function updateProfile(request: ProfileUpdateRequest) {
  const res = await apiClient.put("/profile/me", request);
  return res.data;
}
