class RsetButton extends ButtonController {
  constructor(callback) {
    const theme = {
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
    const beforeText = "リセット!";
    const afterText  = "リセット!";
    super(beforeText, afterText, true, theme, callback);
  }

  reset(player) {
    player.reset();
    super.reset();
  }
}
