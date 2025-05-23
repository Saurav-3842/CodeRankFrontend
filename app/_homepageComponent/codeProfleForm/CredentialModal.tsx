import React, { useState } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
interface CredentialModalProps {
  show: boolean;
  onClose: () => void;
  email: string;
  password: string;
  otp: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loadingSignup: boolean;
  onResendOtp: () => void;
  hasSubmitted: boolean;
  loadingOTP: boolean;
  errors: { [key: string]: string };
}

const CredentialModal: React.FC<CredentialModalProps> = ({
  show,
  onClose,
  email,
  password,
  otp,
  onChange,
  onSubmit,
  loadingSignup,
  onResendOtp,
  hasSubmitted,
  loadingOTP,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
            Just One Step Away!
          </p>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={`mt-1 w-full px-4 py-2 border border-black rounded-md text-black ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              value={email}
              onChange={onChange}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input with toggle */}
          <div className="">
            <label className="block text-sm font-semibold text-black">
              Password
            </label>
            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create your password"
              className={` mt-1 w-full px-4 py-2 border rounded-md text-black ${
                errors.password ? "border-red-500" : "border-black"
              }`}
              value={password}
              onChange={onChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 flex items-center justify-center h-full -translate-y-1/2  text-gray-500 hover:text-gray-700 cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ lineHeight: 0 }}
            >
              {showPassword ?   <FaEye /> : <FaEyeSlash />}
            </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              placeholder="Enter the OTP sent to email"
              className={`mt-1 w-full px-4 py-2 border border-black rounded-md text-black ${
                errors.otp ? "border-red-500" : "border-black"
              }`}
              value={otp}
              onChange={onChange}
            />
            {errors.otp && (
              <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
            )}
          </div>

          <button
            disabled={loadingSignup}
            onClick={onSubmit}
            className={`w-full text-white py-2 rounded-md mt-4 transition-all flex items-center justify-center gap-2 ${
              loadingSignup
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 cursor-pointer"
            }`}
          >
            {loadingSignup && (
              <FaSpinner className="animate-spin w-5 h-5 text-white" />
            )}
            {loadingSignup ? "Creating Account..." : "Get CodeRank Certificate"}
          </button>
          {/* Resend OTP */}
          {hasSubmitted && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Did not receive the OTP?{" "}
                <button
                  type="button"
                  onClick={onResendOtp}
                  disabled={loadingOTP}
                  className={`text-indigo-600 font-medium hover:underline ${
                    loadingOTP
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {loadingOTP ? "Sending..." : "Resend OTP"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialModal;
