main
textTitles
pong

stay in textExample.js for now, don't think about pong
refactor scenes so that scene 0 really is "welcome to transcendence"
refactor so that any event can trigger a scene change, not just a keypress
refreshText -> showText: how does initial text get 'shown' and not 'refreshed'
when nextScene function is called, we increment sceneNum and trigger the next scene

scenes:
on initialisation, trigger scene 0 - diisplay "welcome to transcendence"
on enter keypress, trigger scene 1 - enter player 1 name
on enter keypress. trigger scene 2 - enter player 2 name
on enter keypress, trigger scene 3 - play pong
on end of pong game, trigger scene 4 - send game data to server
on send success, trigger scene 5 - get game data from server
on get success, trigger scene 6 - display "so long and thanks for all the fish"


what triggers the next scene?


