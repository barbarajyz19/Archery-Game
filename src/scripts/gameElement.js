export default class GameElement  {
  #x;
  #y;
  #deltaX;
  #deltaY;
  #image;

  constructor(x, y, deltaX = 0, deltaY = 0, cheminImg) {
    this.#x = x;
    this.#y = y;
    this.#deltaX = deltaX;
    this.#deltaY = deltaY;
    this.#image = this.#createImage(cheminImg);
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  move(canvas) {
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    if (newX < 0 || newX > canvas.width - this.image.width) {
      this.deltaX = -this.deltaX;
    }
    if (newY < 0 || newY > canvas.height - this.image.height) {
      this.deltaY = -this.deltaY;
    }
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  #createImage(imageSource) {
    const newImg = new Image();
    newImg.src = imageSource;
    return newImg;
  }

  collisionWith(Obstacle) {
    let P1x = Math.max(this.x, Obstacle.x);
    let P1y = Math.max(this.y, Obstacle.y);
    let P2x = Math.min(this.x + this.width, Obstacle.x + Obstacle.width);
    let P2y = Math.min(this.y + this.height, Obstacle.y + Obstacle.height);
    if (P1x < P2x && P1y < P2y) {
      return true;
    } else {
      return false;
    }
  }

  // Getters
  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get deltaX() {
    return this.#deltaX;
  }

  get deltaY() {
    return this.#deltaY;
  }

  get image() {
    return this.#image;
  }

  get width() {
    return this.image.width;
  }
  get height() {
    return this.image.height;
  }

  // Setters
  set x(value) {
    this.#x = value;
  }

  set y(value) {
    this.#y = value;
  }

  set deltaX(value) {
    this.#deltaX = value;
  }

  set deltaY(value) {
    this.#deltaY = value;
  }

  set image(value) {
    this.#image = value;
  }
}
