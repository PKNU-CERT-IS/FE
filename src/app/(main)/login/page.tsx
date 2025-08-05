import SCAuthBackGround from "@/components/auth/SCAuthBackGround";
import SCLoginContainer from "@/components/auth/login/SCLoginContainer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-12 transition-colors duration-300">
      <SCAuthBackGround />
      <SCLoginContainer />
    </div>
  );
}
