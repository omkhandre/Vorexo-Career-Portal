const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.registerEmployer = async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, password } = req.body;

    // Check if user already exists
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employer
    const employer = await Employer.create({
      companyName,
      contactPerson,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Employer registered successfully",
      employer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
exports.loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employer = await Employer.findOne({ email });
    if (!employer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: employer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      employer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
