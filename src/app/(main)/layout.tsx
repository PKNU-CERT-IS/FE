import Footer from "@/layouts/footer";
import NavigationBar from "@/layouts/navigationBar";
import CCThemeSwitch from "@/components/ui/CCThemeSwitch";
import CCTopButton from "@/components/ui/CCTopButton";

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
      <CCThemeSwitch />
      <CCTopButton />
    </div>
  );
}
