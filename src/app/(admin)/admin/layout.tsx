import AdminNavigationBar from "@/layouts/admin/adminNavigationBar";

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
    </div>
  );
}
