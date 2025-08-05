import PageLayout from "@/layouts/pageLayout";
import ScheduleSVG from "/public/icons/schedule.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Schedule",
  description: "동아리 일정을 관리하는 공간입니다.",
};

export default function AdminScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Schedule"}
        description={"CERT-IS 일정을 관리하세요."}
        icon={<ScheduleSVG className="stroke-cert-dark-red w-8 h-8" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
