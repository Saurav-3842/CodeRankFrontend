import React from 'react';

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
   loading: boolean;
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
   loading,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-bold text-black mb-4">
          <span className="text-indigo-600">CODERANK</span> <br />
          <span className="text-sm font-semibold">Just 1-Step Away</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full border px-4 py-2 rounded-md text-black"
              value={email}
              onChange={onChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create your password"
              className="w-full border px-4 py-2 rounded-md text-black"
              value={password}
              onChange={onChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter the OTP sent to email"
              className="w-full border px-4 py-2 rounded-md text-black"
              value={otp}
              onChange={onChange}
            />
          </div>

          <button
          disabled={loadingSignup}
            onClick={onSubmit}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
          >
            Get CodeRank Certificate
          </button>
          {/* Resend OTP */}
        {hasSubmitted && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                onClick={onResendOtp}
                className="text-indigo-600 hover:underline font-medium disabled:opacity-50 cursor-pointer"
                disabled={loading}
              >
                Resend OTP
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
