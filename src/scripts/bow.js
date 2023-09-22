import GameElement from "./gameElement";
import Arrow from "./arrow";
import bow from "./assets/images/arc.png";
import KeyManager from "./keyManager";

export default class Bow extends GameElement {
  static NB_MAX_ARROWS = 5;
  #nbArrows;
  #arrows;
  #life;

  /**
   * Constructor for Bow
   * @param {number} x
   * @param {number} y
   * @param {number} deltaX
   * @param {number} deltaY
   */
  constructor(x, y, deltaX = 0, deltaY = 0) {
    super(x, y, deltaX, deltaY, bow);
    this.#nbArrows = Bow.NB_MAX_ARROWS - 1;
    this.#arrows = [];
    this.#life = 3;
    this.reloadBow();
  }

  /**
   * Allows the player to shoot an arrow by updating his position and decreasing his number of available arrows
   */
  throwArr() {
    if (this.nbArrows >= 0) {
      let currentArrow = this.#arrows[this.#arrows.length - 1];
      currentArrow.x = this.x + 40;
      currentArrow.y = this.y - this.height;
      currentArrow.setThrow(true);
      document.getElementById("nbArrows").innerHTML = this.#nbArrows--;
    } else {
      document.getElementById("nbArrows").innerHTML = 0;
    }
  }

  /**
   * Manage keyboard inputs to move the bow and throw arrows based on the keys pressed
   * @param {KeyManager} keyManager
   */
  handleMoveKeys(keyManager) {
    this.stopMoving();
    if (keyManager.left) this.moveLeft();
    if (keyManager.right) this.moveRight();
    if (keyManager.up) this.moveUp();
    if (keyManager.down) this.moveDown();
  }

  /**
   * Reload the bow by initializing the number of arrows
   */
  reloadBow() {
    document.getElementById("nbArrows").innerHTML = 5;
    this.#nbArrows = Bow.NB_MAX_ARROWS - 1;
    for (let i = 0; i < Bow.NB_MAX_ARROWS; i++) {
      this.#arrows.push(new Arrow(0, 0));
    }
  }

  /**
   * Movement for the bow
   * @param {CanvasRenderingContext2D} canvas // The canvas object the bow is on
   */
  move(canvas) {
    this.x = Math.max(
      0,
      Math.min(canvas.width - this.width, this.x + this.deltaX)
    );
    this.y = Math.max(
      0,
      Math.min(canvas.height - this.height, this.y + this.deltaY)
    );
  }

  moveLeft() {
    this.deltaX = this.deltaX - 10;
  }
  moveRight() {
    this.deltaX = this.deltaX + 10;
  }
  moveUp() {
    this.deltaY = this.deltaY - 10;
  }
  moveDown() {
    this.deltaY = this.deltaY + 10;
  }
  stopMoving() {
    this.deltaX = 0;
    this.deltaY = 0;
  }

  // Getters
  get nbArrows() {
    return this.#nbArrows;
  }

  get arrows() {
    return this.#arrows;
  }

  get life() {
    return this.#life;
  }

  // Setters
  setNbArrows(value) {
    this.#nbArrows = value;
  }

  setArrows(value) {
    this.#arrows = value;
  }

  set life(value) {
    this.#life = value;
  }
}
