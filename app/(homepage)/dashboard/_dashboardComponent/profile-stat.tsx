import { useState, useEffect } from "react";
import { BarChart2, Github } from "lucide-react";
import { ProfileData } from "@/types/profile";

interface Props {
  user?: {
    _id: string;
    email?: string;
    fullname?: string;
    college?: string;
  }| null;
}

const ProfileStats = ({ user }: Props) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/scrap-fetch/${user?._id || ""}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const result = await response.json();
        setData(result.data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchProfileData();
    } else {
      setLoading(false);
      setData(null);
    }
  }, [user?._id]);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-2xl p-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p>No profile data available</p>
        </div>
      </div>
    );
  }

  // Your existing rendering logic with data here
  const { github, leetcode } = data;
  const totalSolved = leetcode.problemsSolved;
  const totalTags = [
    ...leetcode.tagStats.fundamental,
    ...leetcode.tagStats.intermediate,
    ...leetcode.tagStats.advanced,
  ];

  const acceptanceRate = leetcode.acceptanceRate;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* User info */}
      <div className="bg-white shadow rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user?.fullname || "Username"}</h1>
          <p className="text-gray-600">{user?.college || "College Name"}</p>
        </div>
        
      </div>

      {/* LeetCode Section */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart2 className="text-yellow-500" /> LeetCode Profile
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">{totalSolved}</p>
            <p className="text-sm text-gray-500">Problems</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">{acceptanceRate}%</p>
            <p className="text-sm text-gray-500">Acceptance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">#{leetcode.rank.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Rank</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center col-span-2 md:col-span-3">
            <p className="text-sm text-gray-500">Top Skills</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {totalTags
                .sort((a, b) => b.problemsSolved - a.problemsSolved)
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={tag.name}
                    className="bg-gray-200 px-2 py-1 text-xs rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Solutions by Language</h3>
            <ul className="space-y-2">
              {leetcode.languageStats.map((lang) => (
                <li key={lang.language} className="flex justify-between">
                  <span>{lang.language}</span>
                  <span className="font-medium">{lang.problemsSolved} solved</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Top Problem Tags</h3>
            <ul className="space-y-2">
              {totalTags
                .sort((a, b) => b.problemsSolved - a.problemsSolved)
                .slice(0, 4)
                .map((tag) => (
                  <li key={tag.name} className="flex justify-between">
                    <span>{tag.name}</span>
                    <span className="font-medium">{tag.problemsSolved} problems</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* GitHub Section */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Github className="text-black" /> GitHub Activity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">{github.stats.repositories}</p>
            <p className="text-sm text-gray-500">Repositories</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">{github.stats.stars}</p>
            <p className="text-sm text-gray-500">Total Stars</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">{github.stats.contributions}</p>
            <p className="text-sm text-gray-500">Contributions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Top Languages</h3>
            <div className="flex flex-wrap gap-2">
              {github.repositories
                .filter((repo) => repo.language)
                .reduce((acc, repo) => {
                  if (repo.language && !acc.includes(repo.language)) {
                    acc.push(repo.language);
                  }
                  return acc;
                }, [] as string[])
                .map((lang) => (
                  <span
                    key={lang}
                    className="bg-gray-200 px-2 py-1 text-xs rounded-full"
                  >
                    {lang}
                  </span>
                ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <div className="flex gap-2 items-end h-24">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 bg-green-200 rounded"
                  style={{ height: `${20 + Math.random() * 60}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
