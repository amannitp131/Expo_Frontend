import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Project from "./components/Projects";
import Achievement from "./components/Achievement";
import OtpInput from "./components/OtpVerification";
import AddSkill from "./components/AddSkill";
import ExperienceForm from "./components/ExperienceForm";
import AchievementForm from "./components/AchievementForm";
import { SkillsProvider } from "./Context/SkillsContext";
import { ExperienceProvider } from "./Context/Experiencecontext";
import { AchievementProvider } from "../src/Context/Achievementcontext";
import AddProjectForm from "./components/ProjectForm";
import ViewDashboard from "./components/ViewDashboard";


export default function App() {
  
  return (
    <div>
      <ExperienceProvider>
      <SkillsProvider>
        <AchievementProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<OtpInput />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/projects" element={<Project />} />
              <Route path="/dashboard/achievements" element={<Achievement />} />

              <Route path="/addskill" element={<AddSkill />} />
              <Route path="/addexp" element={<ExperienceForm />} />
              <Route path="/addachievements" element={<AchievementForm />} />
              <Route path="/addproject" element={<AddProjectForm/>}/>
              <Route path="/viewdashboard" element={<ViewDashboard />} />
              

            </Routes>
          </BrowserRouter>
        </AchievementProvider>
      </SkillsProvider>
      </ExperienceProvider>
    </div>
  );
}
