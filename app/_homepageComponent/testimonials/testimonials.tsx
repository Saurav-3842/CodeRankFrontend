"use client";

import { useState } from "react";
import { testimonials } from "@/constants/homepage/testimonials/testimonialData";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleTestimonials = testimonials.slice(index, index + 3).concat(
    testimonials.slice(0, Math.max(0, index + 3 - testimonials.length))
  );

  return (
    <section className="bg-[#131017] text-white py-6 px-6 sm:py-15 sm:px-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-black border-2 border-white text-white hover:bg-gray-800 transition cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full bg-black border-2 border-white text-white hover:bg-gray-300 transition cursor-pointer"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center items-stretch">
  {visibleTestimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="rounded-xl border border-white/20 p-6 sm:max-w-sm flex flex-col justify-between h-full min-h-[320px] flex-1"
    >
      <p className="text-sm mb-6 flex-grow">{testimonial.message}</p>
      <div className="flex items-center gap-3 mt-auto">
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="font-semibold">{testimonial.name}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
