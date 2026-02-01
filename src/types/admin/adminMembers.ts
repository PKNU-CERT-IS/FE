import { MembersDataType } from "@/types/members";

// Admin members type
export interface AdminMemberDetailInfoType extends MembersDataType {
  role: string;
  gracePeriod?: string;
  activeProjects: string[];
  activeStudies: string[];
  birthday: string;
  phoneNumber: string;
  gender: string;
  grade: string;
  memberId: number;
  createdAt: string;
}
