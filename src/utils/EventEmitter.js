export default class EventEmitter {
  /**
   * @callback EventHandler
   * @param {...any} args
   * @return {void}
   *
   * @typedef {Object.<string, EventHandler[]>} Events
   */

  /**
   * @type Events
   */
  events = {};

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  /**
   * @param {string} event
   * @param {...any} args
   */
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(...args);
      });
    }
  }

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }
}
