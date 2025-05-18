import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface UseSendOtpResult {
  sendOtp: (email: string,isResnd:boolean) => Promise<{ success: boolean; error: string | null }>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useSendOtp(): UseSendOtpResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const sendOtp = async (email: string, isResend: boolean = false): Promise<{ success: boolean; error: string | null }> => {
  setLoading(true);
  setError(null);
  setSuccess(false);

    try {
      // Replace this URL with your backend endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/otp`, { email,isResend });

      if (response.status === 201) {
        setSuccess(true);
        return { success: true, error: null };
      }
      else if (response.status===409){
        alert(response?.data?.message);
        router.push("/login");
        return { success: false, error: null };
        
    
      } else {
        setError("Failed to send OTP. Please try again.");
        return { success: false, error: "Failed to send OTP. Please try again." };
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return { sendOtp, loading, error, success };
}
