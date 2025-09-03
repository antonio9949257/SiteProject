document.getElementById('menu-btn').addEventListener('click', function () {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');

        function showSlide(n) {
            slides.forEach((slide, index) => {
                slide.classList.toggle('opacity-0', index !== n);
                slide.classList.toggle('opacity-100', index === n);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('bg-white', index === n);
                dot.classList.toggle('bg-opacity-50', index !== n);
            });

            currentSlide = n;
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                showSlide(parseInt(this.dataset.slide));
            });
        });

        
        setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 5000);

        
        document.querySelectorAll('.before-after').forEach(container => {
            const after = container.querySelector('.after');
            const handle = container.querySelector('.slider-handle');
            let isDragging = false;

            function moveSlider(e) {
                if (!isDragging) return;

                const containerRect = container.getBoundingClientRect();
                let x = e.clientX - containerRect.left;

                
                x = Math.max(0, Math.min(x, containerRect.width));

                const percent = (x / containerRect.width) * 100;
                after.style.width = `${100 - percent}`;
                handle.style.left = `${percent}`;
            }

            handle.addEventListener('mousedown', () => {
                isDragging = true;
            });

            window.addEventListener('mousemove', moveSlider);
            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            
            handle.addEventListener('touchstart', () => {
                isDragging = true;
            });

            window.addEventListener('touchmove', (e) => {
                moveSlider(e.touches[0]);
            });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        });

        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    
                    if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                        document.getElementById('mobile-menu').classList.add('hidden');
                    }
                }
            });
        });