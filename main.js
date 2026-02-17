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

// display all products use tailwind
const displayProducts = (products) => {
 const productsContainer = document.getElementById("productsContainer");
 productsContainer.innerHTML = "";
 products.forEach((product) => {
  const productDiv = document.createElement("div");

  productDiv.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">
     <img src="${product.image}" class="w-full h-60 object-cover rounded-lg mb-4" />
     <h4 class="font-semibold mb-2">${product.title}</h4>
     <p class="text-indigo-600 font-bold mb-4">$${product.price}</p>
     <div class="flex justify-between">
      <button class="border px-4 py-2 rounded-lg text-sm">
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
const displayCategories = (categories) => {
 const categoriesContainer = document.getElementById("categoriesContainer");
 categoriesContainer.innerHTML = "";

 const sortedCategories = ["all", ...categories.filter(c => c !== "all")];

 sortedCategories.forEach((category) => {
  const button = document.createElement("button");

    button.className = `capitalize ${
      category === "all"
        ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
        : "bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white"
    } px-4 py-2 rounded-lg text-sm hover:bg-indigo-700`;

    button.textContent = category === "all" ? "All" : category;

    if (category === "all") {
      button.addEventListener("click", loadProducts);
    } else {
      button.addEventListener("click", () => filterProducts(category));
    }

    categoriesContainer.appendChild(button);
 });

}
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
     <h4 class="font-semibold mb-2">${product.title}</h4>
     <p class="text-indigo-600 font-bold mb-4">$${product.price}</p>
     <div class="flex justify-between">
      <button class="border px-4 py-2 rounded-lg text-sm">
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
loadProducts();
filterProducts("All");