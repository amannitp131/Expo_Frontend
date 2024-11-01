import React, { useState, useEffect } from "react";
import image from "../assets/logo.png";
import Particle from "./Particle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (!formData.email) {
      return toast.error("Email is required!");
    }
    if (!formData.password) {
      return toast.error("Password is required!");
    }
    const callback2 = (data) => {
      if (data.status) {
        toast.success(data.message);
        const email = location.state?.email || "";
        console.log("Saving email to local storage:", formData.email);
        localStorage.setItem("userEmail", formData.email);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        return toast.error(data.message);
      }
    };

    const callback1 = (resp) => {
      resp.json().then(callback2);
    };

    fetch("https://expo-backend-1.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: { "content-type": "application/json" },
    }).then(callback1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div style={styles.container}>
      <Particle />
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.logoContainer}>
            <img src={image} alt="Logo" style={styles.logo} />
          </div>
          <h2 style={styles.title}>Login</h2>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ zIndex: 9999 }} 
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    padding: "20px",
    overflow: "hidden",
  },
  formContainer: {
    position: "relative",
    zIndex: 1,
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#2c2c2c",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    boxSizing: "border-box",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#ccc",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0 20px",
    borderRadius: "5px",
    border: "1px solid #444",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#3a3a3a",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Login;
