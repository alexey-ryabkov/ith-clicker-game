/**
 * @param {HTMLElement[]} list
 * @param {HTMLElement|number} toggled
 * @param {string} cls
 * @return
 */
function toggleClsInList(list, toggled, cls) {
  list.forEach((item, num) => {
    const flag = Number.isFinite(toggled) ? num === toggled : item === toggled;
    item.classList.toggle(cls, flag);
  });
}
/**
 * @typedef {[string, string, string]} NumeralItemVariants
 */
/**
 * @param {number} number
 * @param {NumeralItemVariants} variants
 * @return {string}
 */
function formatNumeralItem(number, variants) {
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
 * @return {string}
 */
function formatTime(ms) {
  const SECONDS_IN_MINUTE = 60;
  const MS_IN_SECOND = 1000;

  const offset =
    new Date().getTimezoneOffset() * SECONDS_IN_MINUTE * MS_IN_SECOND;
  const time = new Date(ms + offset).toLocaleTimeString();

  return time.replace(/^(00:)?/, "");
}
/**
 * @param {unknown} value
 * @return {boolean}
 */
function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}
/**
 * @param {Date} [date]
 * @returns string
 */
function prettyDateTime(date = new Date()) {
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedTime}, ${formattedDate}`;
}
/**
 * @param {HTMLInputElement} item
 * @param {boolean} [flag]
 */
function toggleDisabled(item, flag) {
  item.disabled = flag === undefined ? !item.disabled : flag;
}

module.exports = {
  toggleClsInList,
  formatNumeralItem,
  isPlainObject,
  formatTime,
  prettyDateTime,
  toggleDisabled,
};
