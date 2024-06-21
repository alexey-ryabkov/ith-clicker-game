/**
 * @param {HTMLElement[]} list
 * @param {HTMLElement|number} toggled
 * @param {string} cls
 * @returns
 */
function toggleClsInList(list, toggled, cls) {
  list.forEach((item, num) => {
    const isItemToggled = Number.isFinite(toggled)
      ? num === toggled
      : item === toggled;
    if (!isItemToggled) {
      item.classList.remove(cls);
    } else {
      item.classList.add(cls);
    }
  });
}
export { toggleClsInList };
