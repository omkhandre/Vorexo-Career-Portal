import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  Eye,
  Star,
} from "lucide-react";
import type { Job } from "../types";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSave: (jobId: string) => void;
  onViewDetails: () => void;
  onApply: () => void;
}

export default function JobCard({
  job,
  isSaved,
  onSave,
  onViewDetails,
  onApply,
}: JobCardProps) {
  return (
    <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl p-6 relative group transition-all duration-300 hover:bg-[#223654] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Featured Badge */}
      {job.isFeatured && (
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#9B7DFF] to-[#7B6CF6] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          <span>Featured</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-[#1E90FF] transition-colors">
            {job.title}
          </h3>
          <p className="text-[#B9C4D0] font-medium text-sm">
            {job.companyName}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(job._id);
          }}
          className="p-2 rounded-lg hover:bg-[#102B34] transition-colors"
        >
          <Bookmark
            className={`w-5 h-5 ${
              isSaved
                ? "fill-[#1E90FF] text-[#1E90FF]"
                : "text-[#8FA3B8]"
            }`}
          />
        </button>
      </div>

      {/* Meta Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-[#B9C4D0]">
          <MapPin className="w-4 h-4 mr-2 text-[#8FA3B8]" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span className="text-xs px-2 py-1 bg-[#102B34] text-[#7B6CF6] rounded-full font-medium border border-[#2E4A5C]">
            {job.workMode}
          </span>
        </div>

        <div className="flex items-center text-sm text-[#B9C4D0]">
          <Briefcase className="w-4 h-4 mr-2 text-[#8FA3B8]" />
          <span>{job.jobType}</span>
          <span className="mx-2">•</span>
          <span className="text-xs px-2 py-1 bg-[#102B34] text-[#1E90FF] rounded-full font-medium border border-[#2E4A5C]">
            {job.experienceLevel}
          </span>
        </div>

        {/* Salary */}
        {typeof job.salaryMin === "number" &&
          typeof job.salaryMax === "number" && (
            <div className="flex items-center text-sm text-[#B9C4D0]">
              <DollarSign className="w-4 h-4 mr-2 text-[#8FA3B8]" />
              <span className="font-semibold text-white">
                ₹{job.salaryMin.toLocaleString()} – ₹
                {job.salaryMax.toLocaleString()}
              </span>
            </div>
          )}

        {/* Time & Views */}
        <div className="flex items-center text-sm text-[#8FA3B8]">
          <Clock className="w-4 h-4 mr-2" />
          <span>Recently posted</span>
          <span className="mx-2">•</span>
          <Eye className="w-4 h-4 mr-1" />
          <span>New</span>
        </div>
      </div>

      {/* Skills */}
      {Array.isArray(job.skillsRequired) &&
        job.skillsRequired.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-[#102B34] text-[#B9C4D0] rounded-full border border-[#2E4A5C] font-medium"
                >
                  {skill}
                </span>
              ))}

              {job.skillsRequired.length > 3 && (
                <span className="text-xs px-3 py-1 bg-[#102B34] text-[#8FA3B8] rounded-full border border-[#2E4A5C]">
                  +{job.skillsRequired.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

      {/* Actions */}
      <div className="flex space-x-2 pt-4 border-t border-[#2E4A5C]">
        <button
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 border border-[#3A6EFF] text-[#B9C4D0] rounded-lg hover:bg-[#102B34] transition-colors font-medium text-sm"
        >
          View Details
        </button>
        <button
          onClick={onApply}
          className="flex-1 px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-[#187BDA] transition-all font-medium text-sm shadow-md hover:shadow-blue-500/40"
        >
          Quick Apply
        </button>
      </div>
    </div>
  );
}
