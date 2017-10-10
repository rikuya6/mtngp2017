class RsetButton {
  constructor(callback) {
    this.theme = {
      normal: {
        color: '#fff',
        background: { type: 'linear-gradient', start: '#04f', end: '#04c' },
        border: { color: '#026', width: 1, type: 'solid' },
        textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
        boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
      },
      active: {
        color: '#333',
        background: { type: 'linear-gradient', start: '#ccc', end: '#999' },
        border: { color: '#666', width: 1, type: 'solid' },
        textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#ccc' },
        boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(255, 255, 255, 0.3)' }
      }
    };
    this.beforeText = "リセット!";
    this.afterText  = "リセット!";
    this.button = new ButtonController(this.beforeText, this.afterText, true, this.theme, callback);
  }

  getButtonObject() {
    return this.button.getButtonObject();
  }

  move(x, y) {
    this.button.move(x, y);
  }

  enable() {
    this.button.enable();
  }

  disable() {
    this.button.disable();
  }

  reset(player) {
    player.reset();
    this.button.reset();
  }
}
