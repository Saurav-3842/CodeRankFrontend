// data/comparisonData.ts
export interface FeatureComparison {
  feature: string;
  platforms: {
    linkedin: boolean;
    coderank: boolean;
    others: boolean;
  };
}

export const comparisonData: FeatureComparison[] = [
  {
    feature: "Built for Developers",
    platforms: {
      linkedin: false,
      coderank: true,
      others: false,
    },
  },
  {
    feature: "Infographic Review",
    platforms: {
      linkedin: false,
      coderank: true,
      others: false,
    },
  },
  {
    feature: "Show Data From Various Resources",
    platforms: {
      linkedin: false,
      coderank: true,
      others: false,
    },
  },
  {
    feature: "Always Up-To Date",
    platforms: {
      linkedin: false,
      coderank: true,
      others: false,
    },
  },
];
