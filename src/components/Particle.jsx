import { useCallback,useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Particle = () => {
  

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log(container);
  }, []);

 

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: { color: { value: "#0000" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: { color: "#ffffff", distance: 150, enable: false }, 
          move: {
            direction: "bottom",
            enable: true,
            outModes: { default: "out" },
            random: false,
            speed: 1, 
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 100 }, 
          opacity: { value: 0.8 },
          shape: {
            type: "circle", 
          },
          size: {
            value: { min: 2, max: 5 }, 
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;
