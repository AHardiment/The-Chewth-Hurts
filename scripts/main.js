const canvasElement = document.querySelector("canvas");
const context = canvasElement.getContext("2d");

const width = canvasElement.width;
const height = canvasElement.height;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 53) {
  collisionsMap.push(collisions.slice(i, 53 + i));
}

const boundaries = [];
const offset = {
  x: -1095,
  y: -1200,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const image = new Image();
image.src = "./assets/theGoodKnightTileset.png";

const foregroundImage = new Image();
foregroundImage.src = "./assets/foregroundObjects.png";

const playerImage = new Image();
playerImage.src = "./assets/characters/playerDown.png";

const player = new Sprite({
  position: {
    x: width / 2 - 192 / 4 / 2,
    y: height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
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

const movables = [background, ...boundaries, foreground];

const isColliding = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
};

const animate = () => {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  let isMoving = true;

  if (keys.w.isPressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        isColliding({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        isMoving = false;
        break;
      }
    }

    if (isMoving) {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  }
  if (keys.s.isPressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        isColliding({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        isMoving = false;
        break;
      }
    }

    if (isMoving) {
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  }
  if (keys.a.isPressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        isColliding({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        isMoving = false;
        break;
      }
    }

    if (isMoving) {
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  }
  if (keys.d.isPressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        isColliding({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        isMoving = false;
        break;
      }
    }

    if (isMoving) {
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  }
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
