/**
 * @callback KeyboardHandler
 * @param {KeyboardEvent} event
 * @param {...any} args
 */
/**
 * @callback KeyboardHandlerRemover
 * @param {KeyboardEvent} event
 * @param {...any} args
 */
/**
 * @param {Object<string,KeyboardHandler>} keysMap
 * @returns {function}
 */
export function keyboardController(keysMap) {
  const handler = (/** @type KeyboardEvent */ e) => keysMap[e.key]?.(e);
  document.body.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}
