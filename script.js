// ========================
// GLOBAL VARIABLES
// ========================

let cart = [];
let isSearchOpen = false;
let isCartOpen = false;

// Sample product data
const products = [
    {
        id: 1,
        name: "Tote Bag Grande Cuadrada",
        description: "Perfecta para el día a día, con amplio espacio",
        price: { min: 179, max: 250 },
        category: "grande",
        colors: ["#000000", "#8B4513", "#FF6B6B"],
        badge: "Popular",
        image: "tote-grande-cuadrada.jpg"
    },
    {
        id: 2,
        name: "Tote Bag Jumbo",
        description: "La más grande de nuestra colección",
        price: { min: 115, max: 195 },
        category: "grande",
        colors: ["#000000", "#4ECDC4"],
        badge: "Oferta",
        image: "tote-jumbo.jpg"
    },
    {
        id: 3,
        name: "Tote Bag Grande Vertical",
        description: "Diseño vertical elegante y funcional",
        price: { min: 94, max: 135 },
        category: "grande",
        colors: ["#000000", "#45B7D1", "#96CEB4"],
        image: "tote-grande-vertical.jpg"
    },
    {
        id: 4,
        name: "Tote Bag Grande Horizontal",
        description: "Perfecta para laptops y documentos",
        price: { min: 94, max: 135 },
        category: "grande",
        colors: ["#000000", "#E17055"],
        image: "tote-grande-horizontal.jpg"
    },
    {
        id: 5,
        name: "Tote Bag Mediana",
        description: "Tamaño perfecto para uso diario",
        price: { min: 72, max: 101 },
        category: "mediana",
        colors: ["#000000", "#A29BFE", "#FD79A8"],
        image: "tote-mediana.jpg"
    },
    {
        id: 6,
        name: "Tote Bag Pequeña",
        description: "Compacta y práctica para ocasiones especiales",
        price: { min: 65, max: 95 },
        category: "pequena",
        colors: ["#000000", "#FDCB6E"],
        badge: "Nuevo",
        image: "tote-pequena.jpg"
    },
    {
        id: 7,
        name: "Ñejitos Tie-Dye Tote Bag",
        description: "Diseño único tie-dye, cada pieza es diferente",
        price: { special: "Precio Especial" },
        category: "especial",
        colors: ["gradient", "#000000"],
        badge: "Edición Limitada",
        image: "tote-tie-dye.jpg"
    }
];

// ========================
// INITIALIZATION
// ========================

document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeNavigation();
    initializeProductFilters();
    initializeContactForm();
    updateCartCount();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('popthetote_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    console.log('Pop The Tote website initialized successfully! 🛍️');
});

// ========================
// AOS (Animate On Scroll) INITIALIZATION
// ========================

function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ========================
// NAVIGATION FUNCTIONS
// ========================

function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================
// SEARCH FUNCTIONALITY
// ========================

function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    
    isSearchOpen = !isSearchOpen;
    
    if (isSearchOpen) {
        searchContainer.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    } else {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    }
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    // Filter products based on search query
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    // Scroll to products section
    scrollToSection('productos');
    
    // Update product display (you can implement this based on your needs)
    console.log('Search results:', filteredProducts);
    
    // Close search
    toggleSearch();
}

// Search on Enter key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isSearchOpen) {
        performSearch();
    } else if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
    }
});

// ========================
// PRODUCT FUNCTIONALITY
// ========================

function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="quick-view-content">
            <div class="product-image-large">
                <div class="product-placeholder" style="height: 300px;">
                    ${product.name}
                </div>
            </div>
            <div class="product-details">
                <h2>${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="price-section">
                    <span class="price-label">Precio:</span>
                    <span class="price-value">
                        ${product.price.special || `Q${product.price.min} - Q${product.price.max}`}
                    </span>
                </div>
                <div class="color-selection">
                    <h4>Colores disponibles:</h4>
                    <div class="color-options">
                        ${product.colors.map(color => `
                            <span class="color-option ${color === 'gradient' ? 'gradient-dot' : ''}" 
                                  style="${color !== 'gradient' ? `background-color: ${color}` : ''}"
                                  onclick="selectColor('${color}')"></span>
                        `).join('')}
                    </div>
                </div>
                <div class="quantity-section">
                    <label>Cantidad:</label>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(-1)">-</button>
                        <span id="quantity-display">1</span>
                        <button onclick="changeQuantity(1)">+</button>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="addToCartFromModal(${productId})">
                        <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                    </button>
                    <button class="btn btn-secondary" onclick="contactForProduct(${productId})">
                        <i class="fab fa-whatsapp"></i> Consultar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal();
}

function closeQuickView() {
    hideModal();
}

function showModal() {
    const modal = document.getElementById('quick-view-modal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'flex';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    const modal = document.getElementById('quick-view-modal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'none';
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function closeModals() {
    hideModal();
    if (isCartOpen) {
        toggleCart();
    }
}

// ========================
// CART FUNCTIONALITY
// ========================

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price.min || 0,
            quantity: quantity,
            image: product.image
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showAddToCartMessage(product.name);
}

function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('quantity-display').textContent);
    addToCart(productId, quantity);
    closeQuickView();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

