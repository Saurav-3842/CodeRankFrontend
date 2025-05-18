'use client';

import Image from 'next/image';
import { milestones } from '@/constants/homepage/milestone/milestoneData';
// import { milestones } from '@/data/milestones';

const Milestones = () => {
  return (
    <section className="bg-white py-6 px-6 sm:py-15 sm:px-40">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-12">Milestones</h2>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex flex-col items-center border rounded-xl px-6 py-8 shadow-sm w-full max-w-sm "
            >
              <div className="mb-4">
                <Image
                  src={milestone.user}
                  alt={milestone.label}
                  width={96}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <p className="text-4xl font-bold">{milestone.count}</p>
              <p className="text-[#6455D6] font-semibold mt-2">{milestone.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
