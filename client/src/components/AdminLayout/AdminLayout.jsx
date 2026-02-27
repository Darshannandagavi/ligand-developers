import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import UserFooter from "../UserLayout/UserFooter";
import axios from "axios";
import Loader from "../StyleComponents/Loader";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {

        await axios.get("/api/users/getme");
        setAuthorized(true);
      } catch (err) {
        // If 401 Unauthorized, user is not logged in
        if (err.response?.status === 401) {
          setAuthorized(false);
          navigate("/login");
        } else {
          // Other errors - still allow access (network issue, etc)
          console.warn("Auth check failed:", err.message);
          setAuthorized(true);
        }
      }
    };

    checkAuth();
  }, [navigate]);

 if (authorized === null) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );
}

  if (!authorized) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <AdminNavbar />
      </div>
      <div style={{ flex: 1, paddingTop: "75px", minHeight: "100vh" }}>
        <Outlet />
      </div>
      <div
        style={{
          
         
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <UserFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
