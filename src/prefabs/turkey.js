class Turkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.yVel = 0;
      this.touchingGround = false;
      this.jumpStr = -12;
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)&&touchingGround){
            this.yVel = this.jumpStr;
        }
        if(!touchingGround){
            if(keyJump.isDown){
                this.yVel-=gravConst/2;
            }
            else{
                this.yVel-=gravConst;
            }
        }
        else{
            this.yVel = 0;
        }
        this.y+=this.yVel;
    }
}