$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  let getCimg = function () {
    // キャラクター画像の準備
    let cimg = [];
    cimg[0] = false;
    for(let i = 1; i <= 13; i++){
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = this.game.assets["novel/"+i+".png"];
      cimg[i].moveTo((screen_width / 4) - 50, -100);
    }
    return cimg;
  };

  // デフォルトのテキスト: 歩数が多い場合
  let noveltext = [
    102,
    'えほんかき',
    '「うん、よく出来たね。でも　もう少し登場人物が　かんたんに',
    '　ゴールに着くことが　できたかな」',
    2,
    false,
    'えほんかき',
    '「これからも　たくさん手伝いをしてもらう。',
    '　ぼくの物語が　良くなるように　がんばって欲しい。」',
    false,
    'えほんかき',
    '「さぁ、これからは　君が考えて登場人物を動かすんだ。',
    '　気持ちを考えることを　わすれちゃいけないよ。」',
    false,
    'えほんかき',
    '「また会おう。次はりっぱな　お手伝いとしてね。」',
    false,
    false
  ];

  // 歩数が少ない場合のテキスト
  let Ttext = [
    102,
    'えほんかき',
    '「かんぺきだね。',
    '　登場人物の『○○したい』って気持ちや　まよっている',
    '　理由を考えて　これからも手伝いを　してくれると　うれしいな。」',
    2,
    false,
    'えほんかき',
    '「次からは　君の手伝いで　絵本の中身が変わっちゃうから、',
    '　登場人物が　幸せになるように　がんばってくれ。」',
    false,
    'えほんかき',
    '「じゃあ、また会おう。',
    '　次は君が手伝いとして　りっぱになったときだ。」',
    false,
    false
  ];

  // Cookieフラグ管理
  let status = Cookies.getJSON('tutorial_status');
  if (status.novel3) noveltext = Ttext;

  new Novel(noveltext, getCimg, "title");
}
