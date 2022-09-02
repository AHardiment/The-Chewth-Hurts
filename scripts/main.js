// const canvasElement = document.querySelector("canvas");
// const context = canvasElement.getContext("2d");

// const width = canvasElement.width;
// const height = canvasElement.height;

// const offset = {
//   x: -1095,
//   y: -1200,
// };

const strengthPickupImage = new Image();
strengthPickupImage.src = "./assets/pickups/strengthPickup.png";

// const foreground = new Sprite({
//   position: {
//     x: offset.x,
//     y: offset.y,
//   },
//   image: foregroundImage,
// });

// const strengthPickup = new Sprite({
//   position: {
//     x: Math.floor(Math.random() * width - 56),
//     y: Math.floor(Math.random() * height - 56),
//   },
//   image: strengthPickupImage,
// });



// window.requestAnimationFrame(animate);

// const animate = () => {

//   if (keys.s.isPressed) {
//     for (let i = 0; i < boundaries.length; i++) {
//       player.moving = true;
//       player.image = player.sprites.down;
//       const boundary = boundaries[i];
//       if (
//         isColliding({
//           rectangle1: player,
//           rectangle2: {
//             ...boundary,
//             position: {
//               x: boundary.position.x,
//               y: boundary.position.y - 3,
//             },
//           },
//         })
//       ) {
//         isMoving = false;
//         break;
//       }
//     }

//     if (isMoving) {
//       movables.forEach((movable) => {
//         movable.position.y -= 3;
//       });
//     }
//   }
//   if (keys.a.isPressed) {
//     for (let i = 0; i < boundaries.length; i++) {
//       player.moving = true;
//       player.image = player.sprites.left;
//       const boundary = boundaries[i];
//       if (
//         isColliding({
//           rectangle1: player,
//           rectangle2: {
//             ...boundary,
//             position: {
//               x: boundary.position.x + 3,
//               y: boundary.position.y,
//             },
//           },
//         })
//       ) {
//         isMoving = false;
//         break;
//       }
//     }

//     if (isMoving) {
//       movables.forEach((movable) => {
//         movable.position.x += 3;
//       });
//     }
//   }
//   if (keys.d.isPressed) {
//     for (let i = 0; i < boundaries.length; i++) {
//       player.moving = true;
//       player.image = player.sprites.right;
//       const boundary = boundaries[i];
//       if (
//         isColliding({
//           rectangle1: player,
//           rectangle2: {
//             ...boundary,
//             position: {
//               x: boundary.position.x - 3,
//               y: boundary.position.y,
//             },
//           },
//         })
//       ) {
//         isMoving = false;
//         break;
//       }
//     }

//     if (isMoving) {
//       movables.forEach((movable) => {
//         movable.position.x -= 3;
//       });
//     }
//   }
// };

// animate();

const game = new Game();

game.start();