import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaSearch, FaFilter, FaUsers } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherStudent = () => {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [collegeName, setCollegeName] = useState("");
  const [batch, setBatch] = useState("");
  const [programName, setProgramName] = useState("");
  const [technology, setTechnology] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);

  // Count active filters
  useEffect(() => {
    const count = [collegeName, batch, programName, technology].filter(Boolean).length;
    setActiveFilters(count);
  }, [collegeName, batch, programName, technology]);

  // Load colleges
  useEffect(() => {
    const fetchCollegeOptions = async () => {
      try {
        const res = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/api/options/collegeName");
        setCollegeOptions(res.data || []);
        toast.success("Colleges loaded successfully");
      } catch (err) {
        setCollegeOptions([]);
        toast.error("Failed to load colleges");
      }
    };
    fetchCollegeOptions();
  }, []);

  // Load batches
  useEffect(() => {
    const fetchBatches = async () => {
      if (!collegeName) {
        setBatchOptions([]);
        setBatch("");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/batches",
          {
            params: { collegeName },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBatchOptions(res.data || []);
        toast.info(`Loaded batches for ${collegeName}`);
      } catch (err) {
        setBatchOptions([]);
        toast.error("Failed to load batches");
      } finally {
        setBatch("");
        setProgramName("");
        setTechnology("");
      }
    };
    fetchBatches();
  }, [collegeName]);

  // Load programs
  useEffect(() => {
    const fetchPrograms = async () => {
      if (!collegeName || !batch) {
        setProgramOptions([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/programs",
          {
            params: { collegeName, batch },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProgramOptions(res.data || []);
        toast.info(`Loaded programs for batch ${batch}`);
      } catch (err) {
        setProgramOptions([]);
        toast.error("Failed to load programs");
      } finally {
        setProgramName("");
        setTechnology("");
      }
    };
    fetchPrograms();
  }, [collegeName, batch]);

  // Load technologies
  useEffect(() => {
    const fetchTechnologies = async () => {
      if (!collegeName || !batch || !programName) {
        setTechnologyOptions([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/technologies",
          {
            params: { collegeName, batch, programName },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTechnologyOptions(res.data || []);
        toast.info(`Loaded technologies for ${programName}`);
      } catch (err) {
        setTechnologyOptions([]);
        toast.error("Failed to load technologies");
      } finally {
        setTechnology("");
      }
    };
    fetchTechnologies();
  }, [collegeName, batch, programName]);

  // Load Students
  const loadStudents = async () => {
    if (!collegeName || !batch || !programName || !technology) {
      toast.warning("Please select all filters first");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const teacher = JSON.parse(localStorage.getItem("teacherInfo"));
      const teacherId = teacher?._id;
      
      const res = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/students/forteacher", {
        params: { collegeName, batch, programName, technology, teacherId },
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setStudents(res.data || []);
      toast.success(`Loaded ${res.data.length} students successfully`);
    } catch (err) {
      setStudents([]);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setCollegeName("");
    setBatch("");
    setProgramName("");
    setTechnology("");
    setStudents([]);
    setSearchTerm("");
    toast.info("Filters cleared");
  };

  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.usn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="teacher-student-container">
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
      
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <FaUsers className="header-icon" />
            <h1>View Your Students</h1>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{students.length}</span>
              <span className="stat-label" style={{color:"#fff"}}>Total Students</span>
            </div>
            
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Filter Section */}
        <div className="filter-section card">
          <div className="section-header">
            <div className="section-title">
              <FaFilter className="section-icon" />
              <h3>Filters</h3>
            </div>
            <div className="filter-badge">
              {activeFilters}/4 Selected
            </div>
          </div>

          <div className="filter-grid">
            <div className="form-group">
              <label>College</label>
              <select 
                value={collegeName} 
                onChange={(e) => setCollegeName(e.target.value)}
                className="form-select"
              >
                <option value="">Select College</option>
                {collegeOptions.map((c) => (
                  <option key={c.value || c} value={c.value || c}>
                    {c.value || c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Batch</label>
              <select 
                value={batch} 
                onChange={(e) => setBatch(e.target.value)}
                className="form-select"
                disabled={!collegeName}
              >
                <option value="">Select Batch</option>
                {batchOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Program</label>
              <select 
                value={programName} 
                onChange={(e) => setProgramName(e.target.value)}
                className="form-select"
                disabled={!collegeName || !batch}
              >
                <option value="">Select Program</option>
                {programOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Technology</label>
              <select 
                value={technology} 
                onChange={(e) => setTechnology(e.target.value)}
                className="form-select"
                disabled={!collegeName || !batch || !programName}
              >
                <option value="">Select Technology</option>
                {technologyOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={loadStudents}
              disabled={!collegeName || !batch || !programName || !technology}
            >
              <FaUserGraduate /> Load Students
            </button>
            <button
              className="btn-secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Student List */}
        <div className="student-list-section card">
          <div className="section-header">
            <div className="section-title">
              <h3>Students</h3>
              {students.length > 0 && (
                <span className="student-count">({filteredStudents.length} of {students.length})</span>
              )}
            </div>

            <div className="search-control">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or USN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                disabled={students.length === 0}
              />
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <FaUsers className="empty-icon" />
              <h4>No Students Loaded</h4>
              <p>Select filters and click "Load Students" to view student directory</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <FaSearch className="empty-icon" />
              <h4>No Students Found</h4>
              <p>No students match your search criteria</p>
            </div>
          ) : (
            <div className="students-grid">
              {filteredStudents.map((s) => (
                <div key={s._id} className="student-card">
                  <div className="student-avatar">
                    <img
                      src={
                        s.profilePic
                          ? `https://ligand-software-solutions-workshop-2.onrender.com/uploads/${s.profilePic}`
                          : "/default_user.jpeg"
                      }
                      alt={s.name}
                      onError={(e) => {
                        e.target.src = "/default_user.jpeg";
                      }}
                    />
                  </div>
                  <div className="student-info">
                    <h4 className="student-name">{s.name}</h4>
                    <p className="student-usn">{s.usn}</p>
                    <div className="student-details">
                      <span className="program">{s.programName}</span>
                      <span className="technology">{s.technology}</span>
                    </div>
                    <div className="student-meta">
                      <span className="batch">{s.batch}</span>
                      <span className="college">{s.collegeName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>
        {`
        /* TeacherStudent.css */

.teacher-student-container {
  padding-top:80px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

/* Header Styles */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icon {
  font-size: 2.5rem;
  opacity: 0.9;
}

.header-title h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.header-stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 25px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
  align-items: start;
}

/* Card Styles */
.card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  color: #667eea;
  font-size: 1.2rem;
}

.section-title h3 {
  margin: 0;
  color: #2d3748;
  font-weight: 600;
}

/* Filter Section */
.filter-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.filter-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.form-select {
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-select:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  min-width: 140px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-1px);
}

/* Search Control */
.search-control {
  position: relative;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

/* Student List Section */
.student-list-section {
  min-height: 500px;
}

.student-count {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Students Grid */
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.student-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.student-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #e2e8f0;
}

.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-info {
  flex: 1;
  min-width: 0;
}

.student-name {
  margin: 0 0 5px 0;
  color: #2d3748;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.student-usn {
  margin: 0 0 8px 0;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

.student-details {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.program, .technology {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.student-meta {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: #718096;
}

.batch, .college {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #718096;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #a0aec0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 10px 0;
  color: #718096;
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
  max-width: 300px;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .filter-section {
    order: 1;
  }
  
  .student-list-section {
    order: 2;
  }
}

@media (max-width: 768px) {
  .teacher-student-container {
    padding: 15px;
  }
  
  .page-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-stats {
    justify-content: center;
  }
  
  .stat-card {
    min-width: 100px;
    padding: 12px 20px;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-control {
    min-width: auto;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    flex: none;
  }
}

@media (max-width: 480px) {
  .header-title {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .header-title h1 {
    font-size: 1.5rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .student-card {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .student-details, .student-meta {
    justify-content: center;
  }
}

/* Custom scrollbar for student grid */
.students-grid::-webkit-scrollbar {
  width: 6px;
}

.students-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.students-grid::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.students-grid::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
        `}
      </style>
    </div>
  );
};

export default TeacherStudent;