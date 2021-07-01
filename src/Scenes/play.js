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

        this.stick1= new Stick(this, game.config.width * (1/6), game.config.height *(1/6), 'stick', 0).setOrigin(0, 0);
        this.stick2= new Stick(this, game.config.width * (2/6), game.config.height *(2/6), 'stick', 0).setOrigin(0, 0);
        this.stick3= new Stick(this, game.config.width * (3/6), game.config.height *(3/6), 'stick',0).setOrigin(0, 0);
        this.stick4= new Stick(this, game.config.width * (4/6), game.config.height *(4/6), 'stick',0).setOrigin(0, 0);
        this.stick5= new Stick(this, game.config.width * (5/6), game.config.height *(5/6), 'stick',0).setOrigin(0, 0);
        this.stick6= new Stick(this, game.config.width * (6/6), game.config.height *(6/6), 'stick',0).setOrigin(0, 0);
    }
    update(){
        this.backround.tilePositionX-=2;
        this.turkey.update();
        this.stick1.update();
        this.stick2.update();
        this.stick3.update();
        this.stick4.update();
        this.stick5.update();
        this.stick6.update();
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


