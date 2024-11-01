import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles
import image from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const AchievementForm = () => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleach = (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    fetch("https://expo-backend-1.onrender.com/addachievement", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        title: title,
        date: date,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok " + resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        if (data.status) {
          toast.success(data.message);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        toast.error("Failed to add achievement. Please try again.");
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

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
                  <img src={image} alt="Logo" style={styles.logo} />
                </div>
                <h2 style={styles.heading}>Add Your Achievements</h2>
                <form style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                      type="text"
                      placeholder="Enter achievement title"
                      style={styles.input}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Date</label>
                    <input
                      type="date"
                      style={styles.input}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      placeholder="Enter achievement description"
                      style={styles.textarea}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    style={styles.button}
                    onClick={handleach}
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
    marginBottom: "1rem",
  },
  logo: {
    maxWidth: "100px",
    height: "auto",
  },
  heading: {
    color: "#ffffff",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
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

export default AchievementForm;
