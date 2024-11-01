import React, { createContext, useEffect, useState } from "react";


export const Experiencecontext = createContext();


export const ExperienceProvider = ({ children }) => {
  const [userExperiences, setUserExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await fetch(`https://expo-backend-1.onrender.com/experiences`, {
        method: "GET",
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      if (data.status && Array.isArray(data.experiences)) {
        setUserExperiences(data.experiences);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch Experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <Experiencecontext.Provider value={{ userExperiences, loading }}>
      {children}
    </Experiencecontext.Provider>
  );
};
