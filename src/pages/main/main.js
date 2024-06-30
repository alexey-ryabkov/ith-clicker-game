import "@components/carousel";

document.addEventListener("DOMContentLoaded", () => {
  document.body
    .querySelector(".main__button")
    ?.addEventListener("click", () => location.replace("/game/"));
});
