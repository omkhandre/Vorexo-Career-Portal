import { useEffect, useState } from "react";
import axios from "axios";
import { Download, Mail, Phone, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

interface Application {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  job?: {
    title: string;
  };
  status: string;
  coverLetter?: string;
  createdAt: string;
  resume?: string;
}

/* ================= COMPONENT ================= */

export default function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH APPLICATIONS ================= */

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get<Application[]>(
          "http://localhost:5000/api/applications/employer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* ================= FILTER ================= */

  const filteredApplications =
    selectedStatus === "all"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id: string, uiStatus: string) => {
    const token = localStorage.getItem("token");

    const statusMap: Record<string, string> = {
      Pending: "applied",
      Shortlisted: "shortlisted",
      Rejected: "rejected",
    };

    try {
      await axios.patch(
        `http://localhost:5000/api/applications/status/${id}`,
        { status: statusMap[uiStatus] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: statusMap[uiStatus] }
            : app
        )
      );
    } catch (error) {
      alert("Failed to update application status");
    }
  };

  /* ================= DOWNLOAD RESUME ================= */

  const downloadResume = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get<Blob>(
        `http://localhost:5000/api/applications/resume/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Resume download failed");
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <p className="text-center text-[#B9C4D0]">
        Loading applications...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
          >
            <option value="all">All Applications</option>
            <option value="applied">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>

          <span className="text-sm text-[#B9C4D0]">
            {filteredApplications.length} applications
          </span>
        </div>
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application._id}
            className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-6 transition-all hover:bg-[#223654]"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-lg">
                  {application.applicantName}
                </h3>

                <p className="text-sm text-[#8FA3B8]">
                  {application.job?.title || "Job"}
                </p>

                <div className="flex flex-wrap gap-4 text-sm mt-2 text-[#B9C4D0]">
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {application.applicantEmail}
                  </span>

                  {application.applicantPhone && (
                    <span className="flex items-center gap-1">
                      <Phone size={16} />
                      {application.applicantPhone}
                    </span>
                  )}
                </div>
              </div>

              <select
                value={
                  application.status === "applied"
                    ? "Pending"
                    : application.status === "shortlisted"
                    ? "Shortlisted"
                    : "Rejected"
                }
                onChange={(e) =>
                  updateStatus(application._id, e.target.value)
                }
                className="px-2 py-1.5 text-xs rounded-md bg-[#102B34] border border-[#2E4A5C] text-white focus:ring-1 focus:ring-[#1E90FF] outline-none"
              >
                <option>Pending</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => downloadResume(application._id)}
                className="flex items-center gap-2 bg-[#1E90FF] hover:bg-[#187BDA] text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-blue-500/40"
              >
                <Download size={16} />
                Download Resume
              </button>

              <button
                onClick={() =>
                  navigate(`/applications/${application._id}`)
                }
                className="px-4 py-2 border border-[#2E4A5C] text-[#B9C4D0] rounded-lg hover:bg-[#102B34] transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {filteredApplications.length === 0 && (
        <div className="text-center py-16">
          <Users size={64} className="mx-auto text-[#2E4A5C]" />
          <p className="text-[#8FA3B8] mt-4">
            No applications found
          </p>
        </div>
      )}
    </div>
  );
}
