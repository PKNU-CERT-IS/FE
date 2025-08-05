"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const penaltyData = [
  { score: "3점", count: 2 },
  { score: "2점", count: 4 },
  { score: "1점", count: 8 },
];

const scoreColorMap: Record<string, string> = {
  "3점": "#7f0000",
  "2점": "#e53935",
  "1점": "#ef5350",
};

export default function CCPenaltyBarChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={penaltyData}
          barCategoryGap="30%"
          margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="score"
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
                    <p className="text-red-500 font-semibold">
                      {label} : {payload[0].value}명
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" barSize={70} radius={[8, 8, 0, 0]}>
            {penaltyData.map((entry) => (
              <Cell
                key={`cell-${entry.score}`}
                fill={scoreColorMap[entry.score]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
