import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddGallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [newImageId, setNewImageId] = useState(null);

  // Fetch gallery images
  const fetchGallery = async () => {
    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Upload handler
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success!", "Image uploaded successfully", "success");
        e.target.reset();
        setNewImageId(data.image?.id || null);
        fetchGallery();
      } else {
        Swal.fire("❌ Error", "Failed to upload image", "error");
      }
    } catch (err) {
      Swal.fire("⚠️ Error", "Server error occurred", "error");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://alqemahgoldsmith.com/api/gallery/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Deleted!", "Image has been deleted.", "success");
            fetchGallery();
          } else {
            Swal.fire("❌ Error", "Failed to delete image", "error");
          }
        } catch (err) {
          Swal.fire("⚠️ Error", "Server error occurred", "error");
        }
      }
    });
  };
// Add inside component
const handleEdit = async (id) => {
  // Create a hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://alqemahgoldsmith.com/api/gallery/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success!", "Image updated successfully", "success");
        fetchGallery(); // refresh list
      } else {
        Swal.fire("❌ Error", "Failed to update image", "error");
      }
    } catch (err) {
      Swal.fire("⚠️ Error", "Server error occurred", "error");
    }
  };

  fileInput.click();
};

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ecf0f1" }}>
      {/* Sidebar (same design as AdminDashboard) */}
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
            Gallery
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
        {/* Upload Form */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            marginBottom: "40px",
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
            ➕ Add Gallery Image
          </h2>

          <form onSubmit={handleGallerySubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#555",
              }}
            >
              Select Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              style={{
                display: "block",
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "100%",
                cursor: "pointer",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "12px 15px",
                background: "#000000ff",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                width: "100%",
              }}
            >
              📤 Upload
            </button>
          </form>
        </div>

        {/* Gallery List */}
        <div>
          <h3
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
             Gallery Images{" "}
            <span
              style={{
                background: "#000000ff",
                color: "white",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {images.length} ( Add-Total )
            </span>
          </h3>

          {images.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {images.map((img) => (
  <div
    key={img.id}
    style={{
      position: "relative",
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    }}
  >
    {newImageId === img.id && (
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "#a90808ff",
          color: "white",
          padding: "5px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        NEW
      </span>
    )}

    <img
      src={`https://alqemahgoldsmith.com${img.image_url}`}
      alt="Gallery"
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    />

    <p style={{ fontSize: "13px", color: "#980707ff", margin: "5px 0" }}>
       <b>ID</b>: {img.id}
    </p>

    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          padding: "6px 12px",
          background: "#e74c3c",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
        }}
        onClick={() => handleDelete(img.id)}
      >
        🗑️ Delete
      </button>
      <button
        style={{
          padding: "6px 12px",
          background: "#a7830bff",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
        }}
        onClick={() => handleEdit(img.id)}
      >
        ✏️ Edit
      </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddGallery;
