import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaWhatsapp, FaStar, FaTrophy } from 'react-icons/fa';
import './Home.css';
import TestimonialSection from '../components/TestimonialSection';
import { Link } from 'react-router-dom';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* eslint-disable no-unused-vars */


const Home = () => {
  const [steps, setSteps] = useState([]);
  useEffect(() => {
  axios.get("https://alqemahgoldsmith.com/api/process-steps")
    .then(res => setSteps(res.data))
    .catch(err => console.error("Error fetching steps:", err));
}, []);
  const [phone1, setPhone1] = useState(""); 
  useEffect(() => {
  axios.get("https://alqemahgoldsmith.com/api/contact-info")
    .then(res => {
      setPhone1(res.data.phone1);  // phone1 set ho jayega
    })
    .catch(err => console.error(err));
}, []);

const [galleryImages, setGalleryImages] = useState([]);

useEffect(() => {
  // Backend se latest 4 images fetch karo
  axios.get("https://alqemahgoldsmith.com/api/gallery")
    .then(res => setGalleryImages(res.data.slice(0, 4)))
    .catch(err => console.error(err));
}, []);

  const data = [
    {
      img: 'img/step1.jpeg',
      title: 'COMPUTER-AIDED MANUFACTURING (CAM)',
      desc: 'Once the vision is perfected through design, it moves into the hands of our cutting-edge CAM technology—where imagination begins to take physical form. With utmost precision, the digital blueprints are transformed into wax molds, laying the foundation for what will soon become a cherished creation. '
    },
    {
      img: 'img/step2.jpeg',
      title: 'CASTING DEPARTMENT',
      desc: 'Our casting department transforms delicate wax designs into precise and durable gold forms using advanced techniques. Each creation showcases the beauty of Bahraini craftsmanship — with clean detailing, smooth surfaces, and perfect gold density. We ensure every casted piece provides a flawless foundation for further designing and engraving.'
    },
    {
      img: 'img/step3.jpeg',
      title: 'Crafting Kuwaiti & Bahraini Elegance',
      desc: 'This is where tradition meets precision. Our artisans carefully heat each gold piece by hand, using age-old techniques to preserve the delicate details of authentic Kuwaiti and Bahraini designs. Every part of the process reflects passion, patience, and mastery — ensuring that each ornament shines with cultural richness and timeless beauty.'
    },
    {
      img: 'img/step4.jpeg',
      title: 'Delicate Hands. Bold Craftsmanship.',
      desc: ' Every masterpiece starts with patience, passion, and precision. What you see here is not just polishing or shaping — it’s the art of final detailing done entirely by hand. Our skilled craftsmen carefully refine each curve and cut in these traditional Kuwaiti and Bahraini designs, using fine tools and years of experience to bring out the signature brilliance and beauty. This is where true elegance takes form — one detail at a time.'
    },
    {
      img: 'img/step5.jpeg',
      title: 'Polishing Perfection, Shining Heritage',
      desc: '  Every piece of our Kuwaiti and Bahraini jewelry is hand-polished with care to bring out its true brilliance. This final touch ensures a flawless finish, enhancing the intricate designs and giving the gold its signature radiant glow. Beauty you can see — craftsmanship you can feel.'
    },
    // {
    //   img: 'img/gold6.jpg',
    //   title: 'Daily Elegance',
    //   desc: 'Add grace to your everyday look with light gold pieces.'
    // }
  ];

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
  {steps.map((item, idx) => (
  <div key={idx} className="px-3 h-100">
    <Card className="border-0 shadow-sm text-center h-100 d-flex flex-column" style={{ minHeight: "400px" }}>
      <Card.Img
        variant="top"
        src={`https://alqemahgoldsmith.com${item.img}`}
        alt={item.title}
        className="img-fluid"
        style={{
          height: '200px',
          objectFit: 'cover',
          borderRadius: '10px 10px 0 0'
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          <span
            className="badge bg-dark text-white rounded-circle p-3 fs-6"
            style={{ minWidth: "45px" }}
          >
            {item.step_no}  {/* ✅ yahan `item` use karo */}
          </span>

          <Card.Title className="fw-bold mb-0 text-start" style={{color: "#052c65"}}>
            {item.title}
          </Card.Title>
        </div>
        <Card.Text
          className="text-muted flex-grow-1"
          style={{
            minHeight: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {item.description}
        </Card.Text>
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
      {galleryImages.length > 0 ? (
        galleryImages.map((img, index) => (
          <Col md={3} sm={6} xs={12} key={index}>
            <img
              src={`https://alqemahgoldsmith.com${img.url}`} // backend uploads folder ka URL
              alt={`Project ${index + 1}`}
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: 'cover', width: '100%', height: '300px' }}
            />
          </Col>
        ))
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </Row>
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
