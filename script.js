// Theme Management
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Function to toggle theme
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Check system preference on load
function checkSystemPreference() {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
});

// Initialize theme
checkSystemPreference();

// Job details data
const jobDetails = {
    'shopify-dev': {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        period: '2022 - Present',
        description: 'Leading development of enterprise web applications using modern technologies.',
        responsibilities: [
            'Led a team of 6 developers in building scalable web applications',
            'Architected and implemented microservices using Node.js and React',
            'Improved application performance by 40% through optimization',
            'Mentored junior developers and conducted code reviews',
            'Collaborated with product managers to define technical requirements'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
        achievements: [
            'Successfully delivered 3 major projects ahead of schedule',
            'Reduced deployment time by 60% through CI/CD implementation',
            'Achieved 99.9% uptime for critical production systems'
        ]
    },
    'frontend-developer': {
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        period: '2020 - 2022',
        description: 'Built responsive user interfaces and improved user experience for SaaS platform.',
        responsibilities: [
            'Developed responsive web applications using React and Vue.js',
            'Implemented modern UI/UX designs with CSS3 and Sass',
            'Optimized application loading speed and performance',
            'Collaborated with designers to create intuitive user interfaces',
            'Maintained and updated existing codebase'
        ],
        technologies: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'Sass', 'Webpack'],
        achievements: [
            'Improved user engagement by 25% through UI/UX enhancements',
            'Reduced bundle size by 30% through code optimization',
            'Implemented accessibility features for better user experience'
        ]
    },
    'junior-developer': {
        title: 'Junior Developer',
        company: 'Digital Solutions',
        period: '2019 - 2020',
        description: 'Developed and maintained client websites using modern web technologies.',
        responsibilities: [
            'Built and maintained client websites using HTML, CSS, and JavaScript',
            'Collaborated with senior developers on larger projects',
            'Fixed bugs and implemented new features',
            'Participated in code reviews and team meetings',
            'Learned new technologies and best practices'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP', 'MySQL'],
        achievements: [
            'Successfully completed 15+ client projects',
            'Improved website loading speed by 50%',
            'Received positive feedback from clients and team members'
        ]
    }
};

// DOM elements
const modal = document.getElementById('jobModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const experienceCards = document.querySelectorAll('.experience-card');

// Event listeners
experienceCards.forEach(card => {
    card.addEventListener('click', () => {
        const jobId = card.getAttribute('data-job');
        openJobModal(jobId);
    });
});

closeModal.addEventListener('click', closeJobModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeJobModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeJobModal();
    }
});

// Functions
function openJobModal(jobId) {
    const job = jobDetails[jobId];
    if (!job) return;

    modalTitle.textContent = job.title;
    modalBody.innerHTML = createJobDetailHTML(job);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeJobModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function createJobDetailHTML(job) {
    return `
        <div class="job-detail">
            <div style="margin-bottom: 20px;">
                <h3 style="color: #667eea; margin-bottom: 8px;">${job.company}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">${job.period}</p>
            </div>
            
            <p style="margin-bottom: 20px;">${job.description}</p>
            
            <h3>Key Responsibilities:</h3>
            <ul>
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
            
            <h3>Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                ${job.technologies.map(tech => 
                    `<span style="background: var(--gradient-primary); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.9rem;">${tech}</span>`
                ).join('')}
            </div>
            
            <h3>Key Achievements:</h3>
            <ul>
                ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add subtle animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add theme transition to all elements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
}); 