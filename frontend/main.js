import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { sendGameData } from './gameData.js'

// initialisation functions:
function makeTable() {
  const tableGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, 0.001);
  const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  return table;
}

function makeBat1() {
  const bat1Geometry = new THREE.BoxGeometry(batWidth, batHeight, batBallThickness);
  const bat1Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const bat1 = new THREE.Mesh(bat1Geometry, bat1Material);
  return bat1;
}

function makeBat2() {
  const bat2Geometry = new THREE.BoxGeometry(batWidth, batHeight, batBallThickness);
  const bat2Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const bat2 = new THREE.Mesh(bat2Geometry, bat2Material);
  return bat2;
}

function makeBall() {
  const ballGeometry = new THREE.BoxGeometry(ballWidth, ballHeight, batBallThickness);
  const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  return ball;
}

function placeText(textToDisplay) {
  const loader = new FontLoader();
  loader.load('node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json', function (font) {
    // Check if there is an existing text mesh, and remove it from the scene if it exists
    if (textMesh) {
      scene.remove(textMesh);
    }

    const textGeometry = new TextGeometry(textToDisplay, {
      font: font,
      size: 0.3,
      height: 0.01,
      curveSegments: 12,
    });

    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 0, 0);

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.y = 3.2;
    scene.add(textMesh);
  });
}

function initBatKeys() {
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
}

// animation functions:
function moveBall()
{
  ball.position.x += ballDir * ballSpeed;
}

// ball bounce off bats
function moveBats()
{
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
}

function changeBallDirectionIfBallHitsBats()
{
  const bat2SurfaceX = bat2.position.x - batWidth / 2 - ballWidth / 2;
  const bat1SurfaceX = bat1.position.x + batWidth / 2 + ballWidth / 2;
  const ballTop = ball.position.y + ballHeight / 2;
  const ballBottom = ball.position.y - ballHeight / 2;
  const bat1Top = bat1.position.y + batHeight / 2;
  const bat1Bottom = bat1.position.y - batHeight / 2;
  const bat2Top = bat2.position.y + batHeight / 2;
  const bat2Bottom = bat2.position.y - batHeight / 2;  

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
}

function resetBall()
{
    ball.position.x = 0;
    ball.position.y = 0;
    const random = Math.random();
    ballDir = random < 0.5 ? -1 : 1;
}

function checkBallOffTableLeft() {
  const ballLeft = ball.position.x + ballWidth / 2;
  const tableLeft = table.position.x - tableWidth / 2;
  if (ballLeft < tableLeft)
  {
    player2Points++;
    if (player2Points > maxPoints)
    {
      gameInProgress = false;
      let response = sendGameData();
      switch (response) {
      case 0:
        placeText("Response not OK.");
        break;
      case 1:
        placeText("Game over... " + player2Name + " has won!");
        break;
      case -1:
        placeText("Error.");
        break;
      }
    }
    else {
      placeText(player1Name + " " + player1Points + " - " + player2Points + " " + player2Name);
      resetBall();
    }
  }
}

function checkBallOffTableRight()
{
  const ballRight = ball.position.x - ballWidth / 2;
  const tableRight = table.position.x + tableWidth / 2;
  if (ballRight > tableRight)
  {
    player1Points++;
    if (player1Points > maxPoints)
    {
      gameInProgress = false;
      let response = sendGameData();
      switch (response) {
      case 0:
        placeText("Response not OK.");
        break;
      case 1:
        placeText("Game over... " + player1Name + " has won!");
        break;
      case -1:
        placeText("Error.");
        break;
      }
    }
    else {
      placeText(player1Name + " " + player1Points + " - " + player2Points + " " + player2Name);
      resetBall();
    }
  }  
}

function stopBallIfGameNotInProgress()
{
  if (gameInProgress == false)
  {
    ballSpeed = 0;
    scene.remove(ball);
  }
}

// initialisation:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // vertical field of view, aspect ratio, near plane, far plane
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let ballDir = 1;
let ballSpeed = 0.1;
const batSpeed = 0.1;
const tableWidth = 10;
const tableHeight = 6;
const batBallThickness = 1;
const batWidth = 0.25;
const batHeight = 2;
const ballWidth = 0.5;
const ballHeight = 0.5;

let player1Name = "Graham";
let player2Name = "Yuri";
let player1Points = 0;
let player2Points = 0;
const maxPoints = 1;
let gameInProgress = true;

const table = makeTable();
const bat1 = makeBat1();
const bat2 = makeBat2();
const ball = makeBall();
let textMesh;

scene.add(table);
scene.add(bat1);
scene.add(bat2);
scene.add(ball);
placeText(player1Name + " " + player1Points + " - " + player2Points + " " + player2Name);

bat1.position.x -= 4.5;
bat2.position.x += 4.5;
camera.position.z = 5; // above, whole table

const movement = { W: false, S: false, O: false, L: false };

initBatKeys();

function animate() {
  requestAnimationFrame(animate);
  moveBats();
  moveBall();
  changeBallDirectionIfBallHitsBats();
  checkBallOffTableLeft();
  checkBallOffTableRight();
  stopBallIfGameNotInProgress();
  renderer.render(scene, camera);
}

animate();