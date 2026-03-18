const Job = require("../models/Job");
const Employer = require("../models/Employer");

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id);

    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const job = await Job.create({
      ...req.body,
      companyName: employer.companyName,
      employer: employer._id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Job creation failed" });
  }
};

/* ================= PUBLIC JOBS ================= */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ================= EMPLOYER JOBS ================= */
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch employer jobs" });
  }
};
