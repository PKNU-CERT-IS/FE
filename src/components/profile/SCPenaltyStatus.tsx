"server-only";

import { mockProfileData } from "@/mocks/mockProfileData";
import WarningSVG from "/public/icons/warning.svg";

export default function SCPenaltyStatus() {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2 transition-colors duration-300">
        <WarningSVG className="w-5 h-5 text-red-600" />
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
            className="rounded-lg border text-card-foreground shadow-sm text-center bg-white border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="leading-none tracking-tight text-2xl font-bold text-red-600 group-hover:scale-105 transition-transform duration-300">
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
  );
}
