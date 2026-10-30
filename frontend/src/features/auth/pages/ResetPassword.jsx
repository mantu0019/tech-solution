import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

// Eye Icon
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

// Password Strength
const getStrength = (value) => {
  if (!value) return { score: 0, label: "" };

  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  if (score <= 2) return { score, label: "Weak" };
  if (score <= 4) return { score, label: "Medium" };

  return { score, label: "Strong" };
};

const ResetPassword = () => {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { error, isLoading, resetPasswordByUser } = useAuth();

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

  const password = watch("newPassword", "");
  const strength = getStrength(password);

  // Styles
  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-[#f1f1ef] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-[#a1a19a] outline-none transition-colors duration-200 focus:bg-white ${
      hasError ? "border-[#d9534f]" : "border-[#e2e2de] focus:border-[#1c1c1c]"
    }`;

  const labelClass = "mb-2 block text-xs font-medium text-[#55554f]";
  const errorClass = "mt-1.5 text-xs text-[#c9433f]";

  const eyeButton =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#a1a19a] transition hover:text-[#1c1c1c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1c1c]/30";

  const barColor =
    strength.label === "Weak"
      ? "bg-[#d9534f]"
      : strength.label === "Medium"
        ? "bg-[#a1a19a]"
        : "bg-[#1c1c1c]";

  // Submit
  const onSubmit = async (data) => {
    if (!resetToken) return;

    try {
      await resetPasswordByUser({
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      navigate("/", {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4 py-10">
      <section className="w-full max-w-[400px] rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] p-7 shadow-[0_20px_50px_rgba(28,28,28,0.07)] sm:p-9">
        {/* Header */}
        <header className="mb-8 text-center">
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
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <path d="M12 15v3" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#1c1c1c]">
            Reset Password
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-[#77776f]">
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className={labelClass}>
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showPw ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                aria-invalid={!!errors.newPassword}
                {...register("newPassword", {
                  required: "Password is required",

                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },

                  maxLength: {
                    value: 64,
                    message: "Password cannot exceed 64 characters",
                  },

                  validate: {
                    uppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Include at least one uppercase letter",

                    lowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Include at least one lowercase letter",

                    number: (value) =>
                      /[0-9]/.test(value) || "Include at least one number",

                    special: (value) =>
                      /[@$!%*?&]/.test(value) ||
                      "Include at least one special character",
                  },
                })}
                className={`${inputClass(!!errors.newPassword)} pr-12`}
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

            {errors.newPassword && (
              <p role="alert" className={errorClass}>
                {errors.newPassword.message}
              </p>
            )}

            {/* Password Strength */}
            {password && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                        level <= strength.score ? barColor : "bg-[#e2e2de]"
                      }`}
                    />
                  ))}
                </div>

                <span className="w-14 text-right text-xs text-[#77776f]">
                  {strength.label}
                </span>
              </div>
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
                placeholder="Re-enter your password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                className={`${inputClass(!!errors.confirmPassword)} pr-12`}
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

          {/* Password Information */}
          <div className="rounded-xl border border-[#e8e8e4] bg-white px-4 py-3">
            <p className="text-xs leading-5 text-[#77776f]">
              Your password must contain:
            </p>

            <ul className="mt-2 space-y-1 text-xs text-[#77776f]">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter (A-Z)</li>
              <li>• One lowercase letter (a-z)</li>
              <li>• One number (0-9)</li>
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="!mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] px-4 py-3.5 text-sm font-semibold text-[#f5f5f3] transition duration-200 hover:bg-[#333331] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting || isLoading ? (
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
        <p className="mt-7 text-center text-sm text-[#77776f]">
          Remember your password?{" "}
          <Link
            to="/"
            className="font-medium text-[#1c1c1c] underline-offset-4 transition hover:underline"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ResetPassword;
