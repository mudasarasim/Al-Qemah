import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditAbout() {
  const navigate = useNavigate();
  const [about, setAbout] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // For image preview

  // Fetch About info
  const fetchAbout = async () => {
    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/about");
      const data = await res.json();
      setAbout({ title: data.title || "", description: data.description || "", image: null });
      setPreview(data.image_url ? `https://alqemahgoldsmith.com${data.image_url}` : null);
    } catch (err) {
      console.error(err);
      Swal.fire("⚠️ Error", "Failed to fetch About info", "error");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAbout({ ...about, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", about.title);
    formData.append("description", about.description);
    if (about.image) formData.append("image", about.image);

    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/about", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success", "About info saved", "success");
        fetchAbout(); // refresh
      } else {
        Swal.fire("⚠️ Error", "Save failed", "error");
      }
    } catch (err) {
      Swal.fire("⚠️ Error", "Server error occurred", "error");
    }
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
            About Section
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
            ✏️ Edit About Info
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Title *</label>
            <input
              type="text"
              name="title"
              value={about.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            />

            <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Description *</label>
            <textarea
              name="description"
              value={about.description}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                minHeight: "100px",
              }}
            />

            <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Image (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
              />
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#052c65",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              💾 Save About Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAbout;
