import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Backend se fetch karna
    fetch("https://alqemahgoldsmith.com/api/gallery") 
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  return (
    <div>
      {/* Our Gallery */}
      <section className="py-5">
        <Container>
          <h2
            className="text-center mb-3"
            style={{
              fontSize: "60px",
              fontFamily: "MyCustomFont",
              letterSpacing: "3px",
            }}
          >
            Our Gallery
          </h2>
          <Row className="g-4">
            {images.length > 0 ? (
              images.map((img, index) => (
                <Col md={3} sm={6} xs={12} key={index}>
                  <img
                    src={`https://alqemahgoldsmith.com${img.image_url}`} // 👈 image_url DB me store hoga
                    alt={`Project ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ objectFit: "cover", width: "100%", height: "300px" }}
                  />
                </Col>
              ))
            ) : (
              <p className="text-center">No images found.</p>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
