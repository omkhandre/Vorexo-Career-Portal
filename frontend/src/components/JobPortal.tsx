import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Iimages from "../images.png";

import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";

import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";
import ApplicationModal from "./ApplicationModal";
import type { Job } from "../types";

interface JobPortalProps {
  onEmployerLogin: () => void;
}

export default function JobPortal({ onEmployerLogin }: JobPortalProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  /* ================= FETCH JOBS ================= */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get<Job[]>(
          "http://localhost:5000/api/jobs"
        );
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ================= FILTERING ================= */

  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(job.skillsRequired) &&
          job.skillsRequired.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesLocation =
        locationFilter === "" ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesJobType =
        jobTypeFilter === "" || job.jobType === jobTypeFilter;

      const matchesWorkMode =
        workModeFilter === "" || job.workMode === workModeFilter;

      const matchesExperience =
        experienceFilter === "" ||
        job.experienceLevel === experienceFilter;

      const matchesSalary =
        salaryMin === "" ||
        (typeof job.salaryMin === "number" &&
          job.salaryMin >= Number(salaryMin));

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesWorkMode &&
        matchesExperience &&
        matchesSalary
      );
    });

    if (sortBy === "salary") {
      filtered.sort(
        (a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0)
      );
    }

    return filtered;
  }, [
    jobs,
    searchQuery,
    locationFilter,
    jobTypeFilter,
    workModeFilter,
    experienceFilter,
    salaryMin,
    sortBy,
  ]);

  /* ================= ACTIONS ================= */

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1E26] via-[#102B34] to-[#0B1E26] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#050B10] to-[#0A141A] border-b border-[#2E4A5C] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={Iimages}
              alt="VOREXO"
              className="w-16 h-16 rounded-lg border border-[#2E4A5C]"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                VOREXO
              </h1>
              <p className="text-sm text-[#B9C4D0]">
                Job Portal
              </p>
            </div>
          </div>

          <button
            onClick={onEmployerLogin}
            className="px-6 py-2 bg-[#1E90FF] hover:bg-[#187BDA] text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Employer Login
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-2">
          Find Your Dream Job
        </h2>
        <p className="text-[#B9C4D0] mb-6">
          Explore {filteredJobs.length} opportunities
        </p>

        {/* Filters */}
        <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              placeholder="Search jobs, skills, companies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#102B34] border border-[#2E4A5C] rounded-lg px-4 py-2.5 text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />

            <input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-[#102B34] border border-[#2E4A5C] rounded-lg px-4 py-2.5 text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />

            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="bg-[#102B34] border border-[#2E4A5C] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-10 text-[#B9C4D0]">
            Loading jobs...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isSaved={savedJobs.includes(job._id)}
                onSave={toggleSaveJob}
                onViewDetails={() => setSelectedJob(job)}
                onApply={() => handleApply(job)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedJob && !showApplicationModal && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => setShowApplicationModal(true)}
          isSaved={savedJobs.includes(selectedJob._id)}
          onSave={toggleSaveJob}
        />
      )}

      {showApplicationModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}
