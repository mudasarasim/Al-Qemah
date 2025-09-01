import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMobileAlt } from 'react-icons/fa';
import API from "../api"; // Axios instance
import './Contact.css';

const ContactUs = () => {
  const [contact, setContact] = useState({
    phone1: "",
    phone2: "",
    email: "",
    address: ""
  });

  // ✅ Fetch dynamic contact info from backend
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get("/contact-info");
        setContact(res.data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="ms-breadcrumb m-b-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row ms_breadcrumb_inner">
                <div
                  className="col-md-12 col-sm-12 back"
                  style={{
                    background:
                      'linear-gradient(rgba(227, 232, 138, 0.6), rgba(188, 174, 17, 0.6))',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    padding: '80px 0',  
                    textAlign: 'center',
                  }}>
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            {/* Email */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><FaEnvelope size={32} /></div>
                <h5>Mail</h5>
                <p>
                  <a href={`mailto:${contact.email}`} className="text-decoration-none text-dark">
                    <FaEnvelope className="me-2" /> {contact.email || "Loading..."}
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><FaPhone size={32} /></div>
                <h5>Contact</h5>
                <p>
                  <a href={`tel:${contact.phone1}`} className="text-decoration-none text-dark">
                    <FaMobileAlt className="me-2" /> {contact.phone1 || "Loading..."}
                  </a>
                </p>
                {contact.phone2 && (
                  <p>
                    <a href={`tel:${contact.phone2}`} className="text-decoration-none text-dark">
                      <FaMobileAlt className="me-2" /> {contact.phone2}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><FaMapMarkerAlt size={32} /></div>
                <h5>Address</h5>
                <p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    {contact.address || "Loading..."}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Integration */}
          <div className="row align-items-stretch">
            <div className="col-12 px-0">
              <div className="w-100" style={{ height: '500px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3606.899826177033!2d55.434135475385375!3d25.307569477640058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE4JzI3LjMiTiA1NcKwMjYnMTIuMiJF!5e0!3m2!1sen!2sae!4v1753971312714!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
