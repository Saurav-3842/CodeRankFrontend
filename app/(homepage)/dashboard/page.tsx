
"use client";
import { useUser } from "@/context/userContext";
import ProfileStats from "./_dashboardComponent/profile-stat";
export default function Home() {
    const { user } = useUser();
    
    const handlePrint = () => {
    window.print();
  };
  return (
    <div className="p-4">
      {/* Hide button during print */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Print PDF
        </button>
      </div>

      {/* This area will be printed */}
      <div id="printable-content">
        <ProfileStats user={user} />
      </div>
    </div>
  );
}