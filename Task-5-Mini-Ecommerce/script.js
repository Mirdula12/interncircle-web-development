// Product data
const products = [
    {
        id: 1,
        name: "Face Serum",
        price: 499,
        description: "Hydrating vitamin C face serum",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Lipstick",
        price: 299,
        description: "Long-lasting matte lipstick",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Face Cream",
        price: 399,
        description: "Moisturizing daily face cream",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Perfume",
        price: 699,
        description: "Fresh and elegant fragrance",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Sunscreen",
        price: 349,
        description: "SPF 50 daily protection",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Body Lotion",
        price: 279,
        description: "Soft and smooth skin lotion",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

// Get HTML elements
const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");

const cartModal = document.getElementById("cartModal");
const closeModal = document.getElementById("closeModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutDetails = document.getElementById("checkoutDetails");
const checkoutTotal = document.getElementById("checkoutTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");


// Display products
function displayProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="product-image">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    ₹${product.price}
                </div>

                <button class="add-btn" 
                        onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productList.appendChild(card);
    });
}


// Add product to cart
function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    cart.push(product);

    updateCart();

    alert(product.name + " added to cart!");
}


// Update cart
function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-info">
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
            </div>

            <button 
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total;
}


// Remove product
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// Open cart
cartBtn.addEventListener("click", () => {

    cartModal.style.display = "flex";

    updateCart();
});


// Close cart
closeModal.addEventListener("click", () => {

    cartModal.style.display = "none";
});


// Checkout
checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    checkoutDetails.innerHTML = "";

    let total = 0;

    cart.forEach(product => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "checkout-item";

        item.innerHTML = `
            <span>${product.name}</span>
            <span>₹${product.price}</span>
        `;

        checkoutDetails.appendChild(item);
    });

    checkoutTotal.textContent = total;

    cartModal.style.display = "none";

    checkoutModal.style.display = "flex";
});


// Close checkout
closeCheckout.addEventListener("click", () => {

    checkoutModal.style.display = "none";
});


// Place order
placeOrderBtn.addEventListener("click", () => {

    alert("🎉 Order placed successfully!");

    cart = [];

    updateCart();

    checkoutModal.style.display = "none";
});


// Close modal when clicking outside
window.addEventListener("click", (event) => {

    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }

    if (event.target === checkoutModal) {
        checkoutModal.style.display = "none";
    }
});


// Initial display
displayProducts();
updateCart();