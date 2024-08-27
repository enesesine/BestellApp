let menuItems = JSON.parse(localStorage.getItem("cartItems")) || [
  {
    name: "Pizza Margherita",
    description: "Klassische Pizza mit Tomaten, Mozzarella und Basilikum",
    price: 8.99,
    amount: 0,
  },
  {
    name: "Spaghetti Carbonara",
    description: "Spaghetti mit Sahnesoße, Speck und Parmesan",
    price: 10.99,
    amount: 0,
  },
  {
    name: "Caesar Salad",
    description: "Salat mit Hähnchen, Croutons und Caesar-Dressing",
    price: 7.49,
    amount: 0,
  },
  {
    name: "Lasagne",
    description: "Mehrschichtige Pasta mit Fleischsoße und Bechamel",
    price: 12.99,
    amount: 0,
  },
  {
    name: "Tiramisu",
    description:
      "Traditionelles italienisches Dessert mit Mascarpone und Kaffee",
    price: 5.99,
    amount: 0,
  },
  {
    name: "Bruschetta",
    description: "Geröstetes Brot mit Tomaten, Knoblauch und Basilikum",
    price: 4.99,
    amount: 0,
  },
  {
    name: "Gnocchi al Pesto",
    description: "Weiche Kartoffelklöße mit Pesto-Sauce",
    price: 9.49,
    amount: 0,
  },
  {
    name: "Frittierte Calamari",
    description: "Köstliche, knusprige Calamari-Ringe",
    price: 6.99,
    amount: 0,
  },
];

function loadMenu() {
  const dishContainer = document.getElementById("dishContainer");
  dishContainer.innerHTML = menuItems
    .map((item, index) => createDishHTML(item, index))
    .join("");
  updateCart();
}

function createDishHTML(item, index) {
  return `
    <div class="dishStyleContainer">
      <div class="dishStyleContent">
        <h2>${item.name}</h2>
        <button class="addToCartButton" onclick="addToCart(${index})">+</button>
      </div>
      <p class="dishDescription">${item.description}</p>
      <p class="price">${item.price.toFixed(2)} €</p>
    </div>
  `;
}

function updateCart() {
  const cart = document.getElementById("cart");
  const showCartButton = document.getElementById("showCartButton");
  const cartOverlay = document.getElementById("cartOverlay");

  cart.innerHTML = '<div class="cartHeadline"><h3>Warenkorb</h3></div>';
  let totalPrice = 0;
  let hasItems = false;

  cart.innerHTML += menuItems
    .filter((item) => item.amount > 0)
    .map((item, index) => {
      hasItems = true;
      const itemTotalPrice = (item.price * item.amount).toFixed(2);
      totalPrice += item.price * item.amount;
      return createCartItemHTML(item, itemTotalPrice, index);
    })
    .join("");

  const deliveryCost = totalPrice < 20 ? 2 : 0;
  const totalAmount = (totalPrice + deliveryCost).toFixed(2);
  const deliveryCostText = deliveryCost > 0 ? `Davon Lieferkosten: 2,00 €` : "";

  cart.innerHTML += `
    <div class="cartTotal">
      <div>Gesamtpreis: ${totalAmount} €</div>
      <div>${deliveryCostText}</div>
    </div>
  `;

  if (hasItems) {
    cart.innerHTML += `
      <button class="orderButton" onclick="showOrderDialog()">Bestellen</button>
    `;
  } else {
    cart.innerHTML += "<p>Ihr Warenkorb ist noch leer.</p>";
  }

  showCartButton.textContent = `Warenkorb ansehen (${menuItems.reduce(
    (sum, item) => sum + item.amount,
    0
  )})`;
  cartOverlay.querySelector("#cart").innerHTML = cart.innerHTML;
  localStorage.setItem("cartItems", JSON.stringify(menuItems));
}

function createCartItemHTML(item, itemTotalPrice, index) {
  return `
    <div class="cartItem">
      <span>${item.name}</span>
      <div class="quantityControl">
        <button class="decrease" onclick="changeAmount(${index}, -1)">-</button>
        <span>${item.amount}</span>
        <button class="increase" onclick="changeAmount(${index}, 1)">+</button>
      </div>
      <span>${itemTotalPrice} €</span>
    </div>
  `;
}

function addToCart(index) {
  menuItems[index].amount++;
  updateCart();
}

function changeAmount(index, change) {
  menuItems[index].amount = Math.max(0, menuItems[index].amount + change);
  updateCart();
}

function showOrderDialog() {
  const hasItems = menuItems.some((item) => item.amount > 0);

  if (hasItems) {
    document.getElementById("orderDialog").style.display = "block";
  } else {
    alert("Bitte Gerichte hinzufügen, bevor Sie bestellen.");
  }
}

function closeOrderDialog() {
  document.getElementById("orderDialog").style.display = "none";
  menuItems.forEach((item) => (item.amount = 0));
  updateCart();
}

function toggleCart() {
  const cartOverlay = document.getElementById("cartOverlay");
  const showCartButton = document.getElementById("showCartButton");

  if (cartOverlay.style.display === "block") {
    cartOverlay.style.display = "none";
    showCartButton.style.display = "block";
  } else {
    cartOverlay.style.display = "block";
    showCartButton.style.display = "none";
  }
}

window.onload = loadMenu;
