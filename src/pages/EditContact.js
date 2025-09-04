import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditContact() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    address: "",
    phone1: "",
    phone2: "",
    email1: "",
    email2: "",
    whatsapp: "",
  });

  const contactId = 1;

  // Fetch contact info
  const fetchContact = async () => {
    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/contact");
      const data = await res.json();
      setContact(data);
    } catch (err) {
      console.error(err);
      Swal.fire("⚠️ Error", "Failed to fetch contact info", "error");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://alqemahgoldsmith.com/api/contact/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success", "Contact info updated", "success");
      } else {
        Swal.fire("⚠️ Error", "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("⚠️ Error", "Server error occurred", "error");
    }
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
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
            Contact Info
          </h2>

          <button
            onClick={() => navigate("/admin/dashboard")}
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
            ⬅️ Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              textAlign: "center",
              fontWeight: "700",
              color: "#2c3e50",
            }}
          >
            ✏️ Edit Contact Info
          </h2>

          <form onSubmit={handleSubmit}>
            {["address", "phone1", "phone2", "email1", "email2", "whatsapp"].map((field, index) => (
              <div key={field} style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    marginBottom: "6px",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {field.replace(/\d/g, "")} {field.includes("1") ? "*" : "(Optional)"}
                </label>
                <input
                  type={field.includes("email") ? "email" : "text"}
                  name={field}
                  value={contact[field] || ""}
                  onChange={handleChange}
                  required={field.includes("1") || field === "address"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#000000ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#1f1f20ff")}
              onMouseOut={(e) => (e.target.style.background = "#000000ff")}
            >
              💾 Save Contact Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContact;
