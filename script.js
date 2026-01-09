



// Scroll Animations (Intersection Observer for Scale/Fade)
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => observer.observe(el));

// Sticky Navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.padding = '1rem 3rem';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        navbar.style.padding = '1.5rem 3rem';
    }
});

// 3D Scroll Logic for Robot Background
const bgVideo = document.getElementById('bg-video');
const robotPlaceholder = document.querySelector('.robot-window-placeholder');

// Use requestAnimationFrame for smooth performance
let lastScrollY = window.scrollY;
let ticking = false;

function update3DTransform() {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / scrollHeight, 1);

    // Animation Stages based on Scroll Position (approximate pixels)
    // 0 - Hero: Full screen, flat
    // Lower down: Rotate and push back

    let transformString = '';

    // Calculate dynamic values
    // Z-index push back to create depth
    const translateZ = -1 * scrollY * 0.5;

    // Rotation to simulate 'looking around' the robot
    const rotateY = scrollY * 0.02;
    const rotateX = Math.max(-10, -1 * scrollY * 0.01);

    // Lateral movement to allow content to be read on side
    // Move slightly right as we scroll down to make room for text on left (if needed)
    // For now, let's just do a cool 3D rotation

    if (scrollY < 500) {
        // Hero Section -> About Section transition
        // Rotate slightly and push back
        transformString = `translate3d(0px, 0px, ${Math.max(-200, -scrollY / 2)}px) rotateY(${Math.min(10, scrollY / 20)}deg)`;
    } else {
        // Deeper scroll - more dramatic effect
        // Maybe lock it into a specific position/angle
        transformString = `translate3d(0px, ${-scrollY * 0.1}px, -200px) rotateY(10deg) rotateX(${Math.max(-5, (scrollY - 500) * -0.01)}deg)`;
    }

    // Special behavior when near the robot placeholder: fit into the box?
    // That is very complex to calculate perfectly without rects, 
    // but we can simulate "focusing" on the robot.

    if (robotPlaceholder) {
        const placeholderRect = robotPlaceholder.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If placeholder is in view
        if (placeholderRect.top < viewportHeight && placeholderRect.bottom > 0) {
            // Calculate a center offset to make it look like it fits? 
            // For now, let's zoom in when we reach the showcase section
            const centerOffset = (viewportHeight / 2) - (placeholderRect.top + placeholderRect.height / 2);

            if (Math.abs(centerOffset) < 300) {
                // Close to center of showcase
                // Reset rotation to flat to "examine" the robot
                // Zoom in
                transformString = `translate3d(0px, 0px, 0px) scale(0.9) rotateY(0deg)`;
            }
        }
    }

    bgVideo.style.transform = transformString;

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(update3DTransform);
        ticking = true;
    }
});
