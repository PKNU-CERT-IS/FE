import SCAuthBackGround from "@/components/auth/SCAuthBackGround";
import SCSignUpContainer from "@/components/auth/signup/SCSignUpContainer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-12 transition-colors duration-300">
      <SCAuthBackGround />
      <SCSignUpContainer />
    </div>
  );
}
