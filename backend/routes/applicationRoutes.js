const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const {
  applyForJob,
  getEmployerApplications,
  downloadResume,
  updateApplicationStatus,
  getApplicationDetails, // ✅ ADD
} = require("../controllers/applicationController");

const router = express.Router();

/* Candidate applies */
router.post("/apply", upload.single("resume"), applyForJob);

/* Employer list */
router.get("/employer", auth, getEmployerApplications);

/* ✅ Application details (VIEW DETAILS PAGE) */
router.get("/details/:id", auth, getApplicationDetails);

/* Download resume */
router.get("/resume/:id", auth, downloadResume);

/* Update status */
router.patch("/status/:id", auth, updateApplicationStatus);

module.exports = router;
