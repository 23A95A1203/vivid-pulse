import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          
          {/* Section 1: Brand & Description */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Vivid Pulse
            </h5>
            <p>
              Your destination for the latest trends and timeless fashion.
              Style that moves with you.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Quick Links
            </h5>
            <p><Link to="/about" className="text-white" style={{ textDecoration: 'none' }}>About Us</Link></p>
            <p><Link to="/products" className="text-white" style={{ textDecoration: 'none' }}>Shop</Link></p>
            <p><Link to="/contact" className="text-white" style={{ textDecoration: 'none' }}>Contact</Link></p>
          </div>

          {/* Section 3: Social Media & Contact */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Follow Us
            </h5>
            <a href="https://www.instagram.com" className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noreferrer"><i className="fa fa-instagram"></i></a>
            <a href="https://www.facebook.com" className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a>
            <a href="https://www.twitter.com" className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noreferrer"><i className="fa fa-twitter"></i></a>
            <a href="https://github.com/23A95A1203" className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noreferrer"><i className="fa fa-github"></i></a>
          </div>
          
        </div>
        
        {/* Footer Bottom */}
        <hr className="mb-4" />
        <div className="row d-flex justify-content-center">
          <p className="text-white text-center">
            © {new Date().getFullYear()} Vivid Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;