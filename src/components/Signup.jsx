import React, { useState, useEffect } from "react";
import image from "../assets/logo.png";
import Particle from "./Particle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  const [formData, setFormData] = useState({
    rollNo: "",
    email: "",
    name: "",
    institute: "",
    gender: "",
    year: "",
    branch: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    let dotInterval;
    if (loading) {
      dotInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
    } else {
      setDots(""); // Reset dots when loading stops
    }

    return () => clearInterval(dotInterval); // Clear interval on component unmount
  }, [loading]);
  const callback2 = (data) => {
    setLoading(false);
    if (data.status) {
      toast.success(
        "user registered successfully!!.wait for otp to your registered email"
      );

      setTimeout(() => {
        const callback4 = (data) => {
          if (data.status) {
            toast.success("otp sent successfully!!");
            setTimeout(() => {
              navigate("/verify-otp", { state: { email: formData.email } });
            }, 2000);
          } else {
            return toast.error(data.message);
          }
        };

        const callback3 = (resp) => {
          resp.json().then(callback4);
        };
        setLoading(true);
        fetch("https://expo-backend-1.onrender.com/request-otp", {
          method: "POST",
          body: JSON.stringify({ email: formData.email }),
          headers: { "content-type": "application/json" },
        }).then(callback3);
      }, 2000);
    } else {
      return toast.error(data.message);
      console.log(error);
    }
  };
  const callback1 = (resp) => {
    resp.json().then(callback2);
  };

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!formData.rollNo) {
      return toast.error("Roll number is required!!");
    }
    if (!formData.email) {
      return toast.error("Email is required!!");
    }
    if (!formData.name) {
      return toast.error("Name is required!!");
    }
    if (!formData.institute) {
      return toast.error("institute name is required!!");
    }
    if (!formData.gender) {
      return toast.error("select your gender");
    }
    if (!formData.year) {
      return toast.error("select your year");
    }
    if (!formData.branch) {
      return toast.error("select your branch");
    }
    if (!formData.password) {
      return toast.error("enter your preferred password");
    }
    if (formData.confirmpassword != formData.password) {
      return toast.error("confirm password and password field must be same !!");
    }
    fetch("https://expo-backend-1.onrender.com/signup", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        year: formData.year,
        branch: formData.branch,
        gender: formData.gender,
        instituteName: formData.institute,
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
    console.log("Form Data:", formData);
  };

  return (
    <div style={styles.container}>
      <Particle />
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.logoContainer}>
            <img src={image} alt="Logo" style={styles.logo} />
          </div>
          <h2 style={styles.title}>Sign Up</h2>
          <label style={styles.label}>Roll Number</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <label style={styles.label}>Institute Email</label>
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
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <label style={styles.label}>Institute Name</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <label style={styles.label}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled hidden>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label style={styles.label}>Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled hidden>
              Select Year
            </option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <label style={styles.label}>Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled hidden>
              Select Branch
            </option>
            <option value="computer_science">
              Computer Science and Engineering
            </option>
            <option value="civil">Civil Engineering</option>
            <option value="mechanical">Mechanical Engineering</option>
            <option value="electrical">Electrical Engineering</option>
            <option value="ece">
              Electronics and Communication Engineering
            </option>
            <option value="mathematics_computing">
              Mathematics and Computing
            </option>
          </select>
          <button
            type="submit"
            style={styles.button}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? `Sending OTP${dots}` : "Sign Up"}
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
        style={{ zIndex: 9999 }} // Ensure it's on top of other elements
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
  select: {
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

export default Signup;
