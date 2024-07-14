'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);



/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);



//Market Upadates

document.addEventListener('DOMContentLoaded', () => {
  const fetchCryptoData = async () => {
    try {
      const response = await fetch('http://localhost:3000/crypto');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No data found');
      }

      const bitcoin = data.find(coin => coin.symbol === 'BTC'); // Find Bitcoin by symbol
      if (!bitcoin) {
        throw new Error('Bitcoin data not found');
      }

      const price = bitcoin.quote.USD.price.toFixed(2);
      const change = bitcoin.quote.USD.percent_change_24h.toFixed(2);
      const marketCap = bitcoin.quote.USD.market_cap.toFixed(2);

      document.getElementById('bitcoin-price').textContent = `$${parseFloat(price).toLocaleString()}`;
      document.getElementById('bitcoin-change').textContent = `${change > 0 ? '+' : ''}${change}%`;
      document.getElementById('bitcoin-market-cap').textContent = `$${parseFloat(marketCap).toLocaleString()}`;

      document.getElementById('bitcoin-change').className = change >= 0 ? 'table-data last-update green' : 'table-data last-update red';
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  };

  fetchCryptoData();
  setInterval(fetchCryptoData, 30000); // Update every minute
});
