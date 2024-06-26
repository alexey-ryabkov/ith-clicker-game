import { toggleClsInList } from "@utils-kit";

document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelectorAll(".tabs").forEach((tabs) => {
    /** @type HTMLElement[] **/
    const tabItems = Array.from(tabs.querySelectorAll(".tabs__tab") ?? []);
    tabItems.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();

        const choosedTab = /** @type {HTMLElement} */ (e.currentTarget);
        const activeNum = tabItems.indexOf(choosedTab);

        /** @type HTMLElement[] **/
        const tabsContents = Array.from(
          tabs.querySelectorAll(".tabs__content") ?? [],
        );

        toggleClsInList(tabItems, choosedTab, "tabs__tab_active");
        toggleClsInList(tabsContents, activeNum, "tabs__content_opened");
      });
    });
  });
});
