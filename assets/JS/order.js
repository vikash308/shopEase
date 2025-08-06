document.addEventListener("DOMContentLoaded", () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log(orders)
  const ordersList = document.getElementById("ordersList");

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(order => {
    const item = document.createElement("div");
    item.className = "order-item";
    item.innerHTML = `
      <img src="${order.image}" alt="${order.name}">
      <div class="order-details">
        <h3>${order.name}</h3>
        <p><strong>Price:</strong> ${order.price}</p>
        <p><strong>Name:</strong> ${order.customerName}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <p><strong>Date:</strong> ${order.date}</p>
      </div>
    `;
    ordersList.appendChild(item);
  });
});
