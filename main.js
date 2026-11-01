import { addProductToCart } from "./cart.js";

const productsUrl = "https://fakestoreapi.com/products";

const productsSection = document.querySelector("#products");

const cartCounter = document.querySelector("#cart-counter");

const cartSubtotal = document.querySelector("#cart-subtotal");

const cartVat = document.querySelector("#cart-vat");

const clearCartButton = document.querySelector("#clear-cart-button");

const cartItemsList = document.querySelector("#cart-items");

const filterButtons = document.querySelectorAll(".filters button");

let cartCount = 0;

let cartSubtotalValue = 0;

let cartItems = [];

const vatRate = 0.19;

let allProducts = [];

productsSection.textContent = "Loading products...";

productsSection.classList.add("products-message");

async function getProducts() {
    try {
    const response = await fetch(productsUrl);
    
    const products = await response.json();
    
    allProducts = products;

    showProducts(products);
    } catch (error) {
        productsSection.textContent = "Unable to load products. Please try again later.";
        productsSection.classList.add("products-error");   
    }

}

function showProducts(products) {
    productsSection.textContent = "";

    productsSection.classList.remove("products-message");
    
    productsSection.classList.remove("products-error");

    products.forEach((product) => {
            
            const productCard = document.createElement("div");
            
            productCard.classList.add("product-card");
            
            const productImage = document.createElement("img");
            
            productImage.src = product.image;
            
            productImage.alt = product.title;
            
            const productTitle = document.createElement("h2");
            
            productTitle.textContent = product.title;

            const productCategory = document.createElement("span");

            if (product.title.toLowerCase().includes("backpack")) {
                productCategory.textContent = "Backpacks";
            } else {
                productCategory.textContent = product.category;
            }

            productCategory.classList.add("product-category");

            const productPrice = document.createElement("p");

            productPrice.textContent = `$${product.price}`;

            productPrice.classList.add("product-price");

            const productOptions = getProductOptions(product);

            const productOptionsElement = createProductOptions(productOptions);

            function updateProductPrice() {
                const selectedOptionsExtraPrice = Array.from(productOptionsElement.querySelectorAll(".option-select")).reduce((total, select) => {
                    return total + Number(select.selectedOptions[0].dataset.priceModifier);
                }, 0);

                const updatedProductPrice = product.price + selectedOptionsExtraPrice;

                productPrice.textContent = `$${updatedProductPrice.toFixed(2)}`;
            }

            productOptionsElement.querySelectorAll(".option-select").forEach((select) => {
                select.addEventListener("change", updateProductPrice);
            });

            const addToCartButton = document.createElement("button");

            addToCartButton.textContent = "Add to cart";

            addToCartButton.addEventListener("click", async () => {
                addToCartButton.textContent = "Adding...";

                addToCartButton.disabled = true;

                await new Promise((resolve) => setTimeout(resolve, 2000));

                const updatedCart = await addProductToCart(product);

                addToCartButton.textContent = "Added";

                const selectedQuantity = Number(productOptionsElement.querySelector(".option-quantity").value);

                const selectedOptionsExtraPrice = Array.from(productOptionsElement.querySelectorAll(".option-select")).reduce((total, select) => {
                    return total + Number(select.selectedOptions[0].dataset.priceModifier);
                }, 0);

                const selectedOptionsText = Array.from(productOptionsElement.querySelectorAll(".option-select")).map((select) => select.value).join(", ");

                const cartItemUnitPrice = product.price + selectedOptionsExtraPrice;

                cartItems.push({
                    title: product.title,
                    options: selectedOptionsText || "Default",
                    quantity: selectedQuantity,
                    unitPrice: cartItemUnitPrice,
                    totalPrice: cartItemUnitPrice * selectedQuantity
                });

                updateCartDisplay();

                setTimeout(() => {
                    addToCartButton.textContent = "Add to cart";
                    addToCartButton.disabled = false;
                }, 3000);
            });

productCard.appendChild(productImage);
            
            productCard.appendChild(productTitle);

            productCard.appendChild(productCategory);

            productCard.appendChild(productPrice);

            productCard.appendChild(productOptionsElement);

            productCard.appendChild(addToCartButton);
            
            productsSection.appendChild(productCard);
    });
}

function updateCartDisplay() {
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    cartSubtotalValue = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const includedVat = cartSubtotalValue - cartSubtotalValue / (1 + vatRate);

    cartCounter.textContent = `Cart (${cartCount})`;

    cartSubtotal.textContent = `Subtotal: $${cartSubtotalValue.toFixed(2)}`;

    cartVat.textContent = `VAT incl.: $${includedVat.toFixed(2)}`;

    cartItemsList.textContent = "";

    cartItemsList.classList.remove("cart-collapsed");

    if (cartItems.length === 0) {
        return;
    }

    cartItemsList.classList.add("cart-collapsed");

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        const cartItemText = document.createElement("span");

        cartItemText.textContent = `${item.quantity}x ${item.title} (${item.options}) - $${item.totalPrice.toFixed(2)}`;

        const removeControls = document.createElement("div");

        removeControls.classList.add("cart-remove-controls");

        const removeQuantityInput = document.createElement("input");

        removeQuantityInput.type = "number";

        removeQuantityInput.min = "1";

        removeQuantityInput.max = item.quantity;

        removeQuantityInput.value = "1";

        removeQuantityInput.classList.add("remove-quantity");

        const removeItemButton = document.createElement("button");

        removeItemButton.textContent = "Remove";

        removeItemButton.addEventListener("click", () => {
            const requestedRemoveQuantity = Number(removeQuantityInput.value);

            if (Number.isNaN(requestedRemoveQuantity) || requestedRemoveQuantity < 1) {
                return;
            }

            const removeQuantity = Math.min(requestedRemoveQuantity, item.quantity);

            item.quantity -= removeQuantity;

            item.totalPrice = item.unitPrice * item.quantity;

            if (item.quantity === 0) {
                cartItems.splice(index, 1);
            }

            updateCartDisplay();
        });

        removeControls.appendChild(removeQuantityInput);

        removeControls.appendChild(removeItemButton);

        cartItem.appendChild(cartItemText);

        cartItem.appendChild(removeControls);

        cartItemsList.appendChild(cartItem);
    });
}

