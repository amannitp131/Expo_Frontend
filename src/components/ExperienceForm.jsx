import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaRestroom, FaBars, FaMoneyBillAlt } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import image from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExperienceForm = () => {
  const [instituteName, setInstituteName] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    const fetchData = async () => {
      try {
        const response = await fetch("https://expo-backend-1.onrender.com/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "email": localStorage.getItem("userEmail") || "",
          },
        });
        
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
        if (data.status) { // Check if the status is true
          const userData = data.message; // Access the message property here
          
          setInstituteName(userData.instituteName);
          setName(userData.name);
          
        } else {
          console.error("Data fetch unsuccessful:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExperience = () => {
    setIsSubmitting(true);
    const callback2 = (data) => {
      if (data.success) {
        return toast.success(data.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return toast.success(data.message);
    };
    const callback1 = (resp) => {
      resp.json().then(callback2);
    };
    fetch("https://expo-backend-1.onrender.com/addexperience", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        company: company,
        position: position,
        duration: duration,
        description: description,
      }),
      headers: { "content-type": "application/json" },
    }).then(callback1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);
  return (
    <div id="student">
      <div className="app">
        <header className="app-header">
          <div className="app-header-logo">
            <h1 className="logo-title">
              <span>{instituteName}</span>
            </h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className="app-header-actions">
            <button className="user-profile">
              <span>{name}</span>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsyqbhHhVGJ8pKqVAjeHvXvluuSE2WTaYGGPOIeEWUnINhvSaGxIURvhw3-NgrbNhkzg&usqp=CAU"
                alt="User profile"
              />
            </button>
          </div>
        </header>

        <div className="app-body">
          <div className={`app-body-navigation ${isMenuOpen ? "open" : ""}`}>
            <nav className="navigation">
              <Link to="/">
                <span>Home</span>
              </Link>
              <Link to="/dashboard">
                <span>Profile</span>
              </Link>
              <Link to="/dashboard/projects">
                <span>Projects</span>
              </Link>
              <Link to="/dashboard/achievements">
                <span>Achievements</span>
              </Link>
            </nav>
          </div>

          <section className="service-section">
            <div style={styles.container}>
              <div style={styles.formWrapper}>
                <div style={styles.logoContainer}>
                  {/* Logo can be placed here */}
                  <img src={image} alt="Logo" style={styles.logo} />
                </div>
                <form style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Company</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      style={styles.input}
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Position</label>
                    <input
                      type="text"
                      placeholder="Enter position"
                      style={styles.input}
                      onChange={(e) => {
                        setPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Duration</label>
                    <select
                      style={styles.select}
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                    >
                      <option value="">Select Duration</option>{" "}
                      {/* Default option */}
                      <option value="1">1 Year</option>
                      <option value="3">3 Years</option>
                      <option value="5">5 Years</option>
                      <option value="more">More than 5 Years</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      placeholder="Enter description"
                      style={styles.textarea}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    style={styles.button}
                    onClick={handleAddExperience}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#1E1E1E",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: "1.5rem",
  },
  logo: {
    color: "#ffffff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    width: '200px',
    height: '200px'
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    color: "#A9A9A9",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    textAlign: "left",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "80px",
  },
  button: {
    padding: "0.7rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ExperienceForm;
