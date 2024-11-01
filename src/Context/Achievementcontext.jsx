import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for achievements
export const AchievementContext = createContext();

// Provider component for managing achievements
export const AchievementProvider = ({ children }) => {
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await fetch(`https://expo-backend-1.onrender.com/achievements`, {
        method: "GET",
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      if (data.status && Array.isArray(data.achievements)) {
        setUserAchievements(data.achievements);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <AchievementContext.Provider value={{ userAchievements, loading }}>
      {children}
    </AchievementContext.Provider>
  );
};
