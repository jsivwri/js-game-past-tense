class GameScene extends Phaser.Scene{
		  constructor(){
		    super({ key: 'GameScene' })
		  }

	preload() {
		this.load.image('bug', 'assets/bug.png');
		this.load.image('top', 'assets/top.png');
		this.load.image('side', 'assets/side.png');
	

		this.load.audio('a', ['assets/audio/a.m4a','assets/audio/a.mp3']);
		this.load.audio('s', ['assets/audio/s.m4a','assets/audio/s.mp3']);
		this.load.audio('g', ['assets/audio/g.m4a','assets/audio/g.mp3']);
		this.load.audio('h', ['assets/audio/h.m4a','assets/audio/h.mp3']);
		this.load.audio('k', ['assets/audio/k.m4a','assets/audio/k.mp3']);
		this.load.audio('l', ['assets/audio/l.m4a','assets/audio/l.mp3']);
	}

	create() {

				if (!gameState.music.theme){ 
		gameState.music.theme = this.sound.add('theme', {loop: true});
		gameState.music.theme.play();
		}
		
		gameState.levelUpScore+=10*Math.floor(70/(gameState.levelSpeed+1))

		const sides = this.physics.add.staticGroup();
		sides.create(400, 20, 'top'); //top
		sides.create(400,560, 'top'); //bottom
		sides.create(20,300, 'side'); //left
		sides.create(780,300, 'side'); //rights
		
			let gap=80*(2/(1+gameState.levelSpeed));

			 gameState.music.a = this.sound.add('a', {volume:0.25});
			 gameState.music.s = this.sound.add('s', {volume:0.25});
			 gameState.music.g = this.sound.add('g', {volume:0.25});
			 gameState.music.h = this.sound.add('h', {volume:0.25});
			 gameState.music.k = this.sound.add('k', {volume:0.25});
			 gameState.music.l = this.sound.add('l', {volume:0.25});

				gameState.music.collect = {
					_playA : function(){gameState.music.a.play()},
					_playS : function(){gameState.music.s.play()},
					_playG : function(){gameState.music.g.play()},
					_playH : function(){gameState.music.h.play()},
					_playK : function(){gameState.music.k.play()},
					_playL : function(){gameState.music.l.play()},
					play : function(){
						let x = Math.floor(Math.random()*6)
						switch (x) {
							case 0:
								this._playA();
								break;
							case 1:
								this._playS();
								break;
							case 2:
								this._playG();
								break;
							case 3:
								this._playH();
								break;
							case 4:
								this._playK();
								break;
							case 5:
								this._playL();
								break;
						}
					}
				};


				gameState.player=this.physics.add.group();
				gameState.active=true;

	


				// initalise the player
				let tint=0xff0000
				gameState.player.create(400, 300, 'bug').setScale(scale*0.15).setTint(0xffffff);

			

				// initalise cursors and various objects
				gameState.cursors = this.input.keyboard.createCursorKeys();
				gameState.snake.direction=[[""]];
				gameState.snake.control = {};
				gameState.snake.control.dir=" ";
				
				// a function for creating the placeholders in the array. Change 'gap' to change the spacing between elements in the chain
				gameState.snake.createDirectionArray = () => {
					let output=[""];
					for (let i=0;i<gap;i++){output.push("")};
					return output;
				}

				// a function for adding an element into the chain array
				gameState.snake.createElement = () => { 
				gameState.snake.direction.push(gameState.snake.createDirectionArray());
				let chainLength=(gameState.player.getChildren()).length
				gameState.player.create(gameState.player.getChildren()[chainLength-1].x,gameState.player.getChildren()[chainLength-1].y,'bug').setScale(scale*0.15).setTint(tint);
				}

				const fruit = this.physics.add.staticGroup();
				
				const createFruit=()=> {
					// fruit creation and location
					let xRange=50+Math.random()*(config.width-100);
					let yRange=50+Math.random()*(config.height-120);
					fruit.create(xRange,yRange,'bug').setScale(0.2).setTint(0x0099ff).refreshBody();

					this.tweens.add({
						targets: fruit.getChildren(),
						paused: false,
						ease: 'Back',
						scaleX: 0.1,
						scaleY: 0.1,
						yoyo: true,
						repeat: -1,
						duration: 1000
					  })

					// fruit collider
					this.physics.add.collider(fruit,gameState.player, (fruit)=>{
						
						//play chime
						gameState.music.collect.play();
						// score control 
						gameState.score+=10;
						gameState.scoreText.setText('Score: '+gameState.score);

						if (gameState.player.getChildren().length==1){
							gameState.vulnerable=30;
						}

						// element creation
						fruit.destroy();
						gameState.snake.createElement();
						createFruit();
					}) 
				}

				createFruit();

				// a function for moving each element
				gameState.snake.control.logic = (dir, element) => {
					if (gameState.active===true){
						switch (dir) {
						case 'left':
							gameState.player.getChildren()[element].x-=1+gameState.levelSpeed;
							break;
						case 'right':
							gameState.player.getChildren()[element].x+=1+gameState.levelSpeed;
							break;
						case 'up':
							gameState.player.getChildren()[element].y-=1+gameState.levelSpeed;
							break;
						case 'down':
							gameState.player.getChildren()[element].y+=1+gameState.levelSpeed;			
							break;
						}
					}
				}

				const gameOver=()=>{
					gameState.lives--;
					if (gameState.lives==0){ 
						gameState.highScore=(gameState.score>gameState.highScore?gameState.score:gameState.highScore)
						this.scene.stop('GameScene')
						this.scene.start('EndScene')
					} else { 
						this.scene.stop('GameScene')
						this.scene.start('LoseLifeScene')

					}

				}	

				gameState.colliderInit =()=>{
					this.physics.add.collider(gameState.player.getChildren()[0], gameState.player, ()=>{	
						gameState.active=false;
						gameOver();
					})
				}

				this.physics.add.collider(sides, gameState.player, ()=>{
						gameState.active=false;
						gameOver();
					})
					
				
					gameState.scoreText = this.add.text(350, 570, 'Score: '+gameState.score, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });
					gameState.livesText = this.add.text(60, 570, 'Lives: '+gameState.lives, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });
					gameState.levelText = this.add.text(600, 570, 'Next Level: '+gameState.levelUpScore, {fontWeight: 'bold', fontSize: '15px', fill: '#ffffff' });
				
		}	
	update() {

			if(typeof gameState.vulnerable === "number" && gameState.vulnerable>0){
				gameState.vulnerable--;
			} else if (typeof gameState.vulnerable === "number" && gameState.vulnerable===0){
				gameState.vulnerable=null;
				gameState.colliderInit();
			}

			if(gameState.score>=gameState.levelUpScore){
					this.scene.stop('GameScene')
					this.scene.start('NextLevelScene')
				}

			// bind cursors to a variable which remains static unless a new key is pushed
			if (gameState.cursors.left.isDown) {gameState.snake.control.dir = 'left'};
			if (gameState.cursors.right.isDown) {gameState.snake.control.dir = 'right'};
			if (gameState.cursors.up.isDown) {gameState.snake.control.dir = 'up'};
			if (gameState.cursors.down.isDown) {gameState.snake.control.dir = 'down'};
		/*	
			if(game.input.mousePointer.isDown){
				if (game.input.activePointer.downY<200){gameState.snake.control.dir = 'up'}
				if (game.input.activePointer.downY>400){gameState.snake.control.dir = 'down'}
				if (game.input.activePointer.downX<300){gameState.snake.control.dir = 'left'}
				if (game.input.activePointer.downX>500){gameState.snake.control.dir = 'right'}
			}
		*/


			// pushes the current direction variable into the snake direction array
			gameState.snake.direction[0].push(gameState.snake.control.dir);

			// pushes the front of the direction array for each snake element into the direction array for the subsequent element 
			gameState.snake.direction.forEach((element, index)=>{if (index){element.push(gameState.snake.direction[index-1][0])}});

			// removes the first value of each snake direction array and passes it to the control.logic function to move the element
			gameState.snake.direction.forEach((element, index)=>{gameState.snake.control.logic(element.shift(),index)});
		}
}