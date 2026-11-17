 

 
import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import Loading from "../../../components/Loading";

const AdminServicesAllData = () => {
  const {
    error,
    isLoading,
    adminServices,
    adminServicesAllData,
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch applications
  useEffect(() => {
    adminServicesAllData({
      page,
      limit,
      status,
      search: debouncedSearch,
    }).catch((err) => {
      console.error("Admin services error:", err);
    });
  }, [page, limit, status, debouncedSearch, adminServicesAllData]);

  const applications = useMemo(() => {
    return adminServices?.data?.applications || [];
  }, [adminServices]);

  const pagination = adminServices?.data?.pagination;

  const totalApplications = pagination?.totalApplications || 0;
  const totalPages = pagination?.totalPages || 0;

  // Statistics
  const stats = useMemo(() => {
    return {
      total: totalApplications,
      pending: applications.filter(
        (item) => item.status === "pending"
      ).length,
      success: applications.filter(
        (item) => item.status === "success"
      ).length,
      rejected: applications.filter(
        (item) => item.status === "rejected"
      ).length,
    };
  }, [applications, totalApplications]);

  // Status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "success":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";

      case "rejected":
        return "bg-red-50 text-red-600 border-red-100";

      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Statistics cards
  const statCards = [
    {
      title: "Total Requests",
      value: stats.total,
      icon: "▤",
      color: "text-[#319fa1]",
      bg: "bg-[#e5f5f4]",
    },
    {
      title: "Pending (Page)",
      value: stats.pending,
      icon: "◷",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed (Page)",
      value: stats.success,
      icon: "✓",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Rejected (Page)",
      value: stats.rejected,
      icon: "✕",
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  // Clear filters
  const handleClearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("all");
    setPage(1);
  };

  if (isLoading && !adminServices) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#eaf7f7] px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#319fa1] mb-1">
              ADMIN DASHBOARD / SERVICES
            </p>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Service Requests
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all customer applications.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-[#d9eeee] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>

            <span className="text-sm font-semibold text-gray-600">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-sm">
            {error?.message || "Something went wrong while fetching applications."}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-white shadow-[0_5px_20px_rgba(50,120,120,0.07)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold ${card.bg} ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-3xl border border-white shadow-[0_8px_30px_rgba(50,120,120,0.08)] overflow-hidden">

          {/* Table Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  All Applications
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  View customer application details.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* Search */}
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />

                    <path
                      d="m20 20-4-4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search application number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-3 bg-[#f5fbfb] border border-[#e1f0f0] rounded-xl text-sm outline-none focus:border-[#55b9b5] focus:ring-2 focus:ring-[#55b9b5]/10 transition-all"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3 bg-[#f5fbfb] border border-[#e1f0f0] rounded-xl text-sm font-medium text-gray-600 outline-none focus:border-[#55b9b5] cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="success">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="px-6 py-2 text-xs text-[#319fa1] bg-[#f5fbfb]">
              Updating applications...
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">

              <thead className="bg-[#f5fbfb]">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-bold">
                    Application Number
                  </th>

                  <th className="px-6 py-4 font-bold">
                    DOB
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Password
                  </th>

                  <th className="px-6 py-4 font-bold">
                    State
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Customer Name
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Gmail
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applications.length > 0 ? (
                  applications.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#f7fbfb] transition-colors"
                    >
                      {/* Application Number */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-800">
                          {item.applicationNumber || "N/A"}
                        </span>
                      </td>

                      {/* DOB */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(item.dob)}
                        </span>
                      </td>

                      {/* Password - Always Visible */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700 select-all">
                          {item.password || "N/A"}
                        </span>
                      </td>

                      {/* State */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 font-medium">
                          {item.state || "N/A"}
                        </span>
                      </td>

                      {/* Customer Name */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {item.customerName || item.user?.fullName || "N/A"}
                        </span>
                      </td>

                      {/* Gmail */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {item.user?.email || "N/A"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                          {item.status === "success"
                            ? "Completed"
                            : item.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-[#e5f5f4] rounded-2xl flex items-center justify-center text-2xl text-[#319fa1] mb-3">
                          ▤
                        </div>

                        <h3 className="text-gray-700 font-bold">
                          No Applications Found
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          Try changing your search or status filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-700">
                {applications.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-700">
                {totalApplications}
              </span>{" "}
              applications
            </p>

            <div className="flex items-center gap-3">

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="text-sm font-semibold text-[#319fa1] hover:text-[#247f81] transition-colors"
              >
                Clear Filters
              </button>

              {/* Previous */}
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-[#d9eeee] text-sm font-semibold text-gray-600 hover:bg-[#f5fbfb] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Number */}
              <span className="text-sm font-bold text-gray-700">
                {totalPages === 0 ? 0 : page} / {totalPages}
              </span>

              {/* Next */}
              <button
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl bg-[#319fa1] text-white text-sm font-semibold hover:bg-[#247f81] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServicesAllData;
 