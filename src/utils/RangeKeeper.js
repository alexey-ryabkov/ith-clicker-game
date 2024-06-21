import EventEmitter from "./EventEmitter";

/**
 * @param {number} min
 * @param {number} [max]
 * @returns
 */
export const createRangeKeeper = (min, max) => (/** @type {number} */ value) =>
  Math.max(min, Math.min(max ?? Infinity, value));

export default class RangeKeeper extends EventEmitter {
  _value = 0;

  /**
   * @param {number} edge1 from value or to value (for ranges from zero and zero as current value)
   * @param {number} [edge2] to value
   * @param {number} [value] current value
   */
  constructor(edge1, edge2, value) {
    super();
    if (edge2 !== undefined) {
      this._getWithinRange = createRangeKeeper(edge1, edge2);
      this.value = value ?? edge1;
    } else {
      this._getWithinRange = createRangeKeeper(0, edge1);
    }
  }

  get value() {
    return this._value;
  }

  set value(newVal) {
    newVal = this._getWithinRange(newVal);
    if (this._value !== newVal) {
      this._value = newVal;
      this.emit("changed", newVal);
    }
  }
}
