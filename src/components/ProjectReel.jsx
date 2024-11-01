import React, { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import "./ProjectReel.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const ProjectReel = ({ handleToggleLike, toggleComments }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://expo-backend-1.onrender.com/allproject", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const userEmail = localStorage.getItem("userEmail");

        if (Array.isArray(data.message)) {
          // Filter projects based on the search query in tags
          const filteredProjects = data.message
            .filter(
              (project) =>
                searchQuery === "" ||
                project.tags.some((tag) =>
                  tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            .map((project) => ({
              ...project,
              liked: project.likes.includes(userEmail),
            }));

          setProjects(filteredProjects);
        } else {
          console.error("Fetched data.message is not an array:", data.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleEmailClick = (email) => {
    navigate(`/viewdashboard?email=${email}`); // Redirect with query parameter
  };

  const handleLikes = (projectId, index) => {
    fetch("https://expo-backend-1.onrender.com/addlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: projectId,
        email: localStorage.getItem("userEmail"),
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects];
            const project = updatedProjects[index];
            if (!project.liked) {
              project.likes.push(localStorage.getItem("userEmail"));
              project.liked = true;
            }
            return updatedProjects;
          });
        } else {
          console.log("Like action was not successful:", data.message);
          
        }
      })
      .catch((error) => {
        console.error("Error liking project:", error);
      });
  };

  const showLikesOverlay = (project) => {
    setSelectedProject(project);
  };

  const closeLikesOverlay = () => {
    setSelectedProject(null);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (projectId) => {
    if (!newComment) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch("https://expo-backend-1.onrender.com/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: localStorage.getItem("userEmail"),
          id: projectId,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();
      if (data.status) {
        toast.success("Comment added successfully!");
        setNewComment("");
        setProjects((prevProjects) => {
          return prevProjects.map((project) => {
            if (project.projectId === projectId) {
              return {
                ...project,
                comments: [
                  ...project.comments,
                  {
                    email: localStorage.getItem("userEmail"),
                    comment: newComment,
                  },
                ],
              };
            }
            return project;
          });
        });
        setShowComments((prev) => ({ ...prev, [projectId]: false }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment");
    }
  };

  const toggleCommentBox = (projectId) => {
    setShowComments((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <div className="project-reel">
      {Array.isArray(projects) &&
        projects.map((project, index) => (
          <div
            key={project._id}
            className="project-box"
            style={{
              padding: "20px",
              margin: "10px",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1>{project.title}</h1>
           <h3 className="madeby">
  <Link to={`/viewdashboard?email=${project.email}`} className="purple-text">
    {project.email}
  </Link>
</h3>

            <p>{project.description}</p>
            {/* {project.images.map((image, i) => (
              <img
                key={i}
                src={`http://localhost:3000${image}`}
                alt={`Project ${index} Image ${i}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path_to_placeholder_image.png";
                }}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ))} */}
            <p>
              <strong>Technologies:</strong> {project.technologies.join(", ")}
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
                onClick={() => handleLikes(project.projectId, index)}
                className="like-button"
              >
                <FaHeart color={project.liked ? "red" : "white"} />
                <span
                  onClick={() => showLikesOverlay(project)}
                  style={{ cursor: "pointer" }}
                >
                  {project.likes.length}
                </span>
              </button>
              <button
                onClick={() => toggleCommentBox(project.projectId)}
                className="icon-button"
              >
                <FaComment /> &nbsp;{project.comments.length}
              </button>
            </div>
            {showComments[project.projectId] && (
              <div className="comment-section">
                <div className="comment-box">
                  <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here..."
                    style={{
                      width: "85%",
                      height: "60px",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "10px",
                      border: "1px solid #ccc",
                      marginLeft: "5px",
                      resize: "none",
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(project.projectId)}
                    className="submit-button"
                  >
                    Add Comment
                  </button>
                </div>
                {project.comments.length > 0 && (
                  <div className="comments-display">
                    <h4>Comments:</h4>
                    {project.comments.map((comment, i) => (
                      <div key={i} className="comment-item">
                        <p className="comment">
                          {comment.comment} - <em>{comment.email}</em>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      {selectedProject && (
        <div className="overlay">
          <div className="overlay-content">
            <button onClick={closeLikesOverlay} className="close-button">
              ✖
            </button>
            <h2>Liked by:</h2>
            <ul>
              {selectedProject.likes.map((email, i) => (
                <li key={i}>{email}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProjectReel;
