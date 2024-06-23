document.addEventListener("DOMContentLoaded", () => {
  /**
   * @type HTMLElement|null
   */
  const container = document.body.querySelector(".gameResults");
  /**
   * @type HTMLElement|null
   */
  const newGameBtn =
    container?.querySelector(".gameResults__newGameBtn") ?? null;
  newGameBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
});
