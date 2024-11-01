import { useState, useEffect, useContext } from "react";
import { MdHome } from "react-icons/md";
import { FaRestroom, FaBars, FaMoneyBillAlt } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { SkillsContext } from "../Context/SkillsContext";
import { Experiencecontext } from "../Context/Experiencecontext";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [gender, setGender] = useState("");

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
            setEmail(userData.email);
            setInstituteName(userData.instituteName);
            setName(userData.name);
            setYear(userData.year);
            setBranch(userData.branch);
            setGender(userData.gender);
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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleEditSkills = () => {
    window.location.href = "/addskill";
  };

  const skillsArray = useContext(SkillsContext);
  const { userExperiences } = useContext(Experiencecontext);

  const handleEditExperience = () => {
    window.location.href = "/addexp";
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
            <div className="info-box">
              <h2>Personal Info</h2>
              <div className="personal-info-box">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Branch:</strong> {branch}</p>
                <p><strong>Year:</strong> {year}</p>
                <p><strong>Gender:</strong> {gender}</p>
              </div>
             
            </div>

            <div className="info-box">
              <h2>Experience</h2>
              {userExperiences.map((exp, index) => (
                <div key={index} className="experience-box">
                  <p><strong>Company:</strong> {exp.company}</p>
                  <p><strong>Position:</strong> {exp.position}</p>
                  <p><strong>Duration:</strong> {exp.duration} year</p>
                  <p><strong>Description:</strong> {exp.description}</p>
                </div>
              ))}
              <button onClick={handleEditExperience}>Add Experience</button>
            </div>

            <div className="info-box">
              <h2>Skills</h2>
              {skillsArray.map((skill, index) => (
                <div key={index} className="skill-box">
                  <p>{skill}</p>
                </div>
              ))}
              <button onClick={handleEditSkills}>Add Skill</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
