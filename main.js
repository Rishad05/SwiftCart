
// show top rated  3 products
const topRatedProducts = () => {
  const url = "https://fakestoreapi.com/products?sort=desc";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const topProducts = data.slice(0, 3);
      displayTopProducts(topProducts);
    });
};

// display top rated products
const displayTopProducts = (products) => {
  const topProductsContainer = document.getElementById("topProductsContainer");
  topProductsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">
     <img src="${product.image}" class="w-full h-60 object-cover rounded-lg mb-4" />
     <div class="flex justify-between items-center mb-2">
          <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
            ${product.category}
          </span>
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
     <h4 class="font-semibold mb-2 truncate">${product.title}</h4>
     <p class="text-indigo-600 font-bold mb-4">$${product.price}</p>
     <div class="flex justify-between">
      <button onclick="openModal(${product.id})" class="border px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-eye mr-1"></i> Details
      </button>
      <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-cart-shopping mr-1"></i> Add to Cart
      </button>
     </div>
   </div>
   `;
    topProductsContainer.appendChild(productDiv);
  });
};


topRatedProducts();

// load all products

const loadProducts = () => {
  const url = "https://fakestoreapi.com/products";
  console.log("the url is", url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayProducts(data);
    });
};

// display all products
const displayProducts = (products) => {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">
     <img src="${product.image}" class="w-full h-60 object-cover rounded-lg mb-4" />
     <div class="flex justify-between items-center mb-2">
          <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
            ${product.category}
          </span>
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
     <h4 class="font-semibold mb-2 truncate">${product.title}</h4>
     <p class="text-indigo-600 font-bold mb-4">$${product.price}</p>
     <div class="flex justify-between">
      <button onclick="openModal(${product.id})" class="border px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-eye mr-1"></i> Details
      </button>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-cart-plus mr-1"></i> Add
      </button>
     </div>
    </div>
    
  `;
    productsContainer.appendChild(productDiv);
  });
};


//all categories
const allCategories = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const categories = data;
      displayCategories(categories);
    });
}

// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categoriesContainer");
  categoriesContainer.innerHTML = "";

  const sortedCategories = ["all", ...categories.filter(c => c !== "all")];

  sortedCategories.forEach((category, index) => {
    const button = document.createElement("button");

    const isActive = index === 0;

    button.className = `capitalize px-4 py-2 rounded-lg text-sm transition ${isActive
      ? "bg-indigo-600 text-white"
      : "bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white"
      }`;

    button.textContent = category === "all" ? "All" : category;

    button.addEventListener("click", () => {

      const allButtons = categoriesContainer.querySelectorAll("button");
      allButtons.forEach(btn => {
        btn.classList.remove("bg-indigo-600", "text-white");
        btn.classList.add("bg-white", "text-indigo-600");
      });

      button.classList.remove("bg-white", "text-indigo-600");
      button.classList.add("bg-indigo-600", "text-white");

      if (category === "all") {
        loadProducts();
      } else {
        filterProducts(category);
      }
    });

    categoriesContainer.appendChild(button);
  });
};

allCategories();

// category filter
const filterProducts = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      catWiseProducts(data);
    });
};

//display category wise products
const catWiseProducts = (products) => {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">
     <img src="${product.image}" class="w-full h-60 object-cover rounded-lg mb-4" />
     <div class="flex justify-between items-center mb-2">
          <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
            ${product.category}
          </span>
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
     <h4 class="font-semibold mb-2 truncate">${product.title}</h4>
     <p class="text-indigo-600 font-bold mb-4">$${product.price}</p>
     <div class="flex justify-between">
      <button onclick="openModal(${product.id})" class="border px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-eye mr-1"></i> Details
      </button>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
       <i class="fa-solid fa-cart-plus mr-1"></i> Add
      </button>
     </div>
    </div>
    
  `;
    productsContainer.appendChild(productDiv);
  });

}

//product details modal
const modal = document.getElementById("productModal");

const openModal = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(product => {

      document.getElementById("modalTitle").innerText = product.title;
      document.getElementById("modalPrice").innerText = `$${product.price}`;
      document.getElementById("modalRating").innerText =
        `${product.rating.rate} (${product.rating.count})`;
      document.getElementById("modalDescription").innerText =
        product.description;
      document.getElementById("modalImage").src = product.image;

      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
};

const closeModal = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

loadProducts();