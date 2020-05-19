class CaptureScene extends Phaser.Scene{
	constructor(){
		super({ key: 'CaptureScene' })
	}

    create() {

        const background = this.add.rectangle(0,0,800,600,0xffffff).setOrigin(0,0)

        background.setInteractive()
        background.on('pointerdown',()=>{			
            this.scene.start('StartScene')
            this.scene.stop('CaptureScene')	
        })

		gameState.centraliseText= function(text) {
			text.x=(game.canvas.width-text.displayWidth)/2;
			text.y=(text.y*game.canvas.height/600)
		}

        var title = this.add.text(0,300,'CLICK TO PLAY',{fontWeight: 'bold', fontSize: '70px', fill: '#000000'});
        var message = this.add.text(0,450,'--best played with sound on--',{fontWeight: 'bold', fontSize: '30px', fill: '#000000'});
        
        gameState.centraliseText(title);
        gameState.centraliseText(message);

		
		
    }
    
    update(){

    }

}