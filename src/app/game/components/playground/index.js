import app from "@application";

export default new (class {
  /**
   * @type HTMLElement|null
   */
  _scoreCounter = null;
  /**
   * @type HTMLElement|null
   */
  _timeCounter = null;

  build() {
    /**
     * @type HTMLElement|null
     */
    const container = document.body.querySelector(".gamePlayground") ?? null;

    /**
     * @type HTMLElement|null
     */
    const finishBtn =
      container?.querySelector(".gamePlayground__finishBtn") ?? null;
    finishBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      app.finishGame();
    });

    this._timeCounter =
      container?.querySelector(".gamePlayground__indicator_time") ?? null;
    this._scoreCounter =
      container?.querySelector(".gamePlayground__indicator_score") ?? null;
  }

  /**
   * @param {string} value
   */
  set score(value) {
    this._scoreCounter && (this._scoreCounter.textContent = value);
  }

  /**
   * @param {string} value
   */
  set time(value) {
    this._timeCounter && (this._timeCounter.textContent = value);
  }
})();
