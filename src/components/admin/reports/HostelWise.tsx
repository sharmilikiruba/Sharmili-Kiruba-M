"use client";

import React from "react";
import { HostelStat } from "./types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HostelWise({ data }: { data: HostelStat[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Hostel-wise Report
        </h1>
        <p className="text-slate-600">Visitor statistics per hostel</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        {data.map((hostel, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {hostel.name}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Total Visitors</span>
                <span className="text-lg font-bold">
                  {hostel.totalVisitors}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Peak Time</span>
                <span className="text-sm">{hostel.peakTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Compliance</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {hostel.compliance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6">
          Hostel Comparison (Visitors)
        </h3>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="totalVisitors"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}