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
        title={"Study"}
        description={"보안 연구 자료와 학습 리소스를 공유하는 공간입니다."}
        icon={<TerminalSVG className="stroke-cert-dark-red" />}
      >
        {children}
        {modal}
      </PageLayout>
    </div>
  );
}
