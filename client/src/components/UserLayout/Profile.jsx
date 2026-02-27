import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../StyleComponents/Loader"
const API = "https://ligand-dev-7.onrender.com/api/users";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.profile);
        setPreview(res.data.profile?.profilePic?.url);
      })
      .catch((err) => {alert("Failed to load profile");console.log(err)});
  }, []);

  // Handle image preview
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("contact", profile.contact);
      if (file) formData.append("profilePic", file);

      const res = await axios.put(`${API}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data.profile);
      setFile(null);
      alert("Profile updated successfully");
    } catch(err) {
      console.log(err)
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return (
    <div className="loading-container">
      <Loader/>
      <p>Loading profile...</p>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Student Profile</h2>
        <p className="subtitle">Manage your personal information</p>
      </div>

      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-card">
          <div className="avatar-wrapper">
            <img
              src={preview || "./default_user.jpeg"}
              alt="Profile"
              className="profile-avatar"
            />
            <div className="avatar-overlay">
              <label htmlFor="file-upload" className="upload-label">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Change Photo</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input"
              />
            </div>
          </div>
          <div className="avatar-info">
            <h3>{profile.name}</h3>
            <p className="role-badge">{profile.role}</p>
            <p className="email-text">{profile.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  value={profile.contact}
                  onChange={(e) =>
                    setProfile({ ...profile, contact: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Academic Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">USN</label>
                <input value={profile.usn} disabled className="form-input disabled" />
              </div>

              <div className="form-group">
                <label className="form-label">Year</label>
                <input value={profile.year} disabled className="form-input disabled" />
              </div>

              <div className="form-group">
                <label className="form-label">Batch</label>
                <input value={profile.batch} disabled className="form-input disabled" />
              </div>

              <div className="form-group">
                <label className="form-label">Program</label>
                <input value={profile.programName} disabled className="form-input disabled" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">College</label>
                <input value={profile.collegeName || ""} disabled className="form-input disabled" />
              </div>

              <div className="form-group">
                <label className="form-label">Technology</label>
                <input value={profile.technology} disabled className="form-input disabled" />
              </div>
            </div>
          </div>

          <div className="action-bar">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        :root {
          --primary: #9333ea;
          --primary-light: #eef2ff;
          --secondary: #3a0ca3;
          --accent: #4cc9f0;
          --text: #1f2937;
          --text-light: #6b7280;
          --bg: #f9fafb;
          --card: #ffffff;
          --border: #e5e7eb;
          --success: #10b981;
          --shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          --shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.1);
          --radius: 12px;
          --transition: all 0.3s ease;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--primary-light);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
          display: inline-block;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .profile-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .profile-header h2 {
          font-size: 32px;
          color: var(--text);
          margin-bottom: 8px;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: var(--text-light);
          font-size: 16px;
        }

        .profile-content {
          background: var(--card);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: var(--transition);
        }

        .profile-content:hover {
          box-shadow: var(--shadow-hover);
        }

        /* Avatar Card */
        .avatar-card {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 30px;
          background: linear-gradient(135deg, var(--primary-light), #f8fafc);
          border-bottom: 1px solid var(--border);
        }

        .avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
          cursor: pointer;
        }

        .avatar-wrapper:hover .avatar-overlay {
          opacity: 1;
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          cursor: pointer;
        }

        .upload-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 5px;
        }

        .file-input {
          display: none;
        }

        .avatar-info h3 {
          font-size: 24px;
          color: var(--text);
          margin-bottom: 8px;
          font-weight: 600;
        }

        .role-badge {
          display: inline-block;
          background: var(--accent);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .email-text {
          color: var(--text-light);
          font-size: 14px;
        }

        /* Profile Form */
        .profile-form {
          padding: 30px;
        }

        .form-section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 18px;
          color: var(--text);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--primary-light);
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 14px;
          color: var(--text);
          margin-bottom: 6px;
          font-weight: 500;
        }

        .form-input {
          padding: 12px 16px;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 15px;
          transition: var(--transition);
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .form-input.disabled {
          background: #f8fafc;
          color: var(--text-light);
          cursor: not-allowed;
        }

        /* Action Bar */
        .action-bar {
          display: flex;
          justify-content: flex-end;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          margin-top: 30px;
        }

        .submit-btn {
          background: linear-gradient(90deg, #4f46e5, #9333ea);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-container {
            margin: 20px auto;
          }

          .avatar-card {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .profile-form {
            padding: 20px;
          }

          .action-bar {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .profile-header h2 {
            font-size: 24px;
          }

          .avatar-wrapper {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}