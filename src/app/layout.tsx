import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/layouts/footer";
import NavigationBar from "@/layouts/navigationBar";

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
    <html lang="en">
      <body className="overscroll-none flex flex-col min-h-screen">
        <header>
          <NavigationBar />
        </header>
        <main className="flex-1">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
