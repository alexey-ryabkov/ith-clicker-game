import "@components/menu";
import "@components/carousel";
import { getAbsPath } from "@utils/getAbsPath";

document.addEventListener("DOMContentLoaded", () => {
  document.body
    .querySelector(".main__button")
    ?.addEventListener("click", () => location.replace(getAbsPath("/game/")));
});
