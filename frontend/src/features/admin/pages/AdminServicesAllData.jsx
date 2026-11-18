import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import Loading from "../../../components/Loading";

const AdminServicesAllData = () => {
  const {
    error,
    isLoading,
    isUpdating,
    adminServices,
    adminServicesAllData,
    updateServicesByAdmin,
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("pending");
  const [adminMessage, setAdminMessage] = useState("");
  const [resultFile, setResultFile] = useState(null);
  const [updateError, setUpdateError] = useState("");

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

  // Statistics (backend stats mile to wahi use hoga, warna current page se count)
  const stats = useMemo(() => {
    const s = adminServices?.data?.stats;

    if (s) {
      return {
        total: s.total ?? totalApplications,
        pending: s.pending ?? 0,
        completed: s.completed ?? 0,
        rejected: s.rejected ?? 0,
      };
    }

    return {
      total: totalApplications,
      pending: applications.filter((item) => item.status === "pending").length,
      completed: applications.filter((item) => item.status === "completed")
        .length,
      rejected: applications.filter((item) => item.status === "rejected")
        .length,
    };
  }, [adminServices, applications, totalApplications]);

  // Status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
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

  // Open update modal
  const handleOpenUpdate = (application) => {
    setSelectedApplication(application);
    setUpdateStatus(application.status);
    setAdminMessage(application.adminMessage || "");
    setResultFile(null);
    setUpdateError("");
  };

  // Close update modal
  const handleCloseUpdate = () => {
    if (isUpdating) return;

    setSelectedApplication(null);
    setResultFile(null);
    setUpdateError("");
  };

  // Update application
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedApplication) return;

    if (resultFile && resultFile.size > 5 * 1024 * 1024) {
      setUpdateError("File size must be less than 5MB.");
      return;
    }

    try {
      setUpdateError("");

      await updateServicesByAdmin({
        requestId: selectedApplication._id,
        status: updateStatus,
        adminMessage,
        resultFile,
      });

      setSelectedApplication(null);
      setResultFile(null);

      // Update ke baad list + stats refresh
      await adminServicesAllData({
        page,
        limit,
        status,
        search: debouncedSearch,
      });
    } catch (err) {
      // rejectWithValue string bhejta hai, isliye string check zaroori hai
      setUpdateError(
        typeof err === "string"
          ? err
          : err?.message || "Application update failed. Please try again.",
      );
    }
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
      title: "Pending",
      value: stats.pending,
      icon: "◷",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "✓",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Rejected",
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
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong."}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-white shadow-sm hover:-translate-y-1 transition-all duration-300"
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
        <div className="bg-white rounded-3xl border border-white shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  All Applications
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  View and manage customer applications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search application number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 px-4 py-3 bg-[#f5fbfb] border border-[#e1f0f0] rounded-xl text-sm outline-none focus:border-[#55b9b5]"
                />

                {/* Status Filter */}
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3 bg-[#f5fbfb] border border-[#e1f0f0] rounded-xl text-sm font-medium text-gray-600 outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="px-6 py-2 text-xs text-[#319fa1] bg-[#f5fbfb]">
              Fetching applications...
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#f5fbfb]">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-bold">Application Number</th>
                  <th className="px-6 py-4 font-bold">DOB</th>
                  <th className="px-6 py-4 font-bold">Password</th>
                  <th className="px-6 py-4 font-bold">State</th>
                  <th className="px-6 py-4 font-bold">Customer Name</th>
                  <th className="px-6 py-4 font-bold">Gmail</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applications.length > 0 ? (
                  applications.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#f7fbfb] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-800">
                          {item.applicationNumber || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(item.dob)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700 select-all">
                          {item.password || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 font-medium">
                          {item.state || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {item.customerName || item.user?.fullName || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {item.user?.email || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(
                            item.status,
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                          {item.status === "completed"
                            ? "Completed"
                            : item.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenUpdate(item)}
                          className="px-4 py-2 rounded-lg bg-[#319fa1] text-white text-xs font-bold hover:bg-[#247f81] transition-colors"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-16 text-center">
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
              <button
                onClick={handleClearFilters}
                className="text-sm font-semibold text-[#319fa1] hover:text-[#247f81]"
              >
                Clear Filters
              </button>

              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-[#d9eeee] text-sm font-semibold text-gray-600 disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm font-bold text-gray-700">
                {totalPages === 0 ? 0 : page} / {totalPages}
              </span>

              <button
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl bg-[#319fa1] text-white text-sm font-semibold hover:bg-[#247f81] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Update Application
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Application: {selectedApplication.applicationNumber}
                </p>
              </div>

              <button
                onClick={handleCloseUpdate}
                disabled={isUpdating}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-5 space-y-5">
              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application Status
                </label>

                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fbfb] outline-none focus:border-[#319fa1]"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Admin Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Remark
                </label>

                <textarea
                  rows="4"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="Enter application update message..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fbfb] outline-none resize-none focus:border-[#319fa1]"
                />
              </div>

              {/* Result File */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Result File
                </label>

                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#b9dddd] rounded-2xl bg-[#f7fbfb] cursor-pointer hover:border-[#319fa1] transition-colors">
                  <span className="text-3xl text-[#319fa1] mb-2">↑</span>

                  <span className="text-sm font-semibold text-gray-700">
                    Click to upload image or PDF
                  </span>

                  <span className="text-xs text-gray-400 mt-1">
                    JPG, PNG, PDF (Maximum 5MB)
                  </span>

                  {/* <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,application/pdf"
                    onChange={(e) => setResultFile(e.target.files?.[0] || null)}
                    className="hidden"
                  /> */}

                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setResultFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>

                {resultFile && (
                  <div className="mt-3 flex items-center justify-between bg-[#eaf7f7] px-4 py-3 rounded-xl">
                    <span className="text-sm text-gray-700 truncate">
                      {resultFile.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => setResultFile(null)}
                      className="text-red-500 text-sm font-bold ml-3"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Update Error */}
              {updateError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                  {updateError}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseUpdate}
                  disabled={isUpdating}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 rounded-xl bg-[#319fa1] text-white font-bold hover:bg-[#247f81] disabled:opacity-60"
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesAllData;
