// components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const Navbar = () => {
  return (
    <>

      {/* Navbar */}
      <BootstrapNavbar expand="lg" className="bg-white shadow-sm px-5 py-3">
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex flex-column align-items-center">
          <img 
            src="/img/logo.png" 
            alt="AL QEMAH GOLDSMITH Logo" 
            height="90"
            className="d-inline-block align-top"
          />
          <span style={{ fontSize: '1rem', fontWeight: '700', marginTop: '4px', color: '#d0a507ff', textAlign: 'center', }}>
            Al Qemah Al Thahabiah <br/> Goldsmiths LLC
          </span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse>
          <Nav className="me-auto" style={{ marginLeft: '80px', gap: '30px', fontSize: '18px' }}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>

    </>
  );
};

export default Navbar;


// components/Navbar.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
// import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
// import './Navbar.css'; // Make sure to create and import this CSS file

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <BootstrapNavbar
//       expand="lg"
//       className={`navbar-custom px-5 py-3 ${scrolled ? 'scrolled' : ''}`}
//       fixed="top"
//     >
//       <BootstrapNavbar.Brand as={Link} to="/">
//         <img 
//           src="/img/logo.png" 
//           alt="AL QEMAH GOLDSMITH Logo" 
//           height="90"
//           className="d-inline-block align-top"
//         />
//       </BootstrapNavbar.Brand>
//       <BootstrapNavbar.Toggle />
//       <BootstrapNavbar.Collapse>
//         <Nav className="me-auto" style={{ marginLeft: '80px', gap: '30px', fontSize: '18px' }}>
//           <Nav.Link as={Link} to="/">Home</Nav.Link>
//           <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
//           <Nav.Link as={Link} to="/about">About</Nav.Link>
//           <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
//         </Nav>
//       </BootstrapNavbar.Collapse>
//     </BootstrapNavbar>
//   );
// };

// export default Navbar;
