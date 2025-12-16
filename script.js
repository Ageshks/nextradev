/* ✅ CONTACT FORM */
function sendMessage(event) {
    event.preventDefault();
    alert("Thank you! Your message has been received.");
  }
  (function () {
    emailjs.init("LTQguKvjAcfd2vInW");
  })();
  
  
  /* ✅ GSAP + ANIMATIONS INIT */
  window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);
  
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
        scrub: 1.5
      },
      x: () => window.innerWidth / 3 - 200,
      y: -950,
      scale: 0.6
    });
  
    /* ✅ TABLET / LAPTOP GLOW ON SCROLL */
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
        y: gsap.utils.random(-8, 8),
        x: gsap.utils.random(-8, 8),
        rotation: gsap.utils.random(-2, 2),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
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
  
    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }
  
  /* ✅ FESTIVAL MOVING GLOW LIGHT ON TABS */
  const tabs = document.querySelectorAll(".equipment-tabs span");
  let current = 0;
  
  function moveFestivalLight() {
    tabs.forEach(tab => tab.classList.remove("active"));
    tabs[current].classList.add("active");
  
    gsap.fromTo(
      tabs[current],
      { boxShadow: "0 0 0 rgba(255,122,24,0)" },
      {
        boxShadow: "0 0 35px rgba(255,122,24,0.95)",
        duration: 0.6,
        yoyo: true,
        repeat: 1
      }
    );
  
    current = (current + 1) % tabs.length;
  }
  
  setInterval(moveFestivalLight, 1200);
  
  /* ✅ ✅ TAB VISIBILITY HARD FIX (IMPORTANT) */
  document.querySelectorAll(".equipment-tabs span").forEach(tab => {
    gsap.set(tab, { opacity: 1, visibility: "visible", clearProps: "all" });
  });
/* ✅ PROCESS SECTION FLOATING + SOFT COLLISION */
const cards = gsap.utils.toArray(".process-card");

cards.forEach((card, i) => {
  // ✅ Individual floating motion (water style)
  gsap.to(card, {
    x: "random(-18, 18)",
    y: "random(-22, 22)",
    rotation: "random(-3, 3)",
    duration: gsap.utils.random(4, 7),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 0.3
  });
});

