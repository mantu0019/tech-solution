import { useEffect, useState } from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  const {
    isLoading,
    error,
    userDashboardData,
    downloadError,
    downloadLoading,
    downloadSuccess,
    downloadResultByUser,
    userDashboardDataByUser,
  } = useUserDashboard();

  console.log("Download Error:", downloadError);
  console.log("Download Success:", downloadSuccess);
  console.log("Download Loading:", downloadLoading);
  const navigate = useNavigate();

  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    userDashboardDataByUser();
  }, [userDashboardDataByUser]);

  const statistics = userDashboardData?.data?.statistics || {};
  const applications = userDashboardData?.data?.applications || [];

  const handleDownload = async (application) => {
    try {
      setDownloadingId(application._id);

      await downloadResultByUser(application._id);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-red-100 shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong!
          </h2>

          <p className="text-gray-500 mt-3 text-sm">{error}</p>

          <button
            onClick={userDashboardDataByUser}
            className="mt-5 px-6 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Requests",
      value: statistics.totalRequests || 0,
      icon: "📋",
      color: "from-[#55b9b5] to-[#369fa3]",
    },
    {
      title: "Pending Requests",
      value: statistics.pendingRequests || 0,
      icon: "⏳",
      color: "from-[#e8b85b] to-[#d99a32]",
    },
    {
      title: "Successful Requests",
      value: statistics.successfulRequests || 0,
      icon: "✓",
      color: "from-[#48b98c] to-[#269b70]",
    },
    {
      title: "Rejected Requests",
      value: statistics.rejectedRequests || 0,
      icon: "✕",
      color: "from-[#e77b7b] to-[#d65353]",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const DownloadIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"
      />
    </svg>
  );

  return (
    <div className="relative min-h-screen w-full bg-[#eaf7f7] px-4 sm:px-6 lg:px-8 py-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#55b9b5]/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#369fa3]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-5 py-2.5 mb-5 rounded-full bg-white/90 backdrop-blur-md border border-white text-[#319fa1] font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#e5f5f4] transition-all duration-300"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              My Dashboard
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Track and manage all your submitted applications.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-white rounded-full px-5 py-2.5 shadow-sm flex items-center gap-2 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-[#55b9b5]" />

            <span className="text-sm font-semibold text-gray-600">
              Account Overview
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-9">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white p-5 shadow-[0_8px_30px_rgba(50,120,120,0.10)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-extrabold text-gray-800 mt-3">
                    {item.value}
                  </h2>

                  <p className="text-xs text-gray-400 mt-2">Applications</p>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgba(50,120,120,0.12)] overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 sm:p-7 border-b border-[#e5f5f4]">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                My Applications
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View your application history and current status.
              </p>
            </div>

            <span className="px-5 py-2.5 rounded-full bg-[#e5f5f4] text-[#319fa1] text-sm font-bold w-fit">
              {applications.length} Applications
            </span>
          </div>

          {/* Download Status */}
          {typeof downloadError === "string" && downloadError.trim() !== "" && (
            <div className="mx-5 mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {downloadError}
            </div>
          )}

          {downloadSuccess && (
            <div className="mx-5 mt-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
              Download request completed successfully!
            </div>
          )}

          {/* Empty State */}
          {applications.length === 0 ? (
            <div className="py-16 text-center px-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#e5f5f4] flex items-center justify-center text-3xl mb-5">
                📂
              </div>

              <h3 className="text-lg font-bold text-gray-700">
                No Applications Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                You haven't submitted any applications yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1100px]">
                <thead className="bg-[#f0f9f8] text-[#319fa1] text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-5 font-bold">Service</th>
                    <th className="px-6 py-5 font-bold">Application No.</th>
                    <th className="px-6 py-5 font-bold">Date</th>
                    <th className="px-6 py-5 font-bold">Fee</th>
                    <th className="px-6 py-5 font-bold">Status</th>
                    <th className="px-6 py-5 font-bold">Admin Message</th>
                    <th className="px-6 py-5 font-bold">Result</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#edf5f4]">
                  {applications.map((application) => {
                    const resultFile = application.resultFile;

                    return (
                      <tr
                        key={application._id}
                        className="hover:bg-[#f5fbfa] transition-colors duration-200"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold text-gray-800">
                            {application.serviceType}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {application.applicationNumber || "N/A"}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                          {application.createdAt
                            ? new Date(
                                application.createdAt,
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>

                        <td className="px-6 py-5 text-sm font-bold text-gray-700">
                          ₹{(application.feeCharged ?? 0) / 100}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold capitalize ${getStatusStyle(
                              application.status,
                            )}`}
                          >
                            {application.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500 max-w-[220px] whitespace-normal">
                          {application.adminMessage || "No message"}
                        </td>

                        {/* Download Result */}
                        <td className="px-6 py-5">
                          {resultFile?.url ? (
                            <button
                              onClick={() => handleDownload(application)}
                              disabled={downloadLoading}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e5f5f4] text-[#319fa1] text-sm font-bold hover:bg-[#319fa1] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloadingId === application._id ? (
                                "Downloading..."
                              ) : (
                                <>
                                  <DownloadIcon />

                                  {resultFile.fileType === "pdf"
                                    ? "Download PDF"
                                    : "Download Image"}
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Not Available
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Riya Cyber Cafe · Application Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
