export interface Job {
  id: string;
  href: string;
  company: string;
  companyImageUrl: string | null;
  title: string;
  location: string;
  experience: string;
  contractType: string;
  education: string;
  imageUrl: string;
  views: number;
  deadlineType: string;
  hot?: boolean;
  bookmarked?: boolean;
  jobGroup?: string;
}
