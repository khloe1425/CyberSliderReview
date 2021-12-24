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
const startSlider = type => {
  const firstDiv = document.querySelector(".active");
  const lastDiv = document.querySelector(".last");
  let secondDiv = firstDiv.nextElementSibling;
  if (!secondDiv) {
    secondDiv = document.querySelector(".slider__container").firstElementChild;
  }
  firstDiv.classList.remove("active");
  lastDiv.classList.remove("last");
  secondDiv.classList.remove("next");

  if (type === "prev") {
    firstDiv.classList.add("next");
    lastDiv.classList.add("active");
    secondDiv = lastDiv.previousElementSibling;
    if (!secondDiv) {
      secondDiv = document.querySelector(".slider__container").lastElementChild;
    }
    secondDiv.classList.remove("next");
    secondDiv.classList.add("last");
    return;
  }
  firstDiv.classList.add("last");
  lastDiv.classList.add("next");
  secondDiv.classList.add("active");
}
document.querySelector(".next__btn").addEventListener("click", () => {
  startSlider();
});
document.querySelector(".prev__btn").addEventListener("click", () => {
  startSlider('prev');
});