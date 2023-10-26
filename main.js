// TODO
// scores as 3d text
// point count when ball goes off table x
// keypress to toggle three camera viewpoints

import * as THREE from 'three';
import { FontLoader } from '/usr/app/node_modules/three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// vertical field of view, aspect ratio, near plane, far plane

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const batBallThickness = 1;

const tableWidth = 10;
const tableHeight = 6;
const tableGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, 0.001);
const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);

const batWidth = 0.25;
const batHeight = 2;
const bat1Geometry = new THREE.BoxGeometry(batWidth, batHeight, batBallThickness);
const bat1Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const bat1 = new THREE.Mesh(bat1Geometry, bat1Material);

const bat2Geometry = new THREE.BoxGeometry(batWidth, batHeight, batBallThickness);
const bat2Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const bat2 = new THREE.Mesh(bat2Geometry, bat2Material);

const ballWidth = 0.5;
const ballHeight = 0.5;
const ballGeometry = new THREE.BoxGeometry(ballWidth, ballHeight, batBallThickness);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);

// score text
//const loader = new THREE.FontLoader();
//loader.load('/usr/app/node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function (font) {
//  const textGeometry = new THREE.TextGeometry('Hello, Three.js!', {
//    font: font,
//    size: 1,  // Text size
//    height: 0.1,  // Extrusion depth
//    curveSegments: 12,  // Number of segments
//  });

//  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//  const text = new THREE.Mesh(textGeometry, textMaterial);

//  // Position the text
//  text.position.x = -4;  // Adjust the x position
//  text.position.y = 0;   // Adjust the y position
//  text.position.z = 0;   // Adjust the z position

  // Add the text to the scene
//  scene.add(text);
//});

scene.add(table);
scene.add(bat1);
scene.add(bat2);
scene.add(ball);

bat1.position.x -= 4.5;
bat2.position.x += 4.5;

// above, whole table
camera.position.z = 5;

// bat1 POV
//camera.position.x = bat1.position.x;
//camera.position.y = bat1.position.y;
//camera.position.z = bat1.position.z;
//var direction = new THREE.Vector3();
//camera.getWorldDirection(direction);
//const distance = 10;
//camera.translateZ(distance);

let player1Points = 0;
let player2Points = 0;
const maxPoints = 3;
let gameInProgress = true;

const movement = { W: false, S: false, O: false, L: false };

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  if (key in movement) {
    movement[key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toUpperCase();
  if (key in movement) {
    movement[key] = false;
  }
});

let ballDir = 1;
const ballSpeed = 0.1;
const batSpeed = 0.1;

function resetBall()
{
    ball.position.x = 0;
    ball.position.y = 0;
    const random = Math.random();
    ballDir = random < 0.5 ? -1 : 1;
}

function animate() {
  requestAnimationFrame(animate);
  if (gameInProgress == false) {
	return;
  }
  // bat key movement
  const tableTop = table.position.y + tableHeight / 2;
  const tableBottom = table.position.y - tableHeight / 2;
  const bat1Top = bat1.position.y + batHeight / 2;
  const bat1Bottom = bat1.position.y - batHeight / 2;
  const bat2Top = bat2.position.y + batHeight / 2;
  const bat2Bottom = bat2.position.y - batHeight / 2;

  if (movement.W && bat1Top < tableTop) {
    bat1.position.y += batSpeed;
  }
  if (movement.S && bat1Bottom > tableBottom) {
    bat1.position.y -= batSpeed;
  }
  if (movement.O && bat2Top < tableTop) {
    bat2.position.y += batSpeed;
  }
  if (movement.L && bat2Bottom > tableBottom) {
    bat2.position.y -= batSpeed;
  }

  // ball bounce off bats
  ball.position.x += ballDir * ballSpeed;
  const bat2SurfaceX = bat2.position.x - batWidth / 2 - ballWidth / 2;
  const bat1SurfaceX = bat1.position.x + batWidth / 2 + ballWidth / 2;
  const ballTop = ball.position.y + ballHeight / 2;
  const ballBottom = ball.position.y - ballHeight / 2;

  if (ball.position.x > bat2SurfaceX
    && ballBottom < bat2Top
    && ballTop > bat2Bottom)
  {
    ballDir = ballDir * -1;
  }
  if (ball.position.x < bat1SurfaceX
    && ballBottom < bat1Top
    && ballTop > bat1Bottom)
  {
    ballDir = ballDir * -1;
  }

  // increase points when ball goes off left or right of table
  // end game when max points reached
  const ballLeft = ball.position.x + ballWidth / 2;
  const ballRight = ball.position.x - ballWidth / 2;
  const tableLeft = table.position.x - tableWidth / 2;
  const tableRight = table.position.x + tableWidth / 2;
  if (ballLeft < tableLeft)
  {
    player2Points++;
    if (player2Points > maxPoints)
    {
      gameInProgress = false;
    }
    resetBall();
  }
  if (ballRight > tableRight)
  {
    player1Points++;
    if (player1Points > maxPoints)
    {
      gameInProgress = false;
    }
    resetBall();
  }
  renderer.render(scene, camera);
}

animate();
