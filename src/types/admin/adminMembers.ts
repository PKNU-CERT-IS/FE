import { MembersDataType } from "@/types/members";

// Admin members type
export interface AdminMemberDetailInfoType extends MembersDataType {
  role: string;
  penalty: number;
  gracePeriod?: string;
  activeProjects: string[];
  activeStudies: string[];
  birthday: string;
  phoneNumber: string;
  gender: string;
  penaltyPoints: number;
  grade: string;
  memberId: number;
}
