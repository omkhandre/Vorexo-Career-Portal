import { useEffect, useState } from "react";
import {
  CreditCard as Edit,
  Trash2,
  Eye,
  Users,
  XCircle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import type { Job } from "../types";

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH JOBS ================= */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get<Job[]>(
          "http://localhost:5000/api/jobs/employer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(res.data);
      } catch (error) {
        console.error("Failed to load jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-[#B9C4D0]">
        Loading jobs...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-6 transition-all duration-300 hover:bg-[#223654] hover:shadow-xl hover:shadow-blue-500/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center flex-wrap gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">
                  {job.title}
                </h3>

                {job.isFeatured && (
                  <span className="px-2 py-1 bg-gradient-to-r from-[#9B7DFF] to-[#7B6CF6] text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}

                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#102B34] text-[#4ADE80] border border-[#2E4A5C]">
                  Active
                </span>
              </div>

              <p className="text-[#B9C4D0] mb-4">
                {job.companyName} • {job.location} • {job.workMode}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-[#B9C4D0]">
                  <Eye className="w-4 h-4 text-[#8FA3B8]" />
                  <span>
                    <span className="font-semibold text-white">—</span>{" "}
                    views
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-[#B9C4D0]">
                  <Users className="w-4 h-4 text-[#8FA3B8]" />
                  <span>
                    <span className="font-semibold text-white">—</span>{" "}
                    applications
                  </span>
                </div>

                <div className="flex items-center text-sm text-[#8FA3B8]">
                  Recently posted
                </div>
              </div>

              {/* Skills */}
              {Array.isArray(job.skillsRequired) &&
                job.skillsRequired.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skillsRequired
                      .slice(0, 5)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 bg-[#102B34] text-[#B9C4D0] rounded-full border border-[#2E4A5C] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                )}
            </div>

            {/* Actions (kept commented as-is) */}
            {/*
            <div className="flex flex-col space-y-2 ml-4">
              <button className="p-2 text-[#1E90FF] hover:bg-[#102B34] rounded-lg transition-colors">
                <Edit className="w-5 h-5" />
              </button>

              <button className="p-2 text-[#F59E0B] hover:bg-[#102B34] rounded-lg transition-colors">
                <XCircle className="w-5 h-5" />
              </button>

              <button className="p-2 text-[#4ADE80] hover:bg-[#102B34] rounded-lg transition-colors">
                <CheckCircle className="w-5 h-5" />
              </button>

              <button className="p-2 text-[#EF4444] hover:bg-[#102B34] rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            */}
          </div>
        </div>
      ))}

      {jobs.length === 0 && (
        <div className="text-center py-16 bg-[#1B2A41] rounded-2xl border border-[#2E4A5C]">
          <h3 className="text-xl font-semibold text-white mb-2">
            No jobs posted yet
          </h3>
          <p className="text-[#B9C4D0]">
            Create your first job to see it here.
          </p>
        </div>
      )}
    </div>
  );
}
