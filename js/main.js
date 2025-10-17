// FAQ Accordion
document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.querySelector(".faq-content");

  faqContainer.addEventListener("click", (e) => {
    const groupHeader = e.target.closest(".faq-group-header");

    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector(".faq-group-body");
    const icon = groupHeader.querySelector("i");

    // Toggle icon
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");

    // Toggle visibility of body
    groupBody.classList.toggle("open");

    // Close other open FAQ bodies
    const otherGroups = faqContainer.querySelectorAll(".faq-group");

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector(".faq-group-body");
        const otherIcon = otherGroup.querySelector(".faq-group-header i");

        otherGroupBody.classList.remove("open");
        otherIcon.classList.remove("fa-minus");
        otherIcon.classList.add("fa-plus");
      }
    });
  });
});

// Mobile Menu + Sticky Navbar
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navbar = document.querySelector(".navbar");
  const logoDefault = document.querySelector(".logo-default");
  const logoSticky = document.querySelector(".logo-sticky");

  // Guard: if essential elements are missing, bail out gracefully
  if (!hamburgerButton || !mobileMenu || !navbar) return;

  function openMenu() {
    mobileMenu.classList.add("active");
    mobileMenu.setAttribute("aria-hidden", "false");
    hamburgerButton.setAttribute("aria-expanded", "true");
    mobileMenu.querySelector("a")?.focus();
    document.body.classList.add("no-scroll");
    document.body.style.overflow = "hidden"; // مستقیم‌تر از class
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburgerButton.setAttribute("aria-expanded", "false");
    hamburgerButton.focus(); // فوکوس به همبرگر برمی‌گرده
    document.body.classList.remove("no-scroll");
    document.body.style.overflow = ""; // ریست اسکرول
  }

  hamburgerButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Close when clicking a link inside the mobile menu
  mobileMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    closeMenu();
  });

  // Close when clicking outside the menu (backdrop)
  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("active")) return;
    if (
      !e.target.closest(".mobile-menu") &&
      !e.target.closest(".hamburger-button")
    ) {
      closeMenu();
    }
  });

  // Sticky navbar behavior: toggle .scrolled and swap logos
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
      logoDefault && (logoDefault.style.display = "none");
      logoSticky && (logoSticky.style.display = "inline-block");
    } else {
      navbar.classList.remove("scrolled");
      logoDefault && (logoDefault.style.display = "inline-block");
      logoSticky && (logoSticky.style.display = "none");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
