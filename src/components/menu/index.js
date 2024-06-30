const { getAbsPath } = require("@utils/getAbsPath");

document.addEventListener("DOMContentLoaded", () => {
  /** @type HTMLAnchorElement[] **/
  const menuLinks = Array.from(
    document.body.querySelectorAll(".menu__item") ?? [],
  );
  menuLinks.forEach((link) =>
    link.setAttribute("href", getAbsPath(link.getAttribute("href") ?? "")),
  );
});
