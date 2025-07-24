import PageLayout from "@/layouts/pageLayout";
import { Metadata } from "next";
import ChatLargeSVG from "/public/icons/chat-large.svg";

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
        title={"Blog"}
        description={"동아리 멤버들의 경험과 지식을 공유하는 공간입니다."}
        icon={<ChatLargeSVG />}
      >
        {children}
        {modal}
      </PageLayout>
    </div>
  );
}
