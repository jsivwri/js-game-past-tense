class NextLevelScene extends Phaser.Scene{
	constructor(){
		super({ key: 'NextLevelScene' })
	}

	preload() {
		this.load.image('board', 'assets/board.png');
		this.load.image('top', 'assets/top.png');
		this.load.image('side', 'assets/side.png');
	}

	create() {
		gameState.levelSpeed++;

		const board=this.add.image(400,300,'board');
        board.setInteractive();
        board.on('pointerdown',()=>{
			this.scene.stop('NextLevelScene')
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
		const level = this.add.text(125,200,`- LEVEL ${gameState.levelSpeed} -`,{fontWeight: 'bold', fontSize: '40px', fill: '#ffffff'})
		const continueGame = this.add.text(80,260,'TAP OR PRESS SPACE TO CONTINUE',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'})
		 
		gameState.centraliseText(level);
		gameState.centraliseText(continueGame);

		this.tweens.add({
			targets: continueGame,
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
			this.scene.stop('NextLevelScene')
			this.scene.start('GameScene')
		}	
	}

}