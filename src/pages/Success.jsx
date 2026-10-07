import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Success() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Guard Clause: Agar user logged in nahi hai to /login par redirect kar do
  if (!user) {
    navigate("/login");
    return null;
  }

  // 2. Name Display Logic (Backend Schema compatibility: firstname check karein)
  const displayName = user.firstname || user.name || user.email?.split("@")[0] || "User";
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-li-bg">
      <nav className="bg-white border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo size="text-2xl" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-[#666]">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-li-blue border border-li-blue rounded-full px-4 py-1.5 hover:bg-[#e8f3ff]"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-4 pt-10">
        <section className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,.1)] overflow-hidden text-center">
          <div className="h-24 bg-gradient-to-r from-li-blue to-[#378fe9]" />
          <div className="-mt-12 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-li-green text-white text-4xl font-semibold flex items-center justify-center border-4 border-white">
              {formattedName.charAt(0)}
            </div>
          </div>

          <div className="px-6 pt-4 pb-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#e6f4ea] flex items-center justify-center mb-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#057642" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Login successful</h1>
            <p className="text-[#666] mt-1">Welcome back, {formattedName}. Your feed is ready.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="h-11 px-6 rounded-full bg-li-blue hover:bg-li-dark text-white font-semibold">
                Go to my feed
              </button>
              <button onClick={handleLogout} className="h-11 px-6 rounded-full border border-[#666] font-semibold hover:bg-[#f3f6f8]">
                Sign out
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}