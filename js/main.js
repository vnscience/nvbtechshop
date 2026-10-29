// NVB Tech Shop — Vanilla JavaScript only (no jQuery or frameworks).

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

let allProducts = []; // Keep the original data for searching and filtering.

// 1. Load products from a separate JSON file.
async function loadProducts() {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) {
      throw new Error("Unable to load product data.");
    }

    allProducts = await response.json();
    populateCategories(allProducts);
    filterProducts();
  } catch (error) {
    console.error("Product loading error:", error);
    resultsCount.textContent = "";
    productList.textContent = "";
    emptyState.hidden = false;
    emptyState.textContent = "Sorry, we could not load the products. Please try again later.";
  }
}

// 2. Fill the category dropdown using categories found in JSON.
function populateCategories(products) {
  const categories = [...new Set(products.map(product => product.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// 3. Build a product card with DOM methods (avoid inserting raw JSON into HTML).
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  imageWrap.appendChild(image);

  const body = document.createElement("div");
  body.className = "product-body";
  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category;
  const name = document.createElement("h3");
  name.textContent = product.name;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";
  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD"
  }).format(product.price);

  const button = document.createElement("button");
  button.className = "details-button";
  button.type = "button";
  button.textContent = "View details";
  button.setAttribute("aria-expanded", "false");

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;
  description.hidden = true;

  // 4. Show / hide a product description on click.
  button.addEventListener("click", () => {
    description.hidden = !description.hidden;
    button.textContent = description.hidden ? "View details" : "Hide details";
    button.setAttribute("aria-expanded", String(!description.hidden));
  });

  bottom.append(price, button);
  body.append(category, name, bottom, description);
  card.append(imageWrap, body);
  return card;
}

function displayProducts(products) {
  productList.replaceChildren();
  products.forEach(product => productList.appendChild(createProductCard(product)));
  resultsCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"} found`;
  emptyState.hidden = products.length > 0;
  if (products.length === 0) {
    emptyState.textContent = "No products found. Try another search.";
  }
}

// 5. Search by name and filter by category (both can work together).
function filterProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filtered = allProducts.filter(product => {
    const matchesName = product.name.toLowerCase().includes(keyword);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });
  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// 6. Validate a simple email subscription form (front-end demo only).
const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");
const formMessage = document.getElementById("formMessage");

subscribeForm.addEventListener("submit", event => {
  event.preventDefault(); // Avoid reloading the page.
  const email = emailInput.value.trim();
  formMessage.classList.remove("success", "error");

  if (!email || !emailInput.validity.valid) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent = "Thanks for subscribing! This is a demo; your email was not saved.";
  formMessage.classList.add("success");
  subscribeForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
loadProducts();
