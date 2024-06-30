import RangeKeeper from "@lib/RangeKeeper";
import { toggleClsInList } from "@utils-kit";
import { keyboardController } from "@utils/keyboardController";

/**
 * @param {HTMLElement|null} btn
 * @param {boolean} flag
 */
function toggleBtn(btn, flag) {
  btn?.classList.toggle("carousel__navBtn_inactive", !flag);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelectorAll(".carousel").forEach((carousel) => {
    /** @type HTMLElement[] **/
    const slides = Array.from(
      carousel.querySelectorAll(".carousel__slide") ?? [],
    );

    const { length: slidesCnt } = slides;
    if (slidesCnt > 1) {
      /** @type HTMLElement[] **/
      const pages = Array.from(
        carousel.querySelectorAll(".carousel__page") ?? [],
      );
      /** @type HTMLElement|null **/
      const prevButton = carousel.querySelector(".carousel__navBtn_prev");
      /** @type HTMLElement|null **/
      const nextButton = carousel.querySelector(".carousel__navBtn_next");

      const setBtnActivity = () => {
        if (activeSlideNum.isOnLeftEdge()) {
          toggleBtn(prevButton, false);
          toggleBtn(nextButton, true);
        } else if (activeSlideNum.isOnRightEdge()) {
          toggleBtn(prevButton, true);
          toggleBtn(nextButton, false);
        } else {
          toggleBtn(prevButton, true);
          toggleBtn(nextButton, true);
        }
      };
      const setSlide = () => {
        toggleClsInList(slides, activeSlideNum.value, "carousel__slide_active");
        slides[0].style.marginLeft = `-${activeSlideNum.value * 100}%`;
      };
      const setPage = () =>
        toggleClsInList(pages, activeSlideNum.value, "carousel__page_active");
      const refreshSlider = () => {
        setSlide();
        setPage();
        setBtnActivity();
      };

      const activeSlideNum = new RangeKeeper(slidesCnt - 1);
      activeSlideNum.on("changed", refreshSlider);
      refreshSlider();

      keyboardController({
        ArrowLeft: () => activeSlideNum.value--,
        ArrowRight: () => activeSlideNum.value++,
      });

      pages.forEach((page) => {
        page.addEventListener("click", (e) => {
          e.preventDefault();
          const choosedPage = /** @type {HTMLElement} */ (e.currentTarget);
          // const icon = choosedPage.querySelector('i');
          activeSlideNum.value = pages.indexOf(choosedPage);
        });
      });
      prevButton?.addEventListener("click", (e) => {
        e.preventDefault();
        activeSlideNum.value--;
      });
      nextButton?.addEventListener("click", (e) => {
        e.preventDefault();
        activeSlideNum.value++;
      });
    }
  });
});
