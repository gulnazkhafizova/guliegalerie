// Данные о картинах
const artworks = {
    1: {
        title: "Birches",
        image: "images/Birches.jpg",
        description: "Image of birch trees on a bright monochromatic background as a way to express love for the beauty of nature.",
        details: "Canvas, acrylic, 2025. Size 60x90cm",
        price: 355
    },
    2: {
        title: "Fresh air",
        image: "images/fresh_air.jpg",
        description: "Image of misty flower field early morning.",
        details: "Canvas, oil, 2024. Size 50x70cm",
        price: 250
    },
    3: {
        title: "Bouquet",
        image: "images/honey_fields_gift.jpg",
        description: "A bright bouquet of wildflowers.",
        details: "Cardboard, oil, 2023. Size 25x30cm",
        price: 130
    },
    4: {
        title: "Horses",
        image: "images/horses.jpeg",
        description: "Two horses, representing the masculine and feminine, united by a common sense of need for each other.",
        details: "Canvas, oil, 2024. Size 80x80cm",
        price: 550
    },
    5: {
        title: "Roses",
        image: "images/roses.jpeg",
        description: "Elegant roses captured in delicate brushstrokes.",
        details: "Canvas, oil, 2024. Size 50x70cm",
        price: 250
    },
    6: {
        title: "Tangerines",
        image: "images/Tangerines.jpg",
        description: "Still life with bright, juicy tangerines.",
        details: "Cardboard, oil, 2023. Size 25x30cm",
        price: 150
    },
    10: {
        title: "Lilies",
        image: "images/Lilies.jpg",
        description: "Delicate fragrant lilies.",
        details: "Canvas, acrylic, 2025. Size 40x50cm",
        price: 200
    },
    11: {
        title: "Sri Lanka",
        image: "images/SriLanka.jpg",
        description: "A tropical landscape inspired by an unforgettable trip to Sri Lanka.",
        details: "Canvas, acrylic, 2025. Size 40x50cm",
        price: 130
    },
    12: {
        title: "Marble Canyon, Karelia",
        image: "images/MarbleCanyonKarelia.jpg",
        description: "A view of the Marble Canyon in Karelia, capturing its unique autumn beauty.",
        details: "Canvas, acrylic, 2025. Size 40x60cm",
        price: 200
    },
    13: {
        title: "01",
        image: "images/01.jpg",
        description: "Part of the 'Not what it seems' collection. The observer can independently interpret the plot.",
        details: "Canvas, acrylic, 2025. Size 30x30cm",
        price: 300
    },
    14: {
        title: "02",
        image: "images/02.jpg",
        description: "Part of the 'Not what it seems' collection. The observer can independently interpret the plot.",
        details: "Canvas, acrylic, 2026. Size 30x30cm",
        price: 300
    }
};

