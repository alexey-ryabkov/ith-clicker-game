import "@app/types";
import EventEmitter from "@lib/EventEmitter";
import { inErrorBoundary } from "@utils/errorsHandling";
import INITIAL_APP_STATS from "@app/initialStats.json";

export default new (class {
  _emitter = new EventEmitter();
  /** @type GameStat[] */
  _stats = [];

  constructor() {
    if (!this.users.length) {
      inErrorBoundary(() => {
        // Dummy data to show in the App while no real stats
        localStorage.setItem("gameStats", JSON.stringify(INITIAL_APP_STATS));
      });
    }
  }

  /**
   * @param {string|null} name
   */
  set user(name) {
    if (name === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", name);
    }
  }

  get user() {
    return localStorage.getItem("user");
  }

  get users() {
    return Object.entries(this.gameStats).map(([user]) => user);
  }

  get gameStats() {
    return /** @type {GameStats} */ (
      inErrorBoundary(
        () => {
          const gameStatsRaw = localStorage.getItem("gameStats");
          return gameStatsRaw ? JSON.parse(gameStatsRaw) : {};
        },
        () => ({}),
      )
    );
  }

  /**
   * @param {GameStat} stat
   */
  regGameStat(stat) {
    /** @type string */
    const user = this.user || "";
    if (!user) throw new Error("No user for reg stat");

    /** @type GameStat[] */
    const userStats = this.gameStats?.[user] ?? [];
    userStats.push(stat);

    inErrorBoundary(() => {
      localStorage.setItem(
        "gameStats",
        JSON.stringify({
          ...this.gameStats,
          [user]: userStats,
        }),
      );
    });
  }

  /**
   * @param {'gameStarted'|'gameFinished'} event
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

  clearGameStats() {
    localStorage.removeItem("gameStats");
  }
})();
