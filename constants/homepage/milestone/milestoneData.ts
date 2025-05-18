export interface Milestone {
  id: number;
  count: string;
  label: string;
  user: string; 
}

export const milestones: Milestone[] = [
  {
    id: 1,
    count: '100,000+',
    label: 'Integrated Profiles',
    user: '/images/milestoneImg/Frame 21505_1.svg',
  },
  {
    id: 2,
    count: '50,000+',
    label: 'Active Monthly Users',
    user: '/images/milestoneImg/Frame 21505_2.svg',
  },
  {
    id: 3,
    count: '10,000+',
    label: 'Success Stories',
    user: '/images/milestoneImg/Frame 21505_3.svg',
  },
];