function updateCartDisplay() {
    const cartBody = document.getElementById('cart-body');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
                <button class="btn btn-primary" onclick="scrollToSection('productos')">Ver Productos</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <div class="product-placeholder-small">${item.name}</div>
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">Q${item.price}</p>
                    <div class="cart-quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = `Q${total}`;
        cartFooter.style.display = 'block';
    }
    
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function checkout() {
    if (cart.length === 0) return;
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/50240011272?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function generateWhatsAppMessage() {
    let message = "¡Hola! Me interesa hacer un pedido:\n\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio: Q${item.price} c/u\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total: Q${total}\n\n`;
    message += "¿Podrían ayudarme con la información de entrega?";
    
    return message;
}

function saveCartToStorage() {
    localStorage.setItem('popthetote_cart', JSON.stringify(cart));
}

function showAddToCartMessage(productName) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} agregado al carrito</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================
// UTILITY FUNCTIONS
// ========================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function openWhatsApp() {
    const message = "¡Hola! Me interesa conocer más sobre sus productos Pop The Tote.";
    const whatsappUrl = `https://wa.me/50240011272?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function contactForProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `¡Hola! Me interesa el producto: ${product.name}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/50240011272?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function selectColor(color) {
    // Update color selection visual feedback
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function changeQuantity(change) {
    const quantityDisplay = document.getElementById('quantity-display');
    let currentQuantity = parseInt(quantityDisplay.textContent);
    let newQuantity = currentQuantity + change;
    
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10; // Maximum quantity limit
    
    quantityDisplay.textContent = newQuantity;
}

// ========================
// CONTACT FORM
// ========================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Generate WhatsApp message
            let message = "¡Hola! Me contacto desde su página web:\n\n";
            message += `Nombre: ${data.name}\n`;
            message += `Email: ${data.email}\n`;
            if (data.phone) message += `Teléfono: ${data.phone}\n`;
            message += `Tema: ${data.subject}\n\n`;
            message += `Mensaje: ${data.message}`;
            
            const whatsappUrl = `https://wa.me/50240011272?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            showSuccessMessage('Mensaje enviado. Te contactaremos pronto.');
        });
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ========================
// ORDER TRACKING
// ========================

function trackOrder() {
    const orderNumber = document.getElementById('order-number').value.trim();
    const trackingResult = document.getElementById('tracking-result');
    
    if (!orderNumber) {
        alert('Por favor ingresa un número de orden válido.');
        return;
    }
    
    // Simulate tracking (in real implementation, this would call an API)
    trackingResult.style.display = 'block';
    trackingResult.scrollIntoView({ behavior: 'smooth' });
    
    // In a real implementation, you would fetch actual tracking data
    console.log('Tracking order:', orderNumber);
}

// ========================
// KEYBOARD SHORTCUTS
// ========================

document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        if (isCartOpen) {
            toggleCart();
        } else if (isSearchOpen) {
            toggleSearch();
        } else {
            closeModals();
        }
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!isSearchOpen) {
            toggleSearch();
        }
    }
});

// ========================
// ANIMATIONS
// ========================

// Add CSS animations for notifications
const animationStyles = document.createElement('style');
animationStyles.textContent = `
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
    
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--light-gray);
        transition: var(--transition);
    }
    
    .cart-item:hover {
        background: var(--light-gray);
    }
    
    .cart-item-image {
        width: 60px;
        height: 60px;
    }
    
    .product-placeholder-small {
        width: 100%;
        height: 100%;
        background: var(--light-gray);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--medium-gray);
        text-align: center;
        padding: 0.25rem;
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        font-size: 0.9rem;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
    }
    
    .cart-item-price {
        font-weight: 600;
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
    }
    
    .cart-quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cart-quantity-controls button {
        width: 24px;
        height: 24px;
        border: 1px solid var(--medium-gray);
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.8rem;
        transition: var(--transition);
    }
    
    .cart-quantity-controls button:hover {
        background: var(--primary-color);
        color: var(--white);
    }
    
    .cart-quantity-controls span {
        min-width: 20px;
        text-align: center;
        font-weight: 600;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: var(--secondary-color);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .remove-item:hover {
        background: var(--secondary-color);
        color: var(--white);
    }
    
    .quick-view-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .product-details h2 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .price-section {
        margin: 1rem 0;
        padding: 1rem;
        background: var(--light-gray);
        border-radius: var(--border-radius);
    }
    
    .price-label {
        font-weight: 600;
        color: var(--medium-gray);
        margin-right: 0.5rem;
    }
    
    .price-value {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--secondary-color);
    }
    
    .color-selection {
        margin: 1rem 0;
    }
    
    .color-selection h4 {
        margin-bottom: 0.5rem;
        color: var(--primary-color);
    }
    
    .color-options {
        display: flex;
        gap: 0.5rem;
    }
    
    .color-option {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid transparent;
        transition: var(--transition);
    }
    
    .color-option:hover,
    .color-option.selected {
        border-color: var(--primary-color);
        transform: scale(1.1);
    }
    
    .quantity-section {
        margin: 1rem 0;
    }
    
    .quantity-section label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: var(--light-gray);
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        width: fit-content;
    }
    
    .quantity-controls button {
        width: 32px;
        height: 32px;
        border: none;
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        transition: var(--transition);
    }
    
    .quantity-controls button:hover {
        background: var(--primary-color);
        color: var(--white);
    }
    
    .quantity-controls span {
        font-weight: 600;
        min-width: 30px;
        text-align: center;
    }
    
    .action-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
        .quick-view-content {
            grid-template-columns: 1fr;
        }
        
        .action-buttons {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(animationStyles);

// ========================
// ERROR HANDLING
// ========================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ========================
// PERFORMANCE MONITORING
// ========================

window.addEventListener('load', function() {
    // Log performance metrics
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ========================
// EXPORT FOR TESTING
// ========================

// Make functions available globally for testing
window.PopTheTote = {
    cart,
    products,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    openQuickView,
    scrollToSection,
    openWhatsApp,
    trackOrder
};
