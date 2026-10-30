 
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

   const {isLoggingIn,error,loginByUser} = useAuth()
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
     console.log("data",data)
     await loginByUser(data)
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-[#f1f1ef] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-[#a1a19a] outline-none transition-colors duration-200 focus:bg-white ${
      hasError
        ? "border-[#d9534f]"
        : "border-[#e2e2de] focus:border-[#1c1c1c]"
    }`;

  const labelClass = "mb-2 block text-xs font-medium text-[#55554f]";

  const errorClass = "mt-1.5 text-xs text-[#c9433f]";

  const eyeButton =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#a1a19a] transition hover:text-[#1c1c1c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1c1c]/30";

  if (isLoggingIn) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4 py-10">
      <section className="w-full max-w-[400px] rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] p-7 shadow-[0_20px_50px_rgba(28,28,28,0.07)] sm:p-9">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1c1c1c]">
            Welcome back
          </h1>

          <p className="mt-1.5 text-sm text-[#77776f]">
            Sign in to continue your journey.
          </p>
        </header>

        {/* API Error */}
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border text-center border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {typeof error === "string" ? error : error.message}
          </p>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
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
              className="text-xs font-medium text-[#55554f] transition hover:text-[#1c1c1c] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="!mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] px-4 py-3.5 text-sm font-semibold text-[#f5f5f3] transition duration-200 hover:bg-[#333331] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-[#77776f]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#1c1c1c] underline-offset-4 transition hover:underline"
          >
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
 
