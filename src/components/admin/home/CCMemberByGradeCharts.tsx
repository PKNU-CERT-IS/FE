"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { MemberGrade } from "@/types/study";
import { getGradeChartData } from "@/utils/membersUtils";

interface CCGradeBarChartProps {
  members: AdminMemberDetailInfoType[];
}

const gradeColorMap: Record<MemberGrade, string> = {
  FRESHMAN: "#7f0000",
  SOPHOMORE: "#dc2626",
  JUNIOR: "#e53935",
  SENIOR: "#ef5350",
  GRADUATED: "#fca5a5",
  LEAVE: "#e2e8f0",
  NONE: "#f1f5f9",
};

export default function CCMemberByGradeCharts({
  members,
}: CCGradeBarChartProps) {
  const gradeData = getGradeChartData(members);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={gradeData}
          barCategoryGap="30%"
          margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 14 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip
            cursor={false}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length > 0) {
                return (
                  <div className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-md">
                    <p className="font-semibold text-cert-red">
                      {label} : {payload[0].value}명
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" barSize={70} radius={[8, 8, 0, 0]}>
            {gradeData.map((entry) => (
              <Cell
                key={`cell-${entry.grade}`}
                fill={gradeColorMap[entry.grade]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
