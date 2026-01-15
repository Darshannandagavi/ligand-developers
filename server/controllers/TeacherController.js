import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Teacher from "../models/Teacher.js";

// Generate JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .select('-password')  // Exclude password field
      .sort({ firstname: 1 }); // Sort by firstname
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ REGISTER (Send Welcome Email)
export const registerTeacher = async (req, res) => {
  try {
    const { firstname, lastname, phoneNo, email, password, education } = req.body;

    // Check existing email
    const existing = await Teacher.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    // Create teacher
    const teacher = await Teacher.create({
      firstname,
      lastname,
      phoneNo,
      email,
      password,
      education,
    });

    // ---- Send Welcome Email ----
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL,          // full gmail address
    pass: process.env.EMAIL_PASSWORD, // 16-char app password
  },
    });

    const mailOptions = {
      from: `"Team Ligand Coders" <${process.env.EMAIL}>`,
      to: teacher.email,
      subject: `Welcome to Ligand Developers, ${teacher.firstname}!`,
      html: `
        <div style="
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  color: #1f2937;
  line-height: 1.7;
">
  <h2 style="color:#2563eb; text-align:center;">🎊 Welcome to the Ligand Developers Family!</h2>

  <p>Hi <strong>${teacher.firstname} ${teacher.lastname}</strong>,</p>

  <p>Congratulations! 🎉 You are now officially a part of our growing <strong>Team Ligand Coders</strong>. We're thrilled to have you join us on this exciting journey of innovation, creativity, and teamwork. 🚀</p>

  <p>Here are your account details to get started:</p>

  <div style="background:#f3f4f6; padding:15px; border-radius:8px; margin:15px 0;">
    <p><strong>Teacher ID:</strong> ${teacher._id}</p>
    <p><strong>Email:</strong> ${teacher.email}</p>
    <p><strong>Password:</strong> ${password}</p>
    <p><strong>Phone No:</strong> ${teacher.phoneNo}</p>
    <p><strong>Education:</strong> ${teacher.education}</p>
  </div>

  <p>✨ <strong>Welcome to our team!</strong> You can now log in to your dashboard, explore your profile, and start collaborating with other passionate developers and educators.</p>



  <p style="margin-top:30px;">Once again, welcome aboard! We can’t wait to see the amazing things we’ll achieve together.</p>

  <p style="margin-top:25px;">Warm regards,<br>
  <strong>Team Ligand Coders</strong><br>
  <span style="color:#6b7280;">Ligand Developers</span></p>

  <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;">
  <p style="font-size:0.85rem; color:#9ca3af; text-align:center;">
    This is an automated message. Please do not reply.<br>
    © ${new Date().getFullYear()} Ligand Developers. All rights reserved.
  </p>
</div>

      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Teacher registered successfully. Welcome email sent.",
      token: generateToken(teacher._id),
      teacher,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ LOGIN
export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    if (!teacher.activeStatus)
      return res
        .status(403)
        .json({ message: "Account inactive. Contact admin." });

    const isMatch = await teacher.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(teacher._id),
      teacher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE TEACHER
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE TEACHER
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ TOGGLE ACTIVE STATUS + SEND EMAIL
export const toggleActiveStatus = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    teacher.activeStatus = !teacher.activeStatus;
    await teacher.save();

    // ----- SEND NOTIFICATION EMAIL -----
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL,          // full gmail address
    pass: process.env.EMAIL_PASSWORD, // 16-char app password
  },
    });

    let statusMsg = teacher.activeStatus
      ? "Your account has been activated again."
      : "Your account access has been deactivated by admin.";

    const mailOptions = {
      from: `"Ligand Admin" <${process.env.EMAIL}>`,
      to: teacher.email,
      subject: `Account Status Update – Ligand Coders Team`,
      html: `
        <div style="font-family: Arial; padding:20px; background:#f4f4f4;">
          <h2>Hello ${teacher.firstname},</h2>
          <p>${statusMsg}</p>
          <p>If you think this was a mistake, please contact admin.</p>
          <br/>
          <strong>Regards,<br/>
          Ligand Admin Team</strong>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: `Teacher is now ${teacher.activeStatus ? "Active" : "Inactive"}`,
      teacher,
    });

  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ FORGOT PASSWORD (Generate & Send Email)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Generate new temporary password
    const newPasswordPlain = randomBytes(9)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 12);

    teacher.password = newPasswordPlain; // pre-save hook hashes it
    await teacher.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL,          // full gmail address
    pass: process.env.EMAIL_PASSWORD, // 16-char app password
  },
    });

    const mailOptions = {
      from: `"Team Ligand Coders" <${process.env.EMAIL}>`,
      to: teacher.email,
      subject: "Password Reset – Ligand Developers",
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;
          border:1px solid #e5e7eb;padding:25px;border-radius:10px;">
          <h3 style="color:#2563eb;">Password Reset Request</h3>
          <p>Hello ${teacher.firstname || "Teacher"},</p>
          <p>Your new temporary password is:</p>
          <h3>${newPasswordPlain}</h3>
          <p>Please log in and change your password immediately for security reasons.</p>
          <p>Best regards,<br/><strong>Team Ligand Coders</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

// ✅ CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const teacher = await Teacher.findById(req.user.id);

    const isMatch = await teacher.matchPassword(oldPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    teacher.password = newPassword;
    await teacher.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



