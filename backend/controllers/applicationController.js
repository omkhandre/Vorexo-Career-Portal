const Application = require("../models/Application");
const Job = require("../models/Job");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

/* ===============================
   APPLY FOR JOB
================================ */
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const resumePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const application = await Application.create({
      job: jobId,
      employer: job.employer,
      applicantName: name,
      applicantEmail: email,
      applicantPhone: phone,
      coverLetter,
      resume: resumePath,
      status: "applied",
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Application failed" });
  }
};


/* ===============================
   GET SINGLE APPLICATION (DETAILS PAGE)
================================ */
exports.getApplicationDetails = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job", "title companyName location");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Fetch Application Details Error:", error);
    res.status(500).json({ message: "Failed to load application details" });
  }
};


/* ===============================
   EMPLOYER VIEW APPLICATIONS
================================ */
exports.getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      employer: req.user.id,
    })
      .populate("job", "title companyName location")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Fetch Applications Error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ===============================
   DOWNLOAD RESUME
================================ */
exports.downloadResume = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application || !application.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const absolutePath = path.join(process.cwd(), application.resume);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "Resume file missing" });
    }

    res.download(absolutePath);
  } catch (error) {
    console.error("Download Resume Error:", error);
    res.status(500).json({ message: "Resume download failed" });
  }
};

/* ===============================
   UPDATE STATUS + EMAIL (SAFE)
================================ */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ UPDATE STATUS FIRST
    application.status = status;
    await application.save();

    // 📧 EMAIL (SAFE – WON’T BREAK API)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"VOREXO Jobs" <${process.env.EMAIL_USER}>`,
        to: application.applicantEmail,
        subject: "Job Application Status Update",
        text: `Hello ${application.applicantName}, your application status is now: ${status}`,
      });
    } catch (emailError) {
      console.error("⚠️ Email failed but status updated:", emailError.message);
    }

    res.json(application);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};
