const express = require("express");
const {
  createJob,
  getAllJobs,
  getEmployerJobs,
} = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE JOB */
router.post("/create", auth, createJob);

/* PUBLIC JOBS (Job Portal) */
router.get("/", getAllJobs);

/* EMPLOYER JOBS (Dashboard → My Jobs) */
router.get("/employer", auth, getEmployerJobs);

module.exports = router;
