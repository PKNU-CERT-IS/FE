"server-only";

import { mockProfileData } from "@/mocks/mockProfileData";
import WarningSVG from "/public/icons/warning.svg";

export default function SCPenaltyStatus() {
  return (
    <div className="mt-7">
      <div className="card-list text-card-foreground text-center group p-6 cursor-auto">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2 ">
          <WarningSVG className="w-5 h-5 text-cert-red" />
          벌점
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "현재 벌점",
              value: mockProfileData[0].penaltyPoint,
              color: "red-600",
            },
            {
              title: "벌점 유예 기간",
              value: "D - " + mockProfileData[0].penaltyPeriod,
              color: "red-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card-list text-card-foreground text-center group cursor-auto"
            >
              <div className="flex flex-col space-y-1.5 p-4">
                <div className="leading-none tracking-tight text-2xl font-bold text-cert-red transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 transition-colors duration-300">
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
