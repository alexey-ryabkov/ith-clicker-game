import app from "@application";
import "@components/tabs";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * @type HTMLElement|null
   */
  const container = document.body.querySelector(".gameGreeting");

  /**
   * @type HTMLElement|null
   */
  const userHolder =
    container?.querySelector(".gameGreeting__welcomeUser") ?? null;

  /**
   * @type HTMLElement|null
   */
  const startBtn = container?.querySelector(".gameGreeting__startBtn") ?? null;
  startBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    app.startGame();
  });

  /**
   * @type HTMLElement|null
   */
  const addUserBtn =
    container?.querySelector(".gameGreeting__addUserBtn") ?? null;
  /**
   * @type HTMLInputElement|null
   */
  const addUserInput =
    container?.querySelector(".gameGreeting__addUserInput") ?? null;
  addUserBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    // TODO проверять корректность ввода
    const newUser = addUserInput?.value;
    if (newUser) {
      actualizeAppUser(newUser);
    }
  });

  /**
   * @type HTMLElement|null
   */
  const chooseUserBtn =
    container?.querySelector(".gameGreeting__chooseUserBtn") ?? null;

  chooseUserBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    /**
     * @type HTMLInputElement|null
     */
    const chosenUserRadio =
      container?.querySelector("input[type='radio'][name='users']:checked") ??
      null;
    const chosenUser = chosenUserRadio?.value;
    if (chosenUser) {
      actualizeAppUser(chosenUser);
    }
    // TODO иначе показать ошибку
  });

  actualizeAppUser(app.user);

  // TODO мб использовать обработку события смены пользователя?
  /**
   * @param {string|null} user
   */
  function actualizeAppUser(user) {
    app.user = user;
    startBtn && (startBtn.style.display = user ? "inline-block" : "none");
    userHolder && (userHolder.textContent = user || "");
    addUserInput && (addUserInput.value = "");
    // TODO строим интерфейс chooseUser
    // TODO и выбираем в нем текущего пользователя
    // app.users.filter((user) => user !== app.user);
  }
});
