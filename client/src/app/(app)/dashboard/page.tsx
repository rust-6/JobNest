"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, pending: 0, interviewed: 0, offers: 0 });

  useEffect(() => {
    // Basic Auth Check MVP
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
    // Fetch stats in real app...
    setTimeout(() => {
      setStats({ total: 42, pending: 15, interviewed: 6, offers: 2 });
    }, 500);
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-zinc-400">Track your application pipeline at a glance.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          + Add Referral
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Applications" value={stats.total} trend="+12" color="from-blue-500/20 to-blue-600/5" border="border-blue-500/20" />
        <StatCard title="Pending Review" value={stats.pending} trend="Waiting" color="from-yellow-500/20 to-yellow-600/5" border="border-yellow-500/20" />
        <StatCard title="Interviews Scheduled" value={stats.interviewed} trend="Action" color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/20" />
        <StatCard title="Offers Received" value={stats.offers} trend="Success!" color="from-purple-500/20 to-purple-600/5" border="border-purple-500/20" />
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-xl overflow-hidden p-6 shadow-2xl">
          <div className="space-y-6">
            {/* Mock recent items */}
            <ActivityItem company="Google" role="Frontend Engineer" status="Interview" time="2 hours ago" color="bg-blue-500" />
            <ActivityItem company="Stripe" role="Full Stack Developer" status="Applied" time="1 day ago" color="bg-zinc-500" />
            <ActivityItem company="Vercel" role="React Engineer" status="Selected" time="3 days ago" color="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, color, border }: { title: string, value: number, trend: string, color: string, border: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-lg border ${border} flex flex-col justify-between overflow-hidden relative group`}>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <p className="text-sm font-medium text-zinc-400 mb-2">{title}</p>
        <div className="flex items-end justify-between mt-auto">
          <h3 className="text-4xl font-extrabold text-white tracking-tight">{value}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-950/50 text-zinc-300">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ company, role, status, time, color }: { company: string, role: string, status: string, time: string, color: string }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700/50">
        <span className="text-sm font-bold text-zinc-300">{company.charAt(0)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{company} <span className="text-zinc-500 font-normal ml-2">{role}</span></p>
        <p className="text-xs text-zinc-500">{time}</p>
      </div>
      <div>
         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${color} bg-opacity-20 text-white border border-white/10`}>
          {status}
        </span>
      </div>
    </div>
  );
}
