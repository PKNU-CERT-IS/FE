import { MembersDataType } from "@/types/members";

// Admin members type
export interface AdminMemberDetailInfoType extends MembersDataType {
  role: string;
  penalty: number;
  gracePeriod?: string;
  currentProjects: string[];
  currentStudies: string[];
  birthday: string;
  phoneNumber: string;
  gender: string;
}
