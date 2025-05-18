'use client';

import { codeRankSteps } from '@/constants/homepage/howCodeRankWork/coderankStepsData';
import Image from 'next/image';

export default function CodeRankSteps() {
  return (
    <section className="bg-white py-10 px-6 sm:py-16 sm:px-40  text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black">
        How CodeRank Works
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {codeRankSteps.map((step, index) => (
          <div
            key={index}
            className="bg-[#f0f2fd] flex flex-col items-center p-6 rounded-[20px] border border-[#6455D6] max-w-sm max-h-xs h-full"
          >
            <div className=" flex justify-center items-center mb-6">
              <Image
                src={step.image}
                alt={step.title}
                width={0}
                height={0}
                className="w-full h-auto object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#6455D6] text-center">
              {step.title}
            </h3>
            <p className="px-4 text-black text-sm text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
