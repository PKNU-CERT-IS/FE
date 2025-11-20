import { Metadata } from "next";
import PageLayout from "@/layouts/pageLayout";
import ChatLargeSVG from "/public/icons/chat.svg";

export const metadata: Metadata = {
  title: "Admin | Blog",
  description: "블로그를 관리하는 곳입니다.",
};

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Blog"}
        description={"스터디와 프로젝트 결과물을 관리하세요."}
        icon={<ChatLargeSVG className="stroke-cert-dark-red" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
