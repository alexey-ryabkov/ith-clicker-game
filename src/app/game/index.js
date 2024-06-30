import app from "@application";
import Game from "@game/Game";
import playground from "@game/components/playground";
import { keyboardController } from "@utils/keyboardController";
import "@game/components/greeting";
import "@game/components/results";

/** @type Game **/
let game;
/** @type HTMLElement|null **/
let greetingContainer;
/** @type HTMLElement|null **/
let playgroundContainer;
/** @type HTMLElement|null **/
let resultsContainer;
/** @type {function} */
let clearGameKeyboardHandlers;

app.on("gameStarted", () => {
  game = new Game();
  game.start();
  game.on("scoreChanged", (score) => {
    playground.score = score;
  });
  game.on("timeChanged", (time) => {
    playground.time = time;
  });

  clearGameKeyboardHandlers = keyboardController({
    Escape: () => app.finishGame(),
    " ": () => (game.isPaused ? game.resume() : game.pause()),
  });

  greetingContainer && (greetingContainer.style.display = "none");
  playgroundContainer && (playgroundContainer.style.display = "block");
  resultsContainer && (resultsContainer.style.display = "none");
});
app.on("gameFinished", () => {
  game.finish();
  app.regGameStat(game.stats);

  clearGameKeyboardHandlers();

  playgroundContainer && (playgroundContainer.style.display = "none");
  resultsContainer && (resultsContainer.style.display = "block");
});

document.addEventListener("DOMContentLoaded", () => {
  greetingContainer = document.body.querySelector(".game__greeting");
  playgroundContainer = document.body.querySelector(".game__playground");
  resultsContainer = document.body.querySelector(".game__results");
  playground.build();
});
