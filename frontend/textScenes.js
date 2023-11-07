import * as THREE from 'three';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// import { sendGameData } from './gameData.js'
// import { getGameData } from './gameData.js'
import { onDocumentKeyPress } from './main.js';

THREE.Cache.enabled = true;

let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, materials;
let firstLetter = true;
let sceneNum = 0;

let fontPath = 'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
	font = undefined;

const height = 20,
	size = 30,
	hover = 30,
	curveSegments = 4;
const mirror = true;
let targetRotation = 0;
let targetRotationOnPointerDown = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;
let windowHalfX = window.innerWidth / 2;
let fontIndex = 1;
let nameText = undefined;
let player1Name = '';
let player2Name = '';
const player1Points = 3;
const player2Points = 0;
let firstKey = undefined;

export function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	// CAMERA
	camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
	camera.position.set(0, 400, 700);
	cameraTarget = new THREE.Vector3(0, 150, 0);

	// SCENE
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
	scene.fog = new THREE.Fog(0x000000, 250, 1400);

	// LIGHTS
	const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
	dirLight.position.set(0, 0, 1).normalize();
	scene.add(dirLight);
	const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
	pointLight.color.setHSL(Math.random(), 1, 0.5);
	pointLight.position.set(0, 100, 90);
	scene.add(pointLight);
	materials = [
		new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
		new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
	];
	group = new THREE.Group();
	group.position.y = 100;
	scene.add(group);
	loadFont();
	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry(10000, 10000),
		new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
	);
	plane.position.y = 100;
	plane.rotation.x = - Math.PI / 2;
	scene.add(plane);

	// RENDERER
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// EVENTS
	container.style.touchAction = 'none';
	container.addEventListener('pointerdown', onPointerDown);
	document.addEventListener('keypress', onDocumentKeyPress);
	document.addEventListener('keydown', onDocumentKeyDown);
	pointLight.color.setHSL(Math.random(), 1, 0.5);
	loadFont();
	window.addEventListener('resize', onWindowResize);
}

export function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function onDocumentKeyDown(event) {
	if (firstLetter) {
		firstLetter = false;
		nameText = '';
	}
	const keyCode = event.keyCode;
	// backspace
	if (keyCode == 8) {
		event.preventDefault();
		nameText = nameText.substring(0, nameText.length - 1);
		showText(nameText);
		return false;
	}
}

export function scene_Start()
{
	showText('Welcome to Transcendence!');
}

export function scene_EnterPlayer1Name(keyCode)
{
	showText('Enter name of Player 1...');
	firstKey = true;
  	if (keyCode >= 97 && keyCode <= 122)
  	{
		if (firstKey == true) {
			firstKey = false;
			nameText = '';
			showText();
		}
		const ch = String.fromCharCode(keyCode);
		nameText += ch;
		showText();
  	}
	// else if (keyCode === 13 && text != '' && text != 'Enter name of Player 1...') { // Enter key is pressed.
	// 	player1Name = text;
	// 	nextScene();
	// }	
}

export function scene_EnterPlayer2Name(keyCode)
{
	text = 'Enter name of Player 2...';
	showText();
	firstKey = true;	
	if (keyCode >= 97 && keyCode <= 122)
  	{
		if (firstKey == true) {
			firstKey = false;
			text = '';
			showText();
		}
		const ch = String.fromCharCode(keyCode);
		text += ch;
		showText();
  	}
	else if (keyCode === 13 && text != '' && text != 'Enter name of Player 2...') { // Enter key is pressed.
		player2Name = text;
		nextScene();
	}
}

export function scene_SendGameData(keyCode)
{
	text = 'Press enter to send game data to server...';
	showText();
	if (keyCode === 13) { // Enter key is pressed.
		// sendGameData(player1Name, player1Points, player2Name, player2Points)
		// 	.then(({ success, msg }) => {
		// 	text = msg;
		// 	showText();
		// 	if (success) {
		// 		nextScene();
		// 	}
		// });
	}
}

export function scene_GetGameData(keyCode)
{
	setTimeout(() => {
	text = "Press enter to retrieve game data from server...";
	showText();
	}, 1500);	
	if (keyCode === 13) { // Enter key is pressed.
		getGameData(1)
			.then(({ success, msg }) => {
	        text = msg;
	        showText();
	        if (success) {
	          setTimeout(() => {
	          	nextScene();
	          }, 4000);
	        }
		});
	}
}

export function scene_End(keyCode)
{
	text = "So long and thanks for all the fish...";
	showText();
}

export function loadFont() {
	const loader = new FontLoader();
	loader.load(fontPath, function (response) {
		font = response;
		showText();
	});
}

export function showText(textToShow) {
	if (group) {
		group.remove(textMesh1);
		if (mirror) group.remove(textMesh2);
	}
	if (!textToShow) return;
	textGeo = new TextGeometry(textToShow, {
		font: font,
		size: size,
		height: height,
		curveSegments: curveSegments
	});
	textGeo.computeBoundingBox();
	const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
	textMesh1 = new THREE.Mesh(textGeo, materials);
	textMesh1.position.x = centerOffset;
	textMesh1.position.y = hover;
	textMesh1.position.z = 0;
	textMesh1.rotation.x = 0;
	textMesh1.rotation.y = Math.PI * 2;
	group.add(textMesh1);
	if (mirror) {
		textMesh2 = new THREE.Mesh(textGeo, materials);
		textMesh2.position.x = centerOffset;
		textMesh2.position.y = - hover;
		textMesh2.position.z = height;
		textMesh2.rotation.x = Math.PI;
		textMesh2.rotation.y = Math.PI * 2;
		group.add(textMesh2);
	}	
}

export function onPointerDown(event) {
	if (event.isPrimary === false) return;
	pointerXOnPointerDown = event.clientX - windowHalfX;
	targetRotationOnPointerDown = targetRotation;
	document.addEventListener('pointermove', onPointerMove);
	document.addEventListener('pointerup', onPointerUp);
}

export function onPointerMove(event) {
	if (event.isPrimary === false) return;
	pointerX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

export function onPointerUp() {
	if (event.isPrimary === false) return;
	document.removeEventListener('pointermove', onPointerMove);
	document.removeEventListener('pointerup', onPointerUp);
}

export function animate() {
	requestAnimationFrame(animate);
	render();
}

export function render() {
	group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
	camera.lookAt(cameraTarget);
	renderer.clear();
	renderer.render(scene, camera);
}