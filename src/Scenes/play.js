class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('tempBackround','./assets/tempAssets/tempbackround.png');
        this.load.image('turkey','./assets/tempAssets/tempTurk.png');
        this.load.image('stick','./assets/tempAssets/tempstick.png');
    }
    create(){
        this.backround = this.add.tileSprite(0, 0, 640, 480, 'tempBackround').setOrigin(0, 0);
        this.turkey = new Turkey(this, borderPadding+borderUISize, game.config.height/2, 'turkey').setOrigin(0.5, 0);
    }
    update(){
        this.backround.tilePositionX-=2;
    }

    checkCollision(turkey,ground){
        if(turkey.x < ground.x + ground.width && 
        turkey.x + turkey.width > ground.x && 
        turkey.y < ground.y + ground.height &&
        turkey.height + turkey.y > ground. y){
            return true;
        }
        else{
            return false;
        }
    }
}


