import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 배포된 도메인 주소
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cert-is.com';

  return [
    {
      url: baseUrl, // 메인 페이지
      lastModified: new Date(),
      changeFrequency: 'weekly', // 변경 빈도 (daily, weekly, monthly 등)
      priority: 1, // 중요도 (1이 최대, 0이 최소)
    },
    {
      url: `${baseUrl}/schedule`, // 일정 페이지
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/board`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/study`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}