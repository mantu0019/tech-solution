 
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  UserRound,
  Mail,
  CalendarDays,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  ArrowLeft,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

const UserProfile = () => {
  const { authData, isLoading, error, logOutByUser } = useAuth();

  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = authData?.userData;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logOutByUser();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "Not available";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) return <Loading />;

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <section className="w-full max-w-md bg-white border border-[#d5eeee] rounded-2xl p-8 text-center">

          <UserRound
            size={32}
            className="mx-auto text-[#369fa3]"
          />

          <h1 className="mt-4 text-xl font-semibold text-gray-800">
            Profile Unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your profile.
          </p>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="mt-6 w-full rounded-lg bg-[#369fa3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#258b91]"
          >
            Go to Login
          </button>

        </section>
      </main>
    );
  }

  const initial =
    user.fullName?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen w-full px-4 py-8 sm:px-8">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#369fa3] transition-colors"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* Profile Container */}
        <section className="overflow-hidden rounded-2xl border border-[#d5eeee] bg-white">

          {/* Header */}
          <header className="flex items-center justify-between gap-4 border-b border-[#e8f2f2] px-5 py-5 sm:px-8">

            <div>
              <p className="text-xs font-medium text-[#369fa3]">
                Riya Cyber Cafe
              </p>

              <h1 className="mt-1 text-xl font-semibold text-gray-800">
                My Profile
              </h1>
            </div>

            <span className="rounded-md border border-[#d5eeee] bg-[#effafa] px-3 py-1.5 text-xs font-medium capitalize text-[#369fa3]">
              {user.role || "User"}
            </span>

          </header>

          {/* User Information */}
          <div className="flex flex-col items-center px-5 py-9 text-center sm:flex-row sm:items-center sm:text-left sm:px-8">

            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e5f5f4] text-3xl font-semibold text-[#369fa3]">
              {initial}
            </div>

            {/* User Details */}
            <div className="mt-4 sm:mt-0 sm:ml-6">

              <h2 className="text-xl font-semibold text-gray-800">
                {user.fullName}
              </h2>

              <p className="mt-1 text-sm text-gray-500 break-all">
                {user.email}
              </p>

              <div
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${
                  user.isVerified
                    ? "text-green-700"
                    : "text-amber-600"
                }`}
              >
                {user.isVerified ? (
                  <ShieldCheck size={15} />
                ) : (
                  <ShieldAlert size={15} />
                )}

                {user.isVerified
                  ? "Verified Account"
                  : "Not Verified"}
              </div>

            </div>

          </div>

          {/* Account Details */}
          <div className="px-5 pb-7 sm:px-8">

            <div className="border-t border-[#e8f2f2] pt-6">

              <h3 className="mb-4 text-sm font-semibold text-gray-800">
                Account Information
              </h3>

              <div className="divide-y divide-[#edf3f3]">

                {/* Full Name */}
                <div className="flex items-center gap-4 py-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#effafa] text-[#369fa3]">
                    <UserRound size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Full Name
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800 break-words">
                      {user.fullName || "Not available"}
                    </p>
                  </div>

                </div>

                {/* Email */}
                <div className="flex items-center gap-4 py-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#effafa] text-[#369fa3]">
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email Address
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800 break-all">
                      {user.email || "Not available"}
                    </p>
                  </div>

                </div>

                {/* Account Created */}
                <div className="flex items-center gap-4 py-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#effafa] text-[#369fa3]">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Account Created
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* API Error */}
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {typeof error === "string" ? error : error.message}
              </p>
            )}

            {/* Logout */}
            <div className="mt-6 border-t border-[#e8f2f2] pt-6">

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={17} />

                {isLoggingOut
                  ? "Logging out..."
                  : "Logout from Account"}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                <ShieldCheck
                  size={13}
                  className="mr-1 inline text-[#369fa3]"
                />
                Your account information is private and secure.
              </p>

            </div>

          </div>

        </section>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Powered by{" "}
          <span className="font-medium text-[#369fa3]">
            Riya Cyber Cafe
          </span>
        </p>

      </div>

    </main>
  );
};

export default UserProfile;
 