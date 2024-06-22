import { toggleClsInList } from "@utils-kit";
import RangeKeeper from "@utils/RangeKeeper";

document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelectorAll(".carousel").forEach((carousel) => {
    /**
     * @type {HTMLElement[]}
     */
    const slides = Array.from(
      carousel.querySelectorAll(".carousel__slide") ?? [],
    );

    const { length: slidesCnt } = slides;
    if (slidesCnt > 1) {
      const activeSlideNum = new RangeKeeper(slidesCnt - 1);
      activeSlideNum.on("changed", (slideNum) => {
        setSlide(slideNum);
        setPage(slideNum);
      });

      /**
       * @type {HTMLElement[]}
       */
      const pages = Array.from(
        carousel.querySelectorAll(".carousel__page") ?? [],
      );
      const prevButton = carousel.querySelector(".carousel__navBtn_prev");
      const nextButton = carousel.querySelector(".carousel__navBtn_next");

      pages.forEach((page) => {
        page.addEventListener("click", (e) => {
          e.preventDefault();

          const choosedPage = /** @type {HTMLElement} */ (e.target);
          activeSlideNum.value = pages.indexOf(choosedPage);
        });
      });
      prevButton?.addEventListener("click", () => activeSlideNum.value--);
      nextButton?.addEventListener("click", () => activeSlideNum.value++);

      const setSlide = (/** @type {number} */ slideNum) => {
        toggleClsInList(slides, slideNum, "carousel__slide_active");
        slides[0].style.marginLeft = `-${slideNum * 100}%`;
      };
      const setPage = (/** @type {number} */ slideNum) =>
        toggleClsInList(pages, slideNum, "carousel__page_active");
    }
  });
});
