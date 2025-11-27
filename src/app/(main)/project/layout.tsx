import { Metadata } from "next";
import PageLayout from "@/layouts/pageLayout";
import TerminalSVG from "/public/icons/terminal.svg";

export const metadata: Metadata = {
  title: "CERT-IS Project",
  description: "CERT-IS Project Layout",
};

export default function ProjectLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Project"}
        description={"다양한 보안 프로젝트와 연구 결과를 공유하는 공간입니다."}
        icon={<TerminalSVG className="stroke-cert-dark-red" />}
      >
        {children}
        {modal}
      </PageLayout>
    </div>
  );
}
