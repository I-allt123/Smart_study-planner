// Simple script for Smart Study AI Planner

document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Study AI Planner loaded');

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }

    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle study plan form
    const studyForm = document.getElementById('studyForm');
    const planOutput = document.getElementById('planOutput');

    studyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const hours = parseInt(document.getElementById('hours').value);
        const days = parseInt(document.getElementById('days').value);
        const goal = document.getElementById('goal').value;

        // Simple AI-like plan generation
        let plan = `<h3>Your Study Plan for ${subject}</h3>`;
        plan += `<p>Goal: ${goal}</p>`;
        plan += `<p>Study ${hours} hours per day for ${days} days.</p>`;
        plan += `<ul>`;
        for (let i = 1; i <= days; i++) {
            plan += `<li>Day ${i}: Study ${subject} for ${hours} hours. Focus on key topics.</li>`;
        }
        plan += `</ul>`;
        plan += `<p>Remember to take breaks and review progress!</p>`;

        planOutput.innerHTML = plan;
    });
});