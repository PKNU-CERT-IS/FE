import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cert-is.com';

  return {
    rules: {
      userAgent: '*', // 모든 로봇 허용
      allow: '/',     // 모든 페이지 접근 허용
      disallow: '/admin/', // (예시) 관리자 페이지 등 숨길 경로
    },
    sitemap: `${baseUrl}/sitemap.xml`, // 👈 여기가 핵심!
  };
}