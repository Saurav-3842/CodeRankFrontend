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
import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
  const [canResendOtp, setCanResendOtp] = useState(false);
  const { sendOtp, loading: loadingOTP } = useSendOtp();
  const {
    signup,
    loading: loadingSignup,
    error: errorSignup,
    success: successSignup,
  } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowModal(true);
    // Add submission logic
  };
  const handleProfileSubmit = async () => {
    console.log("User Info:", formData);
    if (!formData.email) {
      toast.warn("Please enter an email address.");
      return;
    }
    setHasSubmitted(true);
    
    const { success, error } = await sendOtp(formData.email, false);
    if (!success && error === "Email already exists! Please login") {
      router.push("/login");
    }
    if (success) {
      setShowModal(false);
      setCanResendOtp(true);
      setShowCredentialModal(true);
    } else if (error) {
      console.log(error);
    }
  };
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("must be at least 8 characters long");
    if (!/[A-Z]/.test(password))
      errors.push("must include at least one uppercase letter");
    if (!/[a-z]/.test(password))
      errors.push("must include at least one lowercase letter");
    if (!/[0-9]/.test(password))
      errors.push("must include at least one number");
    if (!/[!@#$%^&*]/.test(password))
      errors.push("must include at least one special character");

    return errors;
  };
  const handleCredentialSubmit = async () => {
    const passwordErrors = validatePassword(formData.password);

    const newErrors: { [key: string]: string } = {};

    if (passwordErrors.length > 0) {
      newErrors.password = `Password ${passwordErrors.join(", ")}`;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    await signup(formData);
    if (errorSignup) {
      toast.warn(errorSignup);
    }
    if (successSignup) {
      toast.success("Sign up Successful!");
      setShowCredentialModal(false);
      return;
    }
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
      toast.warn("Please enter your email first.");
      return;
    }

    await sendOtp(formData.email, true);

    // if (success) {
    //   alert("OTP resent successfully!");
    // } else if (error) {
    //   alert(error);
    // }
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
              className={`mt-1 w-full px-4 py-2 border rounded-md ${
                errors.fullname ? "border-red-500" : ""
              }`}
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <p className="text-xs text-red-500 mt-1">{errors.fullname}</p>
            )}
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
              className={`mt-1 w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
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
              className={`mt-1 w-full px-4 py-2 border rounded-md ${
                errors.college ? "border-red-500" : ""
              }`}
              value={formData.college}
              onChange={handleChange}
            />
            {errors.college && (
              <p className="text-xs text-red-500 mt-1">{errors.college}</p>
            )}
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
        loadingOTP={loadingOTP}
        onResendOtp={handleResendOtp}
        hasSubmitted={hasSubmitted}
        canResendOtp={canResendOtp}
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
        loadingOTP={loadingOTP}
        onResendOtp={handleResendOtp}
        hasSubmitted={hasSubmitted}
        errors={errors}
      />
    </div>
  );
});
CodeProfileForm.displayName = "CodeProfileForm";
export default CodeProfileForm;
