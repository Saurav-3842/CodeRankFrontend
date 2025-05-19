import React from "react";
import { FaSpinner } from "react-icons/fa";
type CodingProfiles = Record<"github" | "leetcode" | "codeforces", string>;

interface ProfileLinksModalProps {
  show: boolean;
  onClose: () => void;
  formData: CodingProfiles;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loadingOTP: boolean;
  onResendOtp: () => void;
  hasSubmitted: boolean;
  canResendOtp: boolean;
}

const ProfileLinksModal: React.FC<ProfileLinksModalProps> = ({
  show,
  onClose,
  formData,
  onChange,
  onSubmit,
  loadingOTP,
  onResendOtp,
  hasSubmitted,
  canResendOtp,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-center mb-6">
          <div className="flex justify-center items-center text-2xl font-bold text-black tracking-tight">
            <span className="text-[#6455D6] border border-[#6455D6] px-1 mr-1 rounded-md shadow-sm">
              CODE
            </span>
            <span className="text-black">RANK</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Connect Your Coding Profiles
          </p>
        </h2>

        <div className="space-y-4">
          {[
            {
              label: "GitHub",
              name: "github",
              placeholder: "https://github.com/yourprofile",
            },
            {
              label: "LeetCode",
              name: "leetcode",
              placeholder: "https://leetcode.com/yourprofile",
            },
            {
              label: "Codeforces",
              name: "codeforces",
              placeholder: "https://codeforces.com/profile",
            },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="w-24 px-2 text-sm font-semibold text-black">
                {label}
              </label>
              <input
                name={name}
                type="url"
                placeholder={placeholder}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[name as keyof CodingProfiles]} // or formData[name as keyof typeof formData]
                onChange={onChange}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onSubmit}
          disabled={loadingOTP}
          className={`w-full bg-black text-white py-2 rounded-md mt-4 transition-all ${
            loadingOTP
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-gray-800 cursor-pointer"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {loadingOTP && (
              <FaSpinner className="animate-spin w-5 h-5 text-white" />
            )}
            {loadingOTP ? "Sending OTP..." : "Just 1-Step Away"}
          </div>
        </button>
        {/* Resend OTP */}
        {hasSubmitted && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Did not receive the OTP?{" "}
              <button
                type="button"
                onClick={onResendOtp}
                disabled={loadingOTP || !canResendOtp}
                className={`text-indigo-600 font-medium hover:underline ${
                  loadingOTP || !canResendOtp
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Resend OTP
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileLinksModal;
