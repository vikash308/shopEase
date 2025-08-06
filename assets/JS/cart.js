document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = Number(item.price) * item.quantity;
        total += parseFloat(itemTotal);
        console.log(total)

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
        </div>
        <div class="cart-item-actions">
          <input type="number" min="1" value="${item.quantity}" data-index="${index}">
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartTotal.innerText = `₹${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cartTotal)
  }

  // Make removeItem globally accessible
  window.removeItem = (index) => {
    cart.splice(index, 1);
    updateCartDisplay();
  };

  // Update quantity
  cartItemsContainer.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT" && e.target.type === "number") {
      const index = e.target.dataset.index;
      const qty = parseInt(e.target.value);
      if (qty >= 1) {
        cart[index].quantity = qty;
        updateCartDisplay();
      }
    }
  });

  updateCartDisplay();
});
