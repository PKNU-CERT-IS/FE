import PageLayout from "@/layouts/pageLayout";
import ScheduleSVG from "/public/icons/schedule.svg";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageLayout
        title={"Schedule"}
        description={"동아리 일정을 관리하는 공간입니다."}
        icon={<ScheduleSVG width={32} className="stroke-cert-dark-red" />}
      >
        {children}
      </PageLayout>
    </div>
  );
}
