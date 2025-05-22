document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
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
    }

    // Services Slider
    const servicesSlider = document.querySelector('.services-slider');
    if (servicesSlider) {
        const cards = servicesSlider.querySelectorAll('.service-card');
        const prevBtn = document.querySelector('.services-slider-container .prev');
        const nextBtn = document.querySelector('.services-slider-container .next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const totalSlides = cards.length - 2; // Subtract visible cards (3) - 1

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }

        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots[0].classList.add('active');

        function updateSlider() {
            servicesSlider.style.transform = `translateX(-${currentIndex * 33.333}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update button states
            if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            if (nextBtn) nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            updateSlider();
            resetAutoplay();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                    resetAutoplay();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                    updateSlider();
                    resetAutoplay();
                }
            });
        }

        // Touch and drag functionality
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;

        function dragStart(e) {
            isDragging = true;
            startPos = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            servicesSlider.style.transition = 'none';
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();
            const currentPosition = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const diff = currentPosition - startPos;
            const movePercent = (diff / servicesSlider.offsetWidth) * 100;
            
            currentTranslate = -(currentIndex * 33.333) + movePercent;
            servicesSlider.style.transform = `translateX(${currentTranslate}%)`;
        }

        function dragEnd() {
            if (!isDragging) return;
            
            isDragging = false;
            servicesSlider.style.transition = 'transform 0.5s ease';
            
            const movePercent = currentTranslate + (currentIndex * 33.333);
            
            if (movePercent > 10 && currentIndex > 0) {
                currentIndex--;
            } else if (movePercent < -10 && currentIndex < totalSlides - 1) {
                currentIndex++;
            }
            
            updateSlider();
            resetAutoplay();
        }

        servicesSlider.addEventListener('mousedown', dragStart);
        servicesSlider.addEventListener('touchstart', dragStart);
        servicesSlider.addEventListener('mousemove', drag);
        servicesSlider.addEventListener('touchmove', drag);
        servicesSlider.addEventListener('mouseup', dragEnd);
        servicesSlider.addEventListener('touchend', dragEnd);
        servicesSlider.addEventListener('mouseleave', dragEnd);

        // Prevent context menu on long press
        servicesSlider.addEventListener('contextmenu', (e) => e.preventDefault());

        let autoplayInterval;

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Pause autoplay on hover
        servicesSlider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        servicesSlider.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Initial setup
        updateSlider();
        startAutoplay();
    }

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

