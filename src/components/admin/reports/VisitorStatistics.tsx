"use client";

import React from "react";
import { Users, Clock, TrendingUp, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { StatCard } from "./ReportComponents";

export function VisitorStatistics({ data }: { data: any }) {
  const totalVisits = data?.totalVisits?.count || 0;
  const avgDuration = data?.avgDuration || "N/A";
  const peakHours = data?.peakHours || "N/A";
  const frequentVisitors = data?.frequentVisitors || 0;

  const visitorTrend = data?.visitorTrend || [];
  const approved = data?.requestStatus?.approved || 0;
  const pending = data?.requestStatus?.pending || 0;
  const rejected = data?.requestStatus?.rejected || 0;

  const trendData = visitorTrend.map((item: any) => ({
    date: item.date,
    visits: item.count,
  }));

  const pieData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const PIE_COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-slate-600">
          Operational insights and compliance monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-slate-600" />}
          label="Total Visits"
          value={totalVisits.toString()}
          change=""
          subChange=""
          changePositive
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-slate-600" />}
          label="Avg Duration"
          value={avgDuration}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
          label="Peak Hours"
          value={peakHours}
        />
        <StatCard
          icon={<Eye className="w-6 h-6 text-slate-600" />}
          label="Frequent Visitors"
          value={frequentVisitors.toString()}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Visitor Trend */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Visitor Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Status */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Request Status</h3>
          <div className="flex items-center justify-center h-64">
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
            </PieChart>

            <div className="ml-8 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">
                  Approved {approved}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-slate-600">
                  Pending {pending}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-600">
                  Rejected {rejected}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visits Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Recent Visits</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Visitor
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Student
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Purpose
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Entry Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Exit Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.recentVisits?.length ? (
                data.recentVisits.map((visit: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.date || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.visitorName || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.studentName || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.purpose || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.entryTime || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.exitTime || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {visit.duration || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 text-center text-slate-500"
                  >
                    No visits found for selected date range
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}