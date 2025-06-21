const ParticlesConfig = {
  background: {
    color: {
      value: "#fa6f08" // deep warm orange-brown
    }
  },
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#ff6f61", "#ffcc00", "#00e6e6", "#ff99cc", "#ffffff"] // vibrant palette
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000"
      }
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 20,
      random: true,
      anim: {
        enable: true,
        speed: 6,
        size_min: 10,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none", // floats all around
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    },
    line_linked: {
      enable: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 180,
        size: 40,
        duration: 2,
        opacity: 0.8,
        speed: 2
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  retina_detect: true
};

export default ParticlesConfig;
