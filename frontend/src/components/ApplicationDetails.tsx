import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/* ================= TYPES ================= */

interface Job {
  title: string;
  companyName: string;
  location?: string;
}

interface Application {
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  status: string;
  coverLetter?: string;
  createdAt: string;
  job?: Job;
}

/* ================= COMPONENT ================= */

export default function ApplicationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DETAILS ================= */

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get<Application>(
          `http://localhost:5000/api/applications/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplication(res.data);
      } catch (error) {
        console.error("Failed to load application details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <p className="p-8 text-[#B9C4D0]">
        Loading...
      </p>
    );
  }

  if (!application) {
    return (
      <p className="p-8 text-red-500">
        Application not found
      </p>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B10] via-[#0B1E26] to-[#102B34] py-10 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">
          Application Details
        </h1>

        {/* Candidate Info */}
        <div className="space-y-3 text-[#B9C4D0]">
          <p>
            <b className="text-white">Name:</b>{" "}
            {application.applicantName}
          </p>
          <p>
            <b className="text-white">Email:</b>{" "}
            {application.applicantEmail}
          </p>
          <p>
            <b className="text-white">Phone:</b>{" "}
            {application.applicantPhone ?? "N/A"}
          </p>
          <p>
            <b className="text-white">Status:</b>{" "}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#102B34] border border-[#2E4A5C] text-[#1E90FF] ml-2">
              {application.status}
            </span>
          </p>
        </div>

        <hr className="my-6 border-[#2E4A5C]" />

        {/* Job Info */}
        <div className="space-y-2 text-[#B9C4D0]">
          <p>
            <b className="text-white">Job Title:</b>{" "}
            {application.job?.title ?? "—"}
          </p>
          <p>
            <b className="text-white">Company:</b>{" "}
            {application.job?.companyName ?? "—"}
          </p>
          {application.job?.location && (
            <p>
              <b className="text-white">Location:</b>{" "}
              {application.job.location}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <>
            <hr className="my-6 border-[#2E4A5C]" />
            <h2 className="text-lg font-semibold mb-2">
              Cover Letter
            </h2>
            <p className="text-[#B9C4D0] leading-relaxed whitespace-pre-line">
              {application.coverLetter}
            </p>
          </>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-4 print:hidden">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-[#2E4A5C] text-[#B9C4D0] rounded-lg font-medium hover:bg-[#102B34] transition-colors"
          >
            ← Back to Portal
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-[#1E90FF] hover:bg-[#187BDA] text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/40"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
