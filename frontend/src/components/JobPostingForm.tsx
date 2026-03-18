import { useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";

interface JobPostingFormProps {
  onSuccess: () => void;
}

export default function JobPostingForm({ onSuccess }: JobPostingFormProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "Full-time",
    workMode: "On-site",
    experienceLevel: "Entry",
    educationRequired: "",
    skillsRequired: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    isFeatured: false,
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/jobs/create",
        {
          ...formData,
          salaryMin: Number(formData.salaryMin),
          salaryMax: Number(formData.salaryMax),
          skillsRequired: formData.skillsRequired
            .split(",")
            .map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1500);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Job creation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS UI ================= */

  if (success) {
    return (
      <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-10 text-center shadow-2xl">
        <div className="w-16 h-16 bg-[#102B34] border border-[#2E4A5C] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-[#4ADE80]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Job Posted Successfully!
        </h2>
        <p className="text-[#B9C4D0]">
          Your job is now live and visible to candidates.
        </p>
      </div>
    );
  }

  /* ================= FORM UI ================= */

  return (
    <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#2E4A5C]">
        <h2 className="text-2xl font-bold text-white">
          Post a New Job
        </h2>
        <p className="text-[#B9C4D0] mt-1">
          Fill in the details to publish a job opening
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Job Title *
            </label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Location *
            </label>
            <input
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Pune, India"
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Job Type *
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Work Mode *
            </label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Experience Level *
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            >
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Education Required
            </label>
            <input
              name="educationRequired"
              value={formData.educationRequired}
              onChange={handleChange}
              placeholder="e.g. B.Tech / MCA"
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Min Salary (₹)
            </label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Max Salary (₹)
            </label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">
            Skills Required *
          </label>
          <input
            name="skillsRequired"
            required
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="React, TypeScript, Node.js"
            className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">
            Job Description *
          </label>
          <textarea
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg resize-none text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
          />
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-5 h-5 accent-[#1E90FF]"
          />
          <span className="text-sm font-medium text-white">
            Mark as Featured Job
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1E90FF] hover:bg-[#187BDA] text-white rounded-lg font-semibold transition-all disabled:opacity-60 shadow-lg hover:shadow-blue-500/40"
        >
          {loading ? "Posting Job..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
