// ========================
// NAVIGATION FUNCTIONALITY
// ========================

// Directions accordion
document.querySelectorAll('.directions-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const list = btn.nextElementSibling;
        btn.setAttribute('aria-expanded', !isOpen);
        list.classList.toggle('open', !isOpen);
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========================
// SCROLL ANIMATIONS
// ========================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// Observe pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// ========================
// SMOOTH SCROLL
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// FORM HANDLING
// ========================

const contactForm = document.getElementById('contactForm');

// Вставьте URL вашего Apps Script Web App после развёртывания
const APPS_SCRIPT_URL = 'ВСТАВИТЬ_URL_APPS_SCRIPT_СЮДА';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        data.date = new Date().toLocaleString('ru-RU');

        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script требует no-cors из браузера
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.error('Ошибка отправки заявки:', err);
        }

        showNotification('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.', 'success');
        contactForm.reset();
    });
}

// ========================
// NOTIFICATION SYSTEM
// ========================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.5s ease;
        max-width: 400px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .notification-message {
        flex: 1;
        font-size: 1rem;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// ========================
// PARALLAX EFFECT
// ========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================
// LOGO HOVER ANIMATION
// ========================

const logoItems = document.querySelectorAll('.logo-item');
logoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================
// BUTTON RIPPLE EFFECT
// ========================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================
// STATS COUNTER ANIMATION
// ========================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                num.textContent = '0';
                animateCounter(num, value);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================
// FORM VALIDATION
// ========================

const formInputs = document.querySelectorAll('.cta-form input, .cta-form select, .cta-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });

    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
});

// Phone number formatting
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `+${value}`;
            } else if (value.length <= 5) {
                value = `+${value.slice(0, 3)} (${value.slice(3)}`;
            } else if (value.length <= 8) {
                value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5)}`;
            } else if (value.length <= 10) {
                value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8)}`;
            } else {
                value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8, 10)}-${value.slice(10, 12)}`;
            }
        }
        e.target.value = value;
    });
}

// ========================
// LAZY LOADING IMAGES
// ========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================
// PAGE LOAD COMPLETE
// ========================

window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Log message
    console.log('%cHavana Club 💃', 'font-size: 24px; font-weight: bold; color: #E63946;');
    console.log('%cТанцуй страстно, живи ярко!', 'font-size: 14px; color: #F77F00;');
});

// ========================
// ACCESSIBILITY
// ========================

// Skip to main content
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const firstFocusable = document.querySelector('a, button, input, select, textarea');
        if (firstFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
}

// Add screen reader only class
const srStyle = document.createElement('style');
srStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srStyle);

// ========================
// CONSOLE EASTER EGG
// ========================

console.log(`
  _   _                                  _____ _       _
 | | | |                                / ____| |     | |
 | |_| | __ ___   ____ _ _ __   __ _  | |    | |_   _| |__
 |  _  |/ _\` \\ \\ / / _\` | '_ \\ / _\` | | |    | | | | | '_ \\
 | | | | (_| |\\ V / (_| | | | | (_| | | |____| | |_| | |_) |
 |_| |_|\\__,_| \\_/ \\__,_|_| |_|\\__,_|  \\_____|_|\\__,_|_.__/

🎭 Студия латинских танцев в Гомеле
🔥 Бачата • Сальса • Зук • Кизомба • Восточные танцы

💻 Website crafted with passion
📱 Нужна разработка? Напиши нам!
`);
// Lightbox for partner logos
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

document.getElementById('lightbox-img')?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Drag to scroll gallery
function initGalleryScroll(el) {
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', () => { isDown = false; });
    el.addEventListener('mouseup', () => { isDown = false; });
    el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        el.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
    el.addEventListener('wheel', (e) => {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 2;
    }, { passive: false });
}

document.querySelectorAll('.gallery-grid').forEach(initGalleryScroll);

function switchTab(event, tabId) {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.gallery-pane').forEach(p => p.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function scrollGallery(direction) {
    const active = document.querySelector('.gallery-pane.active');
    if (active) active.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

// Hide broken gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('error', () => {
        img.closest('.gallery-item').style.display = 'none';
    });
});

// ========================
// SCHEDULE CAROUSEL
// ========================

(function () {
    const track = document.querySelector('.schedule-grid');
    const wrap = document.querySelector('.schedule-track-wrap');
    const prevBtn = document.querySelector('.schedule-prev');
    const nextBtn = document.querySelector('.schedule-next');
    if (!track || !wrap || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.children);
    let current = 0;

    function cardWidth() {
        return cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 24);
    }

    function visibleCount() {
        return Math.max(1, Math.round(wrap.offsetWidth / cardWidth()));
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
    }

    function update() {
        const offset = current * cardWidth();
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex();
    }

    prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });
    nextBtn.addEventListener('click', () => { if (current < maxIndex()) { current++; update(); } });

    // Drag support (mouse + touch)
    let startX = 0, dragActive = false, baseOffset = 0;

    function getOffset() {
        return current * cardWidth();
    }

    wrap.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        e.preventDefault();
        dragActive = true;
        startX = e.clientX;
        baseOffset = getOffset();
        track.style.transition = 'none';
        wrap.classList.add('dragging');
    });

    document.addEventListener('mousemove', e => {
        if (!dragActive) return;
        const dx = e.clientX - startX;
        track.style.transform = `translateX(${-(baseOffset - dx)}px)`;
    });

    document.addEventListener('mouseup', e => {
        if (!dragActive) return;
        dragActive = false;
        wrap.classList.remove('dragging');
        track.style.transition = '';
        const dx = e.clientX - startX;
        if (dx < -30 && current < maxIndex()) current++;
        else if (dx > 30 && current > 0) current--;
        update();
    });

    // Touch support
    wrap.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        baseOffset = getOffset();
        track.style.transition = 'none';
    }, { passive: true });

    wrap.addEventListener('touchmove', e => {
        const dx = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${-(baseOffset - dx)}px)`;
    }, { passive: true });

    wrap.addEventListener('touchend', e => {
        track.style.transition = '';
        const dx = e.changedTouches[0].clientX - startX;
        if (dx < -30 && current < maxIndex()) current++;
        else if (dx > 30 && current > 0) current--;
        update();
    });

    wrap.addEventListener('dragstart', e => e.preventDefault());

    // Wheel scroll
    wrap.addEventListener('wheel', e => {
        e.preventDefault();
        if (e.deltaX > 30 || e.deltaY > 30) {
            if (current < maxIndex()) { current++; update(); }
        } else if (e.deltaX < -30 || e.deltaY < -30) {
            if (current > 0) { current--; update(); }
        }
    }, { passive: false });

    window.addEventListener('resize', () => {
        current = Math.min(current, maxIndex());
        update();
    });

    update();
})();
