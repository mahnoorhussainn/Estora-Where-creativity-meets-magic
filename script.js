// Estora - Design App: Where Creativity Meets Magic

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const moodInput = document.getElementById('moodInput');
    const themeSelect = document.getElementById('themeSelect');
    const customInput = document.getElementById('customInput');
    const generateBtn = document.getElementById('generateBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorContainer = document.getElementById('errorContainer');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const colorSwatches = document.querySelectorAll('.color-swatch');

    // Initialize application
    initializeApp();

    function initializeApp() {
        // Initialize navigation
        initializeNavigation();
        
        // Initialize color palette functionality
        initializeColorPalettes();
        
        // Initialize gallery filtering
        initializeGallery();
        
        // Initialize design challenges
        initializeChallenges();
        
        // Initialize animations
        initializeAnimations();
        
        // Initialize button states
        updateGenerateButton();
    }

    // Navigation system
    function initializeNavigation() {
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile navigation toggle
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Color palette functionality
    function initializeColorPalettes() {
        // Listen for input changes
        if (moodInput) {
            moodInput.addEventListener('input', updateGenerateButton);
        }
        if (themeSelect) {
            themeSelect.addEventListener('change', updateGenerateButton);
        }
        if (customInput) {
            customInput.addEventListener('input', updateGenerateButton);
        }

        // Color swatch click functionality
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', function() {
                const colorCode = this.getAttribute('data-color');
                copyToClipboard(colorCode);
                showNotification(`🎨 Color ${colorCode} copied to clipboard!`, 'success');
            });
        });
    }

    // Gallery filtering
    function initializeGallery() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Design challenges
    function initializeChallenges() {
        const challengeStartBtn = document.querySelector('.challenge-start-btn');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');

        if (challengeStartBtn) {
            challengeStartBtn.addEventListener('click', function() {
                startDesignChallenge();
            });
        }
    }

    // Animation system
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .magical-card, .challenge-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });

        // Particle animations
        initializeParticleAnimations();
    }

    // Particle animation system
    function initializeParticleAnimations() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            const delay = particle.style.getPropertyValue('--delay') || '0s';
            particle.style.animationDelay = delay;
        });

        // Add hover effects to cards
        document.querySelectorAll('.magical-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.querySelectorAll('.card-particle').forEach(particle => {
                    particle.style.animation = 'float 2s ease-in-out infinite';
                });
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.querySelectorAll('.card-particle').forEach(particle => {
                    particle.style.animation = 'none';
                });
            });
        });
    }

    // Enable/disable generate button based on input
    function updateGenerateButton() {
        const hasMood = moodInput && moodInput.value.trim().length > 0;
        const hasTheme = themeSelect && themeSelect.value.length > 0;
        const hasCustom = customInput && customInput.value.trim().length > 0;
        
        const hasInput = hasMood || hasTheme || hasCustom;
        
        generateBtn.disabled = !hasInput;
        
        if (hasInput) {
            generateBtn.style.opacity = '1';
            generateBtn.style.cursor = 'pointer';
            generateBtn.classList.add('ready');
        } else {
            generateBtn.style.opacity = '0.6';
            generateBtn.style.cursor = 'not-allowed';
            generateBtn.classList.remove('ready');
        }
    }

    // Generate button click handler
    generateBtn.addEventListener('click', function() {
        const mood = moodInput ? moodInput.value.trim() : '';
        const theme = themeSelect ? themeSelect.value : '';
        const custom = customInput ? customInput.value.trim() : '';
        
        if (!mood && !theme && !custom) {
            showNotification('🎨 Please describe your mood, choose a theme, or describe your vision!', 'error');
            return;
        }

        // Show loading spinner
        loadingSpinner.classList.add('show');
        
        // Simulate AI processing (replace with actual API call)
        setTimeout(() => {
            loadingSpinner.classList.remove('show');
            
            // Generate color palette based on input
            const palette = generateColorPalette(mood, theme, custom);
            displayColorPalette(palette);
            
            // Show success message
            showNotification('✨ Your magical color palette has been created!', 'success');
            
            // Add some magical effects
            addMagicalEffects();
            
        }, 2000); // Simulate 2-second processing time
    });

    // Generate color palette based on input
    function generateColorPalette(mood, theme, custom) {
        const palettes = {
            // Mood-based palettes
            'peaceful': [
                { name: 'Serene Blue', code: '#87CEEB', hex: '#87CEEB' },
                { name: 'Soft Lavender', code: '#E6E6FA', hex: '#E6E6FA' },
                { name: 'Mint Green', code: '#98FB98', hex: '#98FB98' },
                { name: 'Peach Blush', code: '#FFB6C1', hex: '#FFB6C1' },
                { name: 'Warm Cream', code: '#F5F5DC', hex: '#F5F5DC' }
            ],
            'energetic': [
                { name: 'Vibrant Orange', code: '#FF6B35', hex: '#FF6B35' },
                { name: 'Electric Blue', code: '#00D4FF', hex: '#00D4FF' },
                { name: 'Bright Yellow', code: '#FFD700', hex: '#FFD700' },
                { name: 'Hot Pink', code: '#FF1493', hex: '#FF1493' },
                { name: 'Lime Green', code: '#32CD32', hex: '#32CD32' }
            ],
            // Theme-based palettes
            'nature': [
                { name: 'Forest Green', code: '#2D5016', hex: '#2D5016' },
                { name: 'Sage Green', code: '#4A7C59', hex: '#4A7C59' },
                { name: 'Moss Green', code: '#7FB069', hex: '#7FB069' },
                { name: 'Leaf Green', code: '#A7C957', hex: '#A7C957' },
                { name: 'Cream', code: '#F2E8CF', hex: '#F2E8CF' }
            ],
            'tech': [
                { name: 'Deep Black', code: '#0A0A0A', hex: '#0A0A0A' },
                { name: 'Dark Gray', code: '#1E1E1E', hex: '#1E1E1E' },
                { name: 'Neon Blue', code: '#00D4FF', hex: '#00D4FF' },
                { name: 'Electric Orange', code: '#FF6B35', hex: '#FF6B35' },
                { name: 'Pure White', code: '#FFFFFF', hex: '#FFFFFF' }
            ],
            'vintage': [
                { name: 'Saddle Brown', code: '#8B4513', hex: '#8B4513' },
                { name: 'Chocolate', code: '#D2691E', hex: '#D2691E' },
                { name: 'Sandy Brown', code: '#F4A460', hex: '#F4A460' },
                { name: 'Burlywood', code: '#DEB887', hex: '#DEB887' },
                { name: 'Beige', code: '#F5F5DC', hex: '#F5F5DC' }
            ]
        };

        // Determine which palette to use
        let selectedPalette;
        if (mood.toLowerCase().includes('peaceful') || mood.toLowerCase().includes('calm')) {
            selectedPalette = palettes.peaceful;
        } else if (mood.toLowerCase().includes('energetic') || mood.toLowerCase().includes('vibrant')) {
            selectedPalette = palettes.energetic;
        } else if (theme === 'nature') {
            selectedPalette = palettes.nature;
        } else if (theme === 'tech') {
            selectedPalette = palettes.tech;
        } else if (theme === 'vintage') {
            selectedPalette = palettes.vintage;
        } else {
            // Default palette
            selectedPalette = palettes.peaceful;
        }

        return selectedPalette;
    }

    // Display color palette
    function displayColorPalette(palette) {
        const paletteContainer = document.querySelector('.color-palette');
        if (!paletteContainer) return;

        paletteContainer.innerHTML = '';
        
        palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.setAttribute('data-color', color.hex);
            
            swatch.innerHTML = `
                <div class="color-preview" style="background-color: ${color.hex};"></div>
                <div class="color-info">
                    <span class="color-name">${color.name}</span>
                    <span class="color-code">${color.hex}</span>
                </div>
            `;
            
            swatch.addEventListener('click', function() {
                copyToClipboard(color.hex);
                showNotification(`🎨 ${color.name} (${color.hex}) copied!`, 'success');
            });
            
            paletteContainer.appendChild(swatch);
        });
    }

    // Copy to clipboard function
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Color copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Design challenge system
    function startDesignChallenge() {
        showNotification('🐉 The Design Dragon Challenge begins!', 'success');
        
        // Simulate challenge progression
        let progress = 0;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const interval = setInterval(() => {
            progress += 20;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${progress/20}/5`;
            
            if (progress >= 100) {
                clearInterval(interval);
                showNotification('👑 You have conquered the Design Dragon Challenge!', 'success');
            }
        }, 1500);
    }

    // Magical effects
    function addMagicalEffects() {
        // Add sparkle effects to the page
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 100);
        }
    }

    // Create sparkle effect
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'magical-sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = `notification ${type}`;
        notificationDiv.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-progress"></div>
        `;
        
        errorContainer.appendChild(notificationDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notificationDiv.parentElement) {
                notificationDiv.classList.add('fade-out');
                setTimeout(() => {
                    if (notificationDiv.parentElement) {
                        notificationDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add some interactive effects
    [moodInput, customInput].forEach(input => {
        if (input) {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.classList.remove('focused');
            });
        }
    });

    // Enhanced keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!generateBtn.disabled) {
                generateBtn.click();
            }
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Initialize button state
    updateGenerateButton();
});

// Enhanced notification styles
const enhancedNotificationStyles = `
.notification {
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    color: #ffffff;
    font-weight: 500;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.notification.success {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(139, 195, 74, 0.9));
}

.notification.error {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.9), rgba(229, 57, 53, 0.9));
}

.notification.info {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(30, 136, 229, 0.9));
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
}

.notification-message {
    flex: 1;
    margin-right: 1rem;
}

.notification-close {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.notification-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.notification-progress {
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    animation: progressShrink 5s linear;
}

.notification.fade-out {
    animation: slideOutRight 0.3s ease forwards;
}

.magical-sparkle {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    animation: sparkleFloat 3s ease-out forwards;
    font-size: 1.5rem;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes progressShrink {
    from { width: 100%; }
    to { width: 0%; }
}

@keyframes sparkleFloat {
    0% {
        transform: translateY(0) scale(0);
        opacity: 1;
    }
    50% {
        transform: translateY(-50px) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.magical-button.ready {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
}
`;

// Inject enhanced notification styles
if (!document.querySelector('#enhanced-notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'enhanced-notification-styles';
    styleSheet.textContent = enhancedNotificationStyles;
    document.head.appendChild(styleSheet);
} 