class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //final
        this.load.atlas('sprites','./assets/finalAssets/turkeySpritesheet.png', './assets/finalAssets/turkey.json');
        this.load.image('tree','./assets/finalAssets/tree.png');
        this.load.image('kite','./assets/finalAssets/Sprite-0004.png');
        this.load.image('squirrel','./assets/finalAssets/skwrl.png');
        this.load.image('bg','./assets/finalAssets/background.png');

        //audio
        this.load.audio('bgm', './assets/finalAssets/sound/bgm.wav');
        
    }
    create(){
        this.gameOver=false;
        this.backround = this.add.tileSprite(0, 0, 1280, 480, 'bg').setOrigin(0, 0);
        //ground objects
        this.stick7= new Stick(this, borderPadding+borderUISize, game.config.height/2+10, 'tree', 0).setOrigin(0, 0);
        this.stick2= new Stick(this, game.config.width * (2/6), game.config.height *(2/6), 'tree', 0).setOrigin(0, 0);
        this.stick3= new Stick(this, game.config.width * (3/6), game.config.height *(3/6), 'tree',0).setOrigin(0, 0);
        this.stick4= new Stick(this, game.config.width * (4/6), game.config.height *(2/6), 'tree',0).setOrigin(0, 0);
        this.stick5= new Stick(this, game.config.width * (5/6), game.config.height *(3/6), 'tree',0).setOrigin(0, 0);
        this.stick6= new Stick(this, game.config.width * (6/6), game.config.height *(2/6)-20, 'tree',0).setOrigin(0, 0);
        this.stick1= new Stick(this, game.config.width /6, game.config.height*3/6, 'tree',0).setOrigin(0, 0);
        //kite
        this.kite = new Kite(this, game.config.width,game.config.height*Math.random(),'kite',0).setOrigin(0,0);
        //squirrel
        this.squirrel=new Squirrel(this,this.stick6.x+this.stick6.width*Math.random(), this.stick6.y+120,'squirrel',0).setOrigin(0,0);
        this.currStick=4;

        this.turkey = new Turkey(this, borderPadding+borderUISize*2, game.config.height/2, 'sprites','run1.png').setOrigin(0.5, 0);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        speedConst=2;

        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#15bfd5',
            color: '#000000',
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
            this.backround.tilePositionX+=2*speedConst;
            if(this.checkGrounded(this.turkey,this.stick1)||this.checkGrounded(this.turkey,this.stick2)||
                this.checkGrounded(this.turkey,this.stick3)||this.checkGrounded(this.turkey,this.stick4)||
                this.checkGrounded(this.turkey,this.stick5)||this.checkGrounded(this.turkey,this.stick6)||
                this.checkGrounded(this.turkey, this.stick7)){
                    if(this.turkey.touchingGround==false){
                        this.turkey.touchingGround=true;
                        this.turkey.anims.stop();
                        this.turkey.setTexture('sprites','run1.png');
                        this.turkey.anims.play('run');
                    }
            }
            else {
                this.turkey.touchingGround=false;
                this.turkey.anims.stop();
                this.turkey.setTexture('sprites','fly1.png');
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
            this.kite.update();
            this.squirrel.update();
            if(this.squirrel.x<0-this.squirrel.width){
                switch(this.currStick){
                    case 0: this.squirrel.reset(this.stick1); break;
                    case 1: this.squirrel.reset(this.stick2); break;
                    case 2: this.squirrel.reset(this.stick3); break;
                    case 3: this.squirrel.reset(this.stick4); break;
                    case 4: this.squirrel.reset(this.stick5); break;
                    case 5: this.squirrel.reset(this.stick6); break;
                    case 6: this.squirrel.reset(this.stick7); break;
                }
                this.currStick--;
                if(this.currStick<0){this.currStick=6;}
            }
            if(this.turkey.y>game.config.height||this.checkKiteCollision(this.turkey,this.kite)
            ||this.checkCollision(this.turkey,this.squirrel)){
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
                backgroundColor: '#15bfd5',
                color: '#000000',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            } 
            if(this.score>highScore){
                highScore=this.score
            }
            this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, 'GAME OVER', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Space to Return to Menu', menuConfig).setOrigin(0.5);
            this.str = 'High Score: ';

            this.add.text(game.config.width/2,game.config.height/2+borderUISize+borderPadding, this.str.concat(Math.trunc(highScore)),menuConfig).setOrigin(0.5);
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
        turkey.height + turkey.y > ground.y+120){
            return true;
        }
        else{
            return false;
        }
    }

    checkKiteCollision(turkey,kite){//excludes kites long tail
        if(turkey.x < kite.x + kite.width && 
            turkey.x + turkey.width > kite.x && 
            turkey.y < kite.y+25&&
            turkey.height + turkey.y > kite.y){
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


