import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ParticlesConfig from "../../particles-config";

const ParticleBackground = () => {
  const loadParticles = async (main) => {
    await loadFull(main); 
  };

  return (
    <Particles
      id="tsparticles"
      init={loadParticles}
      options={ParticlesConfig}
    />
  );
};

export default ParticleBackground;
