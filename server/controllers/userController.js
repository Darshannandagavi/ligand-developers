import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cloudinary from "../config/cloudinary.js";

// Register user

// export const register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       contact,
//       password,
//       usn,
//       year,
//       batch,
//       collegeName,
//       programName,
//       technology,
//     } = req.body;

//     console.log(
//       "req.body is here",
//       name,
//       email,
//       contact,
//       password,
//       usn,
//       year,
//       batch,
//       collegeName,
//       programName,
//       technology
//     );
//     console.log(req.body);
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profilePic = req.file ? req.file.filename : "";

//     const user = new User({
//       ...req.body, // takes all fields from frontend
//       profilePic: req.file ? req.file.filename : "",
//       password: hashedPassword, // override with hashed one
//     });

//     await user.save();
//     res.json({ message: "User registered successfully", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
      profilePic: req.file
        ? {
            url: req.file.path,        // Cloudinary URL
            publicId: req.file.filename // Cloudinary public_id
          }
        : null,
    });

    await user.save();

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.role === "student" && !user.isApproved) {
      return res.status(403).json({ error: "Account not approved yet" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role,collegeName: user.collegeName,
    batch: user.batch,
    programme: user.programName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie (browser will send this automatically with requests)
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

    // Return user data (NO TOKEN in response)
    res.status(200).json({
      message: "Login successful",
      user: {
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        role: user.role,
        // usn: user.usn,
        // collegeName: user.collegeName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Teacher from "../models/Teacher.js";

// Update user
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) updates.profilePic = req.file.filename;
    if (updates.password)
      updates.password = await bcrypt.hash(updates.password, 10);

    // Validate teacher assignment
    if (updates.teacher) {
      const teacherExists = await Teacher.findById(updates.teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: "Teacher not found" });
      }
    }

    // Handle teacher assignment
    if (updates.teacher) {
      // Validate that the teacher exists
      const teacherExists = await Teacher.findById(updates.teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: "Teacher not found" });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//change password
export const changePassword = async (req, res) => {
  try {
    // console.log("🔐 Change password request received");

    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    //console.log("📦 Request body:", { oldPassword, newPassword });
    //console.log("👤 User ID from token:", userId);

    const user = await User.findById(userId);
    if (!user) {
      //  console.log("❌ User not found");
      return res.status(404).json({ error: "User not found" });
    }

    //console.log("✅ User found:", user.email || user.username || user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    //console.log("🔍 Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Old password does not match");
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    //console.log("🔑 New password hashed");

    await User.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true }
    );

    //console.log("✅ Password updated successfully");

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("🔥 Error changing password:", err);
    res.status(500).json({ error: err.message });
  }
};

//ForgotPassword

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate 4-digit random password
    const tempPassword = Math.floor(1000 + Math.random() * 9000).toString();

    // Hash and update password only (avoid full validation)
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL,          // full gmail address
    pass: process.env.EMAIL_PASSWORD, // 16-char app password
  },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL, // must match the authenticated Gmail user
      to: email,
      subject: "Your Temporary Password",
      text: `Your temporary password is: ${tempPassword}. Please log in and change it immediately.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Temporary password sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
};

// Mark all users of a batch as passout
export const makeBatchPassout = async (req, res) => {
  try {
    const { collegeName, year, batch } = req.body;

    if (!collegeName || year === undefined || year === null || year === "") {
      return res
        .status(400)
        .json({ error: "collegeName and year are required" });
    }

    const numericYear = Number(year);
    if (Number.isNaN(numericYear)) {
      return res.status(400).json({ error: "year must be a number" });
    }

    const query = { collegeName, year: numericYear };
    if (batch) query.batch = batch;

    console.log("makeBatchPassout query:", query);
    const result = await User.updateMany(query, { $set: { isPassout: true } });
    console.log("makeBatchPassout result:", result);
    return res.json({
      modifiedCount: result.modifiedCount ?? 0,
      message: `${result.modifiedCount ?? 0} users marked as passout`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// ADMIN: Approve / Unapprove a student
export const toggleApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isApproved } },   // update ONLY this field
      { new: true, runValidators: false } // don't revalidate whole user
    );

    if (!updatedUser)
      return res.status(404).json({ error: "User not found" });

    res.json({
      message: `Student marked as ${isApproved ? "Approved" : "Unapproved"}`,
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const approveByDate = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date)
      return res.status(400).json({ error: "Date is required" });

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const result = await User.updateMany(
      {
        role: "student",
        createdAt: { $gte: start, $lte: end }
      },
      { $set: { isApproved: true } }
    );

    res.json({
      message: `${result.modifiedCount} students approved for ${date}`,
      modifiedCount: result.modifiedCount
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






export const getStudentProfile = async (req, res) => {
  try {
  
    const userId = req.user.id; // from auth middleware

    const user = await User.findById(userId)
      .select("-password")
      .populate("teacher", "name email");

    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      profile: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ONLY update allowed text fields
    if (typeof req.body.name === "string" && req.body.name.trim()) {
      user.name = req.body.name.trim();
    }

    if (typeof req.body.contact === "string" && req.body.contact.trim()) {
      user.contact = req.body.contact.trim();
    }
console.log("REQ.FILE =", req.file);

    // Profile picture update
    if (req.file) {
      // delete old image safely
      if (user.profilePic?.publicId) {
        try {
          await cloudinary.uploader.destroy(user.profilePic.publicId);
        } catch (e) {
          console.error("Cloudinary delete failed:", e.message);
          // DO NOT crash the request
        }
      }

      user.profilePic = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get current user (from cookie)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/", // IMPORTANT
  });

  return res.status(200).json({ message: "Logged out successfully" });
};