// NAVBAR DROPDOWN
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
    let menu = dropdown.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseenter', () => menu.classList.add('show'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('show'));
});


// NAVBAR SCROLL COLOR CHANGE
window.addEventListener('scroll', () => {
    let navbar = document.querySelector('.navbar');
    let navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');
    let navbarBrand = document.querySelector('.navbar-brand');
    let navLinks = document.querySelectorAll('.nav-link')
    let navIcons = document.querySelectorAll('.nav-link .bx')
    let dropdownMenu = document.querySelectorAll('.dropdown-menu')
    let scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        navbar.classList.add('navbar__scrolled');
        navbarTogglerIcon.classList.add('navbar-toggler-icon__scrolled');
        navbarBrand.classList.add('navbar-brand__scrolled');
        navLinks.forEach(navLink => navLink.classList.add('nav-links__scrolled'));
        navIcons.forEach(navIcon => navIcon.classList.add('nav-icons__scrolled'));
        dropdownMenu.forEach(dropMenu => dropMenu.classList.add('dropdown-menu__scrolled'));
    } else {
        navbar.classList.remove('navbar__scrolled');
        navbarTogglerIcon.classList.remove('navbar-toggler-icon__scrolled');
        navbarBrand.classList.remove('navbar-brand__scrolled');
        navLinks.forEach(link => link.classList.remove('nav-links__scrolled'));
        navIcons.forEach(navIcon => navIcon.classList.remove('nav-icons__scrolled'));
        dropdownMenu.forEach(dropMenu => dropMenu.classList.remove('dropdown-menu__scrolled'));
    }
});


// SLIDER
$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        } 
    });  
});


// MODAL WINDOWS
let openModals = document.querySelectorAll('.open__modal');
let closeModals = document.querySelectorAll('.close__modal__window');
let modalWindows = document.querySelectorAll('.product__modal__window__container');

openModals.forEach((openModal, index) => {
    openModal.addEventListener('click', () => 
        modalWindows[index].style.display = 'flex');
});

closeModals.forEach((closeModal, index) => {
    closeModal.addEventListener('click', () => modalWindows[index].style.display = 'none');
});


// CART MENU
let cartIcons = document.querySelectorAll('.cart__icon'); 
let cart = document.querySelector('.cart'); 
let closeCart = document.querySelector('.close__cart'); 

cartIcons.forEach(cartIcon => {
    cartIcon.addEventListener('click', () => cart.classList.add('active'));
});

closeCart.addEventListener('click', () => cart.classList.remove('active')); 


// FILTER PRODUCTS
document.addEventListener("DOMContentLoaded", function () {
    const sortOptions = document.querySelector("#sortOptions");
    const productContainer = document.querySelector(".product__container"); 
    const products = Array.from(document.querySelectorAll(".product__item")); 

    function parsePrice(priceText) {
        return parseFloat(priceText.replace(/,/g, "").replace("$", "")); 
    }

    sortOptions.addEventListener("change", () => {
        let selectedOption = sortOptions.value;
        let sortedProducts = [...products];

        if (selectedOption === "priceAsc") {
            sortedProducts.sort((a, b) => 
                parsePrice(a.querySelector(".price").textContent) - parsePrice(b.querySelector(".price").textContent)
            ); 
        } else if (selectedOption === "priceDesc") {
            sortedProducts.sort((a, b) => 
                parsePrice(b.querySelector(".price").textContent) - parsePrice(a.querySelector(".price").textContent)
            ); 
        } else if (selectedOption === "nameAsc") {
            sortedProducts.sort((a, b) => 
                a.querySelector(".product__card__body__title").textContent.localeCompare(b.querySelector(".product__card__body__title").textContent)
            );
        } else if (selectedOption === "nameDesc") {
            sortedProducts.sort((a, b) => 
                b.querySelector(".product__card__body__title").textContent.localeCompare(a.querySelector(".product__card__body__title").textContent)
            ); 
        }

        productContainer.innerHTML = ""; 
        sortedProducts.forEach(product => productContainer.appendChild(product));
    });
});