// Shopping cart
let cart = [];
let currentArtId = null;

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active state in navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the clicked link
    const activeLink = document.querySelector(`.sidebar-nav a[onclick*="'${sectionId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 3DArt Object Navigation
function show3DArtObject(objectId) {
    showSection(`3dart-object${objectId}`);
}

// Contact Modal
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// About Modal
function openAboutModal() {
    const modal = document.getElementById('aboutModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
    const modal = document.getElementById('aboutModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 3D Image Modal
function open3DImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('image3DModal');
    const modalImg = document.getElementById('image3DModalImg');

    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    document.body.style.overflow = 'hidden';
}

function close3DImageModal() {
    const modal = document.getElementById('image3DModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Donation Amount
function setDonation(amount) {
    document.getElementById('donationAmount').value = amount;
    document.getElementById('displayAmount').textContent = amount;
}

// Search functionality
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    searchBar.classList.toggle('active');

    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        // Clear any search highlights
        clearSearchHighlights();
    }
}

function performSearch(event) {
    const query = event.target.value.toLowerCase().trim();

    // Search on Enter key or after typing (with debounce)
    if (event.key === 'Enter' && query) {
        searchArtworks(query);
    } else if (query.length >= 2) {
        // Debounce search while typing
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            searchArtworks(query);
        }, 500);
    } else if (query.length === 0) {
        // Clear highlights when search is cleared
        clearSearchHighlights();
    }
}

function searchArtworks(query) {
    // Search through artworks
    let foundArtworks = [];

    for (let id in artworks) {
        const artwork = artworks[id];
        // Search in title, description, and details
        const searchableText = [
            artwork.title,
            artwork.description,
            artwork.details
        ].join(' ').toLowerCase();

        if (searchableText.includes(query)) {
            foundArtworks.push({id: id, ...artwork});
        }
    }

    if (foundArtworks.length > 0) {
        // Show Store section with search results
        showSection('store');

        // Highlight found artworks
        setTimeout(() => {
            highlightSearchResults(foundArtworks);

            // Scroll to first result
            const firstResult = document.querySelector('.store-item.search-highlight');
            if (firstResult) {
                firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);

        // Close search bar
        toggleSearch();
    } else {
        // Don't close search bar on no results, let user modify query
        alert(`No artworks found for "${query}"`);
    }
}

function highlightSearchResults(foundArtworks) {
    // Remove previous highlights
    clearSearchHighlights();

    // Add highlight to found items
    foundArtworks.forEach(artwork => {
        const storeItems = document.querySelectorAll('.store-item');
        storeItems.forEach(item => {
            const h3 = item.querySelector('h3');
            if (h3) {
                const h3Title = h3.textContent.toLowerCase().trim();
                const artworkTitle = artwork.title.toLowerCase().trim();

                // Match by exact title OR if one contains the other (for cases like "Marble Canyon, Karelia" vs "Karelia")
                if (h3Title === artworkTitle ||
                    h3Title.includes(artworkTitle) ||
                    artworkTitle.includes(h3Title)) {
                    item.classList.add('search-highlight');
                }
            }
        });
    });
}

function clearSearchHighlights() {
    document.querySelectorAll('.search-highlight').forEach(item => {
        item.classList.remove('search-highlight');
    });
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.art-piece');
const totalSlides = slides.length;

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const slideWidth = slides[0].offsetWidth + 20; // включая gap

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Auto-scroll functionality with hover pause
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        moveCarousel(1);
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Modal functionality
function openModal(artId) {
    currentArtId = artId;
    const modal = document.getElementById('artModal');
    const artwork = artworks[artId];

    document.getElementById('modalTitle').textContent = artwork.title;
    document.getElementById('modalImage').src = artwork.image;
    document.getElementById('modalImage').alt = artwork.title;
    document.getElementById('modalDescription').textContent = artwork.description;
    document.getElementById('modalDetails').textContent = artwork.details;
    document.getElementById('modalPrice').textContent = `Price: ${artwork.price}$`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('artModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cart functionality
function addToCart() {
    const artwork = artworks[currentArtId];

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === currentArtId);
    if (existingItem) {
        alert('This artwork is already in your cart!');
        return;
    }

    cart.push({
        id: currentArtId,
        title: artwork.title,
        image: artwork.image,
        price: artwork.price
    });

    updateCartCount();
    closeModal();
    alert('Artwork added to cart!');
}

function removeFromCart(artId) {
    cart = cart.filter(item => item.id !== artId);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        cartSummary.style.display = 'block';

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}$</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        document.getElementById('cartTotal').textContent = `${calculateTotal()}$`;
    }
}

function openCart() {
    renderCart();
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Custom validation messages in English
function setCustomValidationMessages() {
    // Get all email inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your email address');
            } else if (this.validity.typeMismatch) {
                this.setCustomValidity('Please enter a valid email address (e.g., name@example.com)');
            }
        });
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });

    // Get phone input
    const phoneInput = document.getElementById('checkoutPhone');
    if (phoneInput) {
        phoneInput.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your phone number');
            } else if (this.validity.patternMismatch) {
                this.setCustomValidity('Please enter only numbers (7-15 digits)');
            }
        });
        phoneInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }

    // Get all required text inputs (excluding email and phone)
    const requiredInputs = document.querySelectorAll('input[required]:not([type="email"]):not([type="tel"])');
    requiredInputs.forEach(input => {
        input.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please fill out this field');
            }
        });
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });

    // Get all required textareas
    const requiredTextareas = document.querySelectorAll('textarea[required]');
    requiredTextareas.forEach(textarea => {
        textarea.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please fill out this field');
            }
        });
        textarea.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });
}

// Start auto-scroll when page loads
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');

    // Set custom validation messages
    setCustomValidationMessages();

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    // Start auto-scroll
    startAutoScroll();

    // Close modal on outside click
    const modal = document.getElementById('artModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    const cartModal = document.getElementById('cartModal');
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    const contactModal = document.getElementById('contactModal');
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    const aboutModal = document.getElementById('aboutModal');
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            closeAboutModal();
        }
    });

    const image3DModal = document.getElementById('image3DModal');
    image3DModal.addEventListener('click', (e) => {
        if (e.target === image3DModal) {
            close3DImageModal();
        }
    });

    // Hover Wall Image Modal functionality
    const hoverWallModal = document.getElementById('hoverWallModal');
    const hoverWallImage = document.getElementById('hoverWallImage');

    document.querySelectorAll('.art-piece[data-wall-image]').forEach(artPiece => {
        artPiece.addEventListener('mouseenter', () => {
            const wallImageSrc = artPiece.getAttribute('data-wall-image');
            if (wallImageSrc) {
                hoverWallImage.src = wallImageSrc;
                hoverWallModal.style.display = 'block';
            }
        });

        artPiece.addEventListener('mouseleave', () => {
            hoverWallModal.style.display = 'none';
            hoverWallImage.src = '';
        });
    });

    // Close search bar when clicking outside of it
    document.addEventListener('click', (e) => {
        const searchBar = document.getElementById('searchBar');
        const searchIcon = document.querySelector('.social-icon[onclick="toggleSearch()"]');

        // Check if search bar is active and click was outside both search bar and search icon
        if (searchBar.classList.contains('active') &&
            !searchBar.contains(e.target) &&
            !searchIcon.contains(e.target)) {
            toggleSearch();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeCart();
            closeContactModal();
            closeAboutModal();
            close3DImageModal();

            // Also close search bar on Escape
            const searchBar = document.getElementById('searchBar');
            if (searchBar.classList.contains('active')) {
                toggleSearch();
            }
        }
    });

    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('checkoutName').value;
        const email = document.getElementById('checkoutEmail').value;
        const countryCode = document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('checkoutPhone').value;
        const phone = `${countryCode} ${phoneNumber}`;
        const address = document.getElementById('checkoutAddress').value;

        const orderDetails = cart.map(item => `${item.title} - ${item.price}$`).join('\n');
        const total = calculateTotal();

        // Показываем индикатор загрузки
        const submitBtn = checkoutForm.querySelector('.checkout-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Placing order...';
        submitBtn.disabled = true;

        try {
            // Отправляем данные в Google Sheets
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'order',
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    orderDetails: orderDetails,
                    total: total
                })
            });

            alert(`Thank you, ${name}!\n\nYour order has been placed:\n\n${orderDetails}\n\nTotal: ${total}$\n\nWe will contact you at ${email} or ${phone} for delivery to:\n${address}`);

            // Clear cart
            cart = [];
            updateCartCount();
            checkoutForm.reset();
            closeCart();

        } catch (error) {
            console.error('Error placing order:', error);
            alert(`An error occurred while placing your order. Please try again or contact us at: ${CONTACT_EMAIL}`);
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('contactFirstName').value;
        const lastName = document.getElementById('contactLastName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Показываем индикатор загрузки
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Отправляем данные в Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Важно для Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'contact',
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    message: message
                })
            });

            // При использовании mode: 'no-cors' мы не можем прочитать ответ,
            // но если не было ошибки при отправке, считаем что данные отправлены
            alert(`Thank you, ${firstName} ${lastName}!\n\nYour message has been sent. I will contact you at ${email} shortly.`);

            contactForm.reset();
            closeContactModal();

        } catch (error) {
            console.error('Error sending message:', error);
            alert(`An error occurred while sending your message. Please try again or contact me directly at: ${CONTACT_EMAIL}`);
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Commission form submission
    const commissionForm = document.getElementById('commissionForm');
    commissionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = e.target.querySelector('input[type="email"]').value;

        try {
            // Отправляем данные в Google Sheets
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'commission',
                    email: email
                })
            });

            alert(`Thank you for your interest!\n\nI will contact you at ${email} to discuss your commission ideas.`);

            commissionForm.reset();

        } catch (error) {
            console.error('Error sending request:', error);
            alert(`An error occurred. Please contact me directly at: ${CONTACT_EMAIL}`);
        }
    });

    // Donation form submission
    const donationForm = document.getElementById('donationForm');
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const amount = document.getElementById('donationAmount').value;
        const name = document.getElementById('donorName').value || 'Anonymous';
        const message = document.getElementById('donationMessage').value;

        // Показываем индикатор загрузки
        const submitBtn = donationForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Recording...';
        submitBtn.disabled = true;

        try {
            // Отправляем данные в Google Sheets
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'donation',
                    name: name,
                    amount: amount,
                    message: message
                })
            });

            alert(`Thank you so much, ${name}!\n\nYour support of $${amount} has been recorded and means the world to me!\n\n${message ? `Your message: "${message}"` : ''}\n\nNote: This records your donation intent. For actual payment, please contact me at ${CONTACT_EMAIL}`);

            donationForm.reset();
            document.getElementById('displayAmount').textContent = '3';

        } catch (error) {
            console.error('Error recording donation:', error);
            alert(`An error occurred while recording your donation. Please contact me directly at: ${CONTACT_EMAIL}`);
        } finally {
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Update donation amount display
    const donationAmountInput = document.getElementById('donationAmount');
    donationAmountInput.addEventListener('input', (e) => {
        document.getElementById('displayAmount').textContent = e.target.value;
    });

    // Set initial active state for Home link
    const homeLink = document.querySelector('.sidebar-nav a[onclick*="\'home\'"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Mobile menu toggle function
function toggleMobileMenu(event) {
    if (event) {
        event.stopPropagation();
    }

    const sidebar = document.querySelector('.sidebar-nav');
    const isOpen = sidebar.classList.contains('mobile-open');

    sidebar.classList.toggle('mobile-open');

    // Close menu when clicking outside
    if (!isOpen) {
        // Добавляем обработчик с небольшой задержкой
        setTimeout(() => {
            document.addEventListener('click', closeMobileMenuOutside);
        }, 100);
    } else {
        document.removeEventListener('click', closeMobileMenuOutside);
    }
}

function closeMobileMenuOutside(event) {
    const sidebar = document.querySelector('.sidebar-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove('mobile-open');
        document.removeEventListener('click', closeMobileMenuOutside);
    }
}

// Toggle desktop navigation menu
function toggleDesktopNav(event) {
    if (event) {
        event.stopPropagation();
    }

    const sidebar = document.querySelector('.sidebar-nav');
    const isOpen = sidebar.classList.contains('desktop-open');

    sidebar.classList.toggle('desktop-open');

    // Close menu when clicking outside
    if (!isOpen) {
        setTimeout(() => {
            document.addEventListener('click', closeDesktopNavOutside);
        }, 100);
    } else {
        document.removeEventListener('click', closeDesktopNavOutside);
    }
}

function closeDesktopNavOutside(event) {
    const sidebar = document.querySelector('.sidebar-nav');
    const bookmark = document.querySelector('.nav-bookmark');

    if (!sidebar.contains(event.target) && !bookmark.contains(event.target)) {
        sidebar.classList.remove('desktop-open');
        document.removeEventListener('click', closeDesktopNavOutside);
    }
}

// Close mobile and desktop menu when a menu item is clicked
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar-nav');
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                document.removeEventListener('click', closeMobileMenuOutside);
            }
            if (sidebar.classList.contains('desktop-open')) {
                sidebar.classList.remove('desktop-open');
                document.removeEventListener('click', closeDesktopNavOutside);
            }
        });
    });
});