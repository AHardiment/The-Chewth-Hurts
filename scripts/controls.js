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
