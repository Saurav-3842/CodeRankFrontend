"use client";
import Image from "next/image";
import { bannerData } from "@/constants/homepage/promotionBannerData/bannerData";
interface BannerProps {
  onSignUpClick: () => void;
}
const Banner = ({ onSignUpClick }: BannerProps) => {
  return (
    <section className="py-6 px-6 sm:py-15 sm:px-16">
      <div className="bg-[#5B3CC4] rounded-[40px] mx-auto max-w-[1312px]">
        <div className="flex flex-col py-8 px-8  sm:py-15 sm:px-24 sm:flex-row items-center justify-center  gap-10">
          {/* Left Image */}
          <div className=" ">
            <Image
              src={bannerData.imageUrl}
              alt="Banner Illustration"
              width={0}
              height={0}
              className="w-full  max-w-[308px] h-auto"
            />
          </div>

          {/* Right Content */}
          <div className="text-white text-left w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {bannerData.title}
            </h2>
            <p className="text-lg mb-10">{bannerData.description}</p>
            <button className="bg-black text-white px-9 py-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
            onClick={onSignUpClick}>
              {bannerData.buttonText}
              
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
