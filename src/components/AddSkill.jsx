import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./Dashboard.css";
import "./Addskill.css";
import { Link } from "react-router-dom";
import image from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addskill() {
  const email = localStorage.getItem("userEmail");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    fetchSkills(); 
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const [skills] = useState([
    "JavaScript",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C#",
    "C++",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "TypeScript",
    "SQL",
    "R",
    "Go",
    "Perl",
    "Scala",
    "Objective-C",
    "Rust",
    "Dart",
    "Elixir",
    "Haskell",
    "Lua",
    "MATLAB",
    "VBA",
  ]);
  const [search, setSearch] = useState("");
  const [addedSkills, setAddedSkills] = useState([]);

  const filteredSkills = skills
    .filter((skill) => skill.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 3);

  const handleSkillClick = (skill) => {
    setSearch(skill); 
  };

  const handleAddSkill = () => {
    setIsSubmitting(true);
    if (search && !addedSkills.includes(search)) {
      const skillToAdd = search; 

     
      fetch("http://localhost:3000/addskill", {
        method: "POST",
        body: JSON.stringify({ email: email, skill: skillToAdd }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.status) {
            toast.success(data.message);
            setAddedSkills((prevSkills) => [...prevSkills, skillToAdd]); 
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error adding skill:", error);
          toast.error("Failed to add skill.");
        });

      setSearch(""); 
    } else if (addedSkills.includes(search)) {
      alert("Skill already added.");
    } else {
      alert("No skill selected.");
    }
  };

  const fetchSkills = () => {
    fetch("http://localhost:3000/getskill", {
      method: "GET",
      headers: {
        email: localStorage.getItem("userEmail"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.skills)) {
         
          const newAddedSkills = data.skills.filter(
            (skill) => !addedSkills.includes(skill)
          );
          setAddedSkills(newAddedSkills); 
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
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
            <div className="container">
              <img className="skilllogo" src={image} alt="Logo" />
              <input
                type="text"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
              <div className="skill-list">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    className="skill"
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <button
                className="button"
                onClick={handleAddSkill}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}
