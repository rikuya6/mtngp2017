enchant();
window.onload = function() {
  var game = new Game(240, 320);
  game.fps = 20;
  game.preload("edit_map.png");

  game.onload = function() {
    var bgSpace = new Sprite(240, 320);
    bgSpace.image = game.assets["edit_map.png"];
    game.rootScene.addChild(bgSpace);

    // novel.enchant.js のインスタンス生成.
    var novel = new Novel(0, 0, 240, 320);
    novel.setFontSize(12);
    novel.setLineHeight(20);
    novel.setPadding(12, 12, 12, 12);
    novel.setFontFamily("PixelMplus12");
    game.rootScene.addChild(novel);

    // 選択時のコールバック関数.
    game.selectChoice = function(id, select) {
      switch (id) {
        case 1:
          switch (select) {
            case 1:
              novel.setText("数多の惑星だってそうだ。");
              novel.setText("地球も、地球の一生物に過ぎない人間も、そして僕も、意味があって存在している。");
              novel.setText("何かを成す為に。");
              novel.setText("（タッチで効果音「チャイム」を鳴動）");
              // novel.setSE(SND_CHIME, 3000);
              novel.setText("（鳴り終わりを待って次の文を表示）");
              break;
            case 2:
              novel.setText("その惑星に生息する生物だってそうだ。");
              novel.setText("地球も、地球の一生物に過ぎない人間も、そして僕も、意味があって存在している。");
              novel.setText("何かを成す為に。");
              novel.setText("（タッチで効果音「電話」を鳴動）");
              // novel.setSE(SND_PHONE, 0);
              novel.setText("（鳴り終わりを待たずに次の文を表示）");
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    };

    novel.setText("僕はどこからどう見ても、紛れも無く人間だが、同時に、地球という惑星の、一生物に過ぎない。");
    novel.setText("宇宙は何の意味もなく、ただ生まれただけなのだろうか、いや、僕はそうは思わない。");
    novel.setText("宇宙は、”何か”によって求められて、何かを成す為に生まれてきたんだ。");
    novel.setPageBreak();
    novel.setChoice(1,
      "数多の惑星だってそうだ。",
      "その惑星に生息する生物だってそうだ。",
      "",
      "",
      game.selectChoice);

    // 画面タッチで次へ.
    game.rootScene.ontouchstart = function() {
      novel.next();
    };
  };

  // ゲームをスタート.
  game.start();
};
