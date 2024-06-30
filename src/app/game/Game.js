import "@lib/types";
import "@app/types";
import EventEmitter from "@lib/EventEmitter";

/** @type GameStat **/
const INITIAL_GAME_STAT = {
  score: 0,
  datetime: 0,
  gametime: 0,
  clicks: 0,
  caught: 0,
  missed: 0,
};

export default class Game {
  _stats = INITIAL_GAME_STAT;
  _emitter = new EventEmitter();

  get stats() {
    return this._stats;
  }

  get isPaused() {
    return false;
  }

  start() {
    this._stats = {
      score: 111,
      datetime: Date.now(),
      gametime: 543,
      clicks: 150,
      caught: 5,
      missed: 7,
    };
  }

  finish() {}

  pause() {}

  resume() {}

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  on(event, listener) {
    this._emitter.on(event, listener);
  }
}
