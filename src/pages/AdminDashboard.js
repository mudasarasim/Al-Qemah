import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Swal from "sweetalert2"; // ✅ SweetAlert2

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [gallery, setGallery] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

// Process Steps States
const [steps, setSteps] = useState([]);
const [stepNo, setStepNo] = useState("");   // ✅ new state for step no
const [stepTitle, setStepTitle] = useState("");
const [stepDescription, setStepDescription] = useState("");
const [stepImage, setStepImage] = useState(null);
const [editingStep, setEditingStep] = useState(null);


  // ✅ Contact Info states
  const [contact, setContact] = useState({
    phone1: "",
    phone2: "",
    whatsapp: "",
    email: "",
    email2: "",
    address: ""
  });

  const navigate = useNavigate();

  // Fetch Dashboard Data
 
  // ✅ Sidebar change triggers
  useEffect(() => {
    if (activePage === "gallery") fetchGallery();
    if (activePage === "contact") fetchContactInfo();
    if (activePage === "steps") fetchSteps();
  }, [activePage]);

  // ✅ Fetch Gallery
  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  // ✅ Fetch Contact Info
  const fetchContactInfo = async () => {
    try {
      const res = await API.get("/contact-info");
      setContact(res.data);
    } catch (err) {
      console.error("Error fetching contact info:", err);
    }
  };

  // ✅ Save Contact Info
  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      await API.post("/contact-info", contact, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      Swal.fire("Saved!", "Contact info updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to update contact info.", "error");
      console.error("Update contact failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  // ✅ Gallery CRUD
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setUploadMsg("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await API.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire("Uploaded!", res.data.message, "success");
      setUploadMsg(res.data.message);
      setFile(null);
      fetchGallery();
    } catch (err) {
      Swal.fire("Error!", "Upload failed!", "error");
      setUploadMsg("Upload failed!");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await API.delete(`/gallery/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire("Deleted!", "Your image has been deleted.", "success");
        fetchGallery();
      } catch (err) {
        Swal.fire("Error!", "Delete failed!", "error");
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = async (id, newFile) => {
    if (!newFile) return;
    const formData = new FormData();
    formData.append("image", newFile);

    try {
      await API.put(`/gallery/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire("Updated!", "Image updated successfully.", "success");
      fetchGallery();
    } catch (err) {
      Swal.fire("Error!", "Update failed!", "error");
      console.error("Update failed:", err);
    }
  };

  // ✅ Process Steps CRUD
  const fetchSteps = async () => {
    try {
      const res = await API.get("/process-steps");
      setSteps(res.data);
    } catch (err) {
      console.error("Error fetching steps:", err);
    }
  };

  const handleAddStep = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("step_no", stepNo);   // ✅ send step no
    formData.append("title", stepTitle);
    formData.append("description", stepDescription);
    if (stepImage) formData.append("image", stepImage);

    await API.post("/process-steps", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    resetStepForm();
    fetchSteps();
  } catch (err) {
    console.error("Error adding step:", err);
  }
};


  const handleEditStep = (step) => {
    setEditingStep(step.id);
    setStepNo(step.step_no);
    setStepTitle(step.title);
    setStepDescription(step.description);
  };

  const handleUpdateStep = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("step_no", stepNo);   // ✅ send step no
    formData.append("title", stepTitle);
    formData.append("description", stepDescription);
    if (stepImage) formData.append("image", stepImage);

    await API.put(`/process-steps/${editingStep}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    resetStepForm();
    fetchSteps();
  } catch (err) {
    console.error("Error updating step:", err);
  }
};

  const handleDeleteStep = async (id) => {
    try {
      await API.delete(`/process-steps/${id}`);
      fetchSteps();
    } catch (err) {
      console.error("Error deleting step:", err);
    }
  };

  const resetStepForm = () => {
    setEditingStep(null);
    setStepNo(""); 
    setStepTitle("");
    setStepDescription("");
    setStepImage(null);
  };

  // Sidebar loader
  const handleSidebarClick = (page) => {
    setPageLoading(true);
    setTimeout(() => {
      setActivePage(page);
      setPageLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "220px" : "60px",
          transition: "0.3s",
          background: "#d1bf5bff",
          color: "black",
          display: "flex",
          flexDirection: "column",
          padding: "20px 10px",
          position: "relative",
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: "10px",
            right: "-15px",
            background: "#d1bf5bff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {sidebarOpen ? "←" : "→"}
        </button>

        <h2
          style={{
            marginBottom: "30px",
            textAlign: sidebarOpen ? "left" : "center",
            fontSize: sidebarOpen ? "22px" : "14px",
          }}
        >
          <b>{sidebarOpen ? "Admin" : "A"}</b>
        </h2>

        {/* Sidebar Buttons */}
        <button onClick={() => handleSidebarClick("dashboard")}
          style={{ background: activePage === "dashboard" ? "#f5eeb0" : "transparent", border: "none", margin: "10px 0", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
          📊 {sidebarOpen && "Dashboard"}
        </button>

        <button onClick={() => handleSidebarClick("gallery")}
          style={{ background: activePage === "gallery" ? "#f5eeb0" : "transparent", border: "none", margin: "10px 0", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
          🖼️ {sidebarOpen && "Manage Gallery"}
        </button>

        <button onClick={() => handleSidebarClick("contact")}
          style={{ background: activePage === "contact" ? "#f5eeb0" : "transparent", border: "none", margin: "10px 0", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
          ☎️ {sidebarOpen && "Manage Contact"}
        </button>

        <button onClick={() => handleSidebarClick("steps")}
          style={{ background: activePage === "steps" ? "#f5eeb0" : "transparent", border: "none", margin: "10px 0", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
          🛠️ {sidebarOpen && "Manage Process"}
        </button>

        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout}
            style={{ background: "#e74c3c", border: "none", padding: "10px", color: "white", width: "100%", cursor: "pointer", borderRadius: "5px" }}>
            🚪 {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", background: "#ecf0f1", overflowY: "auto" }}>
        {pageLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <div style={{ border: "6px solid #f3f3f3", borderTop: "6px solid #d1bf5bff", borderRadius: "50%", width: "50px", height: "50px", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
          </div>
        ) : (
          <>
            {activePage === "dashboard" && (
              <>
                <h2>Admin Dashboard</h2>
                {loading ? <p>Loading...</p> : data ? (
                  <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                  </div>
                ) : <p>No data found</p>}
              </>
            )}

            {activePage === "gallery" && (
              <>
                <h2>Manage Gallery</h2>
                <form onSubmit={handleUpload}>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-3" />
                  <button type="submit" className="btn btn-primary">Upload</button>
                </form>
                {uploadMsg && <p>{uploadMsg}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                  {gallery.length === 0 ? <p>No images yet.</p> : gallery.map((img) => (
                    <div key={img.id} style={{ background: "white", padding: "10px", borderRadius: "8px", width: "200px", textAlign: "center" }}>
                      <img src={`http://localhost:5000${img.url}`} alt="Gallery" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
                      <div style={{ marginTop: "10px" }}>
                        <label className="btn btn-warning btn-sm">
                          Edit
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleEdit(img.id, e.target.files[0])} />
                        </label>
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(img.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activePage === "contact" && (
              <>
                <h2>Manage Contact Info</h2>
                <form onSubmit={handleSaveContact} style={{ background: "white", padding: "20px", borderRadius: "8px", maxWidth: "500px" }}>
                  <div className="mb-3">
                    <label>Landline No</label>
                    <input type="text" className="form-control" value={contact.phone1} onChange={(e) => setContact({ ...contact, phone1: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label>Phone No</label>
                    <input type="text" className="form-control" value={contact.phone2} onChange={(e) => setContact({ ...contact, phone2: e.target.value })} />
                  </div>
                  <div className="mb-3">
                  <label>WhatsApp No</label> 
                  <input type="text"className="form-control"value={contact.whatsapp}onChange={(e) =>setContact({ ...contact, whatsapp: e.target.value }) }/>
                  </div>
                  <div className="mb-3">
                  <label>Second Email (optional)</label>
                   <input type="email"  className="form-control" value={contact.email2} onChange={(e) => setContact({ ...contact, email2: e.target.value })}  />
                   </div>

                  <div className="mb-3">
                    <label>First Email</label>
                    <input type="email" className="form-control" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label>Address</label>
                    <textarea className="form-control" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })}></textarea>
                  </div>
                  <button type="submit" className="btn btn-warning">Save Contact</button>
                </form>
              </>
            )}

            {activePage === "steps" && (
              <>
                <h2>Manage Process Steps</h2>
                <form onSubmit={editingStep ? handleUpdateStep : handleAddStep} style={{ marginBottom: "20px" }}>
  <div className="mb-3">
    <label>Step No</label>
    <select className="form-control" value={stepNo} onChange={(e) => setStepNo(e.target.value)} required>
      <option value="">-- Select Step No --</option>
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>

  <div className="mb-3">
    <label>Step Title</label>
    <input type="text" className="form-control" value={stepTitle} onChange={(e) => setStepTitle(e.target.value)} required />
  </div>
  <div className="mb-3">
    <label>Step Description</label>
    <textarea className="form-control" value={stepDescription} onChange={(e) => setStepDescription(e.target.value)} required />
  </div>
  <div className="mb-3">
    <label>Step Image</label>
    <input type="file" className="form-control" onChange={(e) => setStepImage(e.target.files[0])} />
  </div>

  <button type="submit" className="btn btn-warning">{editingStep ? "Update Step" : "Add Step"}</button>
  {editingStep && <button type="button" className="btn btn-secondary ms-2" onClick={resetStepForm}>Cancel</button>}
</form>


                <table className="table table-bordered">
  <thead>
    <tr>
      <th>Step No</th>   {/* ✅ new column */}
      <th>Image</th>
      <th>Title</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {steps.length > 0 ? steps.map((step) => (
      <tr key={step.id}>
        <td>{step.step_no}</td>   {/* ✅ show step no */}
        <td>{step.img && <img src={`http://localhost:5000${step.img}`} alt={step.title} width="80" />}</td>
        <td>{step.title}</td>
        <td>{step.description}</td>
        <td>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditStep(step)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStep(step.id)}>Delete</button>
        </td>
      </tr>
    )) : (
      <tr><td colSpan="5" className="text-center">No steps found.</td></tr>
    )}
  </tbody>
</table>

              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
