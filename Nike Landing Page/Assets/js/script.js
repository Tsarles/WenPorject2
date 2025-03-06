function shopNow() {
    alert("Redirecting to shop...");
    window.location.href = "/pages/shop.html"; 
}

function toggleMenu() {
    document.querySelector(".menu-toggle").classList.toggle("active");
    document.querySelector("nav").classList.toggle("active");
    document.body.classList.toggle("menu-open");

}
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// Product Filtering
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const searchBox = document.querySelector(".search-box input");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchBox.value.toLowerCase();
    const sortedProducts = [...productCards].sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".product-price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".product-price").textContent.replace("$", ""));
        if (sortFilter.value === "price-low") return priceA - priceB;
        if (sortFilter.value === "price-high") return priceB - priceA;
        return 0;
    });
    document.querySelector(".products").innerHTML = "";
    sortedProducts.forEach(card => {
        const title = card.querySelector(".product-title").textContent.toLowerCase();
        const categoryMatch = category ? card.dataset.category === category : true;
        const searchMatch = searchTerm ? title.includes(searchTerm) : true;
        if (categoryMatch && searchMatch) {
            document.querySelector(".products").appendChild(card);
        }
    });
}
categoryFilter.addEventListener("change", filterProducts);
sortFilter.addEventListener("change", filterProducts);
searchBox.addEventListener("input", filterProducts);

// Add to Cart Functionality
const cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount() {
    document.querySelector(".cart-count").textContent = cart.length;
}
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".product-card");
        const product = {
            title: productCard.querySelector(".product-title").textContent,
            price: productCard.querySelector(".product-price").textContent,
            image: productCard.querySelector(".product-img").src,
        };
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });
});
updateCartCount();

// Pagination
const itemsPerPage = 3;
let currentPage = 1;
function paginateProducts() {
    const allProducts = [...document.querySelectorAll(".product-card")];
    allProducts.forEach((card, index) => {
        card.style.display = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage ? "block" : "none";
    });
}
document.querySelectorAll(".pagination a").forEach((link, index) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = index + 1;
        paginateProducts();
    });
});
paginateProducts();

