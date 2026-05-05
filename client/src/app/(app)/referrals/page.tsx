"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobListPage() {
  const router = useRouter();

  useEffect(() => {
    // Basic Auth Check
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">All Referrals</h1>
          <p className="text-zinc-400">Manage and track your active job applications.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          + Add Referral
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Search companies, roles, or notes..." 
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-zinc-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none">
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
          </select>
          <button className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium transition-colors border border-zinc-700/50">
            Export
          </button>
        </div>
      </div>

      {/* Table Glass Container */}
      <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-xl overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase font-semibold text-zinc-400">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            <TableRow company="Stripe" role="Full Stack Developer" status="Applied" date="Oct 24, 2024" color="bg-zinc-500" />
            <TableRow company="Vercel" role="Frontend Engineer" status="Interview" date="Oct 20, 2024" color="bg-blue-500" />
            <TableRow company="Google" role="SWE L3" status="Referred" date="Oct 15, 2024" color="bg-purple-500" />
            <TableRow company="Microsoft" role="Software Engineer II" status="Rejected" date="Oct 10, 2024" color="bg-red-500" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ company, role, status, date, color }: { company: string, role: string, status: string, date: string, color: string }) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-6 py-4 font-medium text-white flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
          <span className="text-xs font-bold text-zinc-300">{company.charAt(0)}</span>
        </div>
        <span>{company}</span>
      </td>
      <td className="px-6 py-4 text-zinc-400">{role}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} bg-opacity-20 text-white border border-white/10`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-zinc-500">{date}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-zinc-500 hover:text-purple-400 font-medium text-sm transition-colors">
          Edit
        </button>
      </td>
    </tr>
  );
}
