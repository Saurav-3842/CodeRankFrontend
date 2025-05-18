"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { useUser } from "@/context/userContext";

export default function Sidebar() {
  const router = useRouter();
//   const {logout} = useUser();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <Link href="/dashboard" className="block py-2 hover:underline">
            Home
          </Link>
        </li>
        {/* Add more nav items here */}
      </ul>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
