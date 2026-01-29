// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active nav link
      document.querySelectorAll(".navbar a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow on scroll
  if (currentScroll > 50) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    header.style.background = "rgba(15, 23, 42, 0.95)";
  } else {
    header.style.boxShadow = "none";
    header.style.background = "rgba(15, 23, 42, 0.8)";
  }

  lastScroll = currentScroll;
});

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===================================
// TYPING EFFECT
// ===================================
const typingText = document.querySelector(".typing-text");
const roles = [
  "Full Stack Developer",
  "React.js Developer",
  ".NET Core Developer",
  "Web Developer",
  "Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing next
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll reveal
document
  .querySelectorAll(
    ".about-card, .skill-category, .timeline-item, .project-card, .contact-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Create mailto link
    const mailtoLink = `mailto:guptataranga8@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert(
      "Thank you for your message! Your email client will open to send the message.",
    );

    // Reset form
    contactForm.reset();
  });
}

// ===================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".dev-illustration");
  const floatingCards = document.querySelectorAll(".floating-card");

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  floatingCards.forEach((card, index) => {
    const speed = 0.1 + index * 0.05;
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ===================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Create cursor trail circles
for (let i = 0; i < 20; i++) {
  const circle = document.createElement("div");
  circle.className = "cursor-circle";
  circle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
  document.body.appendChild(circle);
}

const cursorCircles = document.querySelectorAll(".cursor-circle");

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursorCircles.forEach((circle, index) => {
    circle.style.left = x - 5 + "px";
    circle.style.top = y - 5 + "px";
    circle.style.transform = `scale(${(cursorCircles.length - index) / cursorCircles.length})`;

    const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
    x += (nextCircle.offsetLeft - x) * 0.3;
    y += (nextCircle.offsetTop - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

// ===================================
// SKILL TAGS ANIMATION
// ===================================
const skillTags = document.querySelectorAll(".skill-tag");

skillTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.05}s`;
  tag.style.opacity = "0";
  tag.style.animation = "fadeIn 0.5s ease forwards";
});

// Add fadeIn animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log(
  "%c👋 Hello, Developer!",
  "font-size: 20px; font-weight: bold; color: #6366f1;",
);
console.log(
  "%cThanks for checking out my portfolio!",
  "font-size: 14px; color: #06b6d4;",
);
console.log(
  "%cFeel free to reach out: guptataranga8@gmail.com",
  "font-size: 12px; color: #94a3b8;",
);
