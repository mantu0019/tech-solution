import { useNavigate } from "react-router";
 
import useAuth from "../hooks/useAuth";
import Loading from "../../../components/Loading";

const UserProfile = () => {
const { authData, isLoading, error,logOutByUser } = useAuth();
const navigate = useNavigate();

// API response: { success, message, userData }
const user = authData?.userData;

const handleLogout = async () => {
try {
await logOutByUser();
navigate("/", { replace: true });
} catch (error) {
console.error("Logout failed:", error);
}
};

const formatDate = (date) => {
if (!date) return "Not available";

 
 
};

if (isLoading) {
return <Loading />;
}

if (!user) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4"> <section className="w-full max-w-[400px] rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] p-8 text-center shadow-[0_20px_50px_rgba(28,28,28,0.07)]"> <h1 className="text-xl font-semibold text-[#1c1c1c]">
Profile unavailable </h1>
 
      <p className="mt-2 text-sm text-[#77776f]">
        Please sign in to view your profile.
      </p>

      <button
        onClick={() => navigate("/login", { replace: true })}
        className="mt-6 w-full rounded-xl bg-[#1c1c1c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333331]"
      >
        Go to Login
      </button>
    </section>
  </main>
); 

}

const initial = user.fullName?.trim()?.charAt(0)?.toUpperCase() || "U";

return ( <main className="flex min-h-screen items-center justify-center bg-[#f1f1ef] px-4 py-10"> <section className="w-full max-w-[440px] overflow-hidden rounded-3xl border border-[#e8e8e4] bg-[#fbfbfa] shadow-[0_20px_50px_rgba(28,28,28,0.07)]">
 
    {/* Header */}
    <header className="border-b border-[#e8e8e4] px-6 py-5 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#1c1c1c]">
            My Profile
          </h1>

          <p className="mt-1 text-xs text-[#77776f]">
            Manage your account information
          </p>
        </div>

        <span className="rounded-full border border-[#e2e2de] px-3 py-1.5 text-xs font-medium text-[#55554f]">
          {user.role || "User"}
        </span>
      </div>
    </header>

    {/* Profile Identity */}
    <div className="px-6 pt-8 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1c1c1c] text-3xl font-semibold text-[#f5f5f3] shadow-lg shadow-black/10">
          {initial}
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#1c1c1c]">
          {user.fullName}
        </h2>

        <p className="mt-1 break-all text-sm text-[#77776f]">
          {user.email}
        </p>

        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
            user.isVerified
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              user.isVerified ? "bg-green-500" : "bg-amber-500"
            }`}
          />

          {user.isVerified ? "Verified Account" : "Not Verified"}
        </div>
      </div>
    </div>

    {/* Account Details */}
    <div className="px-6 py-8 sm:px-8">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#77776f]">
        Account Details
      </h3>

      <div className="space-y-3">

        {/* Full Name */}
        <div className="rounded-xl border border-[#e8e8e4] bg-white p-4">
          <p className="text-xs font-medium text-[#77776f]">
            Full Name
          </p>

          <p className="mt-1.5 break-words text-sm font-medium text-[#1c1c1c]">
            {user.fullName || "Not available"}
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-[#e8e8e4] bg-white p-4">
          <p className="text-xs font-medium text-[#77776f]">
            Email Address
          </p>

          <p className="mt-1.5 break-all text-sm font-medium text-[#1c1c1c]">
            {user.email || "Not available"}
          </p>
        </div>

        {/* Created At */}
        <div className="rounded-xl border border-[#e8e8e4] bg-white p-4">
          <p className="text-xs font-medium text-[#77776f]">
            Account Created
          </p>

          <p className="mt-1.5 text-sm font-medium text-[#1c1c1c]">
            {formatDate(user.createdAt)}
          </p>
        </div>

      </div>

      {/* API Error */}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {typeof error === "string" ? error : error.message}
        </p>
      )}

      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 transition duration-200 hover:border-red-300 hover:bg-red-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
        </svg>

        Logout
      </button>

      <p className="mt-4 text-center text-xs text-[#a1a19a]">
        Your account information is private and secure.
      </p>
    </div>
  </section>
</main>
 

);
};

export default UserProfile;
