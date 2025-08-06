let data;
const url = "https://dummyjson.com/products";

// Fetch and display products
const fetchProducts = async () => {
  try {
    const res = await fetch(url);
    data = await res.json();
    displayData(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  displayData();
};

function displayData() {

  document.querySelector("#loader").style.display = "none"
    data.products.forEach(product => {

        let div2 = document.createElement("div")
        div2.classList.add("random-card")
        random.appendChild(div2);
        div2.innerHTML = `
        <img src="${product.images[0]}" alt="" srcset="">
        <p>${product.title}</p>
        <p><b>₹${product.price}</b></p>
        <div class="rating">${product.rating} &star;</div>
        <span>${product.minimumOrderQuantity} ratings</span>
        </div>`

        div2.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product.html"
        });
    });
}

let categories = document.querySelectorAll(".image");
let value;
categories.forEach(e=>{
    e.addEventListener("click", ()=>{
         value = e.querySelector("p").innerText;
         localStorage.setItem("value",value)
    })
})
// Initialize
window.addEventListener('load', fetchProducts);