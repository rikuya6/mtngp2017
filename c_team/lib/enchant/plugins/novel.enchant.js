/* novel.enchant.js v0.1.1 http://www.materialize.jp Copyright (c) materialize LLC. */

var Novel = enchant.Class.create( enchant.Group, {
	/**
	 * @name Novel
	 * @class
	 * @param {Number} x ノベル表示X座標.
	 * @param {Number} y ノベル表示Y座標.
	 * @param {Number} width ノベル表示幅.
	 * @param {Number} height ノベル表示高.
	 * @constructs
	 * @extends enchant.Group
	 */
	initialize: function( x, y, width, height ) {
		enchant.Group.call( this );											// 継承元をコール.
		this.x = x;															// ノベルを表示するX座標.
		this.y = y;															// ノベルを表示するY座標.
		this.width = width;													// ノベルを表示する幅.
		this.height = height;												// ノベルを表示する高さ.

		this.fontSize = 24;													// フォントサイズを設定.
		this.fontColor = "#ffffff";											// 通常時の文字色を設定.
		this.fontColorSelect = "#ff4981";									// 選択時の文字色を設定.
		this.fontFamily = "'メイリオ', Meiryo, 'MS UI Gothic'";				// フォントファミリーを設定.
		this.lineHeight = this.fontSize + ((this.fontSize / 3) * 2);		// 行間の値(フォントサイズと上下余白の合計値)を設定.

		this.paddingTop = 24;												// パディング上部を設定.
		this.paddingRight = 24;												// パディング右部を設定.
		this.paddingLeft = 24;												// パディング左部を設定.
		this.paddingBottom = 24;											// パディング下部を設定.

		/**
		 * アクション種別.
		 */
		this.ACTION_NEUTRAL			= "ACTION CODE : Neutral !!!";
		this.ACTION_PAGE_BREAK		= "ACTION CODE : Page Break !!!";
		this.ACTION_SOUND_EFFECT	= "ACTION CODE : Sound Effect !!!";
		this.ACTION_CHOICE			= "ACTION CODE : Choice !!!";
		this.ACTION_SELECT			= "ACTION CODE : Select !!!";

		/**
		 * 選択肢に付与する項番.
		 */
		this.CHOICE_SIGN = [ "Ａ：", "Ｂ：", "Ｃ：", "Ｄ：" ];

		/**
		 * 選択肢に関する情報.
		 */
		this.selectChoiceInfo = {
			0: { id:0,			callback:null,	select:0	},
			1: { lienStart:0,	lineEnd:0					},
			2: { lienStart:0,	lineEnd:0					},
			3: { lienStart:0,	lineEnd:0					},
			4: { lienStart:0,	lineEnd:0					}
		}

		this.lines = new Array();											// 行ラベルを格納する配列.
		this._initLines();													// 行ラベルを生成.

		this.action = new Array();											// アクションを格納する配列.
		this.actionNow = this.ACTION_NEUTRAL;								// アクションを初期化.

		this.lineNow = 0;													// 行カーソル位置を先頭に設定.
		this.showCharCnt = 1;												// 文字カーソル位置を先頭に設定.

		this.textSpeed = 20;												// 文の自動コマ送り速度(ms).
	},
	/**
	 * パディングの設定.
	 * @param {Number} top パディング上部の値.
	 * @param {Number} right パディング右部の値.
	 * @param {Number} left パディング左部の値.
	 * @param {Number} bottom パディング下部の値.
	 */
	setPadding: function( top, right, left, bottom ) {
		this.paddingTop = top;
		this.paddingRight = right;
		this.paddingLeft = left;
		this.paddingBottom = bottom;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * パディング上部の設定.
	 * @param {Number} top パディング上部の値.
	 */
	setPaddingTop: function( top ) {
		this.paddingTop = top;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * パディング右部の設定.
	 * @param {Number} right パディング右部の値.
	 */
	setPaddingRight: function( right ) {
		this.paddingRight = right;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * パディング左部の設定.
	 * @param {Number} left パディング左部の値.
	 */
	setPaddingLeft: function( left ) {
		this.paddingLeft = left;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * パディング下部の設定.
	 * @param {Number} bottom パディング下部の値.
	 */
	setPaddingBottom: function( bottom ) {
		this.paddingBottom = bottom;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * フォントサイズの設定.
	 * @param {Number} size フォントサイズの値.
	 */
	setFontSize: function( size ) {
		this.fontSize = size;
		if ( this.fontSize > this.lineHeight ) {							// フォントサイズが行間の値を超えている場合.
			this.lineHeight = this.fontSize;								// 行間の値をフォントサイズに丸める.
		}
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * 文字色の設定.
	 * @param {String} normal 通常の文字色.
	 * @param {String} select 選択時の文字色.
	 */
	setFontColor: function( normal, select ) {
		this.fontColor = normal;
		this.fontColorSelect = select;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * フォントファミリーの設定
	 * @param {String} family フォントファミリー.
	 */
	setFontFamily: function( family ) {
		this.fontFamily = family;
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * 行間の値(フォントサイズと上下余白の合計値)の設定.
	 * @param {Number} lineHeight 行間の値(フォントサイズと上下余白の合計値).
	 */
	setLineHeight: function( lineHeight ) {
		this.lineHeight = lineHeight;
		if ( this.fontSize > this.lineHeight ) {							// フォントサイズが行間の値を超えている場合.
			this.lineHeight = this.fontSize;								// 行間の値をフォントサイズに丸める.
		}
		this._initLines();													// 行ラベルを再生成.
	},
	/**
	 * 文の自動コマ送り速度(ms)の設定.
	 * @param {Number} speed 文の自動コマ送り速度(ms)の値.
	 */
	setTextSpeed: function( speed ) {
		this.textSpeed = speed;
	},
	/**
	 * 文の設定.
	 * @param {String} text
	 */
	setText: function( text ) {
		this.action.push( text );
	},
	/**
	 * 改ページの設定.
	 */
	setPageBreak: function() {
		this.action.push( this.ACTION_PAGE_BREAK );
	},
	/**
	 * 効果音の設定.
	 * @param {String} sound 効果音ファイルのパス.
	 * @param {Number} ms 鳴動中の操作無効時間(ms).
	 */
	setSE: function( sound, ms ) {
		this.action.push( this.ACTION_SOUND_EFFECT );
		this.action.push( [ new Audio( sound ), ms ] );
	},
	/**
	 * 選択肢の設定.
	 * @param {Number} id
	 * @param {String} text1
	 * @param {String} text2
	 * @param {String} text3
	 * @param {String} text4
	 * @param {Function} callback 選択時のコールバック関数.
	 */
	setChoice: function( id, text1, text2, text3, text4, callback ) {
		this.action.push( this.ACTION_CHOICE );
		this.action.push( [ 1, text1 ] );
		this.action.push( [ 2, text2 ] );
		this.action.push( [ 3, text3 ] );
		this.action.push( [ 4, text4 ] );
		this.action.push( this.ACTION_SELECT );
		this.action.push( [ id, callback ] );
	},
	/**
	 * 送り.
	 */
	next: function() {
		if ( 1 < this.showCharCnt ) {										// 文を自動コマ表示中は無効.
			return;
		}

		if ( (this.ACTION_CHOICE == this.actionNow)
				|| (this.ACTION_SELECT == this.actionNow) ) {				// 選択肢表示中は無効.
			return;
		}

		if ( this.ACTION_SOUND_EFFECT == this.actionNow ) {					// 効果音鳴動中は無効.
			return;
		}

		var action = this.action.shift();									// アクションの取出.

		/**
		 * 改ページ処理.
		 */
		if ( this.ACTION_PAGE_BREAK == action ) {
			for ( var i = 0 ; i < this.lines.length ; i++ ) {				// 行ラベルに設定した全文をクリア.
				this.lines[ i ].text = "";
			}
			this.lineNow = 0;												// カーソルを一行目に戻す.
			this.next();
			return;
		}

		/**
		 * 効果音処理.
		 */
		if ( this.ACTION_SOUND_EFFECT == action ) {
			this.actionNow = this.ACTION_SOUND_EFFECT;
			action = this.action.shift();									// アクションの取出.
			action[ 0 ].play();												// 効果音を鳴動.
			if ( 1 > action[ 1 ] ) {										// 効果音の鳴動完了を待たない.
				this.actionNow = this.ACTION_NEUTRAL;						// アクションを初期化.
				this.next();
			} else {														// 効果音の鳴動完了を待つ.
				setTimeout( function( me ) {
					me.actionNow = me.ACTION_NEUTRAL;						// アクションを初期化.
					me.next();
				}, action[ 1 ], this );										// 指定された時間(ms)の間、操作を無効にする.
			}
			return;
		}

		/**
		 * 選択肢処理.
		 */
		if ( this.ACTION_CHOICE == action ) {
			this.actionNow = this.ACTION_CHOICE;
			this.createChoice = function( me ) {
				var action = me.action.shift();								// アクションの取出.
				if ( this.ACTION_SELECT == action ) {
					this.actionNow = this.ACTION_SELECT;
					action = me.action.shift();								// アクションの取出.
					me.selectChoiceInfo[ 0 ].id = action[ 0 ];
					me.selectChoiceInfo[ 0 ].callback = action[ 1 ];
					me.selectChoiceInfo[ 0 ].select = 1;
					return;
				}
				var choice = action[ 1 ];
				if ( 0 < choice.length ) {									// 選択肢が存在する場合.
					choice = me.CHOICE_SIGN[ (action[ 0 ] - 1) ] + choice;
					for ( var i = 0 ; i < (Math.floor( (choice.length - 1) / me.lineCharMax ) + 1) ; i++ ) {
						if ( 1 == action[ 0 ] ) {
							me.lines[ (me.lineNow + i) ].color = me.fontColorSelect;
						}
					}
					me.selectChoiceInfo[ action[ 0 ] ].lineStart = me.lineNow + 1;
					me.selectChoiceInfo[ action[ 0 ] ].lineEnd = me.lineNow + (i - 1) + 1;
					me._showText( me, choice, me.createChoice );			// 文の自動コマ表示を開始.
				} else {													// 選択肢が存在しない場合.
					me.createChoice( me );									// スキップして次へ.
				}
			}
			this.createChoice( this );
			return;
		}

		this._showText( this, action, null );								// 文の自動コマ表示を開始.
	},
	/**
	 * 文の自動コマ表示を開始.
	 * @param {*} me
	 * @param {String} text
	 * @param {Function} callback
	 */
	_showText: function( me, text, callback ) {
		if (text == null) return; // 暫定パッチ
		me.lines[ me.lineNow ].text = text.substring(
				(Math.floor( (me.showCharCnt - 1) / me.lineCharMax ) * me.lineCharMax), me.showCharCnt );	// 一文字ずつ表示する.
		me.showCharCnt++;																					// 表示文字数をインクリメント.
		if ( me.showCharCnt > text.length ) {																// 文を全て表示完了.
			me.lineNow++;																					// カーソルを次の行に移す.
			me.showCharCnt = 1;
			if ( me.lineMax < (me.lineNow + 1) ) {															// 最大行数を超えた場合.
				if ( me.ACTION_CHOICE != me.actionNow ) {													// 選択肢表示の場合は改ページ不要.
					me.action.unshift( me.ACTION_PAGE_BREAK );												// 強制的に改ページする.
				}
			}
			if ( null != callback ) {
				callback( me );
			}
			return;
		} else if ( 1 == (me.showCharCnt % me.lineCharMax) ) {												// 最大文字数まで表示.
			me.lineNow++;																					// カーソルを次の行に移す.
			if ( me.lineMax < (me.lineNow + 1) ) {															// 最大行数を超えた場合.
				if ( me.ACTION_CHOICE != me.actionNow ) {													// 選択肢表示の場合は改ページ不要.
					me.action.unshift( me.ACTION_PAGE_BREAK );												// 強制的に改ページする.
				}
				me.showCharCnt = 1;
				if ( null != callback ) {
					callback( me );
				}
				return;
			}
		}
		setTimeout( me._showText, me.textSpeed, me, text, callback );										// 20msで文字を自動コマ送り.
	},
	/**
	 * 行ラベルの生成.
	 */
	_initLines: function() {
		for ( var i = 0 ; i < this.lines.length ; i++ ) {
			this.removeChild( this.lines[ i ] );
		}
		this.lines.length = 0;																							// 初期化(クリア).

		this.lineMax = Math.floor( (this.height - this.paddingTop - this.paddingBottom ) / this.lineHeight );			// 最大行数の設定.
		this.lineCharMax = Math.floor( (this.width - this.paddingLeft - this.paddingRight) / this.fontSize );			// 最大文字数の設定.

		for ( var i = 0 ; i < this.lineMax ; i++ ) {
			this.lines[ i ] = new Label( "" );																			// 文字列を生成.
			this.lines[ i ].font = this.fontSize + "px " + this.fontFamily;												// フォントサイズとファミリーの設定.
			this.lines[ i ].color = this.fontColor;																		// 文字色の設定.
			this.lines[ i ].x = this.paddingLeft;																		// 表示X座標(グループ内相対).
			this.lines[ i ].y = this.paddingTop + ((this.lineHeight - this.fontSize) / 2) + (i * this.lineHeight);		// 表示Y座標(グループ内相対).
			this.lines[ i ].width = this.width;																			// 表示幅の設定.
			this.lines[ i ].textAlign = "left";																			// 左揃えに設定.
			this.lines[ i ].ontouchstart = function( evt ) {
				if ( this.parentNode.ACTION_SELECT != this.parentNode.actionNow ) {										// 選択肢選択中以外は無効.
					return;
				}

				var lineTouch = 0;
				for ( var i = 0 ; i < this.parentNode.lineMax ; i++ ) {													// 何行目をタッチされたか.
					if ( this.parentNode.lines[ i ].y > evt.y ) {
						lineTouch = i;																					// タッチされた行数.
						break;
					}
				}

				var select = -1;
				for ( var i = 1 ; i <= 4 ; i++ ) {
					if ( (this.parentNode.selectChoiceInfo[ i ].lineStart <= lineTouch)
							&& (this.parentNode.selectChoiceInfo[ i ].lineEnd >= lineTouch) ) {
						select = i;																						// タッチした行数から選択肢の項番を算出.
						break;
					}
				}

				if ( this.parentNode.selectChoiceInfo[ 0 ].select == select ) {											// 一度目と二度目のタッチが一致したら確定.
					this.parentNode._setLineColor( 1, this.parentNode.lineMax, this.parentNode.fontColor );
					this.parentNode.setPageBreak();																		// 強制的に改ページする.
					this.parentNode.selectChoiceInfo[ 0 ].callback(
							this.parentNode.selectChoiceInfo[ 0 ].id, i );												// コールバック.
					this.parentNode.actionNow = this.parentNode.ACTION_NEUTRAL;											// アクションを初期化.
					this.parentNode.next();																				// 送り.
				} else if ( 0 < select ) {																				// 一度目のタッチはハイライトのみを行う.
					this.parentNode._setLineColor( 1, this.parentNode.lineMax, this.parentNode.fontColor );
					this.parentNode._setLineColor(
							this.parentNode.selectChoiceInfo[ i ].lineStart,
							this.parentNode.selectChoiceInfo[ i ].lineEnd,
							this.parentNode.fontColorSelect );
					this.parentNode.selectChoiceInfo[ 0 ].select = select;												//タッチされた選択肢の項番を記憶する.
				}
			}
			this.addChild( this.lines[ i ] );																			// グループに文字列を追加.
		}
	},
	/**
	 * 行ラベルの文字色を設定.
	 * @param {Number} start 開始行数.
	 * @param {Numer} end 終了行数.
	 * @param {String} color 文字色.
	 */
	_setLineColor: function( start, end, color ) {
		for ( var i = 0 ; i < this.lineMax ; i++ ) {
			if ( (start <= (i + 1)) && (end >= (i + 1)) ) {
				this.lines[ i ].color = color;
			}
		}
	}
});
