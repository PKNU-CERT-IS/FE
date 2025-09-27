import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, isAdmin, getLoginUrlByPath } from "@/lib/auth/jwt";
import { errors } from "jose";

// 공개 라우트 (인증 불필요)
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/admin/login",
  "/blog",
  "/members",
  "/403",
  "/404",
  "/signup",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Next.js 내부 리소스 경로나 공개 라우트는 통과
  if (PUBLIC_ROUTES.includes(pathname) || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // accessToken, refreshToken 없으면 로그인으로 리다이렉트
  if (!accessToken || !refreshToken) {
    return redirectToLogin(req);
  }

  try {
    // accessToken 유효성 검증
    const payload = await verifyJwt(accessToken);

    // 관리자 페이지 접근 시 권한 확인
    if (pathname.startsWith("/admin") && !isAdmin(payload)) {
      const url = req.nextUrl.clone();
      url.pathname = "/403"; // 권한 없음 페이지로
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch (err) {
    // AccessToken 만료 → Refresh 시도
    if (err instanceof errors.JWTExpired) {
      console.log("AccessToken 만료됨 → Refresh 시도");

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const refreshRes = await fetch(`${API_URL}/auth/token/refresh`, {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });

        if (!refreshRes.ok) {
          console.error("Refresh 실패:", refreshRes.status);
          const res = redirectToLogin(req);
          res.cookies.delete("accessToken");
          res.cookies.delete("refreshToken");
          return res;
        }

        const body = await refreshRes.json();
        const newAccessToken = body.data.accessToken;

        //  새 accessToken 갱신
        const res = NextResponse.next();
        res.cookies.set("accessToken", newAccessToken, {
          httpOnly: false,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60, // 60초 * 60 = 1시간
        });

        return res;
      } catch (refreshErr) {
        console.error("Refresh 중 예외:", refreshErr);
        const res = redirectToLogin(req);
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        return res;
      }
    }

    // 그 외 검증 실패
    console.error("JWT 검증 실패:", err);
    return redirectToLogin(req);
  }
}

const redirectToLogin = (req: NextRequest) => {
  const loginUrl = getLoginUrlByPath(req.nextUrl.pathname);
  const url = req.nextUrl.clone();
  url.pathname = loginUrl;
  url.searchParams.set("returnTo", req.nextUrl.pathname + req.nextUrl.search); // 리다이렉트 후 돌아올 경로
  return NextResponse.redirect(url);
};

export const config = {
  matcher: ["/((?!api|static|favicon.ico|public/).*)"],
  // api, static, favicon.ico, public 폴더는 미들웨어 적용 안함
};
