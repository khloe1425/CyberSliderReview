import Data from "./Data.js";
const data = [...Data];

// Render from data
const renderData = () => {
  const contentInner = data?.reduce((content, people, index) => {
    const position = index === 0 ? "active" : index === (data.length - 1) ? "last" : "next";
    return content += `
      <article class="slider__item ${position}">
        <img src="${people.img}" alt="${people.name} IMG">
        <h4>${people.name}</h4>
        <p class="slider__job">${people.job}</p>
        <p class="slider__quote">${people.text}</p>
        <div class="slider__icon">
          <i class="fas fa-quote-right"></i>
        </div>
      </article>
    `;
  }, "");

  document.querySelector(".slider__container").innerHTML = contentInner;
}
renderData();

// Slideshow
const startSlider = (type = undefined) => {
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;
  if (!next) {
    next = document.querySelector(".slider__container").firstElementChild;
  }
  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if (type === "prev") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;
    if (!next) {
      next = document.querySelector(".slider__container").lastElementChild;
    }
    next.classList.remove("next");
    next.classList.add("last");
    return
  }
  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
}
document.querySelector(".next__btn").addEventListener("click", () => {
  startSlider();
})
document.querySelector(".prev__btn").addEventListener("click", () => {
  startSlider('prev');
})