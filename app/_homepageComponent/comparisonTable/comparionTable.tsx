
import { comparisonData } from "@/constants/homepage/comparision/comparisonData";
import { Check, X } from "lucide-react";

const ComparisonTable = () => {
  return (
    <div id="features" className="scroll-mt-4 bg-[#14101D] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why We Stand Out in Unifying <br />
          Your Coding Profiles
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                <th className="py-4 px-6">FEATURES</th>
                <th className="py-4 px-6 text-center">LinkedIn</th>
                <th className="py-4 px-6 text-center bg-green-100 text-black rounded-t">CodeRank</th>
                <th className="py-4 px-6 text-center">Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-800 text-sm">
                  <td className="py-4 px-6">{item.feature}</td>
                  {["linkedin", "coderank", "others"].map((key) => (
                    <td key={key} className={`py-4 px-6 text-center ${key === "coderank" ? "bg-green-50" : ""}`}>
                      {item.platforms[key as keyof typeof item.platforms] ? (
                        <Check className="text-green-500 inline" />
                      ) : (
                        <X className="text-red-500 inline" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
