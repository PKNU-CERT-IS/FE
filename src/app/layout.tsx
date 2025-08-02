import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CERT-IS",
  description: "CERT-IS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="overscroll-none">
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
