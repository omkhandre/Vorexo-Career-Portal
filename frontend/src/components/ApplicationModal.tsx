import { useState } from "react";
import axios from "axios";
import { X, Upload, CheckCircle } from "lucide-react";
import type { Job } from "../types";

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplicationModal({
  job,
  onClose,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("jobId", job._id);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", resume);

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Application failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= SUCCESS UI ================= */

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#102B34] border border-[#2E4A5C] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#4ADE80]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Application Submitted!
          </h3>
          <p className="text-[#B9C4D0]">
            Your application for{" "}
            <b className="text-white">{job.title}</b> at{" "}
            <b className="text-white">{job.companyName}</b> has been
            submitted.
          </p>
        </div>
      </div>
    );
  }

  /* ================= FORM UI ================= */

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B1E26] border border-[#2E4A5C] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#050B10] border-b border-[#2E4A5C] px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Apply for Position
            </h2>
            <p className="text-[#8FA3B8] text-sm mt-1">
              {job.title} at {job.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#102B34] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#B9C4D0]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Phone Number
            </label>
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-[#2E4A5C] rounded-lg cursor-pointer bg-[#102B34] hover:border-[#1E90FF] hover:bg-[#0B1E26] transition">
              <div className="text-center">
                <Upload className="w-8 h-8 text-[#8FA3B8] mx-auto mb-2" />
                <p className="text-sm font-medium text-white">
                  {resume
                    ? resume.name
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-[#8FA3B8] mt-1">
                  PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="hidden"
                onChange={(e) =>
                  e.target.files && setResume(e.target.files[0])
                }
              />
            </label>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Cover Letter (Optional)
            </label>
            <textarea
              rows={6}
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coverLetter: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg resize-none text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
              placeholder="Tell us why you're a great fit for this position..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-6 border-t border-[#2E4A5C]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#2E4A5C] text-[#B9C4D0] rounded-lg hover:bg-[#102B34] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#1E90FF] text-white rounded-lg hover:bg-[#187BDA] font-medium transition-all disabled:opacity-60 shadow-lg hover:shadow-blue-500/40"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
