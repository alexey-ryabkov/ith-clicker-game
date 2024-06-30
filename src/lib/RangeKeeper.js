import EventEmitter from "./EventEmitter";

/**
 * @param {number} min
 * @param {number} [max]
 * @return
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
      this._value = value ?? edge1;
      this._leftEdge = edge1;
      this._rightEdge = edge2;
    } else {
      this._getWithinRange = createRangeKeeper(0, edge1);
      this._value = value ?? 0;
      this._leftEdge = 0;
      this._rightEdge = edge1;
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

  get leftEdge() {
    return this._leftEdge;
  }

  get rightEdge() {
    return this._rightEdge;
  }

  /**
   * @param {number} [testValue]
   * @returns {boolean}
   */
  isOnEdge(testValue) {
    const value = testValue ?? this._value;
    return this.isOnLeftEdge(value) || this.isOnRightEdge(value);
  }

  /**
   * @param {number} [testValue]
   * @returns {boolean}
   */
  isOnLeftEdge(testValue) {
    const value = testValue ?? this._value;
    return value === this._leftEdge;
  }

  /**
   * @param {number} [testValue]
   * @returns {boolean}
   */
  isOnRightEdge(testValue) {
    const value = testValue ?? this._value;
    return value === this._rightEdge;
  }
}
