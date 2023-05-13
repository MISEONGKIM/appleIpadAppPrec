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
  document.documentElement.classList.add("fixed");
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
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

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
