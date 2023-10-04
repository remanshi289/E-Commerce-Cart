// Define the Product class
class Product {
    constructor(name, price, available) {
        this.name = name;
        this.price = price;
        this.available = available;
    }
}

// Initialize the product list
const productList = [
    new Product("Laptop", 1000, true),
    new Product("Headphones", 50, true),
    new Product("Computer", 800, true),
    new Product("SmartPhone", 400, true)
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

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
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
        const itemName = document.createElement("span");
        itemName.textContent = `${item.product.name} x ${item.quantity}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeFromCart(item.product.name);
        };
        li.appendChild(itemName);
        li.appendChild(removeButton);
        cartItemsElement.appendChild(li);
    });

    // Calculate and display the total bill
    const total = cart.calculateTotal();
    cartTotalElement.textContent = `Your total bill is $${total}.`;
}
