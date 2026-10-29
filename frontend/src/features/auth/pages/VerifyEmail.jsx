import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

const VerifyEmail = () => {
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState("");

  const { isLoading, error, verifyEmailByUser } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-[#f1f1ef] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-[#a1a19a] outline-none transition-colors duration-200 focus:bg-white ${
      hasError ? "border-[#d9534f]" : "border-[#e2e2de] focus:border-[#1c1c1c]"
    }`;

  const labelClass = "mb-2 block text-xs font-medium text-[#55554f]";
  const errorClass = "mt-1.5 text-xs text-[#c9433f]";

  const onSubmit = async (data) => {
    try {
      console.log("Verification Data:", data);

      await verifyEmailByUser(data);
      navigate("/home");
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      console.log(" hello ");
      console.log("Implement resend OTP API here");
    } catch (error) {
      setResendError("Unable to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (isLoading) {
    return <Loading />;
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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
              <path d="m16 15 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1c1c1c]">
            Verify your email
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77776f]">
            Enter your email address and the verification code sent to you.
          </p>
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {typeof error === "string" ? error : error.message}
            </p>
          )}
        </header>

        {/* Verification Form */}
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

          {/* OTP */}
          <div>
            <label htmlFor="otp" className={labelClass}>
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              aria-invalid={!!errors.otp}
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must contain exactly 6 digits",
                },
              })}
              onInput={(event) => {
                event.target.value = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);
              }}
              className={`${inputClass(!!errors.otp)} text-center text-lg font-semibold tracking-[0.45em]`}
            />

            {errors.otp && (
              <p role="alert" className={errorClass}>
                {errors.otp.message}
              </p>
            )}

            <p className="mt-2 text-xs text-[#77776f]">
              Enter the 6-digit code sent to your email.
            </p>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] px-4 py-3.5 text-sm font-semibold text-[#f5f5f3] transition duration-200 hover:bg-[#333331] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Verifying...
              </>
            ) : (
              "Verify email"
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#77776f]">Didn't receive the code?</p>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="mt-2 text-sm active:scale-95 font-semibold text-[#1c1c1c] underline-offset-4 transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>

          {resendError && (
            <p role="alert" className="mt-2 text-xs text-[#c9433f]">
              {resendError}
            </p>
          )}
        </div>

        {/* Footer */}
      </section>
    </main>
  );
};

export default VerifyEmail;
