import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

const Eye = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a16 16 0 0 1-3 3.8" />
        <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.5 0 2.8-.4 4-1" />
      </>
    )}
  </svg>
);

const Login = () => {
  const [showPw, setShowPw] = useState(false);

  const { isLoggingIn, error, loginByUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await loginByUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white/80 px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[#55b9b5]/10 ${
      hasError
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#55b9b5]"
    }`;

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  const errorClass = "mt-1.5 text-xs text-red-500";

  const eyeButton =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:text-[#319fa1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55b9b5]/30";

  if (isLoggingIn) {
    return <Loading />;
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#eaf7f7] px-4 py-10">

      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[-80px] h-80 w-80 rounded-full bg-[#55b9b5]/25 blur-3xl" />

        <div className="absolute bottom-0 right-[-70px] h-96 w-96 rounded-full bg-[#369fa3]/20 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl" />
      </div>

      {/* Login Card */}
      <section className="relative z-10 w-full max-w-[430px] rounded-[30px] border border-white/90 bg-white/85 p-7 shadow-[0_20px_60px_rgba(50,120,120,0.13)] backdrop-blur-xl sm:p-10">

        {/* Logo */}
        <Link
          to="/"
          className="mb-2 block text-center text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Riya<span className="text-[#55b9b5]">Cyber Cafe</span>
        </Link>

        {/* Header */}
         
          

          <h1 className="text-xl font-bold tracking-tight mb-2  text-center text-gray-900">
            Login Account
          </h1>

           
        

        {/* API Error */}
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600"
          >
            {typeof error === "string" ? error : error.message}
          </p>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={inputClass(!!errors.email)}
            />

            {errors.email && (
              <p role="alert" className={errorClass}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                {...register("password", {
                  required: "Password is required",
                })}
                className={`${inputClass(!!errors.password)} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                aria-label={showPw ? "Hide password" : "Show password"}
                aria-pressed={showPw}
                className={eyeButton}
              >
                <Eye open={showPw} />
              </button>
            </div>

            {errors.password && (
              <p role="alert" className={errorClass}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#319fa1] transition hover:text-[#237d80] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="!mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#55b9b5] to-[#369fa3] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#369fa3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#369fa3]/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#55b9b5]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#319fa1] transition hover:text-[#237d80] hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* Bottom Branding */}
        <div className="mt-8 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Riya Cyber Cafe. All rights reserved.
          </p>
        </div>

      </section>
    </main>
  );
};

export default Login;