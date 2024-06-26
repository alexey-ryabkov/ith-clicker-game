import "@lib/types";

export default class EventEmitter {
  /** @type Events **/
  events = {};
  /** @type string[] **/
  _availiableEvents = [];

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  on(event, listener) {
    if (!this._checkEvent(event)) throw new Error(`Unknown event ${event}`);
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
    if (!this._checkEvent(event)) throw new Error(`Unknown event ${event}`);
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

  /**
   * @param {string} event
   */
  _checkEvent(event) {
    return (
      !this._availiableEvents.length || this._availiableEvents.includes(event)
    );
  }
}
