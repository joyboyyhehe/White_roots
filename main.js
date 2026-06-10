document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer Logic
    // Set launch date to July 25, 2026, 00:00:00 (approx 45 days from current date)
    const launchDate = new Date('July 25, 2026 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = launchDate - now;

        // If the launch date has passed, show all zeros
        if (difference < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        // Calculations for days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format and display (add leading zeros)
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);


    // 2. Email Validation & Subscription Simulation
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const msgContainer = document.getElementById('form-message');
    const inputWrapper = document.querySelector('.input-wrapper');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showMessage = (text, type) => {
        msgContainer.innerHTML = '';
        msgContainer.className = 'msg-container show';
        
        let iconSvg = '';
        if (type === 'success') {
            msgContainer.classList.add('msg-success');
            iconSvg = `
                <svg class="msg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
        } else {
            msgContainer.classList.add('msg-error');
            iconSvg = `
                <svg class="msg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            `;
        }

        msgContainer.innerHTML = `${iconSvg} <span>${text}</span>`;
    };

    const clearMessage = () => {
        msgContainer.className = 'msg-container';
        msgContainer.innerHTML = '';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        clearMessage();
        inputWrapper.style.borderColor = '';

        // Check if empty
        if (!email) {
            inputWrapper.style.borderColor = 'var(--accent-error)';
            showMessage('Please enter your email address.', 'error');
            return;
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            inputWrapper.style.borderColor = 'var(--accent-error)';
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Add loading state to form
        form.classList.add('loading');

        // Simulate API request to subscribe
        setTimeout(() => {
            form.classList.remove('loading');
            
            // Save to localStorage for demo persistence
            let subscribers = JSON.parse(localStorage.getItem('roots_subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('roots_subscribers', JSON.stringify(subscribers));
            }

            // Show success styling and message
            showMessage('Awesome! You have been added to our early access list.', 'success');
            emailInput.value = '';
            
            // Quick focus reset
            emailInput.blur();
        }, 1500);
    });

    // Reset error highlight on input focus or typing
    emailInput.addEventListener('input', () => {
        inputWrapper.style.borderColor = '';
        if (msgContainer.classList.contains('msg-error')) {
            clearMessage();
        }
    });


    // 3. Mouse Move Interactive Parallax effect on blur blobs
    const blobs = [
        document.querySelector('.bg-blur-1'),
        document.querySelector('.bg-blur-2'),
        document.querySelector('.bg-blur-3')
    ];

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate offset percentage from center
        const moveX = (mouseX - windowWidth / 2) / (windowWidth / 2);
        const moveY = (mouseY - windowHeight / 2) / (windowHeight / 2);

        // Move blobs with different intensities (parallax)
        if (blobs[0]) blobs[0].style.transform = `translate(${moveX * 40}px, ${moveY * 40}px)`;
        if (blobs[1]) blobs[1].style.transform = `translate(${moveX * -50}px, ${moveY * -50}px)`;
        if (blobs[2]) blobs[2].style.transform = `translate(${moveX * 20}px, ${moveY * 20}px) translate(-50%, -50%)`;
    });
});