/* ✅ SOFT COLLISION DETECTION LOOP */
function detectCollisions() {
  for (let i = 0; i < cards.length; i++) {
    const a = cards[i].getBoundingClientRect();

    for (let j = i + 1; j < cards.length; j++) {
      const b = cards[j].getBoundingClientRect();

      const overlap =
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top;

      if (overlap) {
        cards[i].classList.add("glow-hit");
        cards[j].classList.add("glow-hit");

        // ✅ Small repulsion push
        gsap.to(cards[i], {
          x: "+=12",
          y: "-=10",
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(cards[j], {
          x: "-=12",
          y: "+=10",
          duration: 0.6,
          ease: "power2.out"
        });

      } else {
        cards[i].classList.remove("glow-hit");
        cards[j].classList.remove("glow-hit");
      }
    }
  }

  requestAnimationFrame(detectCollisions);
}

detectCollisions();

/* ✅ MARS CARD — Circular Orbit Entry */
gsap.from(".mars-card", {
  duration: 2.6,
  opacity: 0,
  ease: "power3.out",
  motionPath: {
    path: [
      { x: -350, y: -420 },  // start far upper-left
      { x: -220, y: -260 },  // curve inward
      { x: -120, y: -140 },  // smaller arc
      { x: 0, y: 0 }         // final resting position (your CSS)
    ],
    curviness: 1.6,
    autoRotate: false
  }

  
});
/* ✅ Mars Subtitle — Flip Animation Between Lines */
const subTexts = document.querySelectorAll(".mars-sub-slider span");
let subIndex = 0;

function rotateSubText() {
  subTexts.forEach(t => t.classList.remove("active"));

  subTexts[subIndex].classList.add("active");

  subIndex = (subIndex + 1) % subTexts.length;
}

rotateSubText(); 
setInterval(rotateSubText, 3200); 
/* Cinematic 3D flipping subtitle */
const flips = document.querySelectorAll(".mars-sub-slider span");
let index = 0;

function flipText() {
  flips.forEach(t => t.classList.remove("active"));
  flips[index].classList.add("active");

  index = (index + 1) % flips.length;
}

flipText(); // show first
setInterval(flipText, 3200); // flip every 3.2s


gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".clients-track");

if (track) {
  const travelDistance = track.scrollWidth / 2; // 🔥 stop at center moment

  gsap.fromTo(
    track,
    {
      x: () => window.innerWidth   // start fully offscreen right
    },
    {
      x: () => -travelDistance,    // 🔥 stop when centered
      ease: "none",
      scrollTrigger: {
        trigger: ".clients-section",
        start: "top top",
        end: () => `+=${travelDistance}`, // 🔥 SHORT pin
        scrub: true,
        pin: true,
        pinSpacing: false,          // 🔥 NO GAP AFTER
        anticipatePin: 1
      }
    }
  );
}




/* ===============================
   TEAM SECTION — PIN + LEFT SLIDE
================================ */

gsap.registerPlugin(ScrollTrigger);

const teamTrack = document.querySelector(".team-track");
const teamSection = document.querySelector(".team-scroll-section");

if (teamTrack && teamSection) {
  gsap.fromTo(
    teamTrack,
    {
      x: "-120vw" // 🔥 start fully from LEFT
    },
    {
      x: "0vw",   // 🔥 reach CENTER
      ease: "none",
      scrollTrigger: {
        trigger: teamSection,
        start: "top center",
        end: "+=1200",          // controls scroll duration
        scrub: true,
        pin: true,              // 🔥 PAGE FREEZES HERE
        anticipatePin: 1
      }
    }
  );
}


/* =========================================
   CONTACT PARALLAX FLIP AFTER TEAM SECTION
========================================= */

window.addEventListener("load", () => {
  const contact = document.querySelector(".contact");
  const teamSection = document.querySelector(".team-section");

  if (!contact || !teamSection) return;

  // Set initial hidden state
  contact.classList.add("parallax-hidden");

  gsap.to(contact, {
    scrollTrigger: {
      trigger: teamSection,
      start: "bottom center",   // when team finishes
      end: "bottom top",
      scrub: true,
    },
    opacity: 1,
    transform:
      "perspective(1200px) rotateX(0deg) translateY(0)",
    ease: "power3.out"
  });
});


/* ============================
   CONTACT FORM – INIT
============================ */

function sendMessage(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  /* 🔹 If EmailJS is connected, use this */
  
  emailjs.send(
    "service_958ueih",
    "template_00g3lry",
    {
      from_name: name,
      from_email: email,
      message: message
    }
  ).then(
    () => {
      showSuccess();
      form.reset();
      resetFields();
    },
    (error) => {
      alert("Message failed. Try again.");
      console.error(error);
    }
  );
  

  /* 🔹 TEMP fallback (remove when EmailJS is live) */
  showSuccess();
  form.reset();
  resetFields();
}

/* ============================
   FLOATING LABEL HANDLER
============================ */

document.querySelectorAll(".field input, .field textarea").forEach(field => {
  field.addEventListener("focus", () => {
    field.parentElement.classList.add("active");
  });

  field.addEventListener("blur", () => {
    if (!field.value) {
      field.parentElement.classList.remove("active");
    }
  });
});

function resetFields() {
  document.querySelectorAll(".field").forEach(f => {
    f.classList.remove("active");
  });
}

/* ============================
   SUCCESS FEEDBACK
============================ */

function showSuccess() {
  const btn = document.querySelector(".contact-btn");
  const originalText = btn.innerText;

  btn.innerText = "Message Sent ✓";
  btn.style.background =
    "linear-gradient(135deg, #00ff9c, #00c97b)";
  btn.style.color = "#000";

  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "";
    btn.style.color = "";
  }, 2800);
}




