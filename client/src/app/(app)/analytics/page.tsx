"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

export default function AnalyticsPage() {
  const [funnelData, setFunnelData] = useState<{name: string, value: number, color: string}[]>([]);

  useEffect(() => {
    // Real implementation would fetch from /api/analytics/funnel
    setTimeout(() => {
      setFunnelData([
        { name: "Applied", value: 45, color: "#6b7280" },
        { name: "Interview", value: 12, color: "#3b82f6" },
        { name: "Offer", value: 3, color: "#8b5cf6" },
        { name: "Selected", value: 1, color: "#10b981" }
      ]);
    }, 500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Analytics Insights</h1>
        <p className="text-zinc-400">Discover patterns and success rates in your application strategy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Funnel Bar Chart */}
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-xl shadow-xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h2>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#a1a1aa" }} />
                <Tooltip 
                  cursor={{ fill: "transparent" }} 
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} 
                  itemStyle={{ color: "#e4e4e7" }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-xl shadow-xl flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Status Distribution</h2>
          <div className="flex-1 w-full min-h-0 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={funnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} 
                  itemStyle={{ color: "#e4e4e7" }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
