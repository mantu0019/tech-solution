import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loading from "../../../components/Loading";

const Eye = ({ open }) => (
  <svg
    width="16"
    height="16"
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

const getStrength = (v) => {
  if (!v) return { score: 0, label: "" };

  let score = 0;

  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[a-z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  if (score <= 2) return { score, label: "Weak" };
  if (score <= 4) return { score, label: "Medium" };

  return { score, label: "Strong" };
};

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const { isRegistering, error, registerByUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const password = watch("password", "");
  const strength = getStrength(password);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data;

      await registerByUser(registerData);

      console.log("register data", registerData.email);

      navigate("/verify-email", {
        state: {
          email: registerData?.email,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white/80 px-3.5 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[#55b9b5]/10 ${
      hasError
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#55b9b5]"
    }`;

  const labelClass = "mb-1 block text-[13px] font-medium text-gray-700";

  const errorClass = "mt-1 text-[11px] leading-tight text-red-500";

  const eyeButton =
    "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-[#319fa1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55b9b5]/30";

  const barColor =
    strength.label === "Weak"
      ? "bg-red-400"
      : strength.label === "Medium"
        ? "bg-amber-400"
        : "bg-[#319fa1]";

  if (isRegistering) {
    return <Loading />;
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#eaf7f7] px-4 py-4">

      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[-80px] h-72 w-72 rounded-full bg-[#55b9b5]/25 blur-3xl" />

        <div className="absolute bottom-0 right-[-70px] h-80 w-80 rounded-full bg-[#369fa3]/20 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl" />
      </div>

      {/* Register Card */}
      <section className="relative z-10 my-auto w-full max-w-[520px] rounded-3xl border border-white/90 bg-white/85 p-5 shadow-[0_20px_60px_rgba(50,120,120,0.13)] backdrop-blur-xl sm:px-8 sm:py-6">

        {/* Logo */}
        <Link
          to="/"
          className="mb-3 block text-center text-xl font-extrabold tracking-tight text-gray-900"
        >
          Riya<span className="text-[#55b9b5]">Cyber Cafe</span>
        </Link>

        {/* Header */}
        <header className="mb-4 text-center">
           
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          
        </header>

        {/* API Error */}
        {error && (
          <p
            role="alert"
            className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-[13px] text-red-600"
          >
            {typeof error === "string" ? error : error.message}
          </p>
        )}

        {/* Register Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-3"
        >

          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className={labelClass}>
              Full Name
            </label>

            <input
              id="fullname"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must contain at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/,
                  message: "Please enter a valid name",
                },
              })}
              className={inputClass(!!errors.fullName)}
            />

            {errors.fullName && (
              <p role="alert" className={errorClass}>
                {errors.fullName.message}
              </p>
            )}
          </div>

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

          {/* Password + Confirm Password (side by side) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Create password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                    maxLength: {
                      value: 64,
                      message: "Password cannot exceed 64 characters",
                    },
                    validate: {
                      uppercase: (v) =>
                        /[A-Z]/.test(v) ||
                        "Include at least one uppercase letter",

                      lowercase: (v) =>
                        /[a-z]/.test(v) ||
                        "Include at least one lowercase letter",

                      number: (v) =>
                        /[0-9]/.test(v) ||
                        "Include at least one number",
                    },
                  })}
                  className={`${inputClass(!!errors.password)} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showCpw ? "text" : "password"}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) =>
                      v === password || "Passwords do not match",
                  })}
                  className={`${inputClass(!!errors.confirmPassword)} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowCpw((p) => !p)}
                  aria-label={
                    showCpw ? "Hide confirm password" : "Show confirm password"
                  }
                  aria-pressed={showCpw}
                  className={eyeButton}
                >
                  <Eye open={showCpw} />
                </button>
              </div>

              {errors.confirmPassword && (
                <p role="alert" className={errorClass}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Strength (full width, sirf typing par dikhega) */}
          {password && (
            <div className="flex items-center gap-2.5">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                      level <= strength.score ? barColor : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <span className="w-12 text-right text-[11px] font-medium text-gray-500">
                {strength.label}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="!mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#55b9b5] to-[#369fa3] px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-[#369fa3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#369fa3]/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#55b9b5]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-[13px] text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#319fa1] transition hover:text-[#237d80] hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Bottom Branding */}
        <div className="mt-3 border-t border-gray-100 pt-2 text-center">
          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Riya Cyber Cafe. All rights reserved.
          </p>
        </div>

      </section>
    </main>
  );
};

export default Register;