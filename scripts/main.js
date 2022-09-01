const canvasElement = document.querySelector("canvas");
const context = canvasElement.getContext("2d");

const width = canvasElement.width;
const height = canvasElement.height;

const image = new Image();
image.src = "./assets/theGoodKnightTileset.png";

const playerImage = new Image();
playerImage.src = "./assets/characters/playerDown.png";

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: -1095,
    y: -1200,
  },
  image: image,
});

const keys = {
  w: {
    isPressed: false,
  },
  a: {
    isPressed: false,
  },
  s: {
    isPressed: false,
  },
  d: {
    isPressed: false,
  },
};

const animate = () => {
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    width / 2 - playerImage.width / 4 / 2,
    height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );

  if (keys.w.isPressed) background.position.y -= -3;
  if (keys.s.isPressed) background.position.y += -3;
  if (keys.a.isPressed) background.position.x -= -3;
  if (keys.d.isPressed) background.position.x += -3;
};

animate();

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.isPressed = true;
      break;
    case "KeyA":
      keys.a.isPressed = true;
      break;
    case "KeyS":
      keys.s.isPressed = true;
      break;
    case "KeyD":
      keys.d.isPressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.isPressed = false;
      break;
    case "KeyA":
      keys.a.isPressed = false;
      break;
    case "KeyS":
      keys.s.isPressed = false;
      break;
    case "KeyD":
      keys.d.isPressed = false;
      break;
  }
});
