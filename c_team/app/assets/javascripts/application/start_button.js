class StartButton extends ButtonController {
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
    const beforeText = "▶実行";
    const afterText  = "実行中";
    super(beforeText, afterText, false, theme, callback);
  }

  reset() {
    super.reset();
  }
}
