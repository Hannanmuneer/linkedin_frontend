import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import Field from "../components/Field.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import Divider from "../components/Divider.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // 1. Frontend Validations
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Please enter a valid email address.";
    if (password.length < 6) err.password = "Password must be 6 characters or more.";
    if (Object.keys(err).length) return setErrors(err);

    // 2. Async Login API Call
    try {
      setLoading(true);
      const loginError = await login(email, password);

      if (loginError) {
        // Agar backend se error aaye (e.g., "Invalid email or password")
        setServerError(loginError);
      } else {
        // Login success hone par redirect
        navigate("/success");
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white sm:bg-li-bg">
      <header className="max-w-6xl w-full mx-auto px-4 pt-6">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-4 sm:pt-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[400px] bg-white sm:rounded-lg sm:shadow-[0_0_0_1px_rgba(0,0,0,.1),0_4px_12px_rgba(0,0,0,.1)] sm:p-6 py-4 space-y-4"
        >
          <div>
            <h1 className="text-[32px] font-semibold leading-tight">Sign in</h1>
            <p className="text-sm mt-1">Stay updated on your professional world</p>
          </div>

          {/* Server Error Alert Box */}
          {serverError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
              {serverError}
            </div>
          )}

          <Field 
            label="Email or phone" 
            value={email} 
            onChange={setEmail} 
            error={errors.email} 
          />
          <Field 
            label="Password" 
            type="password" 
            value={password} 
            onChange={setPassword} 
            error={errors.password} 
          />

          <a 
            href="#" 
            onClick={(e) => e.preventDefault()} 
            className="inline-block text-li-blue font-semibold text-sm hover:underline"
          >
            Forgot password?
          </a>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-li-blue" />
            Keep me logged in
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-full bg-li-blue hover:bg-li-dark disabled:opacity-50 text-white font-semibold text-base transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <Divider />
          <GoogleButton text="Continue with Google" />
        </form>

        <p className="mt-6 text-base">
          New to LinkedIn?{" "}
          <Link to="/signup" className="text-li-blue font-semibold hover:underline">
            Join now
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}