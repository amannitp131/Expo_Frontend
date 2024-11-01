import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";

export default function ViewDashboard() {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://expo-backend-1.onrender.com/viewdashboard?email=${email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        if (data.status) {
          setUserData(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user dashboard:", error);
      }
    };

    if (email) fetchData();
  }, [email]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="student">
      <div className="app">
        <header className="app-header">
          <div className="app-header-logo">
            <h1 className="logo-title">
              <span>{userData.user.instituteName}</span>
            </h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className="app-header-actions">
            <button className="user-profile">
              <span>{userData.user.name}</span>
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
                <span>{userData.user.name}&apos;s Profile</span>
              </Link>
            </nav>
          </div>

          <section className="service-section">
            <div className="info-box">
              <h2>Personal Info</h2>
              <div className="personal-info-box">
                <p>
                  <strong>Name:</strong> {userData.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Branch:</strong> {userData.user.branch}
                </p>
                <p>
                  <strong>Year:</strong> {userData.user.year}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.user.gender}
                </p>
              </div>
            </div>

            <div className="info-box">
              <h2>Experience</h2>
              {userData.user.experiences.length > 0 ? (
                userData.user.experiences.map((exp, index) => (
                  <div key={index} className="experience-box">
                    <p>
                      <strong>Company:</strong> {exp.company}
                    </p>
                    <p>
                      <strong>Position:</strong> {exp.position}
                    </p>
                    <p>
                      <strong>Duration:</strong> {exp.duration} year
                    </p>
                    <p>
                      <strong>Description:</strong> {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p>No experiences listed</p>
              )}
            </div>

            <div className="info-box">
              <h2>Skills</h2>
              {userData.user.skills.length > 0 ? (
                userData.user.skills.map((skill, index) => (
                  <div key={index} className="skill-box">
                    <p>{skill}</p>
                  </div>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>

            <div className="info-box">
              <h2>Projects</h2>
              {userData.projects.length > 0 ? (
                userData.projects.map((project, index) => (
                  <div key={index} className="project-box">
                    <h3>{project.title}</h3>
                    <p>
                      <strong>Description:</strong> {project.description}
                    </p>
                    <p>
                      <strong>Technologies:</strong>{" "}
                      {project.technologies.join(", ")}
                    </p>
                    <p>
                      <strong>GitHub:</strong>{" "}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Repository
                      </a>
                    </p>
                    <p>
                      <strong>Live Demo:</strong>{" "}
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo
                      </a>
                    </p>
                    {/* {project.images.map((image, i) => (
                      <img
                        key={i}
                        src={`http://localhost:3000${image}`} // Using the correct URL
                        alt={`Project ${index} Image ${i}`}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = "path_to_placeholder_image.png"; // Placeholder image on error
                        }}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    ))} */}
                  </div>
                ))
              ) : (
                <p>No projects listed</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
