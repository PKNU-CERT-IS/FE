import PageLayout from "@/layouts/pageLayout";
import { Metadata } from "next";
import TerminalSVG from "/public/icons/terminal.svg";

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
