import { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  Plus,
  Briefcase,
  Users,
  Eye,
} from "lucide-react";

import JobPostingForm from "./JobPostingForm";
import JobManagement from "./JobManagement";
import ApplicationsList from "./ApplicationsList";

/* ================= TYPES ================= */

interface Job {
  _id: string;
  title: string;
  viewsCount: number;
  isClosed: boolean;
  isExpired: boolean;
  createdAt: string;
}

interface Application {
  _id: string;
}

/* ================= PROPS ================= */

interface EmployerDashboardProps {
  onLogout: () => void;
}

type TabType = "overview" | "jobs" | "applications" | "create";

/* ================= COMPONENT ================= */

export default function EmployerDashboard({ onLogout }: EmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicationsCount, setApplicationsCount] = useState(0);

  /* ================= FETCH DASHBOARD DATA ================= */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [jobsRes, appsRes] = await Promise.all([
          axios.get<any[]>("http://localhost:5000/api/jobs/employer", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Application[]>(
            "http://localhost:5000/api/applications/employer",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const normalizedJobs: Job[] = jobsRes.data.map((job) => ({
          _id: job._id,
          title: job.title,
          viewsCount: job.viewsCount ?? job.views_count ?? 0,
          isClosed: job.isClosed ?? job.is_closed ?? false,
          isExpired: job.isExpired ?? false,
          createdAt: job.createdAt ?? job.created_at ?? new Date().toISOString(),
        }));

        setJobs(normalizedJobs);
        setApplicationsCount(appsRes.data.length);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  /* ================= METRICS ================= */

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(
    (job) => !job.isClosed && !job.isExpired
  ).length;

  const totalViews = jobs.reduce(
    (sum, job) => sum + (job.viewsCount || 0),
    0
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B10] via-[#0B1E26] to-[#102B34] text-white">
      {/* Header */}
      <header className="bg-[#050B10] border-b border-[#2E4A5C]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Employer Dashboard
            </h1>
            <p className="text-sm text-[#B9C4D0]">
              Manage your job postings and applications
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 text-[#B9C4D0] hover:text-white hover:bg-[#102B34] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-[#1B2A41] rounded-xl p-1 border border-[#2E4A5C]">
          {[
            { key: "overview", label: "Overview" },
            { key: "jobs", label: "My Jobs" },
            { key: "applications", label: "Applications" },
            { key: "create", label: "Post Job", icon: Plus },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                activeTab === tab.key
                  ? "bg-[#1E90FF] text-white shadow-lg shadow-blue-500/30"
                  : "text-[#B9C4D0] hover:text-white hover:bg-[#102B34]"
              }`}
            >
              {"icon" in tab && tab.icon && <tab.icon className="w-5 h-5" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<Briefcase className="w-6 h-6 text-[#1E90FF]" />}
                value={totalJobs}
                label="Total Job Postings"
              />

              <MetricCard
                icon={<Briefcase className="w-6 h-6 text-[#4ADE80]" />}
                value={activeJobs}
                label="Active Postings"
                badge="Active"
              />

              <MetricCard
                icon={<Eye className="w-6 h-6 text-[#7B6CF6]" />}
                value={totalViews}
                label="Total Views"
              />

              <MetricCard
                icon={<Users className="w-6 h-6 text-[#F59E0B]" />}
                value={applicationsCount}
                label="Total Applications"
              />
            </div>

            <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">
                Recent Activity
              </h3>

              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div
                    key={job._id}
                    className="flex justify-between items-center p-4 bg-[#102B34] border border-[#2E4A5C] rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-white">
                        {job.title}
                      </h4>
                      <p className="text-sm text-[#8FA3B8]">
                        {job.viewsCount} views • Posted{" "}
                        {Math.floor(
                          (Date.now() -
                            new Date(job.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days ago
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#102B34] text-[#4ADE80] border border-[#2E4A5C]">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "jobs" && <JobManagement />}
        {activeTab === "applications" && <ApplicationsList />}
        {activeTab === "create" && (
          <JobPostingForm onSuccess={() => setActiveTab("jobs")} />
        )}
      </div>
    </div>
  );
}

/* ================= METRIC CARD ================= */

function MetricCard({
  icon,
  value,
  label,
  badge,
}: {
  icon: JSX.Element;
  value: number;
  label: string;
  badge?: string;
}) {
  return (
    <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-6 transition-all hover:bg-[#223654]">
      <div className="flex justify-between mb-4">
        <div className="w-12 h-12 bg-[#102B34] rounded-xl flex items-center justify-center border border-[#2E4A5C]">
          {icon}
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2 py-1 bg-[#102B34] text-[#4ADE80] border border-[#2E4A5C] rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1 text-white">
        {value}
      </h3>
      <p className="text-[#B9C4D0] text-sm">
        {label}
      </p>
    </div>
  );
}
