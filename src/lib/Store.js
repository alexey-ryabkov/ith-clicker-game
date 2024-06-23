import EventEmitter from "./EventEmitter";
import { isPlainObject } from "@utils/index";

export class Store {
  /**
   * @type string[]
   */
  _serialized = [];
  /**
   * @type Storage
   */
  _storage = window.localStorage;
  _emitter = new EventEmitter();

  /**
   * @param {string} key
   * @param {Object|string} value
   */
  set(key, value) {
    const oldValue = this._storage.getItem(key);
    const newValue = value;

    if (isPlainObject(value)) {
      value = JSON.stringify(value);
      this._serialized.push(key);
    }
    this._storage.setItem(key, /** @type {string} */ (value));
    this._emitter.emit("refreshed");
    this._emitter.emit(oldValue === null ? "added" : "changed", key, newValue);
  }

  /**
   * @param {string} key
   * @return {Object|string|null}
   */
  get(key) {
    let value = this._storage.getItem(key);
    if (value && this._serialized.includes(key)) {
      value = JSON.parse(value);
    }
    return value;
  }

  /**
   * @param {string} key
   */
  remove(key) {
    if (this._serialized.includes(key)) {
      delete this._serialized[this._serialized.indexOf(key)];
    }
    this._storage.removeItem(key);
    this._emitter.emit("refreshed");
    this._emitter.emit("removed", key);
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  isset(key) {
    return !!this._storage?.[key];
  }

  clear() {
    this._storage.clear();
    this._emitter.emit("refreshed");
    this._emitter.emit("cleared");
  }

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  on(event, listener) {
    this._emitter.on(event, listener);
  }
}

export default Store;
