import PageLayout from "@/layouts/pageLayout";
import MembersSVG from "/public/icons/members.svg";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Members",
  description: "우리 동아리의 멋진 멤버들을 소개합니다.",
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Members"}
        description={"우리 동아리의 멋진 멤버들을 소개합니다."}
        icon={<MembersSVG />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
