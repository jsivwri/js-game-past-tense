class EndScene extends Phaser.Scene{
	constructor(){
		super({ key: 'EndScene' })
	}

	preload() {
		this.load.image('board', 'assets/board.png');
		this.load.image('board', 'assets/board.png');
		this.load.image('top', 'assets/top.png');
		this.load.image('side', 'assets/side.png');
	}

	create() {

		const board=this.add.image(400,300,'board');
        board.setInteractive();
        board.on('pointerdown',()=>{
			this.scene.stop('EndScene')
			this.scene.start('GameScene')
		})

		const sides = this.physics.add.staticGroup();
					sides.create(400, 20, 'top'); //top
					sides.create(400,560, 'top'); //bottom
					sides.create(20,300, 'side'); //left
                    sides.create(780,300, 'side'); //right

        gameState.scoreText = this.add.text(350, 570, 'Score: '+gameState.score, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });
		gameState.livesText = this.add.text(60, 570, 'Lives: '+gameState.lives, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });
		gameState.levelText = this.add.text(600, 570, 'Next Level: '+gameState.levelUpScore, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });

		//this.add.image(400,300,'board').setAlpha(0.2);
		gameState.cursors = this.input.keyboard.createCursorKeys();
		const gameOver = this.add.text(125,160,'- GAME OVER -',{fontWeight: 'bold', fontSize: '60px', fill: '#ffffff'})
	 	const restart = this.add.text(80,280,'TAP OR PRESS SPACE TO RESTART',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'})
		 const score = this.add.text(125,400, 'FINAL SCORE: '+gameState.score)
		 const highScore= this.add.text(124,450, "HIGH SCORE: "+gameState.highScore)

		gameState.centraliseText(gameOver);
		gameState.centraliseText(restart);
		gameState.centraliseText(score);
		gameState.centraliseText(highScore)

		this.tweens.add({
			targets: restart,
			paused: false,
			ease: 'Linear',
			alpha: 0,
			yoyo: true,
			repeat: -1,
			duration: 1000
		  })

	}

	update() {
		if (gameState.cursors.space.isDown){
			gameState.score=0;
			this.scene.stop('EndScene')
			this.scene.start('StartScene')
		}	
	}

}