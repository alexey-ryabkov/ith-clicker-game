/**
 * @param {HTMLElement|null} item
 * @param {boolean} flag
 */
function toggleItem(item, flag) {
  /** @type HTMLElement|null **/
  const itemDetails = item?.querySelector(".accordion__itemDetails") ?? null;

  if (flag) {
    item?.classList.add("accordion__item_open");
    itemDetails &&
      (itemDetails.style.maxHeight = `${itemDetails.scrollHeight}px`);
  } else {
    item?.classList.remove("accordion__item_open");
    itemDetails && (itemDetails.style.maxHeight = "");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelectorAll(".accordion").forEach((accordion) => {
    /** @type HTMLElement[] **/
    const accordionItems = Array.from(
      accordion.querySelectorAll(".accordion__item") ?? [],
    );
    accordionItems.forEach((accordionItem) => {
      if (accordionItem.classList.contains("accordion__item_open")) {
        toggleItem(accordionItem, true);
      }

      accordionItem.addEventListener("click", (e) => {
        const choosedItem = /** @type {HTMLElement} */ (e.currentTarget);
        const isOpened = choosedItem.classList.contains("accordion__item_open");

        toggleItem(accordionItem, !isOpened);
        if (isOpened) {
          accordionItems
            .filter((item) => item !== accordionItem)
            .forEach((item) => {
              toggleItem(item, false);
            });
        }
      });
    });
  });
});
