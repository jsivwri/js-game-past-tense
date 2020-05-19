var gameState = {};
gameState.quotes = [
	'"So we beat on, boats against the current, borne back ceaselessly into the past. — F. Scott Fitzgerald"',
	'"Life can only be understood backwards; but it must be lived forwards."  — Søren Kierkegaard',
	'"The past is always tense, the future perfect." — Zadie Smith',
	'"There is no escaping the past."'
]

gameState.textStyle = {
    font: "normal 24px Arial",
    fill: '#ffffff',
    align: 'center',
    boundsAlignH: "center", // bounds center align horizontally
    boundsAlignV: "middle" // bounds center align vertically
};

gameState.snake = {};
gameState.vulnerable=true;
gameState.music = {};
scale=1;
gameState.highScore=0;


gameState.score=0;

var config = {
	width: 800,
	height: 600,
	backgroundColor: 0x123456,
	disableWebAudio: true,
	scene: [ StartScene, GameScene, CreditsScene, NextLevelScene, LoseLifeScene, EndScene ],
	physics: {
		default: 'arcade',
		arcade: { debug: false }
	},
	style: {fontSize: "15px"}
}

const game = new Phaser.Game(config);