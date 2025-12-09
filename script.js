/* ✅ CONTACT FORM */
function sendMessage(event) {
    event.preventDefault();
    alert("Thank you! Your message has been received.");
  }
  
  /* ✅ GSAP + ANIMATIONS INIT */
  window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, Flip);
  
    /* ✅ INFINITE ROTATION FOR MARS PLANET */
    gsap.to(".mars-planet", {
      rotation: 360,
      duration: 25,
      ease: "linear",
      repeat: -1
    });
    /* ✅ MARS SCROLL PARALLAX TO TOP CENTER */
gsap.to(".mars-planet", {
    scrollTrigger: {
      trigger: ".mars-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5   // ✅ smooth scroll sync
    },
  
    // ✅ Move from bottom-left to top-center
    x: () => window.innerWidth / 3 - 200,   // centers horizontally
    y: -950,                                 // moves upward
    scale: 0.6                               // cinematic depth effect
  });
  /* ✅ TABLET/LAPTOP GLOW ON SCROLL */
gsap.fromTo(".glow-device",
    {
      opacity: 0,
      scale: 0.8,
      filter: "drop-shadow(0 0 0px rgba(255,120,24,0))"
    },
    {
      opacity: 1,
      scale: 1,
      filter: "drop-shadow(0 0 60px rgba(255,120,24,0.8))",
      scrollTrigger: {
        trigger: ".equipment-section",
        start: "top 60%",
        end: "top 10%",
        scrub: true
      }
    }
  );
  /* ✅ FLOATING MOVEMENT FOR EQUIPMENT TABS */
gsap.utils.toArray(".equipment-tabs span").forEach((tab, i) => {
    gsap.to(tab, {
      y: gsap.utils.random(-15, 15),
      x: gsap.utils.random(-10, 10),
      rotation: gsap.utils.random(-3, 3),
      duration: gsap.utils.random(3, 6),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.3
    });
  });
  gsap.from(".equipment-tabs span", {
    scrollTrigger: {
      trigger: ".equipment-tabs",
      start: "top 80%"
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });
  gsap.utils.toArray(".equipment-tabs span").forEach((tab, i) => {
    gsap.to(tab, {
      y: gsap.utils.random(-6, 6),
      duration: 2 + i,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  
  
    
  
  
  
    /* ✅ SERVICES CARD ANIMATION */
    gsap.from(".card", {
      scrollTrigger: ".services",
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
  
    /* ✅ ANIMATED BOX */
    gsap.fromTo(
      ".animated-box",
      { scale: 0.3, rotation: 0, opacity: 0 },
      {
        scrollTrigger: ".box-section",
        scale: 1,
        rotation: 360,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  
    /* ✅ FLIP SWAP ON SCROLL */
    const container = document.querySelector(".container");
    const squares = document.querySelectorAll(".square");
  
    function doFlip() {
      if (!container || squares.length < 2) return;
  
      const state = Flip.getState(squares);
      container.appendChild(container.children[0]);
  
      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        absolute: true
      });
    }
  
    ScrollTrigger.create({
      trigger: "#flip",
      start: "top 70%",
      onEnter: doFlip,
      onEnterBack: doFlip
    });
  });
  
  /* ✅ CINEMATIC NAVBAR SHRINK */
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".cinema-navbar");
    if (!nav) return;
  
    nav.classList.toggle("shrink", window.scrollY > 60);
  });
  
  /* ✅ MOBILE HAMBURGER MENU */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  
    /* ✅ CLOSE MENU ON LINK CLICK */
    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }
  const tabs = document.querySelectorAll(".equipment-tabs span");

let current = 0;

function moveFestivalLight() {
  // Remove glow from all
  tabs.forEach(tab => tab.classList.remove("active"));

  // Add glow to current
  tabs[current].classList.add("active");

  // Glow pulse animation
  gsap.fromTo(
    tabs[current],
    { boxShadow: "0 0 0 rgba(255,122,24,0)" },
    {
      boxShadow: "0 0 30px rgba(255,122,24,0.9)",
      duration: 0.6,
      yoyo: true,
      repeat: 1
    }
  );

  current = (current + 1) % tabs.length;
}

// ✅ AUTO LOOP LIKE FESTIVAL LIGHT
setInterval(moveFestivalLight, 1200);

  