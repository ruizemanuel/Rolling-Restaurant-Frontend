import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-light py-3">
      <div className="container text-center">
        <h2 className="mb-3">RollingFood</h2>
        <div className="social-icons">
          <a href="https://twitter.com/" className="icon-link">
            <FontAwesomeIcon icon={faTwitter} className="social-icon twitter" />
          </a>
          <a href="https://www.facebook.com/" className="icon-link">
            <FontAwesomeIcon
              icon={faFacebook}
              className="social-icon facebook"
            />
          </a>
          <a href="https://www.google.com/" className="icon-link">
            <FontAwesomeIcon icon={faGoogle} className="social-icon google" />
          </a>
          <a href="https://www.instagram.com/" className="icon-link">
            <FontAwesomeIcon
              icon={faInstagram}
              className="social-icon instagram"
            />
          </a>
        </div>
        <p className="mt-3">
          &copy; 2023 RollingFood. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
