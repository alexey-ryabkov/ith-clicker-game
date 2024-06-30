import app from "@application";
import "@components/tabs";
import { toggleDisabled } from "@utils-kit";
import { keyboardController } from "@utils/keyboardController";

const USER_MIN_NAME = 5;
const USER_MAX_NAME = 20;

document.addEventListener("DOMContentLoaded", () => {
  /** @type HTMLElement|null **/
  const container = document.body.querySelector(".gameGreeting");

  /** @type HTMLElement|null **/
  const userHolder =
    container?.querySelector(".gameGreeting__welcomeUser") ?? null;

  /** @type HTMLElement|null **/
  const startBtn = container?.querySelector(".gameGreeting__startBtn") ?? null;
  startBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    app.startGame();
  });

  keyboardController({
    Enter: () => app.startGame(),
  });

  /** @type HTMLInputElement|null **/
  const addUserInput =
    container?.querySelector(".gameGreeting__addUserInput") ?? null;
  addUserInput?.addEventListener("input", function (event) {
    const input = /** @type {HTMLInputElement} */ (event.target);
    addUserBtn && toggleDisabled(addUserBtn, false);
    if (input.value.length > USER_MIN_NAME) {
      validateUserName(input.value);
    }
  });
  addUserInput?.addEventListener("paste", function (event) {
    const paste = event.clipboardData?.getData("text") ?? "";
    addUserBtn && toggleDisabled(addUserBtn, false);
    if (!validateUserName(paste)) {
      event.preventDefault();
    }
  });

  /** @type HTMLInputElement|null **/
  const addUserBtn =
    container?.querySelector(".gameGreeting__addUserBtn") ?? null;
  addUserBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const newUser = addUserInput?.value ?? "";
    if (validateUserName(newUser)) {
      actualizeAppUser(newUser);
    }
  });
  addUserBtn && toggleDisabled(addUserBtn, true);

  /** @type HTMLElement|null **/
  const chooseUserBtn =
    container?.querySelector(".gameGreeting__chooseUserBtn") ?? null;

  chooseUserBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    /** @type HTMLInputElement|null **/
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

  /**
   * @param {string|null} user
   */
  function actualizeAppUser(user) {
    app.user = user;
    startBtn && (startBtn.style.display = user ? "initial" : "none");
    userHolder && (userHolder.textContent = user || "");
    addUserInput && (addUserInput.value = "");
    // TODO строим интерфейс chooseUser
    // TODO и выбираем текущего пользователя
    // app.users.filter((user) => user !== app.user);
  }
  /**
   * @param {*} name
   * @returns
   */
  function validateUserName(name) {
    const isValid = new RegExp(
      `^[a-zA-Z0-9_-]{${USER_MIN_NAME},${USER_MAX_NAME}}$`,
    ).test(name);
    if (!isValid) {
      addUserBtn && toggleDisabled(addUserBtn, true);
      alert("Задано некорректное имя!");
    }
    return isValid;
  }
});
