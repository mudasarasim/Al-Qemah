import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import API from '../api';
import axios from "axios";

const Home = () => {
  const [phone1, setPhone1] = useState(""); 
  useEffect(() => {
  axios.get("https://alqemahgoldsmith.com/api/contact-info")
    .then(res => {
      setPhone1(res.data.phone1);  // phone1 set ho jayega
    })
    .catch(err => console.error(err));
}, []);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get('/gallery');
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      {/* Our Gallery */}
      <section className="py-5">
        <Container>
          <h2 
            className="text-center mb-3" 
            style={{ fontSize: '60px', fontFamily: "MyCustomFont", letterSpacing: '3px' }}
          >
            Our Gallery
          </h2>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <Row className="g-4">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <Col md={3} sm={6} xs={12} key={index}>
                    <Card className="h-100 shadow-sm">
                      <div style={{ width: "100%", height: "300px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Card.Img
                          src={`https://alqemahgoldsmith.com/${img.url}`}
                          alt={`Project ${index + 1}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain"  // pura image visible
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center">No images available</p>
              )}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Home;
