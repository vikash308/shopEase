const wishlistContainer = document.getElementById("wishlistItems");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = "<p>No items in your wishlist yet.</p>";
    } else {
      wishlist.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("wishlist-card");

        card.innerHTML = `
          <img src="${item.image || item.images?.[0]}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p><b>₹${item.price}</b></p>
          <div class="rating">${item.rating} &star;</div>
          <button onclick="viewProduct('${item.id}')">View Product</button>
        `;

        wishlistContainer.appendChild(card);
      });
    }

    function viewProduct(id) {
      const product = wishlist.find(p => p.id == id);
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      }
    }