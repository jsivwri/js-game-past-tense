class CreditsScene extends Phaser.Scene{
	constructor(){
		super({ key: 'CreditsScene' })
	}

	preload() {
        this.load.image('board', 'assets/board.png');
        this.load.image('top', 'assets/top.png');
        this.load.image('side', 'assets/side.png');
        this.load.image('profile', 'assets/profile.png')
	}

	create() {
        const board=this.add.image(400,300,'board');
        board.setInteractive();
        board.on('pointerdown',()=>{
			this.scene.start('StartScene')
			this.scene.stop('CreditsScene')
		})

        const sides = this.physics.add.staticGroup();
					sides.create(400, 20, 'top'); //top
					sides.create(400,560, 'top'); //bottom
					sides.create(20,300, 'side'); //left
                    sides.create(780,300, 'side'); //right
		
		
		gameState.cursors = this.input.keyboard.createCursorKeys();
        const lives = this.add.text(125,120,`- CREDITS -`,{fontWeight: 'bold', fontSize: '40px', fill: '#ffffff'})
        const restart=  this.add.text(80,475,'TAP OR PRESS SPACE TO CONTINUE',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'})
         
        this.add.image(140,270,'profile').setScale(0.2);
        this.add.text(180,270,'<sivwri.io>',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'})

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
		    gameState.score = 0;
			this.scene.stop('LoseLifeScene')
			this.scene.start('StartScene')
		}	
	}

}