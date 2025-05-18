// data/coderankStepsData.ts

export type CodeRankStep = {
  title: string;
  description: string;
  image: string;
};

export const codeRankSteps: CodeRankStep[] = [
  {
    title: 'Sign Up & Connect Your Profiles',
    description: 'Create your CodeRank account and link your coding profiles.',
    image: '/images/howCodeRankWorksImg/signup.svg',
  },
  {
    title: 'Analyze & Test Your Skills',
    description: 'Evaluate your activities, contributions, and rankings.',
    image: '/images/howCodeRankWorksImg/analyze.svg',
  },
  {
    title: 'Get Your CodeRank',
    description: 'Receive a unified rating and a shareable profile page.',
    image: '/images/howCodeRankWorksImg/getYourCodeRank.svg',
  },
];
