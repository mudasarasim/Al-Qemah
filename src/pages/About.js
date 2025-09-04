import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState({
    title: "Crafting Legacy, Shaping Elegance",
    description: `Founded in 2023, Al Qemah Al Thahabiah Goldsmith LLC specializes in Kuwaiti and Bahraini gold jewellery.
Merging traditional goldsmithing with contemporary design, our creations echo timeless beauty and Gulf heritage.
Each piece is a symbol of meticulous craftsmanship and cultural pride. From retailers to individuals seeking one-of-a-kind designs, we serve with unmatched passion and precision.
More than just jewellery — we craft stories of elegance and identity.`,
    image_url: "/img/aboutus.webp",
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("https://alqemahgoldsmith.com/api/about");
        const data = await res.json();
        setAboutData({
          title: data.title || aboutData.title,
          description: data.description || aboutData.description,
          image_url: data.image_url ? `https://alqemahgoldsmith.com${data.image_url}` : aboutData.image_url,
        });
      } catch (err) {
        console.error("Failed to fetch About info:", err);
      }
    };
    fetchAbout();
  }, []);

  // Split description into paragraphs
  const paragraphs = aboutData.description.split("\n").map((line, idx) => (
    <p
      key={idx}
      style={{
        fontSize: "1.05rem",
        lineHeight: "1.75",
        wordWrap: "break-word", // ensures long words don't overflow
        marginBottom: "15px",
        fontStyle: idx === 3 ? "italic" : "normal",
        color: idx === 3 ? "#666" : "#000",
      }}
    >
      {line}
    </p>
  ));

  return (
    <div className="container my-5">
      <div
        className="row align-items-center shadow-lg rounded-4 p-4"
        style={{ background: "linear-gradient(145deg, #fffdf8, #fef9f3)" }}
      >
        {/* Text Column */}
        <div
          className="col-md-6 mb-4 mb-md-0"
          style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
        >
          <h2 className="fw-bold mb-5" style={{ fontSize: "2.2rem", color: "#333" }}>
            {aboutData.title}
          </h2>
          {paragraphs}
        </div>

        {/* Image Column */}
        <div className="col-md-6 text-center">
          <img
            src={aboutData.image_url}
            alt="About Us - Goldsmith"
            className="img-fluid rounded-3"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
