const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    workMode: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    educationRequired: String,
    skillsRequired: [String],
    salaryMin: Number,
    salaryMax: Number,
    deadline: Date,
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
