import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AuthInitializer from "@/components/auth/AuthInitializer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  title: "CERT-IS",
  description: "CERT-IS 공식 웹사이트",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
      </head>
      <body className="overscroll-none">
        <AuthInitializer />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
