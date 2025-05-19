// types/profile.ts
export interface LeetCodeProfile {
    name: string;
    avatar: string;
    reputation: number;
    rank: number;
    problemsSolved: number;
    acceptanceRate: number;
    badges: string[];
    languageStats: {
      language: string;
      problemsSolved: number;
    }[];
    tagStats: {
      advanced: {
        name: string;
        problemsSolved: number;
      }[];
      intermediate: {
        name: string;
        problemsSolved: number;
      }[];
      fundamental: {
        name: string;
        problemsSolved: number;
      }[];
    };
  }
  
  export interface GitHubProfile {
    profile: {
      username: string;
      name: string;
      avatar: string;
      bio: string;
      url: string;
    };
    stats: {
      repositories: number;
      stars: number;
      followers: number;
      following: number;
      contributions: number;
      streak: {
        current: number;
        longest: number;
      };
    };
    repositories: {
      name: string;
      url: string;
      stars: number;
      forks: number;
      language: string | null;
      description: string;
    }[];
    badges: string[];
    lastUpdated: string;
  }
  
  export interface CodeforcesProfile {
    handle: string;
    rank: string;
    rating: number;
    maxRating: number;
  }
  
  export interface ProfileData {
    user: string;
    github: GitHubProfile;
    leetcode: LeetCodeProfile;
    codeforces: CodeforcesProfile;
    _id: string;
    __v: number;
  }