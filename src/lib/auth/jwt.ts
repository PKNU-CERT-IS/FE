import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET?.substring(0, 32)
);
// const JWT_ISSUER = "spring-app";
// const JWT_AUDIENCE = "nextjs-app";

export interface JwtPayload {
  sub: string; // user id
  role: string; // ROLE_UPSOLVER, ROLE_ADMIN 등
  name: string; // 실제 이름
  type: string; // "access"
  email: string;
  username: string; // 학번 (202500001)
  iat: number; // 발급 시간
  exp: number; // 만료 시간
  iss?: string;
  aud?: string;
}

// spring boot 에서 발급한 jwt 토큰 검증
export async function verifyJwt(token: string): Promise<JwtPayload> {
  try {
    const { payload } = (await jwtVerify(
      token,
      JWT_SECRET
      //   {
      //   issuer: JWT_ISSUER,
      //   audience: JWT_AUDIENCE,
      // }
    )) as { payload: JwtPayload };

    return payload as JwtPayload;
  } catch (error) {
    console.error("JWT verification error");
    throw error;
  }
}

// 관리자 권한 확인
export function isAdmin(payload: JwtPayload): boolean {
  const roles = [
    "ROLE_ADMIN",
    "ROLE_CHAIRMAN",
    "ROLE_VICECHAIRMAN",
    "ROLE_STAFF",
  ];
  return roles.includes(payload.role);
}

// 로그인 페이지 url 구분 (관리자 도메인, 사용자 도메인)
export function getLoginUrlByPath(pathname: string): string {
  if (pathname.startsWith("/admin")) {
    return "/admin/login";
  }
  return "/login";
}
