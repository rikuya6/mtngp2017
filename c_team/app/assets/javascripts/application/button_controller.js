class ButtonController {
  constructor(beforText, afterText, callback){
    this.button = new Button(beforText, null, 64, 128);
    this.isPushed = false;

    this.button.ontouchstart = function() {
      if(!this.isPushed){
        this.isPushed = true;
        this.text = afterText;
        console.log("Pushed");
        callback();
        console.log("Finish");
        this.isPushed = false;
        this.text = beforText;
      }else{
        console.log('Disabled');
      }
    };
  }

  move(x, y){
    this.button.moveTo(x, y);
  }

  getButtonObject(){
    return this.button;
  }
}
