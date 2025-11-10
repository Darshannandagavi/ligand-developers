import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaUserGraduate,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNo: "",
    email: "",
    password: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password validation
  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const isValid = Object.values(requirements).every(Boolean);
    const strength = Object.values(requirements).filter(Boolean).length;

    return { requirements, isValid, strength };
  };

  const passwordValidation = validatePassword(formData.password);

  // Validate current step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstname && formData.lastname && formData.phoneNo;
      case 2:
        return (
          formData.email && formData.password && passwordValidation.isValid
        );
      case 3:
        return formData.education;
      default:
        return false;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      toast.error("Please complete all fields correctly");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = "https://ligand-software-solutions-workshop-2.onrender.com/api/teacher/register";

      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res.data.message || "Teacher registered successfully! 🎉");

      // Reset form after success
      setFormData({
        firstname: "",
        lastname: "",
        phoneNo: "",
        email: "",
        password: "",
        education: "",
      });
      setActiveStep(1);
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const PasswordRequirement = ({ met, text }) => (
    <div className={`requirement-item ${met ? "met" : "unmet"}`}>
      {met ? (
        <FaCheck className="requirement-icon" />
      ) : (
        <FaTimes className="requirement-icon" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <>
      <div className="teacher-register-container">
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

        <div className="register-card">
          {/* Header */}
          <div className="register-header">
            <div className="header-icon">
              <FaUserGraduate />
            </div>
            <div className="header-content">
              <h1>Add Your New Team Member</h1>
              <p>Create your teacher account in simple steps</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`step ${
                  step === activeStep
                    ? "active"
                    : step < activeStep
                    ? "completed"
                    : ""
                }`}
              >
                <div className="step-number">
                  {step < activeStep ? "✓" : step}
                </div>
                <span className="step-label">
                  {step === 1 && "Personal"}
                  {step === 2 && "Account"}
                  {step === 3 && "Education"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Step 1: Personal Information */}
            {activeStep === 1 && (
              <div className="form-step">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter your first name"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter your last name"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNo"
                      placeholder="Enter your phone number"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Information */}
            {activeStep === 2 && (
              <div className="form-step">
                <h3>Account Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Password</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    {formData.password && (
                      <div className="password-strength">
                        <div className="strength-bar">
                          <div
                            className={`strength-fill strength-${passwordValidation.strength}`}
                            style={{
                              width: `${
                                (passwordValidation.strength / 5) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="password-requirements">
                          <PasswordRequirement
                            met={passwordValidation.requirements.minLength}
                            text="At least 8 characters"
                          />
                          <PasswordRequirement
                            met={passwordValidation.requirements.hasUpperCase}
                            text="One uppercase letter"
                          />
                          <PasswordRequirement
                            met={passwordValidation.requirements.hasLowerCase}
                            text="One lowercase letter"
                          />
                          <PasswordRequirement
                            met={passwordValidation.requirements.hasNumbers}
                            text="One number"
                          />
                          <PasswordRequirement
                            met={passwordValidation.requirements.hasSpecialChar}
                            text="One special character"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education Information */}
            {activeStep === 3 && (
              <div className="form-step">
                <h3>Education Background</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Education Qualification</label>
                    <input
                      type="text"
                      name="education"
                      placeholder="e.g., M.Tech in Computer Science, B.Ed, etc."
                      value={formData.education}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    <small className="input-hint">
                      Please enter your highest education qualification
                    </small>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  <FaArrowLeft />
                  Back
                </button>
              )}

              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(activeStep)}
                  className="btn-primary"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !validateStep(3)}
                  className={`btn-submit ${loading ? "loading" : ""}`}
                >
                  {loading ? (
                    <>
                      <div className="button-spinner"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>

          
        </div>
      </div>
      <style>
        {
          `
            /* TeacherRegister.css */

.teacher-register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  transition: transform 0.3s ease;
}

.register-card:hover {
  transform: translateY(-5px);
}

/* Header Styles */
.register-header {
  text-align: center;
  margin-bottom: 30px;
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
  margin: 0 auto 20px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.header-content h1 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
}

.header-content p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: #e2e8f0;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
  background: #e2e8f0;
  color: #718096;
  border: 3px solid white;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #667eea;
  color: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
}

.step.completed .step-number {
  background: #48bb78;
  color: white;
}

.step-label {
  font-size: 0.8rem;
  color: #a0aec0;
  font-weight: 500;
  text-align: center;
}

.step.active .step-label {
  color: #667eea;
  font-weight: 600;
}

/* Form Styles */
.register-form {
  width: 100%;
}

.form-step {
  animation: fadeInUp 0.5s ease;
}

.form-step h3 {
  margin: 0 0 25px 0;
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

.form-grid {
  display: flex;
  flex-direction: column;
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

.input-hint {
  color: #718096;
  font-size: 0.8rem;
  margin-top: 5px;
  font-style: italic;
}

/* Password Input */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
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
  margin-top: 15px;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.strength-fill {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.strength-1 { background: #e53e3e; }
.strength-2 { background: #dd6b20; }
.strength-3 { background: #d69e2e; }
.strength-4 { background: #38a169; }
.strength-5 { background: #48bb78; }

.password-requirements {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.requirement-item.met {
  color: #38a169;
}

.requirement-item.unmet {
  color: #e53e3e;
}

.requirement-icon {
  font-size: 0.7rem;
}

/* Navigation Buttons */
.form-navigation {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-secondary, .btn-primary, .btn-submit {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.btn-primary {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-submit {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.btn-submit:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-submit.loading {
  background: #cbd5e0;
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

/* Login Link */
.login-link {
  text-align: center;
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
}

.login-link p {
  margin: 0;
  color: #718096;
}

.login-link-text {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link-text:hover {
  text-decoration: underline;
}

/* Animations */
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

/* Responsive Design */
@media (max-width: 768px) {
  .teacher-register-container {
    padding: 20px 15px;
  }

  .register-card {
    padding: 30px 25px;
  }

  .header-icon {
    width: 70px;
    height: 70px;
    font-size: 1.7rem;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .progress-steps::before {
    left: 5%;
    right: 5%;
  }

  .step-number {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .step-label {
    font-size: 0.75rem;
  }

  .form-navigation {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 25px 20px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .header-content h1 {
    font-size: 1.3rem;
  }

  .form-input {
    padding: 12px;
  }

  .btn-secondary, .btn-primary, .btn-submit {
    padding: 12px;
    font-size: 0.95rem;
  }
}
          `
        }
      </style>
    </>
  );
};

export default TeacherRegister;
