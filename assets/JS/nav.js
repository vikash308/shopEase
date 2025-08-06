// Shared navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const setupMobileMenu = () => {
    const toggleBtn = document.getElementById("menuToggle");
    const nav = document.querySelector(".nav-icons");
    
    if (toggleBtn && nav) {
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nav.classList.toggle("toggle");
      });

      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)){
          nav.classList.remove("toggle");
        }
      });
    }
  };

  setupMobileMenu();
  setupLogo();
  setupNavButtons();
});

let searchBtn = document.getElementById("searchBtn")
let searchBar = document.getElementById("searchBar")

console.log(searchBar , searchBtn)

searchBtn.addEventListener("click", performSearch)
searchBar.addEventListener("keypress", (e)=>{
  if(e.key == "Enter") performSearch();
})


  function performSearch() {
    const input = searchBar.value.trim().toLowerCase();
    if (input) {
      localStorage.setItem("searchQuery", input);
      window.location.href = "search.html";
    }
  }
