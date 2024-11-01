import React, { useState, useEffect } from "react";
import "./Navbar.css";
import image from "../assets/logo.png";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = ({ setSearchQuery }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userEmail"));
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleInputBlur = () => {
    if (searchQuery === "") {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <img className="logopng" src={image} alt="Logo" />
      </div>
      <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
        {isSearching ? (
          <li className="search-container">
            <input
              type="text"
              placeholder="Search by tags..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={handleInputBlur}
              autoFocus
            />
          </li>
        ) : (
          <li>
            <a href="#" onClick={handleSearchClick}>
              <FaSearch /> &nbsp; Search
            </a>
          </li>
        )}
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/" onClick={handleLogout}>Log Out</a></li>
          </>
        ) : (
          <>
            <li><a href="/signUp">Sign Up</a></li>
            <li><a href="/login">Log In</a></li>
          </>
        )}
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