// CART FUNCTIONALITY 
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart__content");
    const cartTotalContainer = document.querySelector(".cart__total");
    const cartTotal = document.querySelector(".total__price");
    const cartButton = document.querySelector(".cart__btn");
    const cartCounter = document.querySelectorAll(".badge");
    const clearCartButton = document.createElement("button");
         
    clearCartButton.textContent = "Clear Cart";
    clearCartButton.classList.add("btn", "btn-outline-danger", "w-100", "mt-3", "mb-4");
    clearCartButton.style.display = "none";
    cartButton.insertAdjacentElement("beforebegin", clearCartButton);

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__item", "d-flex", "justify-content-between", "align-items-center");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="" class="cart__img img-fluid">
                <div class="cart__details ms-3">
                    <div class="top">
                        <h4 class="mb-1">${item.name}</h4>
                        <p class="text-muted">$${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                        <p>Size: ${item.size}</p>
                    </div>
                    <div class="bottom d-flex align-items-center justify-content-between">
                        <div class="cart__quantity d-flex align-items-center">
                            <button class="decrement btn btn-outline-dark btn-sm" data-index="${index}">-</button>
                            <span class="number mx-2">${item.quantity}</span>
                            <button class="increment btn btn-outline-dark btn-sm" data-index="${index}">+</button>
                        </div>
                        <i class='bx bx-trash text-danger fs-5' data-index="${index}"></i>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

        cartCounter.forEach(counter => {
            counter.textContent = itemCount;
            counter.style.display = itemCount > 0 ? "block" : "none";
        });

        if (cart.length > 0) {
            cartTotalContainer.style.display = "flex";
            cartButton.style.display = "block";
            clearCartButton.style.display = "block";
        } else {
            cartTotalContainer.style.display = "none";
            cartButton.style.display = "none";
            clearCartButton.style.display = "none";
            cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        }

        saveCart();
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name && item.size === product.size);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        updateCart();
    }

    function handleAddToCart(button) {
        button.addEventListener("click", (e) => {
            const container = e.target.closest(".product__modal__window, .product__detail");
            const name = container.querySelector("h4").textContent;
            const priceText = container.querySelector(".product__modal__window__price").textContent;
            const price = parseFloat(priceText.replace(/[$,]/g, ""));
            const image = container.querySelector(".product__card__img img").src;
            const selectedSize = container.querySelector(".size__btn.active");
            const size = selectedSize ? selectedSize.textContent : null;
            const quantity = parseInt(container.querySelector(".number").textContent);

            if (!size || quantity <= 0) {
                alert("Please select a size and quantity before adding to cart!");
                return;
            }

            addToCart({ name, price, image, size, quantity });
        });
    }

    document.querySelectorAll(".add__counter").forEach(handleAddToCart);

    document.querySelectorAll(".add__counter__icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product__card");
            const name = productCard.querySelector("h4").textContent;
            const priceText = productCard.querySelector(".price").textContent;
            const price = parseFloat(priceText.replace(/[$,]/g, ""));
            const image = productCard.querySelector(".product__card__img img").src;
            const size = "M"; 
            const quantity = 1; 

            addToCart({ name, price, image, size, quantity });
        });
    });

    cartContainer.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");

        if (e.target.classList.contains("increment")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("decrement")) {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        } else if (e.target.classList.contains("bx-trash")) {
            cart.splice(index, 1);
        }

        updateCart();
    });

    clearCartButton.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    document.querySelectorAll(".size__btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const sizeButtons = e.target.closest(".product__modal__window__size").querySelectorAll(".size__btn");
            sizeButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
        });
    });

    document.querySelectorAll(".cart__quantity").forEach(container => {
        container.addEventListener("click", (e) => {
            let number = container.querySelector(".number");
            let value = parseInt(number.textContent);

            if (e.target.classList.contains("increment")) {
                number.textContent = value + 1;
            } else if (e.target.classList.contains("decrement") && value > 0) {
                number.textContent = value - 1;
            }
        });
    });

    updateCart();
});


// CHECKOUT
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.querySelector(".checkout__content__info");
    const cartCount = document.querySelector(".cart__count");
    const subtotalElement = document.querySelector(".subtotal");
    const shippingElement = document.querySelector(".shipping");
    const taxesElement = document.querySelector(".taxes");
    const finalTotalPriceElement = document.querySelector(".final__total__price");

    function updateCheckout() {
        checkoutContainer.innerHTML = "";
        let subtotal = 0;
        let totalItems = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity; 
            subtotal += itemTotal;
            totalItems += item.quantity;
            item.itemNumber = `#${1000 + index}`; 

            const checkoutItem = document.createElement("div");
            checkoutItem.classList.add("checkout__item", "d-flex", "justify-content-between", "mt-3", "border-bottom");

            checkoutItem.innerHTML = `
                <div class="left d-flex align-items-center gap-3">
                    <div class="checkout__img__container mb-3">
                        <img src="${item.image}" class="checkout__img img__fluid" alt="">
                    </div>
                    <div class="checkout__details">
                        <h4 class="mb-1">${item.name}</h4>
                        <p class="text-muted">Item No: ${item.itemNumber}</p>
                        <p class="text-muted">$${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                        <p class="mb-1">Size: ${item.size}</p>
                        <div class="checkout__quantity d-flex align-items-center">
                            <p class="mb-0 me-2">Quantity:</p>
                            <button class="decrement btn btn-outline-dark btn-sm" data-index="${index}">-</button>
                            <span class="number mx-2">${item.quantity}</span>
                            <button class="increment btn btn-outline-dark btn-sm" data-index="${index}">+</button>
                        </div>
                        <div class="remove__item d-flex mt-4" data-index="${index}">
                            <i class='bx bx-trash text-danger me-1'></i>
                            <p>Remove</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <p class="total__item__price mt-2"><strong>$${itemTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></p>
                </div>
            `;
            checkoutContainer.appendChild(checkoutItem);
        });

        cartCount.textContent = totalItems;
        subtotalElement.textContent = `$${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

        let shipping = subtotal >= 7500 ? 0 : 50;
        shippingElement.textContent = shipping === 0 ? "Free" : `$${shipping}`;

        let taxes = subtotal * 0.08; 
        taxesElement.textContent = `$${taxes.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

        let finalTotal = subtotal + shipping + taxes;
        finalTotalPriceElement.textContent = `$${finalTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    checkoutContainer.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");

        if (e.target.classList.contains("increment")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("decrement")) {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        } else if (e.target.closest(".remove__item")) { 
            cart.splice(index, 1);
        }

        updateCheckout();
    });

    updateCheckout();
});
