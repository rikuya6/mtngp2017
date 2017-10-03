$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  var game = new Core(screen_width, screen_height);
  game.fps = 30;
  game.rootScene.backgroundColor = "black";

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(screen_width, screen_height);
    scene.addChild(sprite);
    game.pushScene(scene);

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      '絵本描き「完璧だね。登場人物の○○したいって気持ちや、迷っている',
      '　　　　　理由を考えて、これからも手伝いをしてくれると嬉しいな。」',
      false,
      '絵本描き「次からは君の手伝いで絵本の中身が変わっちゃうから、',
      '　　　　　登場人物が幸せになるように頑張ってくれ。」',
      false,
      '絵本描き「じゃあ、また会おう。',
      '　　　　　次は君が手伝いとして立派になった時だ。」',
      false,
      false
    ];

    // 画面がクリックされたならば以下が呼び出される
    sprite.addEventListener('touchstart', function() {
      // 既に表示されていた文字を消す
      var len = label.length;
      for(let i = 0; i < len; i++){
        console.log(label[0]);
        scene.removeChild(label[0]);
        label.splice(0, 1);
      }

      // 文字表示するための処理
      // labelという配列にどんどん追加していく
      while(true){
        var work = noveltext[0];
        noveltext.splice(0, 1); // noveltext０番目から１つ削除
        if (!(work)) break;  // 配列noveltextにはfalseがある。
        // 以下、通常通りテキストを表示する処理
        var tex = new Label(work);
        tex.width = tex_width;
        label.push(tex); // falseじゃないなら一度に表示する分追加
      }

      // 表示の処理
      for(let i = 0; i < label.length; i++){
        label[i].moveTo( 40, 440 + i * 40);
        label[i].font = "32px 'メイリオ'";
        label[i].color = "white";
        scene.addChild(label[i]);
        game.pushScene(scene);
      }

      if(noveltext.length == 0){
        let submit = document.getElementById("tutorial3A_novel");
        submit.submit();
        game.pause();
      }
    });

  };
  game.start();
  window.scrollTo(0, 0);
}
