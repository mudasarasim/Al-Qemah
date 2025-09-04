import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaWhatsapp, FaStar, FaTrophy } from 'react-icons/fa';
import './Home.css';
import TestimonialSection from '../components/TestimonialSection';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* eslint-disable no-unused-vars */

const Home = () => {
const [gallery, setGallery] = useState([]);

useEffect(() => {
  const fetchGallery = async () => {
    try {
      const res = await fetch("https://alqemahgoldsmith.com/api/gallery");
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  fetchGallery();
}, []);

  const [steps, setSteps] = useState([]);

useEffect(() => {
  fetch("https://alqemahgoldsmith.com/api/steps")
    .then(res => res.json())
    .then(data => setSteps(data))
    .catch(err => console.error("Error:", err));
}, []);


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div>
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/img/homepage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "130vh",
        }}
      >
      </div>

      {/* Hero Section
      <div
        className="hero-section text-white d-flex align-items-center"
        style={{
          background: 'linear-gradient(to right, #1f4267ff, #232d39ff)',
          minHeight: '82vh',
        }}
      >
        <Container>
          <div className="row align-items-center">
            <div
              className="col-md-6 mb-4 text-md-start text-center position-relative"
              style={{
                overflow: 'hidden',
                // background: 'linear-gradient(to right, #1f4267ff, #232d39ff)',
              }}
            >
              Background logo
              <img
                src="img/logo.png"
                alt="Logo"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.15, // subtle visibility
                  zIndex: 1,
                  width: '40%', // adjust size as needed
                  pointerEvents: 'none',
                }}
              />

              Text Content
              <div
                style={{
                  position: 'relative',
                  zIndex: 2, // above logo
                  padding: '3rem 2rem',
                }}
              >
                <h1 className="fw-bold" style={{ fontSize: '2.8rem' }}>
                  Discover Elegant Gold Necklaces
                </h1>
                <p className="fs-5 mt-3">
                  Handcrafted designs that define sophistication.<br />
                  Perfect for every occasion.
                </p>
              </div>
            </div>
              
            Right Image
            <div className="col-md-6 text-center">
              <img
                src="img/goldnecklace.png"
                alt="Gold Necklace"
                className="img-fluid"
                style={{
                  maxWidth: '50%',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                }}
              />
            </div>
          </div>
        </Container>
      </div> */}


    <section className="custom-jewelry-section-four text-center" style={{ padding:"50px", backgroundColor:'#F5F5F5'}}>
      <div>
        <h2 className="padding-class">DEDICATED TO CRAFTING WITH PURPOSE AND PRIDE</h2>
        <div 
          className="underline" 
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#000', 
            margin: '10px auto'
          }}
        ></div>
        <div className="jwelry-process-text" style={{width: '80%', margin: '30px auto'}}>
          <p>
            Excellence isn’t just a standard—it’s our promise. Every creation begins with passion and is shaped by the skilled hands and hearts of our dedicated team. We pour soul into every detail, ensuring that what we deliver is not just a product, but a reflection of our commitment, creativity, and pride. Your vision deserves nothing less than our very best.
          </p>   
        </div>

        <div className="steps my-5">
         <Slider {...settings}>
  {steps.map((item) => (
    <div key={item.id} className="px-3">
      <Card className="border-0 shadow-sm text-center h-100">
        <Card.Img
          variant="top"
          src={`https://alqemahgoldsmith.com${item.image_url}`}
          alt={item.title}
          className="img-fluid"
          style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
        />
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "220px", // fixed height for body
          }}
        >
          <div>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
              <span className="badge bg-dark rounded-circle px-3 py-2">
                {item.step_number}
              </span>
              <Card.Title
                className="fw-bold mb-0 text-start"
                style={{ color: "#052c65" }}
              >
                {item.title}
              </Card.Title>
            </div>
            <Card.Text
              className="text-muted"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 5, // limits text to 5 lines
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.description}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  ))}
</Slider>

        </div>
      </div>
    </section>

      {/* Our Gallery */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{fontSize:'60px', fontFamily: "MyCustomFont", letterSpacing:'3px'}}>Our Gallery</h2>
         <Row className="g-4">
  {gallery.slice(0, 4).map((img, index) => (
    <Col md={3} sm={6} xs={12} key={index}>
      <img
        src={`https://alqemahgoldsmith.com${img.image_url}`}
        alt={`Gallery ${index + 1}`}
        className="img-fluid rounded shadow-sm"
        style={{ objectFit: 'cover', width: '100%', height: '300px' }}
      />
    </Col>
  ))}
</Row>
{gallery.length === 0 && <p className="text-center">No images found.</p>}

          <div className="text-center mt-5">
            <Button as={Link} to="/gallery" variant="dark" className="rounded-pill px-4 py-2">
              View More
            </Button>
          </div>
        </Container>
      </section>

      <TestimonialSection />
    
      <section className="custom-jewelry-section-four text-center" style={{backgroundColor:'#F5F5F5', padding:"30px"}}>
        <div>
          <h2 className="padding-class">CONNECT WITH US</h2>
          <div 
            className="underline" 
            style={{
              width: '60px',
              height: '3px',
              backgroundColor: '#000', 
              margin: '10px auto'
            }}
          ></div>
          <div className="custom-jewelry-section-text" style={{width: '50%', margin: '0 auto'}}>
            <p>
              Elevate your brand with custom designs that stand out. We combines your vision with our craftsmanship to create truly unique  jewelry pieces. Let’s collaborate to bring your ideas to life.
            </p>
            <p>Contact us to discuss your design needs or to submit your designs.</p>    
          </div>
          <div className="p-3">
            <button className="design-button">
              <a
                href="https://wa.me/971567968421" 
                target="_blank"
                rel="noopener noreferrer"
              >
                BEGIN YOUR DESIGN JOURNEY
              </a>
            </button>
          </div>
        </div>  
      </section>
    </div>
  );
};

export default Home;
