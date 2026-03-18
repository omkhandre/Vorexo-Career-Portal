import type { Job, Application } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    employer_id: 'emp1',
    title: 'Senior Full Stack Developer',
    description: `We are looking for an experienced Full Stack Developer to join our dynamic team.

Key Responsibilities:
• Design and develop scalable web applications using modern frameworks
• Collaborate with cross-functional teams to deliver high-quality solutions
• Write clean, maintainable, and efficient code
• Participate in code reviews and technical discussions
• Mentor junior developers and contribute to team growth

Requirements:
• 5+ years of experience in full-stack development
• Strong proficiency in React, Node.js, and TypeScript
• Experience with cloud platforms (AWS/Azure/GCP)
• Excellent problem-solving and communication skills`,
    company_name: 'Tech Solutions Inc.',
    location: 'Mumbai, India',
    job_type: 'Full-time',
    work_mode: 'Hybrid',
    experience_level: 'Senior',
    education_required: "Bachelor's in Computer Science",
    skills_required: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    salary_min: 1200000,
    salary_max: 1800000,
    deadline: '2025-11-15',
    is_featured: true,
    is_closed: false,
    is_expired: false,
    views_count: 342,
    created_at: '2025-09-15T10:00:00Z',
    updated_at: '2025-09-15T10:00:00Z',
  },
  {
    id: '2',
    employer_id: 'emp1',
    title: 'Frontend Developer',
    description: `Join our creative team as a Frontend Developer and help build beautiful user experiences.

What You'll Do:
• Build responsive and performant web applications
• Implement pixel-perfect designs from Figma
• Optimize applications for maximum speed and scalability
• Work closely with designers and backend developers
• Stay updated with the latest frontend technologies

What We're Looking For:
• 2-3 years of frontend development experience
• Strong knowledge of React and modern JavaScript
• Experience with CSS frameworks like Tailwind CSS
• Understanding of web performance optimization
• Portfolio showcasing your work`,
    company_name: 'Design Studio',
    location: 'Bangalore, India',
    job_type: 'Full-time',
    work_mode: 'Remote',
    experience_level: 'Mid',
    education_required: "Bachelor's in any field",
    skills_required: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    salary_min: 600000,
    salary_max: 900000,
    deadline: '2025-11-01',
    is_featured: false,
    is_closed: false,
    is_expired: false,
    views_count: 256,
    created_at: '2025-09-20T14:30:00Z',
    updated_at: '2025-09-20T14:30:00Z',
  },
  {
    id: '3',
    employer_id: 'emp2',
    title: 'Data Scientist Intern',
    description: `Exciting internship opportunity for aspiring data scientists!

About the Role:
• Work on real-world machine learning projects
• Analyze large datasets to extract meaningful insights
• Build and deploy ML models in production
• Collaborate with experienced data scientists
• Present findings to stakeholders

Requirements:
• Currently pursuing or recently completed degree in CS/Statistics/Math
• Knowledge of Python and ML libraries (scikit-learn, pandas, numpy)
• Understanding of statistical concepts and ML algorithms
• Strong analytical and problem-solving skills
• Eagerness to learn and grow`,
    company_name: 'DataTech Analytics',
    location: 'Pune, India',
    job_type: 'Internship',
    work_mode: 'On-site',
    experience_level: 'Entry',
    education_required: "Bachelor's or Master's in CS/Statistics/Math",
    skills_required: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'scikit-learn'],
    salary_min: 20000,
    salary_max: 35000,
    deadline: '2025-10-25',
    is_featured: false,
    is_closed: false,
    is_expired: false,
    views_count: 189,
    created_at: '2025-09-25T09:00:00Z',
    updated_at: '2025-09-25T09:00:00Z',
  },
  {
    id: '4',
    employer_id: 'emp3',
    title: 'DevOps Engineer',
    description: `Looking for a skilled DevOps Engineer to streamline our deployment processes.

Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure (AWS)
• Automate deployment and monitoring processes
• Ensure system reliability and security
• Troubleshoot production issues

Requirements:
• 3+ years of DevOps experience
• Strong knowledge of Docker and Kubernetes
• Experience with AWS services
• Proficiency in scripting (Bash, Python)
• Understanding of infrastructure as code (Terraform)`,
    company_name: 'CloudOps Solutions',
    location: 'Hyderabad, India',
    job_type: 'Full-time',
    work_mode: 'Hybrid',
    experience_level: 'Mid',
    education_required: "Bachelor's in Computer Science or related field",
    skills_required: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python', 'CI/CD'],
    salary_min: 900000,
    salary_max: 1400000,
    deadline: '2025-11-10',
    is_featured: true,
    is_closed: false,
    is_expired: false,
    views_count: 298,
    created_at: '2025-09-18T11:00:00Z',
    updated_at: '2025-09-18T11:00:00Z',
  },
  {
    id: '5',
    employer_id: 'emp4',
    title: 'UI/UX Designer',
    description: `Creative UI/UX Designer needed to craft delightful user experiences.

What You'll Do:
• Design intuitive and beautiful user interfaces
• Create wireframes, prototypes, and high-fidelity mockups
• Conduct user research and usability testing
• Collaborate with developers to ensure design implementation
• Maintain and evolve design systems

Qualifications:
• 2-4 years of UI/UX design experience
• Proficiency in Figma and Adobe Creative Suite
• Strong portfolio demonstrating design skills
• Understanding of user-centered design principles
• Excellent communication skills`,
    company_name: 'Creative Digital Agency',
    location: 'Delhi, India',
    job_type: 'Full-time',
    work_mode: 'Remote',
    experience_level: 'Mid',
    education_required: "Bachelor's in Design or related field",
    skills_required: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
    salary_min: 700000,
    salary_max: 1100000,
    deadline: '2025-11-05',
    is_featured: false,
    is_closed: false,
    is_expired: false,
    views_count: 176,
    created_at: '2025-09-22T16:00:00Z',
    updated_at: '2025-09-22T16:00:00Z',
  },
  {
    id: '6',
    employer_id: 'emp5',
    title: 'Backend Developer',
    description: `Join our team as a Backend Developer and build robust server-side applications.

Key Responsibilities:
• Develop and maintain RESTful APIs
• Design and optimize database schemas
• Implement authentication and authorization
• Write unit and integration tests
• Monitor and improve application performance

Requirements:
• 3+ years of backend development experience
• Strong knowledge of Node.js or Python
• Experience with SQL and NoSQL databases
• Understanding of microservices architecture
• Familiarity with message queues and caching`,
    company_name: 'Enterprise Software Co.',
    location: 'Chennai, India',
    job_type: 'Full-time',
    work_mode: 'On-site',
    experience_level: 'Mid',
    education_required: "Bachelor's in Computer Science",
    skills_required: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    salary_min: 800000,
    salary_max: 1300000,
    deadline: '2025-10-30',
    is_featured: false,
    is_closed: false,
    is_expired: false,
    views_count: 221,
    created_at: '2025-09-28T10:30:00Z',
    updated_at: '2025-09-28T10:30:00Z',
  },
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    job_id: '1',
    job_title: 'Senior Full Stack Developer',
    applicant_name: 'Rahul Sharma',
    applicant_email: 'rahul.sharma@example.com',
    applicant_phone: '+91 98765 43210',
    resume_url: 'https://example.com/resumes/rahul-sharma.pdf',
    cover_letter: 'I am excited to apply for the Senior Full Stack Developer position. With over 6 years of experience in building scalable web applications, I believe I would be a great fit for your team.',
    extracted_skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'],
    status: 'Shortlisted',
    applied_at: '2025-09-16T09:30:00Z',
  },
  {
    id: 'app2',
    job_id: '1',
    job_title: 'Senior Full Stack Developer',
    applicant_name: 'Priya Patel',
    applicant_email: 'priya.patel@example.com',
    applicant_phone: '+91 87654 32109',
    resume_url: 'https://example.com/resumes/priya-patel.pdf',
    cover_letter: 'As a passionate full-stack developer with a proven track record of delivering high-quality solutions, I am thrilled about the opportunity to contribute to your innovative projects.',
    extracted_skills: ['React', 'Node.js', 'JavaScript', 'PostgreSQL', 'Kubernetes'],
    status: 'Under Review',
    applied_at: '2025-09-17T14:20:00Z',
  },
  {
    id: 'app3',
    job_id: '2',
    job_title: 'Frontend Developer',
    applicant_name: 'Amit Kumar',
    applicant_email: 'amit.kumar@example.com',
    applicant_phone: '+91 76543 21098',
    resume_url: 'https://example.com/resumes/amit-kumar.pdf',
    cover_letter: 'I have been following your company for a while and am impressed by your design-first approach. I would love to bring my frontend expertise to your team.',
    extracted_skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Figma'],
    status: 'Pending',
    applied_at: '2025-09-21T11:15:00Z',
  },
  {
    id: 'app4',
    job_id: '3',
    job_title: 'Data Scientist Intern',
    applicant_name: 'Sneha Reddy',
    applicant_email: 'sneha.reddy@example.com',
    applicant_phone: '+91 65432 10987',
    resume_url: 'https://example.com/resumes/sneha-reddy.pdf',
    cover_letter: 'Currently pursuing my Masters in Data Science, I am eager to apply my knowledge in a real-world setting and learn from experienced professionals.',
    extracted_skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'TensorFlow'],
    status: 'Shortlisted',
    applied_at: '2025-09-26T08:45:00Z',
  },
  {
    id: 'app5',
    job_id: '4',
    job_title: 'DevOps Engineer',
    applicant_name: 'Vikram Singh',
    applicant_email: 'vikram.singh@example.com',
    applicant_phone: '+91 54321 09876',
    resume_url: 'https://example.com/resumes/vikram-singh.pdf',
    cover_letter: 'With 4 years of hands-on experience in DevOps and cloud infrastructure, I am confident in my ability to optimize your deployment processes and ensure system reliability.',
    extracted_skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Python'],
    status: 'Hired',
    applied_at: '2025-09-19T13:00:00Z',
  },
];