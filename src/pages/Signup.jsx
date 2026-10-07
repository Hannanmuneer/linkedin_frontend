import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import Field from "../components/Field.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import Divider from "../components/Divider.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  // 1. Backend schema ke mutabiq state keys update ki hain (firstname, lastname)
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    firstname: "", 
    lastname: "",
    age: "" // Optional: Agar age input add karni ho
  });
  
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (value) => setForm({ ...form, [key]: value });
  const stop = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // 2. Frontend Validation
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Please enter a valid email address.";
    if (form.password.length < 6) err.password = "Password must be 6 characters or more.";
    if (!form.firstname.trim()) err.firstname = "Please enter your first name.";
    if (!form.lastname.trim()) err.lastname = "Please enter your last name.";
    
    if (Object.keys(err).length) return setErrors(err);

    // 3. API Call with Async/Await & Try-Catch
    try {
      setLoading(true);
      
      // AuthContext ka signup method run hoga
      await signup({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        age: form.age ? Number(form.age) : undefined
      });

      // API success hone par redirect karein
      navigate("/success");
    } catch (error) {
      // Backend se aane wala error (e.g., "User already exists with this email")
      setServerError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white sm:bg-li-bg">
      <header className="max-w-6xl w-full mx-auto px-4 pt-6 flex justify-center">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-4 sm:pt-6">
        <h1 className="text-[28px] sm:text-[32px] text-center font-light leading-tight mb-4 max-w-md">
          Make the most of your professional life
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[400px] bg-white sm:rounded-lg sm:shadow-[0_0_0_1px_rgba(0,0,0,.1),0_4px_12px_rgba(0,0,0,.1)] sm:p-6 py-2 space-y-4"
        >
          {/* Server Error Message Alert */}
          {serverError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
              {serverError}
            </div>
          )}

          <Field 
            label="First name" 
            value={form.firstname} 
            onChange={set("firstname")} 
            error={errors.firstname} 
          />
          <Field 
            label="Last name" 
            value={form.lastname} 
            onChange={set("lastname")} 
            error={errors.lastname} 
          />
          <Field 
            label="Email" 
            value={form.email} 
            onChange={set("email")} 
            error={errors.email} 
          />
          <Field 
            label="Password (6+ characters)" 
            type="password" 
            value={form.password} 
            onChange={set("password")} 
            error={errors.password} 
          />

          <p className="text-xs text-center text-[#666]">
            By clicking Agree &amp; Join, you agree to the LinkedIn{" "}
            <a href="#" onClick={stop} className="text-li-blue font-semibold">User Agreement</a>,{" "}
            <a href="#" onClick={stop} className="text-li-blue font-semibold">Privacy Policy</a>, and{" "}
            <a href="#" onClick={stop} className="text-li-blue font-semibold">Cookie Policy</a>.
          </p>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-full bg-li-blue hover:bg-li-dark disabled:opacity-50 text-white font-semibold text-base transition-colors"
          >
            {loading ? "Joining..." : "Agree & Join"}
          </button>

          <Divider />
          <GoogleButton text="Continue with Google" />

          <p className="text-center text-base pt-1">
            Already on LinkedIn?{" "}
            <Link to="/login" className="text-li-blue font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}