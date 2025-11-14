import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUserEdit, FaCamera, FaSave, FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const TeacherEditProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNo: "",
    email: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  // Load saved teacher info from localStorage
  useEffect(() => {
    const savedTeacher = JSON.parse(localStorage.getItem("teacherInfo"));
    if (savedTeacher) {
      setFormData({
        firstname: savedTeacher.firstname || "",
        lastname: savedTeacher.lastname || "",
        phoneNo: savedTeacher.phoneNo || "",
        email: savedTeacher.email || "",
        education: savedTeacher.education || "",
      });
      // Set profile picture - using the provided image as default
      setProfilePic(
        savedTeacher.profilePic 
          ? `https://ligand-dev-4.onrender.com/uploads/${savedTeacher.profilePic}`
          : "https://img.freepik.com/premium-vector/female-teacher-cute-woman-stands-with-pointer-book-school-learning-concept-teacher-s-day_335402-428.jpg"
      );
    } else {
      toast.error("No teacher data found. Please login again.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("teacherToken");
      const savedTeacher = JSON.parse(localStorage.getItem("teacherInfo"));

      if (!token || !savedTeacher) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const apiUrl = `https://ligand-dev-4.onrender.com/api/teacher/update/${savedTeacher._id}`;

      const res = await axios.put(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Profile updated successfully ✅");

      // Update localStorage with new teacher info
      localStorage.setItem("teacherInfo", JSON.stringify(res.data.teacher));
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="teacher-edit-profile-container" style={{marginTop:"100px"}}>
        <div className="profile-edit-card">
          {/* Profile Header with Image */}
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={profilePic}
                alt="Profile"
                className="profile-image"
                onError={(e) => {
                  e.target.src = "https://img.freepik.com/premium-vector/female-teacher-cute-woman-stands-with-pointer-book-school-learning-concept-teacher-s-day_335402-428.jpg";
                }}
              />
             
            </div>
            <div className="profile-title">
              <FaUserEdit className="title-icon" />
              <h2>Edit Profile</h2>
              <p>Update your personal information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phone number"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  disabled
                  className="form-input disabled"
                />
                <span className="disabled-note">Email cannot be changed</span>
              </div>

              <div className="form-group full-width">
                <label htmlFor="education">Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  placeholder="Enter your education qualifications"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  Updating...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <style>{`
      /* TeacherEditProfile.css */

.teacher-edit-profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // padding: 10px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-edit-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-edit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f1f3f4;
}

.profile-image-container {
  position: relative;
  flex-shrink: 0;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #e2e8f0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.profile-image:hover {
  border-color: #667eea;
  transform: scale(1.05);
}

.profile-image-overlay {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.camera-icon {
  font-size: 0.7rem;
}

.profile-title {
  flex: 1;
}

.profile-title h2 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  color: #667eea;
  font-size: 1.5rem;
}

.profile-title p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

/* Form Styles */
.profile-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-input {
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #a0aec0;
}

.form-input.disabled {
  background-color: #f7fafc;
  color: #718096;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.disabled-note {
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: 5px;
  font-style: italic;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.submit-button:hover:not(.loading) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-button:active:not(.loading) {
  transform: translateY(-1px);
}

.submit-button.loading {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .teacher-edit-profile-container {
    padding: 20px 15px;
  }

  .profile-edit-card {
    padding: 30px 25px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .profile-image {
    width: 100px;
    height: 100px;
  }

  .profile-title h2 {
    font-size: 1.5rem;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-group.full-width {
    grid-column: 1;
  }
}

@media (max-width: 480px) {
  .profile-edit-card {
    padding: 25px 20px;
  }

  .profile-image {
    width: 80px;
    height: 80px;
  }

  .profile-title h2 {
    font-size: 1.3rem;
  }

  .profile-title p {
    font-size: 0.9rem;
  }

  .form-input {
    padding: 12px;
  }

  .submit-button {
    padding: 14px;
    font-size: 1rem;
  }
}

/* Animation for form elements */
.form-group {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for form groups */
.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }
      `
}</style>
    </>
  );
};

export default TeacherEditProfile;