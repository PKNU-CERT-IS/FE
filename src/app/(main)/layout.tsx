import Footer from "@/layouts/footer";
import NavigationBar from "@/layouts/navigationBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
