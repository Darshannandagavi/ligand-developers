import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../StyleComponents/Loader";

const AdminNewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);

  const [stats, setStats] = useState({
    totalStudents: 0,
    currentStudents: 0,
    passoutStudents: 0,
    totalColleges: 0,
    totalRevenue: 0,
    pendingFees: 0,
    totalAttendance: 0,
    averageAttendance: 0,
    totalExams: 0,
    totalNotes: 0,
  });

  const [detailedData, setDetailedData] = useState({
    students: [],
    colleges: [],
    attendance: [],
    feePayments: [],
    feeGroups: [],
    exams: [],
    notes: [],
  });

  const [chartsData, setChartsData] = useState({
    attendanceTrend: [],
    revenueByCollege: [],
    studentDistribution: [],
    feeStatus: [],
    programDistribution: [],
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        usersRes,
        collegesRes,
        attendanceRes,
        feePaymentsRes,
        feeGroupsRes,
        examsRes,
        notesRes,
      ] = await Promise.all([
        axios.get("http://localhost:8000/api/users", { withCredentials: true }),
        axios.get("http://localhost:8000/api/options/collegeName", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/attendance", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/fee-payment", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/fee-groups", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/exams/examsforadmin", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/notes/admin", {
          withCredentials: true,
        }),
      ]);

      const users = usersRes.data;
      const colleges = collegesRes.data;
      const attendance = attendanceRes.data;
      const feePayments = feePaymentsRes.data;
      const feeGroups = feeGroupsRes.data;
      const exams = examsRes.data;
      const notes = notesRes.data;
      console.log(feePayments);
      const totalStudents = users.length;
      const currentStudents = users.filter((u) => !u.isPassout).length;
      const passoutStudents = users.filter((u) => u.isPassout).length;
      const totalColleges = [...new Set(users.map((u) => u.collegeName))]
        .length;
      const totalExams = exams.length;
      const totalNotes = notes.length;

      let totalRevenue = 0;
      let pendingFees = 0;

      feeGroups.forEach((group) => {
        group.students.forEach((student) => {
          // Paid amount
          totalRevenue += student.paidFee || 0;

          // Remaining amount
          pendingFees += student.currentFee || 0;
        });
      });

      const totalAttendance = attendance.length;
      const presentAttendance = attendance.filter(
        (a) => a.status === "present",
      ).length;
      const averageAttendance =
        totalAttendance > 0 ? (presentAttendance / totalAttendance) * 100 : 0;

      setStats({
        totalStudents,
        currentStudents,
        passoutStudents,
        totalColleges,
        totalRevenue,
        pendingFees,
        totalAttendance,
        averageAttendance,
        totalExams,
        totalNotes,
      });

      setDetailedData({
        students: users,
        colleges: colleges,
        attendance,
        feePayments,
        feeGroups,
        exams,
        notes,
      });

      prepareChartsData(users, attendance, feePayments, feeGroups);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prepareChartsData = (users, attendance, feePayments, feeGroups) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const attendanceTrend = last7Days.map((date) => {
      const dayAttendance = attendance.filter(
        (a) => new Date(a.date).toISOString().split("T")[0] === date,
      );
      const present = dayAttendance.filter(
        (a) => a.status === "present",
      ).length;
      const total = dayAttendance.length;
      return {
        date,
        present,
        total,
        rate: total > 0 ? (present / total) * 100 : 0,
      };
    });

    const revenueByCollegeMap = {};

    feeGroups.forEach((group) => {
      if (!revenueByCollegeMap[group.collegeName]) {
        revenueByCollegeMap[group.collegeName] = 0;
      }

      group.students.forEach((student) => {
        revenueByCollegeMap[group.collegeName] += student.paidFee || 0;
      });
    });

    const revenueByCollege = Object.entries(revenueByCollegeMap).map(
      ([college, revenue]) => ({ college, revenue }),
    );

    const programDistribution = Object.entries(
      users.reduce((acc, user) => {
        acc[user.programName] = (acc[user.programName] || 0) + 1;
        return acc;
      }, {}),
    ).map(([program, count]) => ({ program, count }));

    let paidFees = 0;
    let pendingFeesCount = 0;

    feeGroups.forEach((group) => {
      group.students.forEach((student) => {
        if ((student.currentFee || 0) === 0) {
          paidFees++;
        } else {
          pendingFeesCount++;
        }
      });
    });

    const feeStatus = [
      { status: "Paid", count: paidFees },
      { status: "Pending", count: pendingFeesCount },
    ];

    const studentDistribution = [
      {
        type: "Current Students",
        count: users.filter((u) => !u.isPassout).length,
      },
      {
        type: "Passout Students",
        count: users.filter((u) => u.isPassout).length,
      },
    ];

    setChartsData({
      attendanceTrend,
      revenueByCollege,
      programDistribution,
      feeStatus,
      studentDistribution,
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
    setSearchTerm("");
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCard(null);
    setSearchTerm("");
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const openHistoryModal = (history) => {
    setSelectedHistory(history);
    setHistoryModalOpen(true);
  };

  const filteredData = () => {
    let data = detailedData[selectedCard] || [];
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();

    switch (selectedCard) {
      case "students":
        data = data.filter(
          (item) =>
            item.name?.toLowerCase().includes(term) ||
            item.usn?.toLowerCase().includes(term) ||
            item.collegeName?.toLowerCase().includes(term) ||
            item.programName?.toLowerCase().includes(term),
        );
        break;
      case "feePayments":
        data = data.filter(
          (item) =>
            item.student?.name?.toLowerCase().includes(term) ||
            item.collegeName?.toLowerCase().includes(term),
        );
        break;
      case "attendance":
        data = data.filter(
          (item) =>
            item.student?.name?.toLowerCase().includes(term) ||
            item.programName?.toLowerCase().includes(term) ||
            item.technology?.toLowerCase().includes(term),
        );
        break;
      case "exams":
        data = data.filter(
          (item) =>
            item.examTitle?.toLowerCase().includes(term) ||
            item.collegeName?.toLowerCase().includes(term),
        );
        break;
      case "notes":
        data = data.filter((item) => item.title?.toLowerCase().includes(term));
        break;
      case "colleges":
        data = data.filter((item) => item.value?.toLowerCase().includes(term));
        break;
      default:
        break;
    }
    return data;
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  if (loading)
    return (
      <div>
        <div
          style={{
            minHeight: "100vh",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      </div>
    );

  return (
    <div
      className="dashboard-container"
      style={{ minWidth: "100%", overflowX: "hidden" }}
    >
      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      <div className="dashboard-header">
        <Typography variant="h4" className="dashboard-title">
          Admin Dashboard
        </Typography>
        <div className="header-stats">
          <span className="stat-badge">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className="stats-grid">
        {/* Total Students */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card student-card"
            onClick={() => handleCardClick("students")}
          >
            <CardContent>
              <div className="card-icon">👨‍🎓</div>
              <Typography color="textSecondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" className="stat-number">
                {stats.totalStudents.toLocaleString()}
              </Typography>
              <div className="card-chips">
                <Chip
                  label={`${stats.currentStudents} Current`}
                  size="small"
                  className="current-chip"
                />
                <Chip
                  label={`${stats.passoutStudents} Passout`}
                  size="small"
                  className="passout-chip"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Colleges */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card college-card"
            onClick={() => handleCardClick("colleges")}
          >
            <CardContent>
              <div className="card-icon">🏫</div>
              <Typography color="textSecondary" gutterBottom>
                Colleges
              </Typography>
              <Typography variant="h4" className="stat-number">
                {stats.totalColleges}
              </Typography>
              <Typography variant="body2" className="card-subtext">
                Active institutions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card revenue-card"
            onClick={() => handleCardClick("feePayments")}
          >
            <CardContent>
              <div className="card-icon">💰</div>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h4" className="stat-number">
                ₹{stats.totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" className="pending-amount">
                Pending: ₹{stats.pendingFees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card attendance-card"
            onClick={() => handleCardClick("attendance")}
          >
            <CardContent>
              <div className="card-icon">📊</div>
              <Typography color="textSecondary" gutterBottom>
                Attendance
              </Typography>
              <Typography variant="h4" className="stat-number">
                {stats.averageAttendance.toFixed(1)}%
              </Typography>
              <Typography variant="body2" className="card-subtext">
                {stats.totalAttendance} records
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Exams */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card exam-card"
            onClick={() => handleCardClick("exams")}
          >
            <CardContent>
              <div className="card-icon">📝</div>
              <Typography color="textSecondary" gutterBottom>
                Total Exams
              </Typography>
              <Typography variant="h4" className="stat-number">
                {stats.totalExams}
              </Typography>
              <Typography variant="body2" className="card-subtext">
                Conducted
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notes */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className="stat-card note-card"
            onClick={() => handleCardClick("notes")}
          >
            <CardContent>
              <div className="card-icon">📚</div>
              <Typography color="textSecondary" gutterBottom>
                Total Notes
              </Typography>
              <Typography variant="h4" className="stat-number">
                {stats.totalNotes}
              </Typography>
              <Typography variant="body2" className="card-subtext">
                Study materials
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Card
        className="charts-section"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          overflow: "hidden",
          marginBottom: "32px",
        }}
      >
        <CardContent style={{ padding: "32px" }}>
          <Typography
            variant="h5"
            style={{
              background: "linear-gradient(45deg, #2c3e50, #3498db)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "700",
              fontSize: "2rem",
              marginBottom: "32px",
              textAlign: "center",
              paddingBottom: "16px",
              borderBottom: "2px solid #e8f4f8",
            }}
          >
            Analytics Overview
          </Typography>

          {/* Attendance Charts */}
          <div
            className="chart-group"
            style={{
              marginBottom: "48px",
              padding: "24px",
              background: "rgba(248, 249, 250, 0.8)",
              borderRadius: "12px",
              border: "1px solid rgba(52, 152, 219, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: "#2c3e50",
                fontWeight: "600",
                fontSize: "1.4rem",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#3498db",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                }}
              >
                📈
              </span>
              Attendance Analytics
            </Typography>
            <Grid
              container
              spacing={3}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid item xs={12} md={6}>
                <div
                  className="chart-container"
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    minHeight: "380px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "16px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Attendance Trend (Last 7 Days)
                  </Typography>
                  <div style={{ flex: 1, minHeight: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartsData.attendanceTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                        <XAxis
                          dataKey="date"
                          stroke="#5d6d7e"
                          fontSize={12}
                          tick={{ fill: "#5d6d7e" }}
                        />
                        <YAxis
                          stroke="#5d6d7e"
                          fontSize={12}
                          tick={{ fill: "#5d6d7e" }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                          }}
                          formatter={(value) => [
                            `${value}%`,
                            "Attendance Rate",
                          ]}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "10px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#3498db"
                          strokeWidth={3}
                          dot={{ fill: "#3498db", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: "#2980b9" }}
                          name="Attendance Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  className="chart-container"
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    minHeight: "380px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "16px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Daily Attendance Breakdown
                  </Typography>
                  <div style={{ flex: 1, minHeight: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartsData.attendanceTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                        <XAxis
                          dataKey="date"
                          stroke="#5d6d7e"
                          fontSize={12}
                          tick={{ fill: "#5d6d7e" }}
                        />
                        <YAxis
                          stroke="#5d6d7e"
                          fontSize={12}
                          tick={{ fill: "#5d6d7e" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "10px",
                          }}
                        />
                        <Bar
                          dataKey="present"
                          fill="#27ae60"
                          name="Present"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={40}
                        />
                        <Bar
                          dataKey="total"
                          fill="#e74c3c"
                          name="Total"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} style={{ margin: "0 auto" }}>
                  <div
                    className="chart-container"
                    style={{
                      background: "white",
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                      border: "1px solid #e0e0e0",
                      height: "100%",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontWeight: "600",
                        color: "#2c3e50",
                        marginBottom: "16px",
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      Revenue Distribution by College
                    </Typography>
                    <div style={{ flex: 1, minHeight: "320px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartsData.revenueByCollege}
                          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f4f8"
                          />
                          <XAxis
                            dataKey="college"
                            stroke="#5d6d7e"
                            fontSize={11}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fill: "#5d6d7e" }}
                          />
                          <YAxis
                            stroke="#5d6d7e"
                            fontSize={12}
                            tick={{ fill: "#5d6d7e" }}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                          />
                          <Tooltip
                            formatter={(value) => [
                              `₹${Number(value).toLocaleString()}`,
                              "Revenue",
                            ]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.98)",
                              border: "1px solid #e0e0e0",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              fontSize: "12px",
                            }}
                          />
                          <Bar
                            dataKey="revenue"
                            fill="#9b59b6"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={50}
                            name="Revenue"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {/* Revenue Charts */}

          {/* Student Charts */}
          <div
            className="chart-group"
            style={{
              marginBottom: "48px",
              padding: "24px",
              background: "rgba(248, 249, 250, 0.8)",
              borderRadius: "12px",
              border: "1px solid rgba(52, 152, 219, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: "#2c3e50",
                fontWeight: "600",
                fontSize: "1.4rem",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#3498db",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                }}
              >
                👥
              </span>
              Student Analytics
            </Typography>
            <Grid
              container
              spacing={3}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid item xs={12} md={6}>
                <div
                  className="chart-container"
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "16px",
                      fontSize: "1.1rem",
                      textAlign: "center",
                    }}
                  >
                    Student Status Distribution
                  </Typography>
                  <div style={{ flex: 1, minHeight: "320px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartsData.studentDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count, percentage }) =>
                            `${type}: ${count} (${((count / stats.totalStudents) * 100).toFixed(1)}%)`
                          }
                          outerRadius={120}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="count"
                          paddingAngle={2}
                        >
                          {chartsData.studentDistribution.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ),
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [value, name]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "20px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  className="chart-container"
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "16px",
                      fontSize: "1.1rem",
                      textAlign: "center",
                    }}
                  >
                    Program-wise Student Distribution
                  </Typography>
                  <div style={{ flex: 1, minHeight: "320px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartsData.programDistribution}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                        <XAxis
                          dataKey="program"
                          stroke="#5d6d7e"
                          fontSize={11}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fill: "#5d6d7e" }}
                        />
                        <YAxis
                          stroke="#5d6d7e"
                          fontSize={12}
                          tick={{ fill: "#5d6d7e" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#2ecc71"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                          name="Students"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  className="chart-container"
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "16px",
                      fontSize: "1.1rem",
                      textAlign: "center",
                    }}
                  >
                    Fee Payment Status Distribution
                  </Typography>
                  <div style={{ flex: 1, minHeight: "320px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartsData.feeStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ status, count, percentage }) =>
                            `${status}: ${count} (${((count / (chartsData.feeStatus[0]?.count + chartsData.feeStatus[1]?.count)) * 100).toFixed(1)}%)`
                          }
                          outerRadius={120}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="count"
                          paddingAngle={2}
                        >
                          {chartsData.feeStatus.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.status === "Paid" ? "#27ae60" : "#e74c3c"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [value, name]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "20px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          {/* Fee Charts */}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Grid container spacing={3} className="recent-activity">
        <Grid item xs={12} md={6}>
          <Card className="activity-card">
            <CardContent>
              <div className="activity-header">
                <Typography variant="h6" className="activity-title">
                  Recent Exams
                </Typography>
              </div>
              <TableContainer>
                <Table size="small" className="activity-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>College</TableCell>
                      <TableCell>Visibility</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailedData.exams.slice(0, 5).map((exam) => (
                      <TableRow key={exam._id} className="table-row">
                        <TableCell className="exam-title">
                          {exam.examTitle}
                        </TableCell>
                        <TableCell>{exam.collegeName}</TableCell>
                        <TableCell>
                          <Chip
                            label={exam.visibility}
                            size="small"
                            className={
                              exam.visibility === "public"
                                ? "public-chip"
                                : "private-chip"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="activity-card">
            <CardContent>
              <div className="activity-header">
                <Typography variant="h6" className="activity-title">
                  Recent Notes
                </Typography>
              </div>
              <TableContainer>
                <Table size="small" className="activity-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Visibility</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailedData.notes.slice(0, 5).map((note) => (
                      <TableRow key={note._id} className="table-row">
                        <TableCell className="note-title">
                          {note.title}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={note.isActive ? "Active" : "Inactive"}
                            size="small"
                            className={
                              note.isActive ? "active-chip" : "inactive-chip"
                            }
                          />
                        </TableCell>
                        <TableCell>{note.visibleTo.length} colleges</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="lg"
        fullWidth
        className="data-dialog"
      >
        <DialogTitle className="dialog-title">
          {selectedCard
            ? `All ${selectedCard.charAt(0).toUpperCase() + selectedCard.slice(1)}`
            : ""}
          <span className="result-count">
            ({filteredData().length} records)
          </span>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div className="search-container">
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Search ${selectedCard}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
                className: "search-input",
              }}
            />
          </div>

          <TableContainer component={Paper} className="data-table-container">
            <Table stickyHeader className="data-table">
              <TableHead>
                <TableRow className="table-header-row">
                  {selectedCard === "students" &&
                    [
                      "Name",
                      "USN",
                      "College",
                      "Program",
                      "Batch",
                      "Status",
                    ].map((h) => (
                      <TableCell key={h} className="table-header-cell">
                        {h}
                      </TableCell>
                    ))}
                  {selectedCard === "colleges" &&
                    ["College Name", "Total Students"].map((h) => (
                      <TableCell key={h} className="table-header-cell">
                        {h}
                      </TableCell>
                    ))}
                  {selectedCard === "feePayments" &&
                    [
                      "Student",
                      "total",
                      "Paid",
                      "Pending",
                      "Status",
                      "College",
                      "History",
                    ].map((h) => (
                      <TableCell key={h} className="table-header-cell">
                        {h}
                      </TableCell>
                    ))}
                  {selectedCard === "attendance" &&
                    ["Student", "Date", "Status", "Program", "Technology"].map(
                      (h) => (
                        <TableCell key={h} className="table-header-cell">
                          {h}
                        </TableCell>
                      ),
                    )}
                  {selectedCard === "exams" &&
                    ["Title", "College", "Visibility", "Created Date"].map(
                      (h) => (
                        <TableCell key={h} className="table-header-cell">
                          {h}
                        </TableCell>
                      ),
                    )}
                  {selectedCard === "notes" &&
                    ["Title", "Status", "Visibility", "Created Date"].map(
                      (h) => (
                        <TableCell key={h} className="table-header-cell">
                          {h}
                        </TableCell>
                      ),
                    )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData().map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={
                      index % 2 === 0 ? "table-row-even" : "table-row-odd"
                    }
                  >
                    {selectedCard === "students" && (
                      <>
                        <TableCell className="student-name">
                          {item.name}
                        </TableCell>
                        <TableCell className="usn">{item.usn}</TableCell>
                        <TableCell>{item.collegeName}</TableCell>
                        <TableCell>{item.programName}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.isPassout ? "Passout" : "Current"}
                            size="small"
                            className={
                              item.isPassout
                                ? "passout-status"
                                : "current-status"
                            }
                          />
                        </TableCell>
                      </>
                    )}
                    {selectedCard === "colleges" && (
                      <>
                        <TableCell className="college-name">
                          {item.value}
                        </TableCell>
                        <TableCell>
                          {
                            detailedData.students.filter(
                              (s) => s.collegeName === item.value,
                            ).length
                          }
                        </TableCell>
                      </>
                    )}
                    {selectedCard === "feePayments" && (
                      <>
                        <TableCell className="student-name">
                          {item.student?.name || "N/A"}
                        </TableCell>
                        <TableCell className="amount">
                          ₹{Number(item?.totalFee ?? 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="amount">
                          ₹{Number(item?.paidFee ?? 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="amount">
                          ₹{Number(item?.currentFee ?? 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            className={
                              item.status === "Paid"
                                ? "paid-status"
                                : "pending-status"
                            }
                          />
                        </TableCell>
                        <TableCell>{item.collegeName}</TableCell>
                        <TableCell>
                          {item.paymentHistory?.length ? (
                            <div>
                              <strong>
                                ₹
                                {Number(
                                  item.paymentHistory.reduce(
                                    (sum, p) => sum + Number(p.amount || 0),
                                    0,
                                  ),
                                ).toLocaleString()}
                              </strong>

                              <div>
                                <button
                                  className="history-btn"
                                  onClick={() =>
                                    openHistoryModal(item.paymentHistory)
                                  }
                                >
                                  View History ({item.paymentHistory.length})
                                </button>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted">No Payments</span>
                          )}
                        </TableCell>
                      </>
                    )}
                    {selectedCard === "attendance" && (
                      <>
                        <TableCell className="student-name">
                          {item.student?.name || "N/A"}
                        </TableCell>
                        <TableCell>
                          {new Date(item.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            className={
                              item.status === "present"
                                ? "present-status"
                                : "absent-status"
                            }
                          />
                        </TableCell>
                        <TableCell>{item.programName}</TableCell>
                        <TableCell>{item.technology}</TableCell>
                      </>
                    )}
                    {selectedCard === "exams" && (
                      <>
                        <TableCell className="exam-title">
                          {item.examTitle}
                        </TableCell>
                        <TableCell>{item.collegeName}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.visibility}
                            size="small"
                            className={
                              item.visibility === "public"
                                ? "public-chip"
                                : "private-chip"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    {selectedCard === "notes" && (
                      <>
                        <TableCell className="note-title">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.isActive ? "Active" : "Inactive"}
                            size="small"
                            className={
                              item.isActive ? "active-chip" : "inactive-chip"
                            }
                          />
                        </TableCell>
                        <TableCell>{item.visibleTo.length} colleges</TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleDialogClose} className="close-button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {historyModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Payment History</h3>

            <div className="history-body">
  {selectedHistory.map((payment, index) => (
    <div key={index} className="history-row">
      
      {/* Amount */}
      {payment?.amount !== undefined && (
        <div>
          <strong>
            ₹{Number(payment.amount || 0).toLocaleString()}
          </strong>
        </div>
      )}

      {/* Date */}
      {payment?.paidOn && (
        <div className="history-date">
          {new Date(payment.paidOn).toLocaleString()}
        </div>
      )}

      {/* Payment Mode */}
      {payment?.paymentMode && (
        <div className="history-mode">
          Mode: {payment.paymentMode}
        </div>
      )}

      {/* Transaction ID */}
      {payment?.transactionId && (
        <div className="history-transaction">
          Txn ID: {payment.transactionId}
        </div>
      )}

      {/* Receipt */}
      
        {payment?.receipt?.url && (
  <div className="history-receipt">
    <img
      src={payment.receipt.url}
      alt="Receipt"
      style={{ width: "100px", marginTop: "5px" }}
    />
  </div>
)}

      

      {/* Remark */}
      {payment?.remark && (
        <div className="history-remark">
          Remark: {payment.remark}
        </div>
      )}

      {/* Paid By */}
      {payment?.collectedBy && (
        <div className="history-by">
          Paid To: {payment.collectedBy}
        </div>
      )}

    </div>
  ))}
</div>


            <div className="modal-footer">
              <button
                className="modal-close-btn"
                onClick={() => setHistoryModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal-content {
          background: white;
          padding: 20px;
          width: 400px;
          max-height: 70vh;
          overflow-y: auto;
          border-radius: 8px;
        }

        .history-row {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .history-btn {
          background: none;
          border: none;
          color: blue;
          cursor: pointer;
        }
        .modal-close-btn {
          margin-top: 15px;
          padding: 8px 18px;
          border: none;
          border-radius: 6px;
          background-color: #e53935;
          color: #fff;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background-color: #c62828;
          transform: translateY(-1px);
        }

        .modal-close-btn:active {
          transform: scale(0.97);
        }

        .modal-close-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.3);
        }
        .modal-content {
          background: white;
          width: 400px;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
        }

        /* Scroll only this section */
        .history-body {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
        }

        /* Footer always visible */
        .modal-footer {
          padding: 12px;
          border-top: 1px solid #eee;
          background: #fff;
        }

        /* Close Button */
        .modal-close-btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 6px;
          background-color: #e53935;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .modal-close-btn:hover {
          background-color: #c62828;
        }

        .dashboard-container {
          padding: 24px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .loading-text {
          margin-top: 16px;
          font-size: 18px;
          color: #666;
          font-weight: 500;
        }

        .error-alert {
          margin-bottom: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .dashboard-title {
          color: #2c3e50;
          font-weight: 700;
          margin: 0;
        }

        .header-stats {
          display: flex;
          gap: 12px;
        }

        .stat-badge {
          background: #e3f2fd;
          color: #1976d2;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .stats-grid {
          margin-bottom: 32px;
          display: flex;
          justify-content: space-evenly;
        }

        .stat-card {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          border: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
          min-width: 225px;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }

        .student-card::before {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        .college-card::before {
          background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
        }
        .revenue-card::before {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
        }
        .attendance-card::before {
          background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
        }
        .exam-card::before {
          background: linear-gradient(90deg, #fa709a 0%, #fee140 100%);
        }
        .note-card::before {
          background: linear-gradient(90deg, #76f1ebff 0%, #6f43f5ff 100%);
        }

        .card-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .stat-number {
          font-weight: 700;
          color: #2c3e50;
          margin: 8px 0;
        }

        .card-chips {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-direction: column;
        }

        .current-chip {
          background: #e8f5e8 !important;
          color: #2e7d32 !important;
          font-weight: 500;
        }

        .passout-chip {
          background: #fce4ec !important;
          color: #c2185b !important;
          font-weight: 500;
        }

        .card-subtext {
          color: #666;
          font-size: 12px;
          margin-top: 4px;
        }

        .pending-amount {
          color: #f44336 !important;
          font-weight: 500;
          margin-top: 4px;
        }

        .charts-section {
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 32px;
          border: none;
        }

        .section-title {
          color: #2c3e50;
          font-weight: 700;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f0f0f0;
        }

        .chart-group {
          margin-bottom: 40px;
        }

        .chart-group-title {
          color: #34495e;
          font-weight: 600;
          margin-bottom: 24px;
          padding-left: 8px;
          border-left: 4px solid #667eea;
        }

        .chart-container {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f0f0f0;
          min-width: 400px;
        }

        .chart-title {
          color: #555;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .recent-activity {
          margin-bottom: 32px;
          width: 120%;
        }

        .activity-card {
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .activity-title {
          color: #2c3e50;
          font-weight: 600;
        }

        .view-all {
          color: #667eea;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .activity-table {
          border-radius: 8px;
          overflow: hidden;
        }

        .table-row:hover {
          background-color: #f8f9fa !important;
        }

        .exam-title,
        .note-title,
        .student-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .public-chip {
          background: #e8f5e8 !important;
          color: #2e7d32 !important;
        }

        .private-chip {
          background: #fff3e0 !important;
          color: #ef6c00 !important;
        }

        .active-chip {
          background: #e8f5e8 !important;
          color: #2e7d32 !important;
        }

        .inactive-chip {
          background: #ffebee !important;
          color: #c62828 !important;
        }

        .data-dialog {
          border-radius: 16px;
        }

        .dialog-title {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          margin: 0;
          font-weight: 600;
        }

        .result-count {
          font-size: 14px;
          opacity: 0.9;
          margin-left: 8px;
          font-weight: 400;
        }

        .dialog-content {
          padding: 24px;
        }

        .search-container {
          margin-bottom: 24px;
        }

        .search-field {
          border-radius: 12px;
        }

        .search-input {
          border-radius: 12px;
        }

        .search-icon {
          color: #667eea;
        }

        .data-table-container {
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          max-height: 400px;
        }

        .data-table {
          border-radius: 12px;
        }

        .table-header-row {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .table-header-cell {
          font-weight: 600;
          color: #ffffff;
          background: #667eea;
          border-bottom: 2px solid #ddd;
        }

        .table-row-even {
          background-color: #fafafa;
        }

        .table-row-odd {
          background-color: white;
        }

        .table-row-even:hover,
        .table-row-odd:hover {
          background-color: #f0f7ff;
        }

        .usn,
        .amount {
          font-family: "inter", monospace;
          font-weight: 600;
        }

        .paid-status {
          background: #e8f5e8 !important;
          color: #2e7d32 !important;
        }

        .pending-status {
          background: #fff3e0 !important;
          color: #ef6c00 !important;
        }

        .current-status {
          background: #e3f2fd !important;
          color: #1565c0 !important;
        }

        .passout-status {
          background: #fce4ec !important;
          color: #c2185b !important;
        }

        .present-status {
          background: #e8f5e8 !important;
          color: #2e7d32 !important;
        }

        .absent-status {
          background: #ffebee !important;
          color: #c62828 !important;
        }

        .college-name {
          font-weight: 600;
          color: #2c3e50;
        }

        .dialog-actions {
          padding: 16px 24px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .close-button {
          background: #667eea;
          color: white;
          padding: 8px 24px;
          border-radius: 8px;
          font-weight: 500;
          text-transform: none;
        }

        .close-button:hover {
          background: #5a6fd8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .dashboard-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .stat-card {
            margin-bottom: 16px;
          }

          .chart-container {
            padding: 16px;
          }

          .card-chips {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminNewDashboard;
