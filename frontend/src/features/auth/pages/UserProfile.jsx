 
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

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
      <main className="min-h-screen flex items-center justify-center px-4 bg-transparent">
        <section className="w-full max-w-md rounded-3xl border border-[#d5eeee] bg-white p-8 text-center shadow-[0_10px_40px_rgba(50,120,120,0.08)]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] text-white">
            <UserRound size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Profile Unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your profile.
          </p>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-[#55b9b5] to-[#258b91] px-5 py-3 font-bold text-white shadow-lg shadow-teal-100 transition hover:-translate-y-1"
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
    <main className="w-full min-h-screen px-4 py-8 sm:px-8 bg-transparent">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d5eeee] bg-white px-5 py-2.5 text-sm font-semibold text-[#369fa3] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </motion.button>

        {/* Main Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[28px] border border-[#d5eeee] bg-white shadow-[0_10px_40px_rgba(50,120,120,0.07)]"
        >

          {/* Header */}
          <header className="flex items-center justify-between border-b border-[#d5eeee] px-6 py-6 sm:px-9">

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#369fa3]">
                Riya Cyber Cafe
              </span>

              <h1 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your account information
              </p>
            </div>

            <span className="rounded-full border border-[#d5eeee] bg-[#effafa] px-4 py-2 text-xs font-bold capitalize text-[#369fa3]">
              {user.role || "User"}
            </span>

          </header>

          {/* Profile Identity */}
          <div className="relative overflow-hidden px-6 py-10 sm:px-9">

            {/* Decorative Background */}
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#effafa]" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#effafa]" />

            <div className="relative flex flex-col items-center text-center">

              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] text-4xl font-extrabold text-white shadow-[0_12px_30px_rgba(65,170,170,0.3)]"
              >
                {initial}
              </motion.div>

              <h2 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {user.fullName}
              </h2>

              <p className="mt-2 break-all text-sm text-gray-500">
                {user.email}
              </p>

              {/* Verification Badge */}
              <div
                className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${
                  user.isVerified
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {user.isVerified ? (
                  <ShieldCheck size={16} />
                ) : (
                  <ShieldAlert size={16} />
                )}

                {user.isVerified
                  ? "Verified Account"
                  : "Not Verified"}
              </div>

            </div>
          </div>

          {/* Account Details */}
          <div className="px-6 pb-8 sm:px-9">

            <div className="mb-5 flex items-center gap-3">
              <div className="h-7 w-1 rounded-full bg-gradient-to-b from-[#55b9b5] to-[#258b91]" />

              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-800">
                Account Details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Full Name */}
              <div className="group rounded-2xl border border-[#d5eeee] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#55b9b5] hover:shadow-[0_10px_25px_rgba(50,120,120,0.1)]">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] text-white shadow-md">
                    <UserRound size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-400">
                      Full Name
                    </p>

                    <p className="mt-1 break-words text-sm font-bold text-gray-800">
                      {user.fullName || "Not available"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Email */}
              <div className="group rounded-2xl border border-[#d5eeee] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#55b9b5] hover:shadow-[0_10px_25px_rgba(50,120,120,0.1)]">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] text-white shadow-md">
                    <Mail size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-400">
                      Email Address
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-gray-800">
                      {user.email || "Not available"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Account Created */}
              <div className="group rounded-2xl border border-[#d5eeee] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#55b9b5] hover:shadow-[0_10px_25px_rgba(50,120,120,0.1)] sm:col-span-2">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] text-white shadow-md">
                    <CalendarDays size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Account Created
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-800">
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
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {typeof error === "string" ? error : error.message}
              </p>
            )}

            {/* Logout */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut size={19} />

              {isLoggingOut ? "Logging out..." : "Logout from Account"}
            </motion.button>

            <p className="mt-5 text-center text-xs text-gray-400">
              <ShieldCheck size={14} className="mr-1 inline text-[#369fa3]" />
              Your account information is private and secure.
            </p>

          </div>

        </motion.section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs font-medium text-gray-400">
          Powered by{" "}
          <span className="font-bold text-[#369fa3]">
            Riya Cyber Cafe
          </span>
        </p>

      </div>
    </main>
  );
};

export default UserProfile;
 
