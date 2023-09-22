import GameElement from "./gameElement";
import quiver from "./assets/images/fleches.png";

export default class Quiver extends GameElement {
  static QUIVER_TIME = 1500;

  /**
   * Constructor for Quiver
   * @param {number} x
   * @param {number} y
   * @param {number} deltaX
   * @param {number} deltaY
   */
  constructor(x, y, deltaX = 0, deltaY = 0) {
    super(x, y, deltaX, deltaY, quiver);
    this.randomAppearance();
  }

  /**
   * Create a new random position for a quiver
   */
  newPosition() {
    this.x = Math.floor(Math.random() * 470);
    this.y = Math.floor(Math.random() * 300) + 100;
  }

  /**
   * Manages the random appearance of quivers
   */
  randomAppearance() {
    setInterval(() => {
      if (Math.random() < 0.5) {
        // 0.5 chance of spawning
        this.newPosition();
      }
    }, Quiver.QUIVER_TIME);
  }
}
