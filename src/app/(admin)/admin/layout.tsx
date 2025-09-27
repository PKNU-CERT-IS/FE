import CCTopButton from "@/components/ui/CCTopButton";
import AdminNavigationBar from "@/layouts/admin/adminNavigationBar";
import Footer from "@/layouts/footer";

export const metadata = {
  title: "Admin | CERT-IS",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavigationBar />
      <main className="flex-1">{children}</main>
      <footer>
        <Footer />
      </footer>
      <CCTopButton />
    </div>
  );
}
