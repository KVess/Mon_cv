// Script pour la soumission du formulaire
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message! Je vous répondrai très rapidement.');
    this.reset();
});

// Gestion de la navigation et du défilement
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const progressBar = document.getElementById('progressBar');

// Observer pour déclencher les animations lorsque les éléments sont dans le viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animation spécifique pour les barres de compétences
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            
            // Animation spécifique pour la timeline
            if (entry.target.id === 'experience') {
                animateTimeline();
            }
            
            // Animation spécifique pour l'éducation
            if (entry.target.id === 'education') {
                animateEducation();
            }
            
            // Animation spécifique pour les projets
            if (entry.target.id === 'projects') {
                animateProjects();
            }
        }
    });
}, observerOptions);

// Observer chaque section
sections.forEach(section => {
    observer.observe(section);
});

// Mise à jour de la navigation active pendant le défilement
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;
    
    // Mise à jour de la barre de progression
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / totalHeight) * 100;
    progressBar.style.width = progress + '%';
    
    // Déterminer la section active
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Mettre à jour les liens de navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animation des barres de compétences
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(bar => {
        const width = bar.getAttribute('data-level');
        bar.style.width = width;
    });
}

// Animation de la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 300 * index);
    });
}

// Animation de l'éducation
function animateEducation() {
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 300 * index);
    });
}

// Animation des projets
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 * index);
    });
}

// Navigation fluide
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});