import { useState, useContext, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./Dashboard.css";
import "./Achievement.css";
import { AchievementContext } from "../Context/Achievementcontext";

export default function Achievement() {
  const [instituteName, setInstituteName] = useState("");
  const [name, setName] = useState("");
  
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getdata", {
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
  const [achievements, setAchievements] = useState([]);
  const { userAchievements, loading } = useContext(AchievementContext);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handle = () => {
    window.location.href = "/addachievements";
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
            <h2>Achievements</h2>
            <div className="info-box">
              {userAchievements.map((achievement, index) => (
                <div key={index} className="achievement-box">
                  <h3>{achievement.title}</h3>
                  <p>
                    <strong>Date:</strong>
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                  <p>{achievement.description}</p>
                </div>
              ))}
              <button onClick={handle}>Add Achievement</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
