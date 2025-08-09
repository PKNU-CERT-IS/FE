import { MembersDataType } from "@/types/members";

// Admin members type
export interface AdminMemberDetailInfoType extends MembersDataType {
  penalty: number;
  gracePeriod: string;
  currentProjects: string[];
  currentStudies: string[];
  studentId: string;
  birth: string;
  phone: string;
  gender: string;
}
