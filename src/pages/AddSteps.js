import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddSteps() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [newStepId, setNewStepId] = useState(null);

  // Fetch steps
  const fetchSteps = async () => {
    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/steps");
      const data = await res.json();
      setSteps(data);
    } catch (err) {
      console.error("Error fetching steps:", err);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  // Add step
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/steps/add", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success!", "Step added successfully", "success");
        e.target.reset();
        setNewStepId(data.id);
        fetchSteps();
      }
    } catch (err) {
      Swal.fire("⚠️ Error", "Server error occurred", "error");
    }
  };

  // Delete step
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This step will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://alqemahgoldsmith.com/api/steps/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Deleted!", "Step has been deleted.", "success");
            fetchSteps();
          }
        } catch (err) {
          Swal.fire("⚠️ Error", "Server error occurred", "error");
        }
      }
    });
  };

  // Optional: Edit step (replace image, title, description)
  const handleEdit = async (step) => {
    const title = prompt("Update Step Title:", step.title);
    const description = prompt("Update Step Description:", step.description);

    if (!title || !description) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("step_number", step.step_number);

    try {
      const res = await fetch(`https://alqemahgoldsmith.com/api/steps/${step.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("✅ Success!", "Step updated successfully", "success");
        fetchSteps();
      } else {
        Swal.fire("❌ Error", "Failed to update step", "error");
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
           Add-Steps
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
        {/* Add Step Form */}
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
            ➕ Add New Step
          </h2>

          <form onSubmit={handleAdd}>
            <input
              type="number"
              name="step_number"
              placeholder="Step Number"
              required
              style={{
                display: "block",
                width: "100%",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              style={{
                display: "block",
                width: "100%",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              style={{
                display: "block",
                width: "100%",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minHeight: "80px",
              }}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              style={{
                display: "block",
                width: "100%",
                marginBottom: "20px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px",
                background: "#000",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                width: "100%",
              }}
            >
              Add Step
            </button>
          </form>
        </div>

        {/* Steps List */}
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
            Steps
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
              {steps.length} (Total)
            </span>
          </h3>

          {steps.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    position: "relative",
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
                  {newStepId === step.id && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#e67e22",
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
                    src={`https://alqemahgoldsmith.com${step.image_url}`}
                    alt={step.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        background: "#000",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontWeight: "700",
                      }}
                    >
                      {step.step_number}
                    </span>
                    <h5 style={{ margin: 0, color: "#052c65", fontWeight: "600" }}>
                      {step.title}
                    </h5>
                  </div>

                  <p style={{
  color: "#555",
  fontSize: "14px",
  whiteSpace: "normal",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  maxHeight: "60px",
  overflow: "hidden",
  textOverflow: "ellipsis"
}}>
  {step.description}
</p>


                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => handleDelete(step.id)}
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
                    >
                      🗑️ Delete
                    </button>
                    <button
                      onClick={() => handleEdit(step)}
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
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No steps found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddSteps;
