const currentPage = window.location.pathname; // Get the current page URL
const menuItems = document.querySelectorAll("#header-menu li");

menuItems.forEach((item) => {
  const link = item.querySelector("a");
  if (link.getAttribute("href") === currentPage) {
    item.classList.add("active");
  }
});

window.addEventListener("scroll", function () {
  var header = document.getElementById("mainHeader");
  var yOffset = window.pageYOffset;

  if (yOffset > 50) {
    // Change 50 to the scroll position where you want the color to change
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

var currentUrl = window.location.href;
var activemenuItems = document.querySelectorAll(".navigation__menu a");

activemenuItems.forEach(function (link) {
  if (currentUrl.includes(link.href)) {
    link.classList.add("active");
  }
});




