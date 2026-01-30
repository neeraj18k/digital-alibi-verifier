import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ActivityChart = ({ timeline }) => {
  const data = timeline.map((event) => ({
    time: new Date(event.timestamp).toLocaleTimeString(),
    activity: 1
  }));

  return (
    <div style={{ width: "100%", height: 250 }}>
      <h3>Digital Activity Pattern</h3>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="activity" stroke="#00f2ff" fill="#00f2ff33" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
