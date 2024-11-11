import React from "react";
import image from "../assets/logo.png";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);
  
  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        padding: "40px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
        }}
      >
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="Your Logo"
            style={{ width: "120px", height: "auto", marginBottom: "15px" }}
          />
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff", padding: "10px" }}
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff", padding: "10px" }}
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff", padding: "10px" }}
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          <h3 style={{ margin: "0 0 15px" }}>Useful Links</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li style={{ margin: "10px 0" }}>
              <a
                href="#"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Home
              </a>
            </li>
            <li style={{ margin: "10px 0" }}>
              <a
                href="/signUp"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Signup
              </a>
            </li>
            <li style={{ margin: "10px 0" }}>
              <a
                href="/login"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        <div style={{
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <p style={{
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <FaEnvelope style={{ marginRight: "5px" }} />
            <a
              href="mailto:example@example.com"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              nitp.ac.in
            </a>
          </p>
          <p style={{
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <FaPhone style={{ marginRight: "5px" }} />
            <a
              href="tel:+123456789"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              +91 8235612524
            </a>
          </p>
        </div>
      </div>

      <hr
        style={{
          margin: "30px 0",
          border: "none",
          borderTop: "1px solid #ffffff",
          opacity: "0.2",
        }}
      />
      <div style={{ textAlign: "center", fontSize: "14px" }}>
        <p>
          &copy; {new Date().getFullYear()} National Institute of Technology,
          Patna. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
