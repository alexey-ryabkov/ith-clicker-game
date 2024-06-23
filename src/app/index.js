import "@app/types";
import Store from "@lib/Store";
import EventEmitter from "@lib/EventEmitter";

export default new (class {
  _store = new Store();
  _emitter = new EventEmitter();

  /**
   * @type GameStat[]
   */
  _stats = [];

  //  _user;
  //  constructor() {
  //    // super();
  //    //    this._user = this._store.get("user");
  //  }

  get user() {
    return /** @type {string|null} */ (this._store.get("user"));
  }

  /**
   * @param {string|null} name
   */
  set user(name) {
    if (name === null) {
      this._store.remove("user");
    } else {
      this._store.set("user", name);
    }
  }

  /**
   * @return {string[]}
   */
  get users() {
    return Object.entries(this.gameStats).map(([user]) => user);
  }

  get gameStats() {
    return /** @type {GameStats} */ (this._store.get("gameStats") ?? {});
  }

  /**
   * @param {GameStat} stat
   */
  regGameStat(stat) {
    if (!this.user) throw new Error("No app user for reg stat");
    /**
     * @type GameStat[]
     */
    const userStats = this.gameStats?.[this.user] ?? [];
    userStats.push(stat);
    this._store.set("gameStats", {
      ...this.gameStats,
      [this.user]: userStats,
    });
  }

  /**
   * @param {string} event
   * @param {EventHandler} listener
   */
  on(event, listener) {
    this._emitter.on(event, listener);
  }

  startGame() {
    this._emitter.emit("gameStarted");
  }

  finishGame() {
    this._emitter.emit("gameFinished");
  }
})();
