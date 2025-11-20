import { Metadata } from "next";
import PageLayout from "@/layouts/pageLayout";
import TerminalSVG from "/public/icons/terminal.svg";

export const metadata: Metadata = {
  title: "Admin | Study / Project",
  description: "스터디와 프로젝트를 관리하는 곳입니다.",
};

export default function AdminStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Study / Project"}
        description={"스터디와 프로젝트를 관리하세요."}
        icon={<TerminalSVG className="stroke-cert-dark-red w-8 h-8" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
