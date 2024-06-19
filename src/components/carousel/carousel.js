// @ts-nocheck
console.log("carousel");

const activeSlide = document.querySelector(".carousel__slide_active");
const leftButton = document.querySelector(".carousel__button_prev");
const rightButton = document.querySelector(".carousel__button_next");
// const leftButtonSmall = document.querySelector(".carousel-left-small");
// const rightButtonSmall = document.querySelector(".carousel-right-small");
const imageContainer = document.querySelector(".carousel__slidesContainer");

let track = 0;
let counter = 1;

const moveImagesLeft = function () {
  if (counter < imageContainer.childElementCount) {
    counter++;
    track = track - 100;
    activeSlide.style.marginLeft = `${track}%`;
  }
};

const moveImagesRight = function () {
  if (counter > 1) {
    counter--;
    track = track + 100;
    activeSlide.style.marginLeft = `${track}%`;
  }
};

rightButton.addEventListener("click", () => {
  moveImagesLeft();
});

// rightButtonSmall.addEventListener("click", () => {
//   moveImagesLeft();
// });

leftButton.addEventListener("click", () => {
  moveImagesRight();
});

// leftButtonSmall.addEventListener("click", () => {
//   moveImagesRight();
// });
