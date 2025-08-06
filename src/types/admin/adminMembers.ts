import {
  MembersDataType,
  MembersGradeCategoryType,
  MembersRoleCategoryType,
} from "@/types/members";

export interface MemberExtended extends MembersDataType {
  penalty: number;
  gracePeriod: string;
  currentProjects: string[];
  currentStudies: string[];
  studentId: string;
  birth: string;
  phone: string;
  gender: string;
}
export interface Member {
  id: number;
  name: string;
  studentId: string;
  grade: MembersGradeCategoryType;
  gender: "남" | "여";
  birth: string;
  phone: string;
  email: string;
  role: MembersRoleCategoryType;
  major: string;
  penalty: number;
  gracePeriod: string;
  currentStudies: string[];
  currentProjects: string[];
}
