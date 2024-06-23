import app from "@application";
import playground from "@game/components/playground";
import Game from "@game/Game";
import "@game/components/greeting";
import "@game/components/results";

/**
 * @type Game
 */
let game;
/**
 * @type HTMLElement|null
 */
let greetingContainer;
/**
 * @type HTMLElement|null
 */
let playgroundContainer;
/**
 * @type HTMLElement|null
 */
let resultsContainer;

app.on("gameStarted", () => {
  game = new Game();
  game.start();
  game.on("scoreChanged", (score) => {
    playground.score = score;
  });
  game.on("timeChanged", (time) => {
    playground.time = time;
  });

  greetingContainer && (greetingContainer.style.display = "none");
  playgroundContainer && (playgroundContainer.style.display = "block");
  resultsContainer && (resultsContainer.style.display = "none");
});
app.on("gameFinished", () => {
  // TODO
  //    game.off

  game.finish();
  // TODO
  // app.regGameStat(game.stats);

  playgroundContainer && (playgroundContainer.style.display = "none");
  resultsContainer && (resultsContainer.style.display = "block");
});

document.addEventListener("DOMContentLoaded", () => {
  greetingContainer = document.body.querySelector(".game__greeting");
  playgroundContainer = document.body.querySelector(".game__playground");
  resultsContainer = document.body.querySelector(".game__results");
  playground.build();
});
