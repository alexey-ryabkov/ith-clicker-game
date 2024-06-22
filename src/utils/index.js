/**
 * @param {HTMLElement[]} list
 * @param {HTMLElement|number} toggled
 * @param {string} cls
 * @returns
 */
export function toggleClsInList(list, toggled, cls) {
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

/**
 * @typedef {[string, string, string]} NumeralItemVariants
 */
/**
 * @param {number} number
 * @param {NumeralItemVariants} variants
 * @returns {string}
 */
export function formatNumeralItem(number, variants) {
  let result = `${number} `;
  number %= 100;
  if (number >= 11 && number <= 19) {
    result += variants[2];
  } else {
    switch (number % 10) {
      case 1:
        result += variants[0];
        break;
      case 2:
      case 3:
      case 4:
        result += variants[1];
        break;
      default:
        result += variants[2];
    }
  }
  return result;
}

/**
 * @param {number} ms
 * @returns {string}
 */
export function formatTime(ms) {
  const SECONDS_IN_MINUTE = 60;
  const MS_IN_SECOND = 1000;

  const offset =
    new Date().getTimezoneOffset() * SECONDS_IN_MINUTE * MS_IN_SECOND;
  const time = new Date(ms + offset).toLocaleTimeString();

  return time.replace(/^(00:)?/, "");
}
