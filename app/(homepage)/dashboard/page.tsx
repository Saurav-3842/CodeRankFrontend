
"use client";
import { useUser } from "@/context/userContext";
import ProfileStats from "./_dashboardComponent/profile-stat";
// const userId='6821ea422314f753be24035c';
export default function Home() {
    const { user } = useUser();
    const userId = user?._id;
    console.log(user);
  return (
    <div className="">
      <h1 className="text-black">Dashboard PAge</h1> 
      <ProfileStats userId={userId}/> 
    </div>
  );
}