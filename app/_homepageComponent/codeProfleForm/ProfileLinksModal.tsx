import React from "react";

interface ProfileLinksModalProps {
  show: boolean;
  onClose: () => void;
  formData: {
    github: string;
    leetcode: string;
    codeforces: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loading: boolean;
}

const ProfileLinksModal: React.FC<ProfileLinksModalProps> = ({
  show,
  onClose,
  formData,
  onChange,
  onSubmit,
  loading,
  
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-center text-xl font-bold text-black mb-4">
          <span className="text-indigo-600">CODERANK</span> <br />
          <span className="text-sm font-medium">Connect Coding Profiles</span>
        </h2>

        <div className="space-y-4">
          {[
            {
              label: "GitHub",
              name: "github",
              placeholder: "https://github.com/yourprofile",
            },
            {
              label: "LeetCode",
              name: "leetcode",
              placeholder: "https://leetcode.com/yourprofile",
            },
            {
              label: "Codeforces",
              name: "codeforces",
              placeholder: "https://codeforces.com/profile",
            },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="w-24 px-2 text-sm font-semibold text-black">
                {label}
              </label>
              <input
                name={name}
                type="url"
                placeholder={placeholder}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(formData as any)[name]} // or formData[name as keyof typeof formData]
                onChange={onChange}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4 cursor-pointer"
        >
          Just 1-Step Away
        </button>
        
      </div>
    </div>
  );
};

export default ProfileLinksModal;
