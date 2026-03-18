import {
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Bookmark,
  Building2,
  GraduationCap,
} from "lucide-react";
import type { Job } from "../types";

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  onApply: () => void;
  isSaved: boolean;
  onSave: (jobId: string) => void;
}

export default function JobDetailsModal({
  job,
  onClose,
  onApply,
  isSaved,
  onSave,
}: JobDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B1E26] border border-[#2E4A5C] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#050B10] border-b border-[#2E4A5C] px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">
            {job.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#102B34] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#B9C4D0]" />
          </button>
        </div>

        <div className="p-8">
          {/* Company + Save */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-[#1E90FF]" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {job.companyName}
                </h3>
                <p className="text-[#8FA3B8] text-sm">
                  Job opportunity
                </p>
              </div>
            </div>

            <button
              onClick={() => onSave(job._id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 border ${
                isSaved
                  ? "bg-[#102B34] text-[#1E90FF] border-[#3A6EFF]"
                  : "bg-[#102B34] text-[#B9C4D0] border-[#2E4A5C]"
              } hover:border-[#3A6EFF]`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? "fill-current" : ""
                }`}
              />
              <span className="font-medium">
                {isSaved ? "Saved" : "Save Job"}
              </span>
            </button>
          </div>

          {/* Job Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-[#102B34] border border-[#2E4A5C] rounded-xl">
              <div className="flex items-center space-x-2 text-[#8FA3B8] mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="font-semibold text-white">
                {job.location}
              </p>
              <p className="text-sm text-[#4ADE80]">
                {job.workMode}
              </p>
            </div>

            <div className="p-4 bg-[#102B34] border border-[#2E4A5C] rounded-xl">
              <div className="flex items-center space-x-2 text-[#8FA3B8] mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">Job Type</span>
              </div>
              <p className="font-semibold text-white">
                {job.jobType}
              </p>
              <p className="text-sm text-[#1E90FF]">
                {job.experienceLevel}
              </p>
            </div>

            {typeof job.salaryMin === "number" &&
              typeof job.salaryMax === "number" && (
                <div className="p-4 bg-[#102B34] border border-[#2E4A5C] rounded-xl">
                  <div className="flex items-center space-x-2 text-[#8FA3B8] mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Salary Range
                    </span>
                  </div>
                  <p className="font-semibold text-white">
                    ₹{job.salaryMin.toLocaleString()} – ₹
                    {job.salaryMax.toLocaleString()}
                  </p>
                </div>
              )}

            {job.educationRequired && (
              <div className="p-4 bg-[#102B34] border border-[#2E4A5C] rounded-xl">
                <div className="flex items-center space-x-2 text-[#8FA3B8] mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Education
                  </span>
                </div>
                <p className="font-semibold text-white">
                  {job.educationRequired}
                </p>
              </div>
            )}

            {job.deadline && (
              <div className="p-4 bg-[#102B34] border border-[#2E4A5C] rounded-xl">
                <div className="flex items-center space-x-2 text-[#8FA3B8] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Deadline
                  </span>
                </div>
                <p className="font-semibold text-white">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-white mb-3">
              Job Description
            </h4>
            <p className="text-[#B9C4D0] leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          {Array.isArray(job.skillsRequired) &&
            job.skillsRequired.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-3">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#102B34] text-[#1E90FF] border border-[#2E4A5C] rounded-lg font-medium text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Actions */}
          <div className="flex space-x-4 pt-6 border-t border-[#2E4A5C]">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#2E4A5C] text-[#B9C4D0] rounded-lg hover:bg-[#102B34] transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={onApply}
              className="flex-1 px-6 py-3 bg-[#1E90FF] text-white rounded-lg hover:bg-[#187BDA] transition-all font-medium shadow-lg hover:shadow-blue-500/40"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
