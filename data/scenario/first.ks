*start
*title
;メッセージレイヤを非表示にしておく
@layopt layer=message0 visible=false

;背景画像を設定
[image layer="base" page="fore" storage=rouka.jpg]
[image layer=1 storage=title/1.png visible=true top=100 left=150]

[locate x=200 y=300 ]
[button graphic="title/button_start.gif" target=*first]

[locate x=200 y=360 ]
[button graphic="title/button_load.gif" target=*loadmenu]

[s]

;つづきからボタンが押された場合。ロード画面を表示
*loadmenu
[cm]
[showload]

[jump target=*title]
[s]

;ストーリー最初から
*first
[cm]
[freeimage layer=1]
;メッセージレイヤを再度表示する
@layopt layer=message0 visible=true
ゲームが始まります[l][r][cm]



C班ノベルゲームサンプル[l][cm]
このゲームは「ティラノスクリプト」を使用しています。[r]
http://tyrano.jp/[r][r]
仮で制作したため、同封されていた背景画像、キャラクター画像を使用しています。[r][l][cm]

[position height=160 top=430]
[ptext name="chara_name_area" layer=message0 width="200" color=white x=40 y=430 size=26]
[chara_config ptext="chara_name_area"]

;背景画像の切り替え実行
[bg storage=room.jpg time=3000]

#
[cm] メッセージは先程のような表示、下表示、縦書き表示ができるようです。[l][cm]

キャラクター表示を行います。[l][cm]

;１人目のキャラクター登場
[chara_new name="akane" storage="chara/akane/normal.png" jname="あかんねぇ"]
[chara_show name="akane"]

;２人目のキャラクター登場
[chara_new name="yamato" storage="chara/yamato/normal.png" jname="大和"]
[chara_show name="yamato"]

;表情を登録
[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
[chara_face name="yamato" face="angry" storage="chara/yamato/angry.png"]

#akane
[r]「わたしはあかねです。」[l][cm][r]

#yamato
「ぼくは大和ハウスです。」[l][cm][r]

#
表情の変更を行います。[r]
;表情の変更
[chara_mod name="akane" face="angry"]
[chara_mod name="yamato" face="angry"]
#akane:default
[chara_mod name="yamato" face="default"]

[l]

#
2人を退場させます。[r][cm]
[chara_hide name="akane" ]
[chara_hide name="yamato" ]


みんな大好き選択肢を表示します[l][cm]

[link target=*select1]【１】おばあちゃん経営の病院へ行く[endlink][r]
[link target=*select2]【２】おばあちゃん製のお土産を買う[endlink][r]
[link target=*common]【３】共通ルートへジャンプ[endlink][r]

[s]

*select1
[cm]
「病院」がクリックされました[l][r]
共通ルートへジャンプします[l]
@jump target=*common

*select2
[cm]
「お土産」がクリックされました[l][r]
共通ルートへジャンプします[l]
@jump target=*common


*common
[cm]
ここが共通ルートです[l][cm]



選択肢の先は別ファイルで定義することもできます[l][cm]

[link storage=select1.ks target=*select1]【１】select1.ksへ行く[endlink][r]
[link storage=select2.ks target=*select2]【２】select2.ksへ行く[endlink][r]

[s]

*common2
[cm]
戻りました[l][r]
シナリオが長くなっちゃうときに使えそうです[l][r][cm]



選択肢は画像で選ばせることもできます[l][cm]

織田信長はどっちでしょう？
[locate x=20 y=100]
[button graphic="sample/15.png" target=*oda]

[locate x=300 y=100]
[button graphic="sample/19.png" target=*toyo]

[s]
*oda
[cm]
正解です！[l][r]
@jump target=*common3

*toyo
[cm]
間違いです[l][r]
@jump target=*common3

*common3

共通ルート[l][cm]



音楽を再生します[l][r]
[playbgm storage=music.ogg]
音楽が再生されました[l][r]
音楽はbgmフォルダにogg形式で入れます[l][r]
次に音楽を停止します[l][r]
[stopbgm]
音楽の再生が止まりました[l][r]

[cm]
効果音を再生するにはsoundフォルダにoggで保存します[l][cm]

以上でサンプルはおしまいです。[r]
タイトルへ戻ります[l]


@jump target=*start
