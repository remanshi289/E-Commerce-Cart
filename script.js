 // Define the Product class
 class Product {
    constructor(name, price, available, discount) {
        this.name = name;
        this.price = price;
        this.available = available;
        this.discount = discount;
    }
}

// Initialize the product list
const productList = [
    new Product("Laptop", 1000, true, 0),
    new Product("Headphones", 50, true, 10),
    new Product("SmartPhone", 400, true, 15),
    new Product("Computer", 800, false, 0)
];

// Define the Cart class
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const item = { product, quantity };
        this.items.push(item);
    }

    updateItemQuantity(productName, quantity) {
        const item = this.items.find(item => item.product.name === productName);
        if (item) {
            item.quantity = quantity;
        }
    }

    removeItem(productName) {
        const index = this.items.findIndex(item => item.product.name === productName);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    calculateSubtotal() {
        return this.items.reduce((subtotal, item) => subtotal + (item.product.price * item.quantity), 0);
    }

    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const discountAmount = (subtotal * this.calculateDiscount()) / 100;
        return subtotal - discountAmount;
    }

    calculateDiscount() {
        return this.items.reduce((discount, item) => discount + (item.product.discount * item.quantity), 0);
    }
}

// Initialize the cart
const cart = new Cart();

// Function to add a product to the cart
function addToCart(productName) {
    const productToAdd = productList.find(product => product.name === productName);
    const quantityInput = document.getElementById(`${productName}-quantity`);
    const quantity = parseInt(quantityInput.value);
    if (productToAdd && productToAdd.available && quantity > 0) {
        cart.addItem(productToAdd, quantity);
        updateCartUI();
    }
}

// Function to remove a product from the cart
function removeFromCart(productName) {
    cart.removeItem(productName);
    updateCartUI();
}

// Function to update the cart's UI
function updateCartUI() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Clear the cart items
    cartItemsElement.innerHTML = "";

    // Populate the cart items
    cart.items.forEach(item => {
        const li = document.createElement("li");
        const product = item.product;
        li.textContent = `${product.name} x ${item.quantity} - Price: $${(product.price * item.quantity).toFixed(2)} - Discount: ${product.discount}%`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            removeFromCart(product.name);
        };
        li.appendChild(removeButton);
        cartItemsElement.appendChild(li);
    });

    // Calculate and display the total bill
    const total = cart.calculateTotal();
    cartTotalElement.textContent = `Your total bill is $${total.toFixed(2)}.`;
}

function displayProducts() {
    const productContainer = document.getElementById("product-list");

    productList.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.id = product.name;

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Available: ${product.available ? 'Yes' : 'No'}</p>
            <p>Discount: ${product.discount}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
            <input type="number" id="${product.name}-quantity" value="1" min="1">
        `;

        productContainer.appendChild(productElement);
    });
}

// Call the function to display products
displayProducts();





