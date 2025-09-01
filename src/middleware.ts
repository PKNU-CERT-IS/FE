import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, isAdmin, getLoginUrlByPath } from "@/lib/auth/jwt";

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
  //   const { pathname } = req.nextUrl;
  //   //_next 경로란 Next.js가 빌드/실행 하면서 자동으로 붙이는 런타임 리소스 경로로 Next.js 내부에서 사용하는 파일들을 제공하는 경로입니다.
  //   if (PUBLIC_ROUTES.includes(pathname) || pathname.startsWith("/_next")) {
  //     return NextResponse.next();
  //   }
  //   const accessToken = req.cookies.get("accessToken")?.value;
  //   // accessToken이 없으면 도메인에 적절한 로그인 페이지로 리다이렉트
  //   if (!accessToken) {
  //     return redirectToLogin(req);
  //   }
  //   try {
  //     const payload = await verifyJwt(accessToken);
  //     // 관리자 페이지 접근 시 권한 확인
  //     if (pathname.startsWith("/admin") && !isAdmin(payload)) {
  //       const url = req.nextUrl.clone();
  //       url.pathname = "/403"; // 권한 없음 페이지로 리다이렉트
  //       return NextResponse.rewrite(url); // redirect 대신 SSR 렌더링
  //     }
  //     return NextResponse.next();
  //   } catch {
  //     return redirectToLogin(req);
  //   }
  // }
  // const redirectToLogin = (req: NextRequest) => {
  //   const loginUrl = getLoginUrlByPath(req.nextUrl.pathname);
  //   const url = req.nextUrl.clone();
  //   url.pathname = loginUrl;
  //   url.searchParams.set("returnTo", req.nextUrl.pathname + req.nextUrl.search); // 리다이렉트 후 돌아올 경로 설정
  //   return NextResponse.redirect(url);
}

// export const config = {
//   matcher: ["/((?!api|static|favicon.ico|public/).*)"], // api, static, favicon.ico, public 폴더는 미들웨어 적용 안함
// };
