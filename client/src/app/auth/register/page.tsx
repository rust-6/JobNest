"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message.includes('Failed to fetch')
          ? 'Unable to reach the auth server. Make sure the backend is running.'
          : err.message;
        setError(message);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-6 text-zinc-100">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Create Account</h1>
        <p className="text-sm text-zinc-400">Join JobNest to track your applications</p>
      </div>

      {error && <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">{error}</div>}
      {success && <div className="p-3 text-sm text-emerald-400 bg-emerald-950/50 border border-emerald-900/50 rounded-lg">Account created successfully! Redirecting...</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
            placeholder="johndoe123"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]"
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <a href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
          Sign in
        </a>
      </p>
    </div>
  );
}
