import "regenerator-runtime" /* for async await transpile */
import "../styles/style.scss"
import data from "../DATA.json"

const hamburger = document.querySelector(".header__button")
const drawer = document.querySelector(".drawer")
const overlay = document.querySelector(".overlay")
const header = document.querySelector(".header")
const headerLogo = document.querySelector(".header__logo a")
const headerMenus = document.querySelectorAll(".header__link")
let restaurant = document.querySelector(".restaurant__grid")

// Animate Navbar
const navbarAnimating = (section) => {
  // Check scroll position
  window.onscroll = () => {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
    ) {
      // Add white class
      header.classList.add("white")
      headerLogo.classList.add("white")
      headerMenus.forEach((menu) => {
        menu.classList.add("white")
      })
      hamburger.classList.add("white")
    } else {
      // remove white class
      header.classList.remove("white")
      headerLogo.classList.remove("white")
      headerMenus.forEach((menu) => {
        menu.classList.remove("white")
      })
      hamburger.classList.remove("white")
    }
  }
}

navbarAnimating()

// Show Overlay
const showOverlay = () => {
  overlay.classList.toggle("show")
  overlay.addEventListener("click", () => {
    drawer.classList.remove("open")
    overlay.classList.remove("show")
  })
}

// Show Drawer
const openDrawer = (event) => {
  drawer.classList.toggle("open")
  showOverlay()
  event.stopPropagation()
}

hamburger.addEventListener("click", openDrawer)

// catalogue card
const card = (restaurant) => {
  let restaurantContainer = ""
  // Change rating into array e.g 5 to [1,2,3,4,5]
  const rating = [...Array(Math.round(restaurant.rating)).keys()]

  // Add Stars
  let stars = ""
  rating.forEach((rt) => {
    stars += `<i class="fas fa-star"></i>`
  })
  restaurantContainer += `
  <div class="restaurant__card">
        <img
          src='${restaurant.pictureId}'
          alt="${restaurant.name}"
          class='restaurant__image'
          tabindex="0"
        />
        <div class="restaurant__data">
          <h2 class="restaurant__name" tabindex="0">${restaurant.name}</h2>
          <h2 class="restaurant__city" tabindex="0">${restaurant.city}</h2>
          <h3 class="restaurant__rating" tabindex="0" aria-label='${
            rating.length
          } stars restaurant'>${stars}</h3>
          <p class="restaurant__description" tabindex="0">${restaurant.description.substring(
            0,
            399
          )}</p>
        </div>
      </div>
      `

  return restaurantContainer
}

// Fetch data restaurant
const fetchRestaurant = () => {
  let temp = ""
  data.restaurants.map((restaurant) => {
    temp += card(restaurant)
  })
  return temp
}

const restaurantList = fetchRestaurant()
restaurant.innerHTML = restaurantList
