import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginResult {
  login: (data: LoginFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useLogin(): UseLoginResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const login = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/auth/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const userData = response.data.data?.user || response.data.user;

        if (!userData) {
          throw new Error("User data not received from server");
        }

        setUser(userData);
        setSuccess(true);
        router.push("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err.message ||
        "Something went wrong during login.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
}
