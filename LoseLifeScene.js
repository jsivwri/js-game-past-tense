class LoseLifeScene extends Phaser.Scene{
	constructor(){
		super({ key: 'LoseLifeScene' })
	}

	preload() {
        this.load.image('board', 'assets/board.png');
        this.load.image('top', 'assets/top.png');
		this.load.image('side', 'assets/side.png');
	}

	create() {

        const board=this.add.image(400,300,'board');
        board.setInteractive();
        board.on('pointerdown',()=>{
            gameState.levelUpScore-=10*Math.floor(70/(gameState.levelSpeed+1))
			this.scene.stop('LoseLifeScene')
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
		const lives = this.add.text(125,220,`- LIVES REMAINING: ${gameState.lives} -`,{fontWeight: 'bold', fontSize: '40px', fill: '#ffffff'})
	 	const restart=  this.add.text(80,400,'TAP OR PRESS SPACE TO CONTINUE',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'})

         gameState.centraliseText(lives);
         gameState.centraliseText(restart);
    

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
            gameState.levelUpScore-=10*Math.floor(70/(gameState.levelSpeed+1))
			this.scene.stop('LoseLifeScene')
			this.scene.start('GameScene')
		}	
	}

}