import GameElement from "./gameElement";
import arrow from "./assets/images/fleche.png";

export default class Arrow extends GameElement {
  #throw;

  /**
   * Constructor for Arrow
   * @param {number} x
   * @param {number} y
   * @param {number} deltaX
   * @param {number} deltaY
   */
  constructor(x, y, deltaX = 0, deltaY = -8) {
    super(x, y, deltaX, deltaY, arrow);
    this.#throw = false;
  }

  /**
   * direction for the arrow
   */
  move() {
    this.y += this.deltaY;
  }

  // Getter
  get throw() {
    return this.#throw;
  }

  // Setter
  setThrow(value) {
    this.#throw = value;
  }
}
