document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelectorAll(".tabs").forEach((tabs) => {
    const tabItems = tabs.querySelectorAll(".tabs__tab");
    console.log(tabItems);

    tabItems.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();

        let activeNum = 0;
        const choosedTab = /** @type {Element} */ (e.currentTarget);

        tabItems.forEach((tab, num) => {
          if (tab !== choosedTab) {
            tab.classList.remove("tabs__tab_active");
          } else {
            tab.classList.add("tabs__tab_active");
            activeNum = num;
          }
        });
        document.querySelectorAll(".tabs__content").forEach((content, num) => {
          if (num !== activeNum) {
            content.classList.remove("tabs__content_opened");
          } else {
            content.classList.add("tabs__content_opened");
          }
        });
      });
    });
  });
});
