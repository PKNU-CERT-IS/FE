"use server";

import { revalidatePath } from "next/cache";
import { ScheduleCreateRequest } from "@/types/schedule";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createSchedule(data: ScheduleCreateRequest) {
  // TODO: 실제 저장 로직
  revalidatePath("/admin");
}
