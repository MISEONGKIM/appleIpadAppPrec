import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
    return;
  }
  showBasket();
});

basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}

function hideBasket() {
  basketEl.classList.remove("show");
}

const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const shadowEl = searchWrapEl.querySelector(".shadow");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];
const searchInputEl = searchWrapEl.querySelector("input");

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
shadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    //일정 시간이 지난 후 transition이 실행되도록
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    playScroll();
    return;
  }
  headerEl.classList.add("menuing");
  stopScroll();
});
//요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => entry.isIntersecting && entry.target.classList.add("show")
  );
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((info) => {
  io.observe(info);
});

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  pauseBtn.classList.remove("hide");
  playBtn.classList.add("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  const colorList = ipad.colors.reduce(
    (acc, color) => (acc += `<li style="background-color : ${color};"></li>`),
    ""
  );
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  const mapList = nav.maps.reduce(
    (acc, map) =>
      (acc += /* html */ `<li>
    <a href="${map.url}">${map.name}</a>
  </li>`),
    ""
  );
  mapEl.innerHTML = /*html */ `
    <h3>
      <span class='text'>${nav.title}</span>
    </h3>
    <ul>${mapList}</ul>
  `;
  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
