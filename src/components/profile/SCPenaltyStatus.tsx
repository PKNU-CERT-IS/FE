"server-only";

import { getDDay } from "@/utils/dateUtils";
import { getProfile } from "@/app/api/profile/SCprofileApi";
import WarningSVG from "/public/icons/warning.svg";

export default async function SCPenaltyStatus() {
  const profile = await getProfile();
  return (
    <div className="mt-7">
      <div className="card-list text-card-foreground text-center group p-6 cursor-default dark-default">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2 dark:text-gray-200">
          <WarningSVG className="w-5 h-5 text-cert-red" />
          벌점
        </h3>

        <div className="flex flex-row gap-4">
          {[
            {
              title: "현재 벌점",
              value: profile.penaltyCount,
              color: "red-600",
            },
            {
              title: "벌점 유예 기간",
              value:
                profile.memberRole === "STAFF"
                  ? getDDay(profile.gracePeriod)
                  : "-",
              color: "red-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="w-1/2 card-list text-card-foreground text-center group cursor-default dark:border-gray-700"
            >
              <div className="flex flex-col space-y-1.5 p-4">
                <div className="leading-none tracking-tight text-2xl font-bold text-cert-red transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
                  {stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
