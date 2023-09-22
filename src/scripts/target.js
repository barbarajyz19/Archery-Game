import GameElement from "./gameElement";
import target from "./assets/images/cible.png";

export default class Target extends GameElement {
  static NB_POINTS = 1000;

  /**
   * Constructor for Target
   * @param {number} x
   * @param {number} y
   * @param {number} deltaX
   * @param {number} deltaY
   */
  constructor(x, y = 0, deltaX = 0, deltaY = 0) {
    super(x, y, deltaX, deltaY, target);
  }

  /**
   * Changes the horizontal position of the target randomly on the canvas
   * @param {Canvas} canvas //canvas object on which the target is draw
   */
  newTarget(canvas) {
    this.x = Math.random() * (canvas.width - 64);
  }

  // Getters
  get nbPoints() {
    return Target.NB_POINTS;
  }
}
