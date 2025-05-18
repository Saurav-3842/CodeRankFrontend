import React from "react";
import { socialLinks,quickLinks, contactInfo } from "@/constants/homepage/footer/footerData";

const Footer = () => {
  return (
    <footer className="bg-[#1A161F] text-white px-6 sm:px-40 py-15 flex flex-col items-center">
      {/* Top Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between gap-16">
        {/* Left Side */}
        <div className="flex flex-col max-w-md">
          <h1 className="text-2xl font-bold mb-2">
            <span className="text-[#6455D6] border border-[#6455D6] px-1 mr-1">CODE</span>
            <span>RANK</span>
          </h1>
          <p className="mb-5">Where tech minds gather!</p>
          <p className="mb-2">Stay Updated with CodeRank</p>
          <input
            type="email"
            placeholder="Email Address"
            className="mb-2 p-2.5 rounded-lg border border-gray-300 text-black bg-white"
          />
          <button className="bg-yellow-300 text-black px-4 py-1 rounded-lg w-fit">
            Subscribe
          </button>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row gap-12 pl-0 md:pl-32">
          {/* Social Links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-lg">Social Links</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <ul className="flex flex-col gap-2">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.label}:{" "}
                  {item.href ? (
                    <a href={item.href} className="hover:underline">{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 text-sm text-center">
        © 2025 CodeRank. Empowering Innovators Worldwide.
      </div>
    </footer>
  );
};

export default Footer;
