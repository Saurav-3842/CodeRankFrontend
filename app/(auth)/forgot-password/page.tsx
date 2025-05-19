"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        isForgotPassword: true, // distinguish in backend
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
        // Optionally redirect to login page
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
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>

      <div className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        {!otpSent && (
          <button
            onClick={() => handleSendOtp()}
            className="w-full bg-black text-white py-2 rounded-md"
            disabled={loading || !email}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {otpSent && (
          <>
            <button
              onClick={() => handleSendOtp(true)}
              className="text-sm text-indigo-600 hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-indigo-600 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
}
