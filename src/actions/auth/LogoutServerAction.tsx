"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
}
