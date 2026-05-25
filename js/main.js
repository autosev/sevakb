/* ========================================
   СЕВАКБ — Интерактивность
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* --- Header scroll effect --- */
  const header = document.querySelector(".header");
  const scrollTop = 10;

  const onScroll = () => {
    if (window.scrollY > scrollTop) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Burger menu --- */
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");
  const body = document.body;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle("mobile-menu--open");
    burger.classList.toggle("burger--active");
    body.style.overflow = isOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("mobile-menu--open");
    burger.classList.remove("burger--active");
    body.style.overflow = "";
  };

  burger.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* --- Scroll to top button --- */
  const scrollTopBtn = document.querySelector(".scroll-top");

  const toggleScrollTop = () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("scroll-top--visible");
    } else {
      scrollTopBtn.classList.remove("scroll-top--visible");
    }
  };

  window.addEventListener("scroll", toggleScrollTop, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* --- Intersection Observer for animations --- */
  const observerOptions = {
    threshold: 0,
    rootMargin: "0px 0px 300px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".catalog-item, .service-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    observer.observe(el);
  });

  /* Add animation styles */
  const style = document.createElement("style");
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  /* --- Staggered animation delay --- */
  document
    .querySelectorAll(".catalog-item, .service-card")
    .forEach((card, i) => {
      card.style.transitionDelay = "0s";
    });
});
