import PageLayout from "@/layouts/pageLayout";
import ProfileSVG from "/public/icons/profile.svg";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Profile"}
        description={"개인 정보와 활동 내역을 관리하세요."}
        icon={<ProfileSVG className="w-8 stroke-cert-dark-red" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
