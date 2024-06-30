import pages from "@pages";

const pageNames = pages.map(({ name }) => name);
const basePath = `/${location.pathname
  .split("/")
  .filter((item) => !!item)
  .filter(
    (pathItem) => !pageNames.includes(pathItem) && pathItem !== "index.html",
  )
  .join("/")}`;

export function getAbsPath(pathname = "/") {
  return `${basePath}${pathname}`.replace("//", "/");
}
