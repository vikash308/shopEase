document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  currentProduct = {
  id: Date.now(),
  name: product.title,
  price:  product.price,
  image: product.images[0]
  }
  
  const heart = document.querySelector("#first .fa-heart");

  if (!product) {
    alert("No product found");
    window.location.href = "index.html";
    return;
  }

  function renderProduct() {
    const img = document.createElement("img");
    img.src = product.image || (product.images?.[0] ?? "fallback.jpg");
    document.getElementById("first").prepend(img);

    document.querySelector(".item-detail").innerHTML = `
      <h2>${product.title}</h2>
      <p><b>₹${product.price}</b></p>
      <div class="rating">${product.rating?.rate ?? 0} &star;</div>
      <span>${product.rating?.count ?? 0} ratings</span>
      `;

    document.querySelector(".description").innerHTML = `
      <h2>Description</h2>
      <p>${product.description}</p>
      `;

    document.querySelector(".icons p").innerText = product.returnPolicy || "10 Days Return";
    document.querySelector("#warrenty p").innerText = product.warrantyInformation || "1 Year Warranty";

    const reviewBox = document.getElementById("review");
    reviewBox.innerHTML = "";
    if (product.reviews && product.reviews.length) {
      product.reviews.forEach((review) => {
        let stars = "";
        for (let i = 0; i < 5; i++) {
          stars += i < review.rating
            ? `<i class="fa-solid fa-star"></i>`
            : `<i class="fa-regular fa-star"></i>`;
        }

        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
          <div class="review-user">
            <div>
                <h4>${review.reviewerName}</h4>
                <div class="stars">${stars}</div>
                </div>
                </div>
                <p class="review-comment">“${review.comment}”</p>
                <div class="review-footer">
                  <span class="verified"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>
                  <span class="date">${review.date?.slice(0, 10) ?? "2025-01-01"}</span>
                  </div>
                  `;
        reviewBox.appendChild(div);
      });
    } else {
      reviewBox.innerHTML = `<p>No reviews yet.</p>`;
    }
  }

  // Wishlist functionality
  const setupWishlist = () => {
    if (!heart) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isWishlisted = wishlist.some(item => item.id === product.id);

    heart.classList.toggle("fa-solid", isWishlisted);
    heart.classList.toggle("fa-regular", !isWishlisted);

    heart.addEventListener("click", () => {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const index = wishlist.findIndex(item => item.id === product.id);

      if (index === -1) {
        wishlist.push(product);
        heart.classList.replace("fa-regular", "fa-solid");
      } else {
        wishlist.splice(index, 1);
        heart.classList.replace("fa-solid", "fa-regular");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  };

  
  let buyNow = document.querySelector("#buyNow")
  buyNow.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "block";

  })
  document.querySelector(".fa-xmark").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  })

  document.getElementById("buyNowForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (name && email && phone && address && payment) {
      alert("Order placed successfully!\nThank you, " + name);
      this.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
  renderProduct();
  setupWishlist();
});

let currentProduct;

document.getElementById("buyNowForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const order = {
    ...currentProduct,
    customerName: document.getElementById("name").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    payment: document.getElementById("payment").value,
    date: new Date().toISOString().split("T")[0]
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed!");
  closeBuyNowForm();
});
function openBuyNowForm() {
  document.querySelector(".overlay").style.display = "flex";
}

function closeBuyNowForm() {
  document.querySelector(".overlay").style.display = "none";
}


document.querySelector("#cartBtn").addEventListener("click",addToCart)

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.id === currentProduct.id);
  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...currentProduct, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}



