 // Simple JavaScript for mobile menu toggle (could be expanded)
document.querySelector('button').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('hidden');
    nav.classList.toggle('block');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});