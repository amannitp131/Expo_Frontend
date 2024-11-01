import { useState, useEffect } from "react";
import { FaBars, FaHeart, FaComment } from "react-icons/fa";
import "./Dashboard.css";
import "./Project.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const fetchProjects = async () => {
      try {
        const response = await fetch("https://expo-backend-1.onrender.com/myproject", {
          method: "GET",
          headers: {
            email: localStorage.getItem('userEmail'),
            "content-type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        if (data.status) {
          setProjects(data.message); // Update with fetched projects
        } else {
          console.error("Failed to load projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handle = () => {
    window.location.href = "/addproject";
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleToggleLike = (index) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, liked: !project.liked } : project
      )
    );
  };

  const toggleComments = (index) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index
          ? { ...project, commentsVisible: !project.commentsVisible }
          : project
      )
    );
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
              <a href="/">
                <span>Home</span>
              </a>
              <a href="/dashboard">
                <span>Profile</span>
              </a>
              <a href="/dashboard/projects">
                <span>Projects</span>
              </a>
              <a href="/dashboard/achievements">
                <span>Achievements</span>
              </a>
            </nav>
          </div>

          <section className="service-section">
            <h2>Projects</h2>
            <button className="addproject" onClick={handle}>
              Add project
            </button>
            <div className="info-box">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="project-box"
                 
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
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
                        justifyContent : "center"
                      }}
                    />
                  ))} */}
                  <p>
                    <strong>Technologies:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p>
                    <strong>Tags:</strong> {project.tags.join(", ")}
                  </p>
                  <div className="project-buttons">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      View Project
                    </a>
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Live Demo
                    </a>
                  </div>
                  <div className="like-comments">
                    <button
                      onClick={() => handleToggleLike(index)}
                      className="like-button"
                    >
                      {project.liked ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaHeart color="white" />
                      )}{" "}
                      {project.likes.length}
                    </button>
                    <button
                      onClick={() => toggleComments(index)}
                      className="icon-button"
                    >
                      <FaComment /> &nbsp;0
                    </button>
                  </div>
                  {project.commentsVisible && (
                    <div className="comments-section">
                      <h4>Comments</h4>
                      {project.comments.length > 0 ? (
                        project.comments.map((comment, i) => (
                          <p key={i} className="comment">
                            {comment}
                          </p>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() =>
                      alert("Modify functionality not implemented")
                    }
                  >
                    Modify
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
