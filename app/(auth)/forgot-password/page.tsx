"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSendOtp = async (isResend = false) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${apiUrl}/otp`, {
        email,
        isResend,
        isForgotPassword: true,
      });
      if (res.status === 201) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.patch(`${apiUrl}/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (res.status === 200) {
        setMessage("Password reset successfully.");
        router.push("/login");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to reset password");
      } else {
        setError("Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center text-2xl font-bold tracking-tight mb-2">
          <span className="text-[#6455D6] border border-[#6455D6] px-1 mr-1 rounded-md shadow-sm">
            CODE
          </span>
          <span className="text-black">RANK</span>
        </div>
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
          Forgot Password
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />

          {!otpSent && (
            <button
              onClick={() => handleSendOtp()}
              disabled={loading || !email}
              className={`w-full flex justify-center items-center bg-black text-white py-2 rounded-md transition ${
                loading || !email ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Send OTP"
              )}
            </button>
          )}

          {otpSent && (
            <>
              <div className="text-right">
                <button
                  onClick={() => handleSendOtp(true)}
                  disabled={loading}
                  className="text-sm text-indigo-600 hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className={`w-full flex justify-center items-center bg-indigo-600 text-white py-2 rounded-md transition ${
                  loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700 cursor-pointer"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </>
          )}

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
