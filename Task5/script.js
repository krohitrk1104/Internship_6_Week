// Data Array - In a real app, this might come from an API!
const products = [
    { id: 1, name: "DSA Cheat Sheet Poster", price: 99.00, img: "/images/dsa_cheatsheet_poster.jpg" },
    { id: 2, name: "Jujutsu Kaisen Hoodie", price: 499.00, img: "/images/jujtsu_kaisen_hoodie.jpg" },
    { id: 3, name: "Mechanical Keyboard", price: 1099.00, img: "/images/mechanical_keyboard.jpg" },
    { id: 4, name: "React.js Coffee Mug", price: 299.00, img: "/images/react_js_coffe_mug.jpg" }
];

let cartCount = 0;

// Grab DOM elements
const productGrid = document.getElementById('product-grid');
const cartCountDisplay = document.getElementById('cart-count');

// Function to dynamically render products to the page
function renderProducts() {
    // We use a DocumentFragment to optimize DOM manipulation.
    // It builds the HTML in memory first, then adds it to the page all at once (faster!)
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Note the loading="lazy" attribute built into the dynamic HTML
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price"> ₹ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        fragment.appendChild(card);
    });

    // Add everything to the actual page
    productGrid.appendChild(fragment);
}

// Optimization: Event Delegation
// Instead of attaching a click listener to EVERY button, we attach ONE to the parent grid.
// It listens for any clicks that bubble up and checks if a button was clicked.
productGrid.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        addToCart();
        
        // Visual feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = "Added!";
        btn.style.backgroundColor = "#2ecc71"; // Green color
        
        // Reset button after 1 second
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = ""; 
        }, 1000);
    }
});

function addToCart() {
    cartCount++;
    cartCountDisplay.textContent = cartCount;
}

// Initialize the app
renderProducts();