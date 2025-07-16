// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(
    ".topic-card, .article-card, .section-title"
  );
  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Newsletter Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      const button = this.querySelector("button");
      const originalText = button.textContent;

      // Show loading state
      button.textContent = "Subscribing...";
      button.classList.add("loading");

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Show success message
        button.textContent = "Subscribed!";
        button.style.background = "#10b981";

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = "";
          button.classList.remove("loading");
        }, 3000);
      }, 1500);
    });
  }
});

// AdSense Loading Optimization
window.addEventListener("load", function () {
  // Ensure AdSense ads load properly
  if (typeof adsbygoogle !== "undefined") {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
});

// Lazy Loading for Images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Search Functionality (for future blog search)
function initializeSearch() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const articles = document.querySelectorAll(".article-card");

      articles.forEach((article) => {
        const title = article.querySelector("h3").textContent.toLowerCase();
        const content = article.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    });
  }
}

// Category Filter (for blog page)
function initializeCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".category-filter button");
  const articles = document.querySelectorAll(".article-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category;

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter articles
      articles.forEach((article) => {
        const articleCategory = article
          .querySelector(".article-category")
          .textContent.toLowerCase();

        if (
          category === "all" ||
          articleCategory.includes(category.toLowerCase())
        ) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    });
  });
}

// Back to Top Button
function createBackToTopButton() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = "back-to-top";
  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(backToTop);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Scroll to top when clicked
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSearch();
  initializeCategoryFilter();
  createBackToTopButton();
});

// Performance Optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function () {
  // Handle scroll-based animations or effects here
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Cookie Consent (for GDPR compliance)
function showCookieConsent() {
  if (!localStorage.getItem("cookieConsent")) {
    const consentBanner = document.createElement("div");
    consentBanner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #1f2937;
                color: white;
                padding: 1rem;
                z-index: 10000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
            ">
                <div>
                    <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button onclick="acceptCookies()" style="
                        background: #2563eb;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Accept</button>
                    <button onclick="declineCookies()" style="
                        background: transparent;
                        color: white;
                        border: 1px solid white;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Decline</button>
                </div>
            </div>
        `;
    document.body.appendChild(consentBanner);
  }
}

function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  document.querySelector('[style*="position: fixed"]').remove();
}

function declineCookies() {
  localStorage.setItem("cookieConsent", "declined");
  document.querySelector('[style*="position: fixed"]').remove();
}

// Show cookie consent on page load
document.addEventListener("DOMContentLoaded", showCookieConsent);
