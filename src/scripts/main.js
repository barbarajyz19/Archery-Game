// importations des classes
import Game from "./game.js";

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le panier
const init = () => {

  // canvas
  const canvas = document.getElementById("playfield");

  // game
  const game = new Game(canvas);

  // arrows
  document.getElementById("nbArrows").innerHTML = "5";

  document
    .getElementById("stopAndStartGame")
    .addEventListener("click", () => game.startAndStop());

  window.addEventListener("keydown", game.keyDownActionHandler.bind(game));
  window.addEventListener("keyup", game.keyUpActionHandler.bind(game));
};


window.addEventListener("load", init);

console.log("le bundle a été généré");