import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaKey, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const TeacherForgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = "https://ligand-dev-4.onrender.com/api/teacher/forgot-password";
      const res = await axios.post(apiUrl, { email }, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("📧 Reset instructions sent successfully!");
      setIsSubmitted(true);
      setEmail("");
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/teacher-login");
      }, 3000);

    } catch (err) {
      console.error("Forgot Password Error:", err);
      const errMsg = err.response?.data?.message || "Failed to send reset email. Please try again.";
      
      if (err.response?.status === 404) {
        toast.error("❌ Email not found. Please check your email address.");
      } else {
        toast.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // If already submitted, show success message
  if (isSubmitted) {
    return (
      <div className="teacher-forgot-container">
        <ToastContainer 
          position="top-right" 
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <div className="success-card">
          <div className="success-icon">
            <FaPaperPlane />
          </div>
          <div className="success-content">
            <h2>Check Your Email!</h2>
            <p>We've sent a temporary password to your email address.</p>
            <div className="instructions">
              <h4>What to do next:</h4>
              <ul>
                <li>Check your inbox (and spam folder)</li>
                <li>Use the temporary password to login</li>
                <li>Change your password immediately after login</li>
                <li>Keep your new password secure</li>
              </ul>
            </div>
            <div className="success-actions">
              <button 
                onClick={() => navigate("/teacher-login")}
                className="btn-primary"
              >
                Go to Login
              </button>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-forgot-container">
      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="forgot-card">
        {/* Header */}
        <div className="forgot-header">
          <div className="header-icon">
            <FaKey />
          </div>
          <div className="header-content">
            <h1>Reset Your Password</h1>
            <p>We'll send a temporary password to your email</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email address"
              required
              className="form-input"
              autoComplete="email"
            />
            <small className="input-hint">
              Enter the email address associated with your teacher account
            </small>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                Sending Reset Instructions...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Temporary Password
              </>
            )}
          </button>
        </form>

        {/* Important Notice */}
        <div className="security-notice">
          <div className="notice-icon">🔒</div>
          <div className="notice-content">
            <h4>Important Security Notice</h4>
            <p>
              We'll send a <strong>temporary password</strong> to your email. 
              After logging in with the temporary password, please change it immediately 
              in your account settings for security reasons.
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="back-to-login">
          <Link to="/teacher-login" className="back-link">
            <FaArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>

      {/* Background Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1">📧</div>
        <div className="floating-element element-2">🔑</div>
        <div className="floating-element element-3">🔒</div>
      </div>
      <style>{
        `
        

.teacher-forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top:100px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.forgot-card, .success-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease;
}

.forgot-card:hover, .success-card:hover {
  transform: translateY(-5px);
}

/* Header Styles */
.forgot-header {
  text-align: center;
  margin-bottom: 35px;
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

/* Form Styles */
.forgot-form {
  width: 100%;
  margin-bottom: 25px;
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

.form-input {
  width: 100%;
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

/* Security Notice */
.security-notice {
  background: #fffaf0;
  border: 1px solid #fed7aa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
}

.notice-icon {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.notice-content h4 {
  margin: 0 0 10px 0;
  color: #dd6b20;
  font-size: 1rem;
}

.notice-content p {
  margin: 0;
  color: #744210;
  font-size: 0.9rem;
  line-height: 1.5;
}

.notice-content strong {
  color: #dd6b20;
}

/* Back to Login */
.back-to-login {
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Success Card Styles */
.success-card {
  text-align: center;
}

.success-icon {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin: 0 auto 25px;
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.success-content h2 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
}

.success-content p {
  margin: 0 0 25px 0;
  color: #718096;
  font-size: 1.1rem;
}

.instructions {
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.instructions h4 {
  margin: 0 0 15px 0;
  color: #2f855a;
  font-size: 1rem;
}

.instructions ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.instructions li {
  margin-bottom: 8px;
  color: #38a169;
  font-size: 0.9rem;
  position: relative;
}

.instructions li:before {
  content: "✓";
  color: #48bb78;
  font-weight: bold;
  position: absolute;
  left: -20px;
}

.success-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 25%;
  right: 10%;
  animation-delay: 2s;
}

.element-3 {
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .teacher-forgot-container {
    padding: 20px 15px;
  }

  .forgot-card, .success-card {
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

  .success-actions {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    flex: none;
  }
}

@media (max-width: 480px) {
  .forgot-card, .success-card {
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

  .success-icon {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .form-input {
    padding: 12px;
  }

  .submit-button {
    padding: 14px;
    font-size: 1rem;
  }

  .floating-element {
    font-size: 1.5rem;
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
        `
      
}</style>
    </div>
  );
};

export default TeacherForgot;