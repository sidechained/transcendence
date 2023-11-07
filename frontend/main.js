import * as TextScenes from './textScenes.js';
// import * as PongScene from './pongScene.js';

const SCENE_START = 0;
const SCENE_ENTER_PLAYER1_NAME = 1;
const SCENE_ENTER_PLAYER2_NAME = 2;
const SCENE_PLAY_PONG = 3;
const SCENE_SEND_GAME_DATA = 4;
const SCENE_GET_GAME_DATA = 5;
const SCENE_END = 6;

const enterKey = 13;
let currentScene = -1;
let sceneText = undefined;

TextScenes.init();
TextScenes.animate();
nextScene();

function nextScene()
{
	currentScene++;
	switch (currentScene)
	{
		case SCENE_START:
			TextScenes.scene_Start();
			break;
		case SCENE_ENTER_PLAYER1_NAME:
			TextScenes.scene_EnterPlayer1Name();
			break;
		case SCENE_ENTER_PLAYER2_NAME:
			TextScenes.scene_EnterPlayer2Name();
			break;
		// // case SCENE_PLAY_PONG:
		// // 	PongScene.scene_PlayPong();
		// // break;
		// case SCENE_SEND_GAME_DATA:
		// 	TextScenes.scene_SendGameData();
		// 	break;
		// case SCENE_GET_GAME_DATA:
		// 	TextScenes.scene_GetGameData();
		// 	break;
		// case SCENE_END:
		// 	TextScenes.scene_End();			
		// 	break;
	}
}

export function onDocumentKeyPress(event) {
	const keyCode = event.which;
	switch (currentScene) {
		case SCENE_START:
			if (keyCode === enterKey) {
				nextScene();
			}
			break;
		case SCENE_ENTER_PLAYER1_NAME:
			if (keyCode === enterKey && text !== '') { // textHasBeenEntered check
				nextScene();
			}
			break;
		// case SCENE_ENTER_PLAYER2_NAME:
		// 	nextScene();
		// 	break;
		// case SCENE_PLAY_PONG:
		// 	nextScene();
		// 	break;
		// case SCENE_SEND_GAME_DATA:
		// 	nextScene();
		// 	break;
		// case SCENE_GET_GAME_DATA:
		// 	nextScene();
		// 	break;
	  // default:
	  //   // Handle any other cases or do nothing
	}				
}