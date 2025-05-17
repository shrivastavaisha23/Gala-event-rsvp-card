document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('rsvpForm');
    const attendingYesBtn = document.getElementById('attendingYes');
    const attendingNoBtn = document.getElementById('attendingNo');
    const guestSection = document.getElementById('guestSection');
    const dietarySection = document.getElementById('dietarySection');
    const successMessage = document.getElementById('successMessage');
    const responseMessage = document.getElementById('responseMessage');
    
    // Animate decorative circles
    document.querySelectorAll('.decorative-circle').forEach((circle, index) => {
        circle.style.animation = `fadeIn 1s ease forwards ${index * 0.2}s`;
    });
    
    let attending = null;
    
    // Handle attendance selection - Yes
    attendingYesBtn.addEventListener('click', function() {
        attending = true;
        attendingYesBtn.style.boxShadow = '0 0 0 2px rgba(255, 106, 136, 0.5)';
        attendingNoBtn.style.boxShadow = 'none';
        
        guestSection.classList.remove('hidden');
        dietarySection.classList.remove('hidden');
        
        // Trigger animation
        guestSection.classList.add('animate-fade-in');
        dietarySection.classList.add('animate-fade-in');
        
        // Force a reflow to restart animation
        void guestSection.offsetWidth;
        void dietarySection.offsetWidth;
    });
    
    // Handle attendance selection - No
    attendingNoBtn.addEventListener('click', function() {
        attending = false;
        attendingNoBtn.style.boxShadow = '0 0 0 2px rgba(142, 197, 252, 0.5)';
        attendingYesBtn.style.boxShadow = 'none';
        
        guestSection.classList.add('hidden');
        dietarySection.classList.add('hidden');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (!name || !email || attending === null) {
            alert('Please fill in all required fields and select your attendance.');
            return;
        }
        
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Add animation class after a small delay
        setTimeout(() => {
            successMessage.classList.add('show');
            
            // Create confetti effect if attending
            if (attending) {
                createConfetti();
            }
        }, 100);
        
        // Customize success message based on attendance
        if (attending) {
            const guests = document.getElementById('guests').value;
            responseMessage.textContent = `We're looking forward to seeing you${guests > 1 ? ' and your guests' : ''}!`;
        } else {
            responseMessage.textContent = "We're sorry you can't make it. Thank you for letting us know!";
        }
    });
    
    // Confetti animation function
    function createConfetti() {
        const colors = ['#FF9A8B', '#FF6A88', '#FF99AC', '#FFC796', '#FFDDE1'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, and shape
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 3 + 2;
            
            confetti.style.left = `${left}%`;
            confetti.style.top = '-20px';
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
            }
            
            confetti.style.animation = `fall ${duration}s linear forwards ${Math.random() * 2}s`;
            document.querySelector('.card').appendChild(confetti);
            
            // Add keyframe animation dynamically
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(${Math.random() * 400 + 200}px) rotate(${Math.random() * 360}deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, (duration + 2) * 1000);
        }
    }
