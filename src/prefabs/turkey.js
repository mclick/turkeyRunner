class Turkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.yVel = 0;
      this.touchingGround = false;
      this.jumpStr = -10;

      this.jump = scene.sound.add('jump');
      this.call1 = scene.sound.add('01turkey');
      this.call2 = scene.sound.add('02turkey');
      this.call3 = scene.sound.add('03turkey');

      this.bgmTime=0;
    }

    update(){
        if(keyJump.isDown&&this.touchingGround){
            this.yVel = this.jumpStr;
            this.jump.play({volume: 0.7});
            this.playCall();
        }
        if(!this.touchingGround){
            if(keyJump.isDown){
                if(this.yVel>4){
                    this.yVel = this.yVel/2 +2;
                }
                this.yVel-=gravConst/2;
            }
            else{
                this.yVel-=gravConst;
            }
        }
        else if(this.yVel > 0){
            this.yVel = 0;
        }
        this.y+=this.yVel;
    }
    reset(){
        this.x=borderPadding+borderUISize;
        this.y=game.config.height/2;
    }
    playCall(){
        //console.log(this.bgmTime);
        if ( (this.bgmTime > 0 && this.bgmTime < 6.2) ||
            (this.bgmTime > 13 && this.bgmTime < 19.2) ||
            (this.bgmTime > 26 && this.bgmTime < 32.2) ||
            (this.bgmTime > 39 && this.bgmTime < 45.2) )
            this.call1.play({volume: 0.5});
        if ( (this.bgmTime > 6.21 && this.bgmTime < 9.2) ||
            (this.bgmTime > 19.21 && this.bgmTime < 22.2) ||
            (this.bgmTime > 32.21 && this.bgmTime < 35.2) ||
            (this.bgmTime > 45.21 && this.bgmTime < 48.2) )
            this.call2.play({volume: 0.5});
        if ( (this.bgmTime > 9.21 && this.bgmTime < 12.99) ||
            (this.bgmTime > 22.21 && this.bgmTime < 25.99) ||
            (this.bgmTime > 35.21 && this.bgmTime < 38.99) ||
            (this.bgmTime > 48.21 && this.bgmTime < 53) )
            this.call3.play({volume: 0.5});
    }
}