import { cookies } from "next/headers";
import { verifyJwt, JwtPayload } from "@/lib/auth/jwt";

export async function getCurrentUser(): Promise<JwtPayload | null> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;

  try {
    const payload = await verifyJwt(token);
    return payload;
  } catch {
    return null;
  }
}
