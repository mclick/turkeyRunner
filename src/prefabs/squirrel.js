//this should work for all obstacles regardless of their appearence
class Squirrel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
    }
    update(){
        this.x -= speedConst;
    }

    reset(object){
        this.x = object.x+Math.random()*object.width;
        this.y = object.y+120
    }
}