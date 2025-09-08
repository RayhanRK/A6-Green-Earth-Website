
let cartList = [];
const cartContainer = document.getElementById("cartContainer");
const plantCards = document.getElementById("plantCards");

// spinner functionality
const spinner = document.getElementById("spinnerLoader");

const spinnerLoader = (loadingState) => {
  if (loadingState) {
    spinner.classList.remove("hidden");
    plantCards.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    plantCards.classList.remove("hidden");
  }
};

// Load All Categories
const loadAllCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    showAllCategory(data.categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Show All Categories
const showAllCategory = (categories) => {
  const catList = document.getElementById("categoryList");

  categories.forEach((category) => {
    catList.innerHTML += `
      <li id="cat-${category.id}"
          onclick="loadPlantsByCategory('${category.id}')"
          class="px-3 py-2 cursor-pointer rounded duration-300 hover:bg-[#15803d] hover:text-white">
          ${category.category_name}
      </li>
    `;
  });
};

// Load Plants by Category
const loadPlantsByCategory = async(id) => {
      spinnerLoader(true);
const url = `https://openapi.programming-hero.com/api/category/${id}`;
 
    const res = await fetch(url);
    const data = await res.json();
    showPlantsByCategory(data.plants, id);
  }

// Show Plants by Category
const showPlantsByCategory = (plants, id) => {
  removeActive();

  const activeItem = document.getElementById(`cat-${id}`);
  if (activeItem) {
    activeItem.classList.add("bg-[#15803d]", "text-white");
  }

  plantCards.innerHTML = "";
  plants.forEach((plant) => {
    plantCards.innerHTML += `
      <div class="card bg-base-100 w-full shadow-sm">
        <figure class="px-4 pt-4">
          <img src="${plant.image}" alt="${plant.name}"
              class="rounded-xl w-full h-50 object-cover" />
        </figure>
        <div class="card-body pb-4">
          <h2 class="card-title cursor-pointer" onclick="loadPlantDetail('${plant.id}')">${plant.name}</h2>
          <p>${plant.description}</p>
          <div class="flex justify-between items-center">
            <div class="rounded-full bg-[#dcfce7] text-[#15803d] py-1 px-3 font-semibold">${plant.category}</div>
            <div class="font-semibold">৳${plant.price}</div>
          </div>
        </div>
        <div class="pb-4 px-4">
          <button class="btn bg-[#15803d] btn-block rounded-full text-white">Add to Cart</button>
        </div>
      </div>
    `;
  });
  spinnerLoader(false);
};

// Load All Plants
const loadAllPlants = async () => {
      spinnerLoader(true);
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    showAllPlants(data.plants);
};

// Show All Plants
const showAllPlants = (plants) => {
  removeActive();

  const allTreeBtn = document.getElementById("allTree");
  if (allTreeBtn) {
    allTreeBtn.classList.add("bg-[#15803d]", "text-white");
  }

  plantCards.innerHTML = "";
  plants.forEach((plant) => {
    plantCards.innerHTML += `
      <div class="card bg-base-100 w-full shadow-sm">
        <figure class="px-4 pt-4">
          <img src="${plant.image}" alt="${plant.name}"
              class="rounded-xl w-full h-50 object-cover" />
        </figure>
        <div class="card-body pb-4">
          <h2 class="card-title cursor-pointer" onclick="loadPlantDetail('${plant.id}')">${plant.name}</h2>
          <p>${plant.description}</p>
          <div class="flex justify-between items-center">
            <div class="rounded-full bg-[#dcfce7] text-[#15803d] py-1 px-3 font-semibold">${plant.category}</div>
            <div class="font-semibold">৳${plant.price}</div>
          </div>
        </div>
        <div class="pb-4 px-4">
          <button class="btn bg-[#15803d] btn-block rounded-full text-white">Add to Cart</button>
        </div>
      </div>
    `;
  });
  spinnerLoader(false);
};

// Load plant detail
const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPlantDetail(data.plants);
};

// Show plant detail
const showPlantDetail = (plant) => {
  const plantModal = document.getElementById("plantModal");
  const plantDetail = document.getElementById("plantDetail");
  plantModal.showModal();
  plantDetail.innerHTML = `
    <h3 class="text-2xl font-semibold">${plant.name}</h3>
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover rounded-lg">
    <p class="text-lg font-bold">Category: ${plant.category}</p>
    <p class="text-lg font-bold">Price: ৳${plant.price}</p>
    <p> Description: ${plant.description}</p>
  `;
};

// Add to cart functionality
plantCards.addEventListener("click", (e) => addToCart(e));

const addToCart = (e) => {
  if (e.target.innerText === "Add to Cart") {
    const name = e.target.parentNode.parentNode.children[1].children[0].innerText;
    const price = e.target.parentNode.parentNode.children[1].children[2].children[1].innerText.slice(1);
    const cartData = {
      plantName: name,
      plantPrice: Number(price),
      quantity: 1,
    };
    let existingPlant = cartList.find((cart) => cart.plantName === cartData.plantName);
    if (existingPlant) {
      existingPlant.quantity++;
    } else {
      cartList.push(cartData);
    }
    alert(`${name} has been added to the cart.`);
    showCartList(cartList);
  }
};

// Show cart list
const showCartList = (cartList) => {
  const totalPriceEl = document.getElementById("totalTk");
  let totalPrice = 0;
  cartContainer.innerHTML = "";
  cartList.forEach((cart) => {
    cartContainer.innerHTML += `
      <div class="bg-[#f0fdf4] p-3 rounded-lg flex justify-between items-center gap-4">
        <div>
          <h5 class="text-lg font-semibold">${cart.plantName}</h5>
          <p class="text-[#889396]">৳${cart.plantPrice} x ${cart.quantity}</p>
        </div>
        <div class="cursor-pointer" onclick="removeCart('${cart.plantName}')">
         ❌
        </div>
      </div>
    `;
    totalPrice += cart.plantPrice * cart.quantity;
  });
  totalPriceEl.innerText = totalPrice;
};

// Remove cart
const removeCart = (plantName) => {
  cartList = cartList.filter((cart) => cart.plantName !== plantName);
  showCartList(cartList);
};

// Remove active button styling
const removeActive = () => {
  const buttons = document.querySelectorAll("#categoryList li, #allTree");
  buttons.forEach((btn) => btn.classList.remove("bg-[#15803d]", "text-white"));
};

loadAllCategory();
loadAllPlants();
