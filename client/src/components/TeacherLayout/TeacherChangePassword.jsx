import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaLock, FaEye, FaEyeSlash, FaKey, FaShieldAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const TeacherChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    toast.dismiss();

    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      toast.error("New password must be different from old password");
      return;
    }

    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      toast.error("New password does not meet security requirements");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("teacherToken");

      const res = await axios.post(
        "https://ligand-software-solutions-workshop-2.onrender.com/api/teacher/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password changed successfully! ✅");
      
      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.newPassword);

  return (
    <>
    <div className="teacher-change-password-container">
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="password-change-card">
        {/* Header Section */}
        <div className="password-header">
          <div className="header-icon">
            <FaShieldAlt />
          </div>
          <div className="header-content">
            <h2>Change Password</h2>
            <p>Secure your account with a new password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="password-form">
          {/* Old Password */}
          <div className="form-group">
            <label htmlFor="oldPassword">
              <FaLock className="input-icon" />
              Current Password
            </label>
            <div className="password-input-container">
              <input
                type={showPasswords.oldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter your current password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="newPassword">
              <FaKey className="input-icon" />
              New Password
            </label>
            <div className="password-input-container">
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Create a new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill ${
                      passwordValidation.isValid ? 'strong' : 
                      formData.newPassword.length >= 6 ? 'medium' : 'weak'
                    }`}
                    style={{
                      width: `${
                        passwordValidation.isValid ? 100 : 
                        formData.newPassword.length >= 6 ? 66 : 33
                      }%`
                    }}
                  ></div>
                </div>
                <div className="strength-text">
                  Password strength:{" "}
                  <span className={
                    passwordValidation.isValid ? 'strong' : 
                    formData.newPassword.length >= 6 ? 'medium' : 'weak'
                  }>
                    {passwordValidation.isValid ? 'Strong' : 
                     formData.newPassword.length >= 6 ? 'Medium' : 'Weak'}
                  </span>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="password-requirements">
                <h6>Password must contain:</h6>
                <ul>
                  <li className={passwordValidation.requirements.minLength ? "valid" : "invalid"}>
                    At least 8 characters
                  </li>
                  <li className={passwordValidation.requirements.hasUpperCase ? "valid" : "invalid"}>
                    One uppercase letter
                  </li>
                  <li className={passwordValidation.requirements.hasLowerCase ? "valid" : "invalid"}>
                    One lowercase letter
                  </li>
                  <li className={passwordValidation.requirements.hasNumbers ? "valid" : "invalid"}>
                    One number
                  </li>
                  <li className={passwordValidation.requirements.hasSpecialChar ? "valid" : "invalid"}>
                    One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock className="input-icon" />
              Confirm New Password
            </label>
            <div className="password-input-container">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${
                  formData.confirmPassword && 
                  formData.newPassword !== formData.confirmPassword ? 'error' : ''
                }`}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <div className="error-message">Passwords do not match</div>
            )}
            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0 && (
              <div className="success-message">Passwords match ✓</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                Changing Password...
              </>
            ) : (
              <>
                <FaShieldAlt />
                Change Password
              </>
            )}
          </button>
        </form>

        {/* Security Tips */}
        
      </div>
    </div>
    <style>
      {`
      /* TeacherChangePassword.css */

.teacher-change-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.password-change-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  transition: transform 0.3s ease;
}

.password-change-card:hover {
  transform: translateY(-5px);
}

/* Header Styles */
.password-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 35px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}

.header-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.header-content h2 {
  margin: 15px 0 8px 0;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
}

.header-content p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

/* Form Styles */
.password-form {
  width: 100%;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-icon {
  color: #667eea;
  font-size: 0.9rem;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 15px 50px 15px 15px;
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

.form-input.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.password-toggle {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
  padding: 5px;
}

.password-toggle:hover {
  color: #667eea;
}

/* Password Strength */
.password-strength {
  margin-top: 10px;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-fill {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.strength-fill.weak {
  background: #e53e3e;
}

.strength-fill.medium {
  background: #d69e2e;
}

.strength-fill.strong {
  background: #38a169;
}

.strength-text {
  font-size: 0.85rem;
  color: #718096;
}

.strength-text .weak {
  color: #e53e3e;
  font-weight: 600;
}

.strength-text .medium {
  color: #d69e2e;
  font-weight: 600;
}

.strength-text .strong {
  color: #38a169;
  font-weight: 600;
}

/* Password Requirements */
.password-requirements {
  margin-top: 15px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.password-requirements h6 {
  margin: 0 0 10px 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.password-requirements ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.password-requirements li {
  margin-bottom: 5px;
  font-size: 0.85rem;
  color: #718096;
  position: relative;
}

.password-requirements li:before {
  content: "•";
  color: #cbd5e0;
  position: absolute;
  left: -15px;
}

.password-requirements li.valid {
  color: #38a169;
}

.password-requirements li.valid:before {
  content: "✓";
  color: #38a169;
}

.password-requirements li.invalid {
  color: #e53e3e;
}

.password-requirements li.invalid:before {
  content: "✗";
  color: #e53e3e;
}

/* Messages */
.error-message {
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
}

.success-message {
  color: #38a169;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
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
  margin-top: 10px;
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

.button-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-left: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Security Tips */
.security-tips {
  margin-top: 30px;
  padding: 20px;
  background: #f0fff4;
  border-radius: 12px;
  border: 1px solid #c6f6d5;
}

.security-tips h5 {
  margin: 0 0 12px 0;
  color: #2f855a;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.security-tips ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.security-tips li {
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: #38a169;
  position: relative;
}

.security-tips li:before {
  content: "🔒";
  position: absolute;
  left: -20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .teacher-change-password-container {
    padding: 20px 15px;
  }

  .password-change-card {
    padding: 30px 25px;
  }

  .password-header {
    gap: 15px;
  }

  .header-icon {
    width: 70px;
    height: 70px;
    font-size: 1.7rem;
  }

  .header-content h2 {
    font-size: 1.5rem;
  }

  .header-content p {
    font-size: 0.9rem;
  }

  .form-input {
    padding: 12px 45px 12px 12px;
  }
}

@media (max-width: 480px) {
  .password-change-card {
    padding: 25px 20px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .header-content h2 {
    font-size: 1.3rem;
  }

  .submit-button {
    padding: 14px;
    font-size: 1rem;
  }

  .security-tips {
    padding: 15px;
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

/* Stagger animation */
.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
      `}
    </style>
    </>
  );
};

export default TeacherChangePassword;