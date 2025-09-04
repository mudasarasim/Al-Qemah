// pages/ContactUs.js
import React, { useEffect, useState } from 'react';
import './Contact.css';

const ContactUs = () => {
  const [contact, setContact] = useState({
    email1: 'info@alqemahgoldsmith.com',
    phone1: '+971-54-505-9963',
    address: 'Shop No:02, Behind Fourth Street Industrial Area 13, Sharjah-U.A.E.',
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('https://alqemahgoldsmith.com/api/contact'); // your backend endpoint
        const data = await res.json();
        setContact({
          email1: data.email1 || contact.email1,
          phone1: data.phone1 || contact.phone1,
          address: data.address || contact.address,
        });
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
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
                  }}
                >
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Map Section */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            {/* Email */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><i className="fa fa-envelope fa-2x"></i></div>
                <h5>Mail</h5>
                <p>
                  <a href={`mailto:${contact.email1}`} className="text-decoration-none text-dark">
                    <i className="fa fa-envelope me-2"></i>{contact.email1}
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><i className="fa fa-phone fa-2x"></i></div>
                <h5>Contact</h5>
                <p>
                  <a href={`tel:${contact.phone1}`} className="text-decoration-none text-dark">
                    <i className="fa fa-mobile me-2"></i>{contact.phone1}
                  </a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="col-md-4">
              <div className="contact-box p-4 shadow-sm">
                <div className="icon mb-2"><i className="fa fa-map-marker fa-2x"></i></div>
                <h5>Address</h5>
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    {contact.address}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
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
