$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  let noveltext = [
    102,
    '絵本描き',
    '「よく出来たね。',
    '　これが登場人物を　動かすってことなんだ。」',
    2,
    false,
    '絵本描き',
    '「じゃあ次の子も　挑戦してみようか。」',
    false,
    '絵本描き',
    '「次の子は迷子になっているから　ゴールに着くように',
    '　助けてあげよう。」',
    false,
    '絵本描き',
    '「次は、『もし前へ進めないなら　右へ曲がる』っていう',
    '　コードが　設定されているよ。」',
    114,
    false,
    '絵本描き',
    '「赤いパイロンを置いて　ゴール着くようにしよう。」',
    false,
    '<br><br>',
    '<チュートリアル2>',
    'もし　前に進めないなら右に曲がる子を　ゴールに届けよう',
    false,
    false
  ];
  new Novel(noveltext, "tutorial2")
}
