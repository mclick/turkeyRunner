class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //temp
        this.load.image('tempBackround','./assets/tempAssets/tempbackround.png');
        this.load.image('stick','./assets/tempAssets/tempstick.png');

        //final
        this.load.atlas('sprites','./assets/finalAssets/turkeySpritesheet.png', './assets/finalAssets/hello.json');
        this.load.image('tree','./assets/finalAssets/tree.png');
        this.load.image('background','./assets/finalAssets/background.png');

        //audio
        this.load.audio('bgm', './assets/finalAssets/sound/bgm.wav');
        
    }
    create(){
        this.gameOver=false;
        this.backround = this.add.tileSprite(0, 0, 1280, 480, 'backround').setOrigin(0, 0);
        //ground objects
        this.stick1= new Stick(this, borderPadding+borderUISize, game.config.height/2+10, 'tree', 0).setOrigin(0, 0);
        this.stick2= new Stick(this, game.config.width * (2/6), game.config.height *(2/6), 'tree', 0).setOrigin(0, 0);
        this.stick3= new Stick(this, game.config.width * (3/6), game.config.height *(3/6), 'tree',0).setOrigin(0, 0);
        this.stick4= new Stick(this, game.config.width * (4/6), game.config.height *(2/6), 'tree',0).setOrigin(0, 0);
        this.stick5= new Stick(this, game.config.width * (5/6), game.config.height *(3/6), 'tree',0).setOrigin(0, 0);
        this.stick6= new Stick(this, game.config.width * (6/6), game.config.height *(2/6)-20, 'tree',0).setOrigin(0, 0);
        this.stick7= new Stick(this, game.config.width /6, game.config.height*3/6, 'tree',0).setOrigin(0, 0);

        this.turkey = new Turkey(this, borderPadding+borderUISize, game.config.height/2, 'sprites','run1.png').setOrigin(0.5, 0);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        speedConst=2;

        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //debug info comment out before release
        //this.debugInfoX = this.add.text(borderUISize+borderPadding,borderUISize*2+borderPadding*2, this.turkey.x, clockConfig)
        //this.debugInfoY = this.add.text(borderUISize+borderPadding,borderUISize*3+borderPadding*3, this.turkey.y, clockConfig)

        this.trueClock=0;
        this.clock = 0;
        this.clockRight = this.add.text(game.config.width-borderUISize-borderPadding, borderUISize+borderPadding, this.clock , clockConfig).setOrigin(0.5);
        this.score = 0;
        this.scoreLeft = this.add.text(borderUISize+borderPadding,borderUISize+borderPadding, this.score, clockConfig).setOrigin(0.5);

        //sound
        this.die = this.sound.add('die');
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        //animation config
        this.anims.create({
            key: 'run',
            frameRate: 10,
            frames: this.anims.generateFrameNames('sprites',{
                prefix:"run",
                suffix:".png" ,
                start: 1,
                end: 2,
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frameRate: 10,
            frames: this.anims.generateFrameNames('sprites', {
                prefix: "fly",
                suffix: ".png", 
                start: 1,
                end: 2, 
            }),
            repeat: -1
        });
    }
    update(){//update is called 60 times a second
        //update debuginfo
        //this.debugInfoX.text = this.turkey.x
        //this.debugInfoY.text = this.turkey.y

        if(!this.gameOver){
            this.turkey.bgmTime = this.bgm.seek;
            speedConst+=accelConst;
            this.backround.tilePositionX-=2;
            if(this.checkGrounded(this.turkey,this.stick1)||this.checkGrounded(this.turkey,this.stick2)||
                this.checkGrounded(this.turkey,this.stick3)||this.checkGrounded(this.turkey,this.stick4)||
                this.checkGrounded(this.turkey,this.stick5)||this.checkGrounded(this.turkey,this.stick6)||
                this.checkGrounded(this.turkey, this.stick7)){
                    if(this.turkey.touchingGround==false){
                        this.turkey.touchingGround=true;
                        this.turkey.anims.stop();
                        this.turkey.anims.play('run');
                    }
            }
            else {
                this.turkey.touchingGround=false;
                this.turkey.anims.stop();
                this.turkey.anims.play('jump');
            }
            this.turkey.update();
            this.stick1.update();
            this.stick2.update();
            this.stick3.update();
            this.stick4.update();
            this.stick5.update();
            this.stick6.update();
            this.stick7.update();
            if(this.turkey.y>game.config.height){
                this.turkey.reset();
                this.gameOver = true;
                this.die.play({volume: 0.5});
            }
            this.trueClock+=1/60;
            this.clock=Math.trunc(this.trueClock);
            this.clockRight.text = this.clock
            this.score+=speedConst/60;
            this.scoreLeft.text=Math.trunc(this.score);
        }
        if(this.gameOver){
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            } 
            this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, 'GAME OVER', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Space to Return to Menu', menuConfig).setOrigin(0.5);
            if(Phaser.Input.Keyboard.JustDown(keyJump)){
                this.bgm.stop();
                this.scene.start('menuScene');
            }
        }
    }
    //slight variation of checkCollison, that checks if the turkey is just above the ground, rather than if the turkey is touching the ground.
    checkGrounded(turkey,ground){
        if(turkey.x < ground.x + ground.width && 
        turkey.x + turkey.width > ground.x && 
        turkey.y < ground.y+130&&
        turkey.height + turkey.y > ground.y+130){
            return true;
        }
        else{
            return false;
        }
    }

    checkCollision(turkey, obstacle){ //this is reusable for obstacles and collectables
        if(turkey.x < obstacle.x + obstacle.width && 
        turkey.x + turkey.width > obstacle.x && 
        turkey.y < obstacle.y+obstacle.height&&
        turkey.height + turkey.y > obstacle.y){
            return true;
        }
        else{
            return false;
        }
    }
}


