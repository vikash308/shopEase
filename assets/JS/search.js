 const query = localStorage.getItem("searchQuery") || "";
    const resultsDiv = document.getElementById("random");
    
    fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        const products = data.products;
        const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    console.log(filtered)

        resultsDiv.innerHTML = "";

        if (filtered.length > 0) {
          filtered.forEach(product => {
            const div = document.createElement("div");
            div.className = "random-card";
            div.innerHTML =  `
        <img src="${product.images[0]}" alt="" srcset="">
        <p>${product.title}</p>
        <p><b>₹${product.price}</b></p>
        <div class="rating">${product.rating} &star;</div>
        <span>${product.minimumOrderQuantity} ratings</span>
        </div>`;
            resultsDiv.appendChild(div);
          });
        } else {
          resultsDiv.innerHTML = "<p>No item found</p>";
        }
      })
      .catch(error => {
        resultsDiv.innerHTML = "<p>Error loading products.</p>";
        console.error("API Error:", error);
      });