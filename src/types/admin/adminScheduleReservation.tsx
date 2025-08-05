import { ScheduleType } from "@/types/schedule";

export interface PendingReservationType {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: ScheduleType;
  applicant: string;
  status: string;
}
