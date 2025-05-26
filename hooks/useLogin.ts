import { useState } from "react";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginResult {
  login: (data: LoginFormData) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
  
}

export function useLogin(): UseLoginResult {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false);
  const { setUser } = useUser();
  // const router = useRouter();

  const login = async (data: LoginFormData):Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/auth/login`, data, {
        withCredentials: true,
      });

      const token = response.data?.data?.token;
      const userData = response.data?.data?.user;
      if (!userData) throw new Error("User data not received from server");

      setUser(userData);
      // router.push("/dashboard");

      console.log('document.cookie', document.cookie);

      document.cookie = `token1=${token}; path=/; secure; SameSite=None; expires=` + new Date(Date.now() + 3600 * 1000).toUTCString();

      console.log('document.cookie', document.cookie);

      return { success: true, message: "Logged in successfully!" };
      
    } catch (err: unknown) {
      let errorMessage = "Something went wrong during login.";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }


      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
