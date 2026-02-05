import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AuthInitializer from "@/components/auth/AuthInitializer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  title: {
    default: "CERT-IS (CERTIS)",
    template: "%s | CERT-IS",
  },
  description: "CERT-IS 공식 웹사이트",
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_KEY}`,
  },
  openGraph: {
    title: "CERT-IS (CERTIS)",
    description: "CERT-IS 공식 웹사이트",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "CERT-IS",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CERT-IS 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CERT-IS",
    description: "CERT-IS 공식 웹사이트",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body className="overscroll-none">
        <AuthInitializer />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <div id="modal-root"></div>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
      </body>
    </html>
  );
}
