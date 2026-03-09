'use strict';

// --- Cart count ---
let cartCount = 3;
function updateCartBadge() {
    document.getElementById('cartCount').textContent = cartCount;
}

// --- Add to Cart ---
function addToCart(btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.classList.add('success');
    cartCount++;
    updateCartBadge();
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove('success');
    }, 1400);
}

// --- Qty increase/decrease ---
function incQty(btn) {
    const input = btn.closest('.qty-ctrl').querySelector('input');
    input.value = parseInt(input.value || 1) + 1;
}
function decQty(btn) {
    const input = btn.closest('.qty-ctrl').querySelector('input');
    const val = parseInt(input.value || 1);
    if (val > 1) input.value = val - 1;
}

// --- Wishlist toggle ---
function toggleWish(btn) {
    btn.classList.toggle('wishlisted');
    const icon = btn.querySelector('i');
    icon.style.color = btn.classList.contains('wishlisted') ? '#e53935' : '';
}

// --- Tab switching ---
function switchTab(btn) {
    btn.closest('.tabs-wrap').querySelectorAll('.tab-pill').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
}

// --- Mobile menu ---
const hamBtn = document.getElementById('hamBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

hamBtn.addEventListener('click', () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMenu();
});
function closeMenu() {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// --- Nav active link ---
document.querySelectorAll('.nav-list li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-list li').forEach(li => li.classList.remove('active'));
        this.closest('li').classList.add('active');
    });
});

// --- Mobile nav links ---
document.querySelectorAll('.mobile-nav li a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- Scroll reveal ---
const revealItems = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            revObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.07 });
revealItems.forEach(el => revObs.observe(el));

// --- Stagger product cards ---
document.querySelectorAll('.prod-grid-6').forEach(grid => {
    grid.querySelectorAll('.prod-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 60}ms`;
    });
});

// --- Newsletter form ---
document.querySelectorAll('.newsletter-row button').forEach(btn => {
    btn.addEventListener('click', function () {
        const inp = this.previousElementSibling;
        if (inp && inp.value.includes('@')) {
            this.textContent = '✓ Done!';
            this.style.background = '#2e7d32';
            inp.value = '';
            setTimeout(() => {
                this.textContent = 'Subscribe';
                this.style.background = '';
            }, 2000);
        } else {
            inp.style.borderColor = '#e53935';
            setTimeout(() => inp.style.borderColor = '', 1500);
        }
    });
});

// --- Search ---
document.querySelector('.search-btn-form').addEventListener('click', function () {
    const inp = this.previousElementSibling;
    if (inp.value.trim()) {
        this.innerHTML = '<i class="fas fa-check"></i> Found!';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1200);
    }
});
