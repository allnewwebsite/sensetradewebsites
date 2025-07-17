// Configuration - No longer needed since we're using Razorpay payment button
const BOOK_PRICE = 4800; // Price in paise (₹48)

// Payment tracking
let paymentSuccessful = false;
let paymentId = null;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Check if images exist, if not show placeholder
    checkImages();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Add loading states
    addLoadingStates();
    
    // Mobile-specific optimizations
    initMobileOptimizations();
});

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus for mobile
    if (window.innerWidth <= 768) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    // Add touch event listeners for better mobile interaction
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        thumb.addEventListener('touchend', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Improve modal behavior on mobile
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
    });
    
    // Better scroll behavior for mobile
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                // Add scroll-based animations here if needed
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// Image management
function checkImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMjAwSDE3NUgyMjVIMjI1VjIwMFYyNTBWMjUwSDIyNUgxNzVIMTc1VjI1MFYyMDBaIiBmaWxsPSIjRDFEM0Q2Ii8+CjxwYXRoIGQ9Ik0xNzUgMjUwSDE3NUgyMjVIMjI1VjI1MFYzMDBWMzAwSDIyNUgxNzVIMTc1VjMwMFYyNTBaIiBmaWxsPSIjRDFEM0Q2Ii8+CjxwYXRoIGQ9Ik0xNDUgMjAwSDE0NUgxNzVIMTc1VjIwMFYyNTBWMjUwSDE3NUgxNDVIMTQ1VjI1MFYyMDBaIiBmaWxsPSIjRDFEM0Q2Ii8+CjxwYXRoIGQ9Ik0yMjUgMjAwSDIyNUgyNTVIMjU1VjIwMFYyNTBWMjUwSDI1NUgyMjVIMjI1VjI1MFYyMDBaIiBmaWxsPSIjRDFEM0Q2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTcwQzIwNiAxNzAgMjEwIDE3NCAyMTAgMTgwQzIxMCAxODYgMjA2IDE5MCAyMDAgMTkwQzE5NCAxOTAgMTkwIDE4NiAxOTAgMTgwQzE5MCAxNzQgMTk0IDE3MCAyMDAgMTcwWiIgZmlsbD0iI0QxRDNENiIvPgo8dGV4dCB4PSIyMDAiIHk9IjM1MCIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc2Nzg3Ij5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD4KPC9zdmc+';
            this.alt = 'Image placeholder - Please add your image';
        };
    });
}

// Change main book image
function changeMainImage(thumbnail) {
    const mainImg = document.getElementById('main-book-img');
    mainImg.src = thumbnail.src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Smooth scrolling functions
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToBook() {
    const bookSection = document.getElementById('book-section');
    if (bookSection) {
        const offsetTop = bookSection.offsetTop - (window.innerWidth <= 768 ? 80 : 100);
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToPreview() {
    const previewSection = document.getElementById('preview-section');
    if (previewSection) {
        const offsetTop = previewSection.offsetTop - (window.innerWidth <= 768 ? 80 : 100);
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Loading states
function addLoadingStates() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-buy') || this.id === 'razorpay-button') {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;
                
                // Reset button after 3 seconds if no success
                setTimeout(() => {
                    if (!paymentSuccessful) {
                        resetButton(this);
                    }
                }, 3000);
            }
        });
    });
}

function resetButton(button) {
    if (button.classList.contains('btn-buy')) {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy Now - Instant Download';
    } else if (button.id === 'razorpay-button') {
        button.innerHTML = '<i class="fas fa-credit-card"></i> Pay with Razorpay';
    }
    button.disabled = false;
}

// Razorpay Payment Success Handler
// This function will be called when Razorpay payment is successful
function handlePaymentSuccess(payment_id) {
    console.log('Payment successful:', payment_id);
    
    // Store payment success in localStorage
    localStorage.setItem('paymentSuccessful', 'true');
    localStorage.setItem('paymentId', payment_id);
    
    // Update global variables
    paymentSuccessful = true;
    paymentId = payment_id;
    
    // Show success modal
    showPaymentSuccess();
}

// Listen for Razorpay payment success (for payment button integration)
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'payment_success') {
        handlePaymentSuccess(event.data.payment_id);
    }
});

// Alternative: Global callback for Razorpay
window.razorpayPaymentSuccessCallback = function(payment_id) {
    handlePaymentSuccess(payment_id);
};

function showPaymentSuccess() {
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    
    // Store payment status in localStorage
    localStorage.setItem('paymentSuccessful', 'true');
    localStorage.setItem('paymentId', paymentId || 'demo_payment_' + Date.now());
    localStorage.setItem('purchaseTime', new Date().toISOString());
}

function downloadBook() {
    // Verify payment before allowing download
    if (!verifyUserPayment()) {
        alert('Payment verification failed. Please try again.');
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = 'assets/PDF/Candlestick-Chart-Patterns-Guide.pdf'; // Using your actual PDF file
    link.download = 'Candlestick-Chart-Patterns-Guide.pdf';
    link.click();
    
    // Close success modal
    document.getElementById('successModal').style.display = 'none';
    
    // Show download confirmation
    setTimeout(() => {
        alert('Download started! Thank you for your purchase.');
    }, 500);
}

function verifyUserPayment() {
    // Check if payment was successful
    const isPaymentSuccessful = localStorage.getItem('paymentSuccessful') === 'true';
    const storedPaymentId = localStorage.getItem('paymentId');
    const purchaseTime = localStorage.getItem('purchaseTime');
    
    if (!isPaymentSuccessful || !storedPaymentId || !purchaseTime) {
        return false;
    }
    
    // Check if purchase is recent (within 24 hours for demo)
    const purchaseDate = new Date(purchaseTime);
    const now = new Date();
    const timeDiff = now - purchaseDate;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        // In a real app, you might want to verify with server
        console.log('Purchase is older than 24 hours');
    }
    
    return true;
}

// Terms and Privacy functions
function showTerms() {
    alert(`Terms of Service:
    
1. This is a digital product - no physical item will be shipped.
2. All sales are final - no refunds under any circumstances.
3. The PDF is for personal use only.
4. Redistribution or sharing is strictly prohibited.
5. By purchasing, you agree to these terms.`);
}

function showPrivacy() {
    alert(`Privacy Policy:
    
1. We collect minimal personal information required for payment processing.
2. Your payment information is handled securely by Razorpay.
3. We do not store your payment details.
4. We do not share your information with third parties.
5. Your email may be used for order confirmation only.`);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const successModal = document.getElementById('successModal');
    
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('successModal').style.display = 'none';
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.testimonial, .preview-image, .book-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility functions
function formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount / 100);
}

function generateOrderId() {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        verifyUserPayment,
        formatPrice,
        generateOrderId
    };
}
