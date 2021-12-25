import Data from "./Data.js";
const data = [...Data];

// Render from data
const renderData = () => {
  const contentInner = data?.reduce((content, people, index) => {
    return content += `
      <article class="${index+1} slider__item">
        <div>
          <img src="${people.img}" alt="${people.name} IMG">
          <h4>${people.name}</h4>
          <p class="slider__job">${people.job}</p>
          <p class="slider__quote">${people.text}</p>
          <div class="slider__icon">
            <i class="fas fa-quote-right"></i>
          </div>
        </div>
      </article>
    `;
  }, "");

  document.querySelector(".slider__content").innerHTML = contentInner;
}
renderData();

// Slideshow
const sliderViewport = document.querySelector(".slider__viewport");
const slider = document.querySelector(".slider__content");
const next = document.querySelector(".next__btn");
const prev = document.querySelector(".prev__btn");
let direction = 0;

next.addEventListener("click", () => {
  if (direction === 1) {
    slider.prepend(slider.lastElementChild);
  };
  direction = -1;
  sliderViewport.style.justifyContent = "flex-start";
  slider.style.transform = "translate(calc(-100% / 3))";

  // Opacity effect
  slider.firstElementChild.classList.add("fade__out");
  slider.firstElementChild.nextElementSibling.classList.add("fade__in");
});

prev.addEventListener("click", () => {
  if (direction === -1 || direction === 0) {
    direction = 1;
    slider.appendChild(slider.firstElementChild);
    sliderViewport.style.justifyContent = "flex-end";
  }
  slider.style.transform = "translate(calc(100% / 3))";
  slider.lastElementChild.classList.add("fade__out");
  slider.firstElementChild.nextElementSibling.classList.add("fade__in");
});

slider.addEventListener("transitionend", () => {
  // Get the last element and append it to the front
  if (direction === 1) {
    slider.prepend(slider.lastElementChild);
  } else {
    slider.appendChild(slider.firstElementChild);
  }

  slider.style.transition = "none";
  slider.style.transform = "translate(0)";
  setTimeout(() => {
    slider.style.transition = "all 0.5s ease-in-out";
  });

  // Remove opacity effect
  const arr = document.querySelectorAll(".slider__item");
  arr.forEach(item => {
    if(item.classList.contains("fade__in")){
      item.classList.remove("fade__in");
    }
    if(item.classList.contains("fade__out")){
      item.classList.remove("fade__out");
    }
  });
});