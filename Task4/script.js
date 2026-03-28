// ==========================================
// STEP 2: NOTE-TAKING APP (LOCAL STORAGE)
// ==========================================
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// 1. Fetch existing notes from Local Storage when the page loads
// We use JSON.parse to turn the stored text back into a JavaScript array
let notes = JSON.parse(localStorage.getItem('mySavedNotes')) || [];

// 2. Function to display notes on the screen
function renderNotes() {
    notesList.innerHTML = ''; // Clear current list
    
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${index})">X</button>
        `;
        notesList.appendChild(li);
    });
}

// 3. Function to add a new note
addNoteBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text !== '') {
        notes.push(text); // Add to our array
        
        // Save the updated array to Local Storage (must be converted to a string)
        localStorage.setItem('mySavedNotes', JSON.stringify(notes));
        
        noteInput.value = ''; // Clear input
        renderNotes(); // Update the screen
    }
});

// 4. Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1); // Remove from array
    localStorage.setItem('mySavedNotes', JSON.stringify(notes)); // Update storage
    renderNotes(); // Update screen
}

// Initial render on page load
renderNotes();


// ==========================================
// STEP 3: PRODUCT LISTING (FILTER & SORT)
// ==========================================

// Array of objects representing our data
const products = [
    { id: 1, name: "Mechanical Keyboard", category: "tech", price: 1099, rating: 4.8 },
    { id: 2, name: "Jujutsu Kaisen Poster", category: "anime", price: 99, rating: 4.9 },
    { id: 3, name: "Advanced React Course", category: "tech", price: 3999, rating: 4.5 },
    { id: 4, name: "Wireless Mouse", category: "tech", price: 499, rating: 4.2 },
    { id: 5, name: "One Piece Action Figure", category: "anime", price: 299, rating: 4.7 }
];

const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortOrder = document.getElementById('sortOrder');


// Function to render products based on the current list
function renderProducts(productList) {
    productGrid.innerHTML = ''; // Clear grid
    
    productList.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p class="product-price"> ₹${product.price}</p>
            <p class="product-rating">Rating: ${product.rating} ⭐</p>
            <p style="font-size: 0.8rem; color: #888;">Category: ${product.category}</p>
        `;
        productGrid.appendChild(div);
    });
}

// Function that handles both filtering and sorting at the same time
function updateShowcase() {
    let filteredProducts = [...products]; // Create a copy of the original array

    // 1. Apply Filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(item => item.category === selectedCategory);
    }

    // 2. Apply Sort
    const selectedSort = sortOrder.value;
    if (selectedSort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price); // Ascending
    } else if (selectedSort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price); // Descending
    } else if (selectedSort === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating); // Highest rated first
    }

    // 3. Render the newly filtered and sorted array
    renderProducts(filteredProducts);
}

// Listen for changes on the dropdown menus
categoryFilter.addEventListener('change', updateShowcase);
sortOrder.addEventListener('change', updateShowcase);

// Initial render on page load
renderProducts(products);