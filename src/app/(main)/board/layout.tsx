import PageLayout from "@/layouts/pageLayout";
import { Metadata } from "next";
import ShieldSVG from "/public/icons/shield.svg";

export const metadata: Metadata = {
  title: "Security Board",
  description: "Security Board Layout",
};

export default function BoardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Security Board"}
        description={"보안 정보와 기술 자료를 공유하는 전문 게시판입니다."}
        icon={<ShieldSVG className="stroke-cert-dark-red" />}
      >
        {children}
        {modal}
      </PageLayout>
    </div>
  );
}
