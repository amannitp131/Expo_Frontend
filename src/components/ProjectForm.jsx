import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import "./projectform.css";
import imageCompression from 'browser-image-compression';

export default function AddProjectForm() {
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
        if (data.status) {
          const userData = data.message;
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

  const email=localStorage.getItem('userEmail');
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    category: "",
    tags: "",
  });
  const [images, setImages] = useState([]);

  const [instituteName, setInstituteName] = useState("");
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const compressedImages = [];

    for (const file of files) {
        // Check if the file size exceeds 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert(`File "${file.name}" exceeds the 2MB limit. Please select a smaller image.`);
            continue; // Skip this file
        }

        try {
            const options = {
                maxSizeMB: 2, // Specify the max size in MB
                maxWidthOrHeight: 1920, // Specify the max width or height
                useWebWorker: true, // Use a web worker for compression
            };
            const compressedFile = await imageCompression(file, options);
            compressedImages.push(compressedFile); // Store the compressed file
        } catch (error) {
            console.error("Error compressing file:", error);
        }
    }
    setImages(compressedImages); // Set the compressed images
};

const handleAddProject = async () => {
    const formData = new FormData();

    // Ensure the email is valid before appending
    if (!email) {
        toast.error("No email found. Please log in again.");
        return;
    }

    formData.append("email", email); // Append email to formData
    formData.append("description", project.description);
    formData.append("title", project.title);
    formData.append("technologies", project.technologies);
    formData.append("githubLink", project.githubLink);
    formData.append("liveDemoLink", project.liveDemoLink);
    formData.append("category", project.category);
    formData.append("tags", project.tags);

    images.forEach((image) => {
        formData.append("images", image); // Append each compressed image
    });

    try {
      const response = await fetch("https://expo-backend-1.onrender.com/addproject", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status) { // Adjusted condition to check 'status' key
        toast.success("Project uploaded successfully");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error uploading project");
    }
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
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <Link to="/">Home</Link>
              <Link to="/dashboard">Profile</Link>
              <Link to="/dashboard/projects">Projects</Link>
              <Link to="/dashboard/achievements">Achievements</Link>
            </nav>
          </div>

          <section className="service-section">
            <div className="add-project-form">
              <h2>Add Your Project</h2>

              <form>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={project.title}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Description:
                  <textarea
                    name="description"
                    value={project.description}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Project Images:
                  <input type="file" multiple onChange={handleImageUpload} />
                </label>

                <label>
                  Technologies (comma-separated):
                  <input
                    type="text"
                    name="technologies"
                    value={project.technologies}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  GitHub Link:
                  <input
                    type="url"
                    name="githubLink"
                    value={project.githubLink}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Live Demo Link:
                  <input
                    type="url"
                    name="liveDemoLink"
                    value={project.liveDemoLink}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Category:
                  <input
                    type="text"
                    name="category"
                    value={project.category}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Tags (comma-separated):
                  <input
                    type="text"
                    name="tags"
                    value={project.tags}
                    onChange={handleInputChange}
                  />
                </label>

                <button type="button" onClick={handleAddProject}>Submit Project</button>
              </form>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
