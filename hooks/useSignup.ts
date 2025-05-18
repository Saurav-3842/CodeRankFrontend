import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

interface SignupFormData {
  fullname: string;
  email: string;
  college: string;
  github?: string;
  leetcode?: string;
  codeforces?: string;
  password: string;
  otp: string;
}

interface UseSignupResult {
  signup: (data: SignupFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useSignup(): UseSignupResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const signup = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/auth/signup`, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        // Ensure the backend returns the complete user object
        const userData = response.data.data?.user || response.data.user;
        
        if (!userData) {
          throw new Error("User data not received from server");
        }
        console.log("userData after signup",userData);
        // Update user context with the received data
        setUser(userData);

        setSuccess(true);
        router.push("/dashboard"); // Redirect after successful signup
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || 
                         err.message || 
                         "Something went wrong during sign-up.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
}