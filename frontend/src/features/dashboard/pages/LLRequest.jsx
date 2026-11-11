 
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useService } from "../hook/useServices";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

const LLRequest = () => {
  const navigate = useNavigate();

  const { isLoading, llRequestByUser } = useService();

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      applicationNumber: "",
      dob: "",
      password: "",
      state: "",
    },
  });

  const isBusy = isSubmitting || isLoading;

  // Submit Handler
  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      await llRequestByUser(data);

      alert(
        "Your data has been submitted and ₹60 has been deducted from your wallet."
      );

      navigate("/dashboard");
    } catch (err) {
      console.log("LL Request Error:", err);

      // Handle string and object errors
      const message =
        typeof err === "string"
          ? err
          : err?.response?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again.";

      setSubmitError(message);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#55b9b5] focus:ring-4 focus:ring-[#55b9b5]/15 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed";

  const errorClass = "text-red-500 text-xs mt-1.5";

  return (
    <div className="min-h-screen bg-[#eaf7f7] px-4 py-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isBusy}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-xl bg-white text-[#319fa1] border border-[#55b9b5]/30 shadow-sm hover:bg-[#e5f5f4] transition-all duration-300 text-sm font-semibold disabled:opacity-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">
            Learning Licence Request
          </h1>

          <p className="text-gray-500 mt-1 text-xs sm:text-sm">
            Fill in your application details carefully.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(50,120,120,0.10)] border border-white overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#55b9b5] to-[#369fa3] px-5 py-3">
            <h2 className="text-base font-bold text-white">
              Application Details
            </h2>

            <p className="text-white/80 text-xs mt-0.5">
              Enter your application information.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5"
          >

            {/* API Error */}
            {submitError && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600"
              >
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-xs font-medium">
                  {submitError}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5">

              {/* Application Number */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Application Number
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter application number"
                  disabled={isBusy}
                  className={inputClass}
                  {...register("applicationNumber", {
                    required: "Application number is required",
                    validate: (value) =>
                      !!value.trim() ||
                      "Application number is required",
                  })}
                />

                {errors.applicationNumber && (
                  <p className={errorClass}>
                    {errors.applicationNumber.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Date of Birth
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  disabled={isBusy}
                  className={inputClass}
                  {...register("dob", {
                    required: "Date of birth is required",
                    validate: (value) =>
                      value <= new Date().toISOString().split("T")[0] ||
                      "Date of birth cannot be in the future",
                  })}
                />

                {errors.dob && (
                  <p className={errorClass}>
                    {errors.dob.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  disabled={isBusy}
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className={errorClass}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Select State
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <select
                  disabled={isBusy}
                  className={`${inputClass} cursor-pointer`}
                  {...register("state", {
                    required: "Please select your state",
                  })}
                >
                  <option value="">Select your state</option>

                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                {errors.state && (
                  <p className={errorClass}>
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* Fee Information */}
            <div className="mt-4 px-4 py-3 rounded-xl bg-[#eaf7f7] border border-[#55b9b5]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  Service Charge
                </p>

                <p className="text-[11px] text-gray-500 mt-0.5">
                  Deducted from your wallet
                </p>
              </div>

              <p className="text-xl font-extrabold text-[#319fa1]">
                ₹60
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white text-sm font-bold shadow-md shadow-[#369fa3]/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isBusy ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                    />
                  </svg>

                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-2">
              Please verify all details before submitting.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LLRequest;
 