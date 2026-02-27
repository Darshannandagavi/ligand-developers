import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import axios from "axios";
import Loader from "../StyleComponents/Loader";

const UserLayout = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch protected data to check if authenticated
        await axios.get("/api/users/profile",{withCredentials: true,});
        setAuthorized(true);
      } catch (err) {
        console.log(err)
        if (err.response?.status === 401) {
          setAuthorized(false);
          navigate("/login");
        } else {
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
        <UserHeader />
      </div>
      <div style={{ flex: 1, paddingTop: "75px" }}>
        <Outlet />
      </div>
      <div
        style={{
          
          bottom: 0,
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

export default UserLayout;
