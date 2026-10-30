import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router";

import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { error, isResetPassword, resetPasswordByUser } = useAuth();

  const resetToken = location.state?.resetToken;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  // Input Styles
  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-[#f1f1ef] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-[#a1a19a] outline-none transition-colors duration-200 focus:bg-white ${
      hasError ? "border-[#d9534f]" : "border-[#e2e2de] focus:border-[#1c1c1c]"
    }`;

  const labelClass = "mb-2 block text-xs font-medium text-[#55554f]";

  const errorClass = "mt-1.5 text-xs text-[#c9433f]";

  // Reset Password
  const onSubmit = async (data) => {
    if (!resetToken) {
      return;
    }

    try {
      await resetPasswordByUser({
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Password reset successful. Please log in again.",
        },
      });
    } catch (err) {
      console.error("Password reset failed:", err);
    }
  };

  // Invalid Reset Token
  if (!resetToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4 py-10">
        <section className="w-full max-w-[400px] rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] p-8 text-center shadow-[0_20px_50px_rgba(28,28,28,0.07)]">
          <div className="mb-5 text-4xl">⚠️</div>

          <h1 className="text-xl font-semibold text-[#1c1c1c]">
            Invalid Reset Session
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77776f]">
            Your password reset session is missing or invalid. Please request a
            new password reset OTP.
          </p>

          <Link
            to="/forgot-password"
            className="mt-6 inline-block rounded-xl bg-[#1c1c1c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333331]"
          >
            Forgot Password
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4 py-10">
      <section className="w-full max-w-[400px] rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] p-7 shadow-[0_20px_50px_rgba(28,28,28,0.07)] sm:p-9">
        {/* Header Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e2e2de] bg-white text-[#1c1c1c]">
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <path d="M12 15v3" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1c1c1c]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77776f]">
            Create a new password for your account. Make sure it's strong and
            secure.
          </p>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {typeof error === "string"
                ? error
                : error?.message || "Password reset failed."}
            </p>
          )}
        </header>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className={labelClass}>
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                aria-invalid={!!errors.newPassword}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 64,
                    message: "Password cannot exceed 64 characters",
                  },
                })}
                className={`${inputClass(!!errors.newPassword)} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#77776f] transition hover:text-[#1c1c1c]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.newPassword && (
              <p role="alert" className={errorClass}>
                {errors.newPassword.message}
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={`${inputClass(!!errors.confirmPassword)} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#77776f] transition hover:text-[#1c1c1c]"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <p role="alert" className={errorClass}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password Information */}
          <div className="rounded-xl border border-[#e8e8e4] bg-white px-4 py-3">
            <p className="text-xs leading-5 text-[#77776f]">
              Your password must contain at least 8 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isResetPassword}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] px-4 py-3.5 text-sm font-semibold text-[#f5f5f3] transition duration-200 hover:bg-[#333331] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting || isResetPassword ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-7 text-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#1c1c1c] underline-offset-4 transition hover:underline"
          >
            ← Back to login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
