export interface Job {
  _id: string;

  title: string;
  companyName: string;
  location: string;

  jobType: "Full-time" | "Part-time" | "Internship" | "Contract";
  workMode: "On-site" | "Remote" | "Hybrid";
  experienceLevel: "Entry" | "Mid" | "Senior";

  educationRequired?: string;
  skillsRequired: string[];

  salaryMin?: number;
  salaryMax?: number;
  deadline?: string;

  description: string;
  isFeatured: boolean;

  employer: string;
}
