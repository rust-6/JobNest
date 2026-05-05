import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans selection:bg-purple-500/30">
      
      {/* Sidebar - Glassmorphism */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
          <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            JobNest
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-xl bg-purple-500/10 text-purple-300 font-medium transition-all hover:bg-purple-500/20">
            Overview
          </Link>
          <Link href="/referrals" className="flex items-center px-4 py-3 rounded-xl text-zinc-400 font-medium transition-all hover:bg-zinc-800 hover:text-zinc-200">
            All Referrals
          </Link>
          <Link href="/analytics" className="flex items-center px-4 py-3 rounded-xl text-zinc-400 font-medium transition-all hover:bg-zinc-800 hover:text-zinc-200">
            Analytics
          </Link>
          <Link href="/auth/login" className="flex items-center px-4 py-3 rounded-xl text-zinc-500 font-medium transition-all hover:bg-zinc-800 hover:text-rose-400 mt-auto">
            Log out
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Subtle Background Blobs for Dashboard */}
        <div className="pointer-events-none absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse animation-delay-4000"></div>

        <header className="h-16 flex justify-end items-center px-8 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500"></span>
              {/* Bell Icon Placeholder */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-900 border-2 border-transparent"></div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