function createProductOptions(productOptions) {
    const optionsContainer = document.createElement("div");

    optionsContainer.classList.add("product-options");

    Object.keys(productOptions).forEach((optionName) => {
        if (optionName === "quantity") {
            return;
        }

        const optionGroup = document.createElement("label");

        optionGroup.classList.add("option-group");

        optionGroup.textContent = `${optionName.charAt(0).toUpperCase()}${optionName.slice(1)} `;

        const optionSelect = document.createElement("select");

        optionSelect.classList.add("option-select");

        productOptions[optionName].forEach((option) => {
            const optionElement = document.createElement("option");

            optionElement.textContent = typeof option === "string" ? option : `${option.label} (+$${option.priceModifier})`;

            optionElement.value = typeof option === "string" ? option : option.label;

            optionElement.dataset.priceModifier = typeof option === "string" ? "0" : option.priceModifier;

            optionSelect.appendChild(optionElement);
        });

        optionGroup.appendChild(optionSelect);

        optionsContainer.appendChild(optionGroup);
    });

    const quantityGroup = document.createElement("label");

    quantityGroup.classList.add("option-group");

    quantityGroup.textContent = "Quantity ";

    const quantityInput = document.createElement("input");

    quantityInput.type = "number";

    quantityInput.min = "1";

    quantityInput.value = "1";

    quantityInput.classList.add("option-quantity");

    quantityGroup.appendChild(quantityInput);

    optionsContainer.appendChild(quantityGroup);

    return optionsContainer;
}
function getProductOptions(product) {
    const productTitle = product.title.toLowerCase();

    if (productTitle.includes("backpack")) {
        return {
            colors: ["Black", "Forest Green", "Navy", "Brown", "Grey"]
        };
    }

    if (product.category === "men's clothing" || product.category === "women's clothing") {
        return {
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Black", "White", "Blue", "Red", "Beige"]
        };
    }

    if (product.category === "electronics") {
        if (productTitle.includes("monitor") || productTitle.includes("acer")) {
            return {
                sizes: [
                    { label: '24"', priceModifier: 0 },
                    { label: '27"', priceModifier: 40 },
                    { label: '32"', priceModifier: 90 },
                    { label: '49"', priceModifier: 180 }
                ]
            };
        }

        if (productTitle.includes("playstation") || productTitle.includes("gaming drive")) {
            return {
                capacities: [
                    { label: "2TB", priceModifier: 0 },
                    { label: "4TB", priceModifier: 60 },
                    { label: "5TB", priceModifier: 90 },
                    { label: "8TB", priceModifier: 160 }
                ],
                platforms: ["PS4", "PS5", "PC"]
            };
        }

        if (productTitle.includes("external hard drive")) {
            return {
                capacities: [
                    { label: "1TB", priceModifier: 0 },
                    { label: "2TB", priceModifier: 35 },
                    { label: "4TB", priceModifier: 80 },
                    { label: "5TB", priceModifier: 110 }
                ]
            };
        }

        if (productTitle.includes("hard drive") || productTitle.includes("ssd")) {
            return {
                capacities: [
                    { label: "256GB", priceModifier: 0 },
                    { label: "512GB", priceModifier: 25 },
                    { label: "1TB", priceModifier: 55 },
                    { label: "2TB", priceModifier: 100 }
                ]
            };
        }
        
        return {
            versions: ["Standard", "Extended Warranty", "Premium Setup", "Bundle Pack"]
        };
    }

    if (product.category === "jewelery") {
        if (productTitle.includes("bracelet")) {
            return {
                lengths: ["16cm", "18cm", "20cm", "22cm"],
                materials: ["Gold", "Silver", "Rose Gold"]
            };
        }

        return {
            sizes: ["5", "6", "7", "8", "9"],
            materials: ["Gold", "Silver", "Rose Gold"]
        };
    }

    return {
        quantity: true
    };
}

function setupFilters() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.category;
            
            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            if (selectedCategory === "all") {
                showProducts(allProducts);
            } else if (selectedCategory === "backpacks") {
                const filteredProducts = allProducts.filter((product) => product.title.toLowerCase().includes("backpack"));

                showProducts(filteredProducts);
            } else {
                const filteredProducts = allProducts.filter((product) => product.category === selectedCategory);

                showProducts(filteredProducts);
            }
        });
    });
}

getProducts();

setupFilters();

clearCartButton.addEventListener("click", () => {
    cartItems = [];

    updateCartDisplay();
});
