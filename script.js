console.log("Welcome to Mirdula R's Portfolio!");

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navigation: " + link.textContent);
    });
});