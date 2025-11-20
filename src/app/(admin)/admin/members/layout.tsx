import { Metadata } from "next";
import PageLayout from "@/layouts/pageLayout";
import MembersSVG from "/public/icons/members.svg";

export const metadata: Metadata = {
  title: "Admin | Members",
  description: "회원 정보를 관리하는 공간입니다.",
};

export default function AdminMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Members"}
        description={"회원 정보와 벌점을 관리하세요."}
        icon={<MembersSVG className="stroke-cert-dark-red w-8 h-8" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
