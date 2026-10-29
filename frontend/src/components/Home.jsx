 
import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import Loading from "../components/Loading";

const Home = () => {
  const { authData, isLoading, error, logoutUser } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  console.log(authData)
  const user = authData?.userData;

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-red-600">
            {typeof error === "string" ? error : error.message}
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4">
        <div className="rounded-2xl border border-[#e8e8e4] bg-[#fbfbfa] p-8 text-center">
          <h2 className="text-xl font-semibold">Welcome!</h2>

          <p className="mt-2 text-sm text-[#77776f]">
            Please sign in to view your profile.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-[#1c1c1c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#333331]"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const createdDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const initials =
    user.fullName
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f1f1ef] px-4 py-8 text-[#1c1c1c] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77776f]">
              Personal workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              My Dashboard
            </h1>

            <p className="mt-2 text-sm text-[#77776f]">
              Manage your account and personal information.
            </p>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-[#e2e2de] bg-[#fbfbfa] px-4 py-3 text-sm font-semibold text-[#c9433f] transition hover:border-red-200 hover:bg-red-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>

            Log out
          </button>
        </header>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] shadow-[0_20px_50px_rgba(28,28,28,0.05)]">

          {/* Banner */}
          <div className="relative h-36 overflow-hidden bg-[#1c1c1c] sm:h-44">
            <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />

            <div className="absolute left-6 top-6">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium tracking-wide text-white">
                MY PROFILE
              </span>
            </div>
          </div>

          {/* User Information */}
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#fbfbfa] bg-[#e5e5e0] text-3xl font-semibold shadow-sm">
                {initials}
              </div>

              <div className="mb-1">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
                    user.isVerified
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.isVerified
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />

                  {user.isVerified
                    ? "Verified account"
                    : "Verification pending"}
                </span>
              </div>
            </div>

            {/* Name and Email */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[#77776f]">
                Welcome back
              </p>

              <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                {user.fullName || "User"}
              </h2>

              <p className="mt-2 break-all text-sm text-[#77776f] sm:text-base">
                {user.email || "Email not available"}
              </p>
            </div>

            {/* Account Details */}
            <div className="mt-8 grid gap-4 border-t border-[#e8e8e4] pt-8 sm:grid-cols-2">

              {/* Full Name */}
              <div className="rounded-2xl border border-[#e8e8e4] bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f1ef]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </div>

                <p className="mt-4 text-xs font-medium text-[#77776f]">
                  FULL NAME
                </p>

                <p className="mt-1 break-words text-base font-semibold">
                  {user.fullName || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-[#e8e8e4] bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f1ef]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>

                <p className="mt-4 text-xs font-medium text-[#77776f]">
                  EMAIL ADDRESS
                </p>

                <p className="mt-1 break-all text-base font-semibold">
                  {user.email || "Not available"}
                </p>
              </div>

              {/* Account Created */}
              <div className="rounded-2xl border border-[#e8e8e4] bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f1ef]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                </div>

                <p className="mt-4 text-xs font-medium text-[#77776f]">
                  ACCOUNT CREATED
                </p>

                <p className="mt-1 text-base font-semibold">
                  {createdDate}
                </p>
              </div>

              {/* Account Role */}
              <div className="rounded-2xl border border-[#e8e8e4] bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f1ef]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <p className="mt-4 text-xs font-medium text-[#77776f]">
                  ACCOUNT ROLE
                </p>

                <p className="mt-1 text-base font-semibold capitalize">
                  {user.role || "user"}
                </p>
              </div>
            </div>

            {/* Account ID */}
            <div className="mt-6 rounded-2xl border border-[#e8e8e4] bg-[#f1f1ef] p-5">
              <p className="text-xs font-medium text-[#77776f]">
                ACCOUNT ID
              </p>

              <p className="mt-2 break-all font-mono text-sm text-[#55554f]">
                {user._id}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-xs text-[#77776f]">
            Your personal information, all in one place.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Home;
 
