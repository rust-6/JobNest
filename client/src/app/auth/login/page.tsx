"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.usernameOrEmail,
          username: formData.usernameOrEmail,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      localStorage.setItem("token", data.accessToken);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-6 text-zinc-100">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Welcome Back</h1>
        <p className="text-sm text-zinc-400">Enter your credentials to access JobNest</p>
      </div>

      {error && <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Email or Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
            placeholder="johndoe@example.com"
            value={formData.usernameOrEmail}
            onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
          </div>
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
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
          Create one now
        </a>
      </p>
    </div>
  );
}
