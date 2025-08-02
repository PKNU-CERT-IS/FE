import SCAdminLogin from "@/components/admin/adminLogin";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-12 transition-colors duration-300">
      <SCAdminLogin />
    </div>
  );
}
