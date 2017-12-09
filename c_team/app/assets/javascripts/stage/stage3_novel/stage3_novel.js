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
    for (let i = 1; i <= 13; i++) {
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = this.game.assets["novel/" + i + ".png"];
      if (i == 1 || i == 5 || i == 9 || i == 13) {
        cimg[i].moveTo(100, -100);
      } else {
        cimg[i].moveTo(400, -100);
      }
    }
    return cimg;
  };

  //flowerがtrue
  let noveltext = [
    '<br><br>',
    'あずきは　無事病院のそばのバス停で　降りることができました。',
    1,
    104,
    false,
    'あずき',
    '「５番目のバス停で　降りればいいんだよね！」',
    false,
    'あずき',
    '「よし　おばあちゃんのいる　病院まで　もう少しだね！',
    '　花束も買ったし　もうまっすぐ病院に行けばいいかな…？」',
    false,
    'あずき',
    '「でもお見舞いって　何か好きなもの　持ってきてくれた方が',
    '　嬉しいよね？',
    '　おばあちゃん、　果物とか和菓子とかが　好きだったから',
    '　買いに行こうかな…？」',
    -1,
    9,
    false,
    false,
  ];

  let park = [
    '<br><br>',
    'あずきは　無事病院のそばのバス停で　降りることができました。',
    9,
    104,
    false,
    'あずき',
    '「よかった、ちょっと時間はなくなっちゃったし　お花も置いて',
    '　きちゃったけど　ここまでこれた！」',
    false,
    'あずき',
    '「病院に　向かうまでの間に　お花の代わりになるものが',
    '　買えたらいいな…」',
    false,
    false,
  ];

  let library = [
    '<br><br>',
    'あずきは　無事病院のそばのバス停で　降りることができました。',
    9,
    104,
    false,
    'あずき',
    '「よかった、なんとか　ここまでこれた…」',
    false,
    'あずき',
    '「ここから急いで向かえば　おばあちゃんのところまで　いけるかな」',
    false,
    '<br><br>',
    'あずきがそう　つぶやいたときです。',
    false,
    '？',
    '「あずき！　まだこんなところにいたのか」',
    7,
    false,
    '<br><br>',
    'すぐそばで　名前を呼ばれた　あずきのそばには',
    'スーツ姿のお父さんがいました。',
    false,
    'あずき',
    '「お父さん！　どうしてここにいるの？」',
    -9,
    1,
    false,
    'お父さん',
    '「あずきがお見舞いに行くって聞いて、',
    '　一緒に帰ろうと思ったんだけど',
    '　まだここにいたんだね…」',
    false,
    'あずき',
    '「うん…ちょっと図書館で寄り道しちゃって…」',
    -1,
    5,
    false,
    'お父さん',
    '「そっか、とりあえずあんまり遅いと　おばあちゃんと',
    '　会える時間がなくなっちゃうから急いで行こうか」',
    false,
    'あずき',
    '「うん」',
    false,
    '<br><br>',
    'あずきは　お父さんに連れられて　病院まで向かうことになりました。',
    false,
    false,
  ];

  // Cookieフラグ管理
  let status = Cookies.getJSON('status');
  console.log(status);
  if (!(status.flower_flg) && status.park_flg) {
    noveltext = park;
  } else if (status.library_flg) {
    noveltext = library;
  }
  let submitIdName = status.library_flg ? "ending" : "stage3";

  new Novel(noveltext, getCimg, submitIdName);
}
