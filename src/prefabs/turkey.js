class Turkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.yVel = 0;
      this.touchingGround = false;
      this.jumpStr = -10;
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)&&this.touchingGround){
            this.yVel = this.jumpStr;
        }
        if(!this.touchingGround){
            if(keyJump.isDown){
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
}