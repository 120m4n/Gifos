const hamburger = document.querySelector(".burger");
const navLinks = document.querySelector(".navbar__links");
const links = document.querySelectorAll(".navbar__links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});