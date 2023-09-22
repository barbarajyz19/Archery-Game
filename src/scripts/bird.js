import GameElement from "./gameElement";
import rigthBird from "./assets/images/oiseau-voleur-droite-gauche.png";
import leftBird from "./assets/images/oiseau-voleur-gauche-droite.png";

export default class Bird extends GameElement {
  static NB_POINTS = -500;
  static BIRD_TIME = 1000;
  #birdL;
  #directionRL;

  /**
   * Constructor for Bird
   * @param {number} x
   * @param {number} y
   * @param {number} deltaX
   * @param {String} directionRL
   */
  constructor(x, y, deltaX = 0, directionRL) {
    super(x, y, deltaX, 0, rigthBird);
    this.#birdL = this.#createImage(leftBird);
    this.#directionRL = directionRL;
    this.randomAppearance();
  }

  /**
   * Create a new random position for a bird
   */
  newPosition() {
    if (this.#directionRL) {
      this.x = 500;
    } else {
      this.x = -100;
    }
    this.y = Math.floor(Math.random() * 300) + 100;
  }

  /**
   * Manages the random appearance of bird
   */
  randomAppearance() {
    setInterval(() => {
      const position = this.x + this.deltaX;
      if (position < 0 || position > 580 - this.width) {
        if (Math.random() < 0.75) {
          // 0.75 chance of spawning
          this.newPosition();
        }
      }
    }, Bird.BIRD_TIME);
  }

  /**
   * Updates the value of deltaX based on the direction of the Bird
   */
  positionDelta() {
    if (this.#directionRL) {
      this.deltaX = -4;
    }
  }

  /**
   * Movement for the bird
   */
  move() {
    this.positionDelta();
    this.x += this.deltaX;
  }

  draw(context) {
    if (this.#directionRL) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      context.drawImage(this.leftBird, this.x, this.y);
    }
  }

  #createImage(imageSource) {
    const newImg = new Image();
    newImg.src = imageSource;
    return newImg;
  }

  // Getters
  get leftBird() {
    return this.#birdL;
  }
}
