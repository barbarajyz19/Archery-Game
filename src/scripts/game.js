import KeyManager from "./keyManager";
import Target from "./target";
import Bow from "./bow";
import Quiver from "./quiver";
import Bird from "./bird";

export default class Game {
  #canvas;
  #context;

  #bow;
  #target;
  #quiver;
  #birds;

  #keyManager;
  #animation;
  #points;
  #gamePlaying;

  /**
   * Constructor for Game
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    // canvas initialization
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d");

    // creation of the different elements on the canvas
    this.#bow = new Bow(210, 500);
    this.#target = new Target(
      Math.floor(Math.random() * (this.#canvas.width - 64))
    );
    this.#quiver = new Quiver(
      Math.floor(Math.random() * 470),
      Math.floor(Math.random() * 400) + 100
    );
    this.#birds = [];
    const numBirds = 3;
    for (let i = 0; i < numBirds; i++) {
      let x = i === 0 ? -100 : 500;
      let alea = Math.floor(Math.random() * 300) + 100;
      let isFlipped = i > 0;
      this.#birds.push(new Bird(x, alea, 4, isFlipped));
    }

    this.#points = 0;
    this.#animation = null;
    this.#keyManager = new KeyManager();
    this.#gamePlaying = true;
  }
  /**
   * Animates the game and manages the game
   */
  animate() {
    if (this.#bow.life != 0) {
      this.#context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bow.handleMoveKeys(this.#keyManager);
      this.bow.move(this.canvas);

      this.actionBirds();
      this.actionQuiver();
      this.actionArrow();

      this.bow.draw(this.#context);
      this.#quiver.draw(this.#context);
      this.target.draw(this.#context);
      this.#animation = window.requestAnimationFrame(this.animate.bind(this));
    } else {
      this.#gamePlaying = true;
      alert("GAME LOST!");
    }
  }

  /**
   * Manages the action of moving arrows on the canvas
   */
  actionArrow() {
    this.bow.arrows.forEach((arrow) => {
      if (arrow.throw) {
        if (arrow.collisionWith(this.target)) {
          this.target.newTarget(this.canvas);
          this.addPoints(Target.NB_POINTS);
          this.bow.arrows.splice(
            this.bow.arrows.length - 1,
            this.bow.arrows.length
          );
        } else if (arrow.y < 0) {
          this.bow.arrows.splice(
            this.bow.arrows.length - 1,
            this.bow.arrows.length
          );
        } else {
          arrow.draw(this.#context);
          arrow.move(this.canvas);
        }
      }
    });
  }

  /**
   * Handles the action of the quiver
   */
  actionQuiver() {
    if (this.#bow.collisionWith(this.#quiver)) {
      this.#quiver.newPosition();
      this.#bow.reloadBow();
    }
  }

  /**
   * Handles the actions of the birds
   */
  actionBirds() {
    this.#birds.forEach((bird) => {
      if (bird.collisionWith(this.#quiver)) {
        this.#quiver.newPosition();
      }
      if (bird.collisionWith(this.#bow)) {
        this.#bow.life--;
        bird.newPosition();
        this.#points += Bird.NB_POINTS;
        document.getElementById("score").innerHTML = this.#points;
        const life = document.querySelector("#lifes img:first-child");
        life.remove();
      }
      this.#bow.arrows.forEach((arrow) => {
        if (arrow.throw && bird.collisionWith(arrow)) {
          this.#bow.arrows.splice(
            this.#bow.arrows.length - 1,
            this.#bow.arrows.length
          );
          bird.newPosition();
        }
      });
      bird.move();
      bird.draw(this.#context);
    });
  }

  /**
   * Starts or stops the game animation loop and updates the gamePlaying attribute
   */
  startAndStop() {
    const button = document.getElementById("stopAndStartGame");
    if (this.gamePlaying) {
      cancelAnimationFrame(this.#animation);
      this.#animation = null;
      this.#gamePlaying = false;
      button.textContent = "Jouer";
    } else {
      this.animate();
      this.#gamePlaying = true;
      button.textContent = "Stop";
    }
  }

  /**
   * Updates the score by adding the number of points passed as a parameter to the variable this.#points
   * @param {number} points
   */
  addPoints(points) {
    this.#points += points;
    document.getElementById("score").innerHTML = this.#points;
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.#keyManager.leftPressed();
        break;
      case "ArrowRight":
      case "Right":
        this.#keyManager.rightPressed();
        break;
      case "ArrowUp":
      case "Up":
        this.#keyManager.upPressed();
        break;
      case "ArrowDown":
      case "Down":
        this.#keyManager.downPressed();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.#keyManager.leftReleased();
        break;
      case "ArrowRight":
      case "Right":
        this.#keyManager.rightReleased();
        break;
      case "ArrowUp":
      case "Up":
        this.#keyManager.upReleased();
        break;
      case "ArrowDown":
      case "Down":
        this.#keyManager.downReleased();
        break;
      case " ":
        if (this.gamePlaying) {
          this.bow.throwArr();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  // Getters
  get canvas() {
    return this.#canvas;
  }

  get bow() {
    return this.#bow;
  }

  get target() {
    return this.#target;
  }

  get quiver() {
    this.#quiver;
  }

  get gamePlaying() {
    return this.#gamePlaying;
  }

  // Setters
  set bow(value) {
    this.#bow = value;
  }
}
