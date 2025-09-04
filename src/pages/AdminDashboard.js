import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#644f08ff",
      confirmButtonText: "🚪 Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        navigate("/admin/login");
      }
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ecf0f1" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "linear-gradient(180deg, #b07c0aff, #1f1f20ff)",
          color: "white",
          padding: "25px 20px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "40px",
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            Admin
          </h2>

          {[
            { label: "🏠 Dashboard", action: () => navigate("/admin/dashboard") },
            { label: "➕ Add Steps", action: () => navigate("/admin/add-steps") },
            { label: "➕ Add Gallery", action: () => navigate("/admin/add-gallery") },
            { label: "➕ Add Contact", action: () => navigate("/admin/contact") },
            { label: "➕ Add About", action: () => navigate("/admin/about") },

          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              style={{
                width: "100%",
                padding: "12px 14px",
                marginBottom: "15px",
                background: "transparent",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
                textAlign: "left",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#000000ff";
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateX(0)";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: "crimson",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h1
          style={{
            fontSize: "32px",
            color: "#2c3e50",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          Welcome to Admin Dashboard
        </h1>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
          You are successfully logged in. Use the sidebar to navigate.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
