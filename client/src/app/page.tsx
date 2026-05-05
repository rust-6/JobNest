import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-500/30 overflow-hidden flex flex-col font-sans">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[0%] left-[20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight">
          JobNest
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/auth/register" className="px-5 py-2.5 rounded-full bg-white text-zinc-950 text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto mt-20 md:mt-32">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
          Job Search 2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight mb-8 drop-shadow-2xl">
          Track your applications without the <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">spreadsheet chaos</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Centralize your job referral tracking, follow-up deadlines, and career analytics in one beautiful, frictionless dashboard. Built for modern job seekers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="/auth/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all active:scale-[0.98]">
            Start Tracking Free
          </Link>
          <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800 text-white font-medium text-lg transition-all active:scale-[0.98]">
            See how it works
          </a>
        </div>

        {/* Dashboard Preview Presentation */}
        <div className="mt-24 relative w-full h-auto p-4 md:p-8 rounded-[2rem] bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-1000">
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent rounded-[2rem] z-10 pointer-events-none"></div>
           <div className="relative z-0 w-full rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
             <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 space-x-2">
               <div className="w-3 h-3 rounded-full bg-rose-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
             </div>
             <div className="bg-zinc-950 p-6 md:p-10 flex flex-col md:flex-row gap-6">
                <div className="hidden md:flex w-48 flex-col space-y-4 opacity-70">
                  <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>
                  <div className="h-4 w-1/2 bg-zinc-800/50 rounded"></div>
                  <div className="h-4 w-full bg-zinc-800/50 rounded"></div>
                  <div className="h-4 w-2/3 bg-zinc-800/50 rounded"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-1/3 bg-purple-500/20 rounded mb-6"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-zinc-800/50 rounded-xl"></div>
                    <div className="h-24 bg-zinc-800/50 rounded-xl"></div>
                    <div className="h-24 bg-zinc-800/50 rounded-xl"></div>
                  </div>
                  <div className="h-64 bg-zinc-800/30 rounded-xl mt-6 border border-zinc-800 flex items-end p-4">
                    <div className="w-full flex justify-between items-end h-3/4 opacity-40">
                       <div className="w-8 bg-purple-500 h-1/4 rounded-t-sm"></div>
                       <div className="w-8 bg-blue-500 h-2/4 rounded-t-sm"></div>
                       <div className="w-8 bg-emerald-500 h-3/4 rounded-t-sm"></div>
                       <div className="w-8 bg-purple-500 h-[80%] rounded-t-sm"></div>
                       <div className="w-8 bg-blue-500 h-full rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Features Section */}
        <div id="features" className="w-full mt-32 pt-20 border-t border-zinc-800">
          <h2 className="text-4xl font-extrabold text-white mb-16 text-center">Why Choose JobNest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Track Everything</h3>
              <p className="text-zinc-400">Keep track of all your job applications in one place with detailed application history and status updates.</p>
            </div>
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Reminders</h3>
              <p className="text-zinc-400">Never miss a follow-up deadline. Get timely reminders for your job applications and referrals.</p>
            </div>
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics Hub</h3>
              <p className="text-zinc-400">Visualize your job search progress with intuitive charts and actionable insights.</p>
            </div>
          </div>
        </div>

        {/* How it works Section */}
        <div id="how-it-works" className="w-full pt-20 border-t border-zinc-800">
          <h2 className="text-4xl font-extrabold text-white mb-16 text-center">How It Works</h2>
          <div className="space-y-8 max-w-3xl mx-auto mb-32">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Sign Up & Create Profile</h3>
                <p className="text-zinc-400">Create your account and set up your profile in minutes.</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Log Your Applications</h3>
                <p className="text-zinc-400">Add job applications with company details, positions, and status.</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Set Reminders & Track Progress</h3>
                <p className="text-zinc-400">Get reminders for follow-ups and track your application status in real-time.</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-orange-500/30 border border-orange-500/50 flex items-center justify-center text-orange-300 font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Analyze & Optimize</h3>
                <p className="text-zinc-400">View analytics to understand your job search patterns and success rates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="w-full pt-20 border-t border-zinc-800 pb-32">
          <h2 className="text-4xl font-extrabold text-white mb-16 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <details className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-purple-400 transition-colors">
                <span>Is JobNest free to use?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400">Yes! JobNest is completely free to use. We believe everyone deserves tools to manage their job search effectively without barriers.</p>
            </details>
            <details className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-purple-400 transition-colors">
                <span>Can I use JobNest on mobile?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400">JobNest is built with responsive design, so you can access your dashboard from any mobile device, tablet, or desktop browser.</p>
            </details>
            <details className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-purple-400 transition-colors">
                <span>How secure is my data?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400">Your data is encrypted and securely stored. We take privacy seriously and never share your information with third parties.</p>
            </details>
            <details className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-purple-400 transition-colors">
                <span>Can I import data from other tools?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400">Currently, we support manual entry. We&apos;re working on import features from popular spreadsheet tools and job tracking platforms.</p>
            </details>
            <details className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-purple-400 transition-colors">
                <span>What if I need help or have feedback?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400">We&apos;d love to hear from you! Contact us through our support email or reach out through your dashboard for any questions or suggestions.</p>
            </details>
          </div>
        </div>
      </main>

    </div>
  );
}
