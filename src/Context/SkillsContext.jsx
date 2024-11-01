import React, { createContext, useState, useEffect } from "react";

export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skillsArray, setSkillsArray] = useState([]);

  useEffect(() => {
    fetch("https://expo-backend-1.onrender.com/getskill", {
      method: "GET",
      headers: {
        email: localStorage.getItem("userEmail"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.skills)) {
          setSkillsArray(data.skills);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  return (
    <SkillsContext.Provider value={skillsArray}>
      {children}
    </SkillsContext.Provider>
  );
};
