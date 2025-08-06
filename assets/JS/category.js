 let url = "https://dummyjson.com/products/category/"
    let data;
    let value = localStorage.getItem("value")
    let random = document.querySelector("#random");

    window.addEventListener("load", async () => {
      let res = await fetch(url + value);
      data = await res.json();
      console.log(data.products)
      displayData();
    })

    function displayData() {
      data.products.forEach(product => {
        document.querySelector("h1").innerText = value

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
            window.location.href = "product.html";
        });
      });
    }