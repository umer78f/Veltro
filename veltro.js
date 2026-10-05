document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".rv");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in"));
}

const navigationLinks = document.querySelectorAll(".nav a");
const navigationSections = ["services", "work", "testimonials", "process", "about", "team", "faq"];

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle("on", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  navigationSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) navigationObserver.observe(section);
  });
}

const inquiryForm = document.getElementById("contact-form");

if (inquiryForm) {
  const validateField = (name, errorId, message) => {
    const field = inquiryForm.elements[name];
    const error = document.getElementById(errorId);

    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  };

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const business = formData.get("biz").trim();

    const isNameValid = validateField("name", "name-error", name ? "" : "Enter your name.");
    const isPhoneValid = validateField(
      "phone",
      "phone-error",
      phone.replace(/\D/g, "").length >= 10
        ? ""
        : "Enter a valid phone number, at least 10 digits.",
    );
    const isBusinessValid = validateField(
      "biz",
      "business-error",
      business ? "" : "Tell us what business you run.",
    );

    if (!isNameValid || !isPhoneValid || !isBusinessValid) {
      inquiryForm.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const message = [
      "Hi Veltro, I would like a free quote.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Business: ${business}`,
    ].join("\n");

    document.getElementById("form-status").classList.add("show");
    window.open(
      `https://wa.me/923261690678?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
  });
}
