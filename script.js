document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
        }
    });
    const galleries = document.querySelectorAll('.image-gallery');

    galleries.forEach(gallery => {
        const container = gallery.querySelector('.gallery-container');
        const dots = gallery.querySelectorAll('.gallery-dot');
        const prev = gallery.querySelector('.gallery-prev');
        const next = gallery.querySelector('.gallery-next');
        let currentIndex = 0;

        function updateGallery() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
        });

        prev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + 3) % 3;
            updateGallery();
        });

        next.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % 3;
            updateGallery();
        });

        // Auto-advance every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % 3;
            updateGallery();
        }, 5000);
    });
});