class ButtonController {
  constructor(beforeText, afterText, disable, theme, callback){
    this.button = new Button(beforeText, theme, 64, 128);
    this.button.theme = theme;
    this.button.beforeText = beforeText;    
    this.button.afterText = afterText;
    this.button.startDisable = disable;
    this.button.disable = disable;
    this.button.current_theme = 0; // デフォルト normal  
    this.button.isDisabled = function () {
      return this.disable;
    };

    this.button.addEventListener("touchstart", function() {
      if(!this.isDisabled()){
        callback();
      }else{
        console.log('Disabled');
      }
    });

    this.button.addEventListener("enterframe", function() {
      if (!this.isDisabled()) {
        if (this.current_theme == 0) return;
        this.text = this.beforeText;
        this._applyTheme(this.theme.normal);
        this.current_theme = 0;
      } else {
        if (this.current_theme == 1) return;
        this.text = this.afterText;  
        this._applyTheme(this.theme.active);
        this.current_theme = 1;
      }
    });
  }

  move(x, y){
    this.button.moveTo(x, y);
  }

  getButtonObject(){
    return this.button;
  }

  enable() {
    this.button.disable = false;
  }

  disable() {
    this.button.disable = true;
  }

  reset() {
    this.button.disable = this.button.startDisable;
  }
}
