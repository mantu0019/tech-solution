 
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

const ForgetPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const { forgetPasswordByUser, isLoading } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  // Input Styles
  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-[#f1f1ef] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-[#a1a19a] outline-none transition-colors duration-200 focus:bg-white ${
      hasError
        ? "border-[#d9534f]"
        : "border-[#e2e2de] focus:border-[#1c1c1c]"
    }`;

  const labelClass = "mb-2 block text-xs font-medium text-[#55554f]";

  const errorClass = "mt-1.5 text-xs text-[#c9433f]";

  // Submit Email
  const onSubmit = async (data) => {
    try {
      setSuccessMessage("");

      await forgetPasswordByUser(data);
    navigate("/verify-reset-otp")

      setSuccessMessage(
        "If your email is registered, a password reset OTP has been sent."
      );
    } catch (err) {
      console.error("Forgot password failed:", err);
    }
  };


  if(isLoading){
    return <Loading/>
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
            Forgot password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77776f]">
            Don't worry! Enter your registered email address
            and we'll send you an OTP to reset your password.
          </p>

        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
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

          {/* Success Message */}
          {successMessage && (
            <p
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] px-4 py-3.5 text-sm font-semibold text-[#f5f5f3] transition duration-200 hover:bg-[#333331] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {isSubmitting || isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending OTP...
              </>
            ) : (
              "Send Verification Code"
            )}

          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-7 text-center">

          <Link
            to="/"
            className="text-sm font-semibold text-[#1c1c1c] underline-offset-4 transition hover:underline"
          >
            ← Back to login
          </Link>

        </div>

      </section>

    </main>
  );
};

export default ForgetPassword;
 