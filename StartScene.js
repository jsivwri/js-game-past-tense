let option=1;

class StartScene extends Phaser.Scene{
	constructor(){
		super({ key: 'StartScene' })
	}



	preload() {

		 this.load.audio('theme', ['assets/audio/backing.m4a','assets/audio/backing.mp3']);
		 this.load.image('board', 'assets/board.png');
		 this.load.image('bug', 'assets/bug.png');
		 this.load.image('top', 'assets/top.png');
		 this.load.image('side', 'assets/side.png');
	}


	create() {

		option=1;

	console.log(gameState.music.theme)

		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.centraliseText= function(text) {
			text.x=(game.canvas.width-text.displayWidth)/2;
			text.y=(text.y*game.canvas.height/600)
		}

		const sides = this.physics.add.staticGroup();
		sides.create(400, 20, 'top'); //top
		sides.create(400,560, 'top'); //bottom
		sides.create(20,300, 'side'); //left
		sides.create(780,300, 'side'); //right


		var title = this.add.text(0,60,'- PAST TENSE -',{fontWeight: 'bold', fontSize: '70px', fill: '#ffffff'});
		var menu1 = this.add.text(0,260,'START',{fontWeight: 'bold', fontSize: '50px', fill: '#ffffff'});
		var menu2 = this.add.text(0,360,'CREDITS',{fontWeight: 'bold', fontSize: '20px', fill: '#ffffff'});
		menu1.setInteractive();
		menu2.setInteractive();

		menu1.on('pointerover',()=>{			
			gameState.menuBugs(1)
		})
		menu2.on('pointerover',()=>{			
			gameState.menuBugs(2)
		})
		menu1.on('pointerdown',()=>{
			this.scene.start('GameScene')
			this.scene.stop('StartScene')
		})
		menu2.on('pointerdown',()=>{
			this.scene.start('CreditsScene')
			this.scene.stop('StartScene')
		})
		
	

		const quoteText = gameState.quotes[Math.floor(Math.random()*(gameState.quotes.length-1))]
		var quote = this.add.text(0, 500, quoteText ,{fontWeight: 'bold', fontSize: '12px', fill: '#ffffff'});

		gameState.centraliseText(title);
		gameState.centraliseText(menu1);
		gameState.centraliseText(menu2);
		gameState.centraliseText(quote);

		var menuBug1 = this.add.image(0,0,'bug').setScale(0.08);
		var menuBug2 = this.add.image(0,0,'bug').setScale(0.08);

		this.tweens.add({
			targets: menuBug1,
			paused: false,
			ease: 'Linear',
			alpha: 0,
			yoyo: true,
			repeat: -1,
			duration: 600
		  })

		  this.tweens.add({
			targets: menuBug2,
			paused: false,
			ease: 'Linear',
			alpha: 0,
			yoyo: true,
			repeat: -1,
			duration: 600
		  })

		gameState.menuBugs = function(option){
			switch(option) {
				case 1: 
					menuBug1.x = menu1.x-12;
					menuBug1.y = menu1.y+25;
					menuBug2.x = menu1.x+menu1.displayWidth+8;
					menuBug2.y = menu1.y+25;
					break;
				case 2:
					menuBug1.x = menu2.x-12;
					menuBug1.y = menu2.y+10;
					menuBug2.x = menu2.x+menu2.displayWidth+8;
					menuBug2.y = menu2.y+10;
					break;
			}
		}

		gameState.menuBugs(1);
		gameState.overlay = this.add.image(400,300,'board'); 
		

		gameState.levelSpeed=1;
		gameState.levelUpScore=0;
		gameState.lives=3;

		if (!gameState.music.theme){ 
		gameState.music.theme = this.sound.add('theme', {loop: true});
		gameState.music.theme.play();
		}
		
		
	}

	update() {
		if (gameState.cursors.space.isDown){
			if(option===1){
				gameState.score = 0;
				this.scene.start('GameScene')
				this.scene.stop('StartScene')
			}
			if(option===2){
				this.scene.start('CreditsScene')
				this.scene.stop('StartScene')	
			}
			
		

		
		}

		if (gameState.cursors.up.isDown){
			option=1;
			gameState.menuBugs(1);
		}
		if (gameState.cursors.down.isDown){
			option=2;
			gameState.menuBugs(2);
		}

		gameState.overlay.alpha-=0.025



		
	}

}