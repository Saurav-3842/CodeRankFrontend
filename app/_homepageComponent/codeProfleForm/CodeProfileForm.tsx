"use client";

import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import ProfileLinksModal from "./ProfileLinksModal";
import CredentialModal from "./CredentialModal";
import { useSendOtp } from "@/hooks/useOtp";
import { useSignup } from "@/hooks/useSignup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CodeProfileForm = forwardRef((props, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    college: "",
    github: "",
    leetcode: "",
    codeforces: "",
    password: "",
    otp: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (searchParams.get("focus") === "fullname") {
      fullNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      fullNameRef.current?.focus();
    }
  }, [searchParams]);
  const [showModal, setShowModal] = useState(false);
  const [showCredentialModal, setShowCredentialModal] = useState(false);

  const { sendOtp, loading } = useSendOtp();
  const {
    signup,
    loading: loadingSignup,
    error: errorSignup,
    success: successSignup,
  } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setShowModal(true);
    // Add submission logic
  };
  const handleProfileSubmit = async () => {
    console.log("User Info:", formData);
    if (!formData.email) {
      alert("Please enter an email address.");
      return;
    }
    setHasSubmitted(true);
    const { success, error } = await sendOtp(formData.email, false);
    if (!success && error === "Email already exists! Please login") {
      router.push("/login");
    }
    if (success) {
      setShowModal(false);
      setShowCredentialModal(true);
    } else if (error) {
      alert(error);
    }
  };
  const handleCredentialSubmit = async () => {
    console.log("Final Submission:");
    console.log("User Info:", formData);
    await signup(formData);
    if (errorSignup) {
      alert(errorSignup);
    }
    if (successSignup) {
      console.log("signup-------------");
      // router.push('/dashboard');
    }
    setShowCredentialModal(false);
  };
  useImperativeHandle(ref, () => ({
    scrollToFullName: () => {
      fullNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      fullNameRef.current?.focus();
    },
  }));

  const handleResendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }

    const { success, error } = await sendOtp(formData.email, true);

    if (success) {
      alert("OTP resent successfully!");
    } else if (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-gray-900 to-purple-900 text-white px-4">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
        <h1 className="text-4xl font-bold mb-4">One Page.</h1>
        <h2 className="text-3xl font-semibold mb-4">All Your Code Profiles.</h2>
        <h3 className="text-2xl font-medium mb-6">Your Ultimate Rank.</h3>
        <p className="text-sm text-gray-300">
          Integrate your GitHub, LeetCode, Codeforces, and more to get a
          comprehensive rating of your coding skills.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 bg-white text-black rounded-xl shadow-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              ref={fullNameRef}
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border rounded-md"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.email}
              onChange={handleChange}
            />

            <p className="text-xs text-gray-500 mt-1">
              We have a strict no-spam policy and will only contact you
              regarding your application.
            </p>
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium">
              College Name
            </label>
            <input
              id="college"
              name="college"
              type="text"
              placeholder="Enter your college name"
              className="mt-1 w-full px-4 py-2 border rounded-md"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Get Started
          </button>
        </form>
      </div>

      {/* Modal */}
      <ProfileLinksModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleLinkChange}
        onSubmit={handleProfileSubmit}
        loading={loading}
      />
      <CredentialModal
        show={showCredentialModal}
        onClose={() => setShowCredentialModal(false)}
        email={formData.email}
        password={formData.password}
        otp={formData.otp}
        loadingSignup={loadingSignup}
        onChange={handleCredentialChange}
        onSubmit={handleCredentialSubmit}
        loading={loading}
        onResendOtp={handleResendOtp}
        hasSubmitted={hasSubmitted}
      />
    </div>
  );
});
CodeProfileForm.displayName = "CodeProfileForm";
export default CodeProfileForm;
