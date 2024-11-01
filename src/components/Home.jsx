import Navbar from "./Navbar";
import Footer from "./Footer";
import {useState} from "react";
import ProjectReel from "./ProjectReel";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#ffffff" }}>
      <Navbar setSearchQuery={setSearchQuery} />
      <ProjectReel searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}
