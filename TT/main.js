var FPS = 60;  // 60フレ
// 横画面

const SCREEN_WIDTH = 2436;              // スクリーン幅
const SCREEN_HEIGHT = 1124;              // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
var ASSETS = {
    "player": "./resource/sgw_amin_t_r_128.png",
    "package": "./resource/package_t_r_64.png",

    "house_1": "./resource/house_01.png",
    "house_2": "./resource/house_02.png",
    "house_3": "./resource/house_03.png",
    "house_4": "./resource/house_04.png",
    "house_5": "./resource/house_05.png",
    "house_6": "./resource/house_06.png",
    "house_7": "./resource/house_07.png",
    "house_8": "./resource/house_08.png",

    "arrow": "./resource/arrow_t.png",

    "ymt": "./resource/ymt_amin_t_r_128.png",
    "jp": "./resource/jp_amin_t_r_128.png",
    "fdx": "./resource/fdx_amin_t_r_128.png",
    "dhl": "./resource/dhl_amin_t_r_128.png",
    "prkn": "./resource/prkn_anim_t_r_128.png",
    "pkg_s": "./resource/package_anim_t_r_128.png",
    "pkg_l": "./resource/package_l_anim_t_r_128.png",

    "bg_sky": "./resource/bg_sky_gra.png",
    "bg_road": "./resource/bg_road_t.png?202105051653",
    "fg_rain": "./resource/fg_rain_amin.png",
};
const PACKAGE_S_KIND = 5;  // 小包(S)を表す敵種別
const PACKAGE_L_KIND = 6;  // 小包(L)を表す敵種別

const fallSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/fall.mp3'
});
const coinSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3'
});
const hitSE = new Howl({
    src: 'https://iwasaku.github.io/test9/TT/resource/crrect_answer1.mp3'
});
const missSE = new Howl({
    src: 'https://iwasaku.github.io/test9/TT/resource/blip02.mp3'
});
const jumpSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/jump.mp3'
});
const shotSE = new Howl({
    src: 'https://iwasaku.github.io/test9/TT/resource/laser1.mp3'
});

// 定義
var PL_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStart: Boolean(0),
        isDead: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'init'
    },
    STAND: {
        value: 1,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMoveX: Boolean(0),
        isMoveY: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(1),
        string: 'stand'
    },
    MOVE_UP: {
        value: 2,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMoveX: Boolean(0),
        isMoveY: Boolean(1),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            -28,
            -56,
            -84,
            -112,
            -140,
            -140,
            -154,
            -168,
            -154,
            -140,
        ],
        string: 'up'
    },
    MOVE_DOWN: {
        value: 3,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMoveX: Boolean(0),
        isMoveY: Boolean(1),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            28,
            56,
            84,
            112,
            140,
            140,
            154,
            168,
            154,
            140,
        ],
        string: 'down'
    },
    MOVE_RIGHT: {
        value: 4,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMoveX: Boolean(1),
        isMoveY: Boolean(0),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            28,
            56,
            84,
            112,
            140,
            140,
            154,
            168,
            154,
            140,
        ],
        string: 'right'
    },
    MOVE_LEFT: {
        value: 5,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMoveX: Boolean(1),
        isMoveY: Boolean(0),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            -28,
            -56,
            -84,
            -112,
            -140,
            -140,
            -154,
            -168,
            -154,
            -140,
        ],
        string: 'left'
    },
    JUMP: {
        value: 6,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'jump'
    },
    SHOT: {
        value: 7,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'shot'
    },
    DEAD: {
        value: 8,
        isStart: Boolean(0),
        isDead: Boolean(1),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'dead'
    },
});

var EN_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStart: Boolean(0),
        isDead: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'init'
    },
    MOVE_FORWARD: {
        value: 1,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMove: Boolean(0),
        canAction: Boolean(1),
        string: 'forward'
    },
    MOVE_UP: {
        value: 2,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            -14,
            -28,
            -42,
            -56,
            -70,
            -84,
            -98,
            -112,
            -126,
            -140,
        ],
        string: 'up'
    },
    MOVE_DOWN: {
        value: 3,
        isStart: Boolean(1),
        isDead: Boolean(0),
        isMove: Boolean(1),
        canAction: Boolean(0),
        ofs_table: [
            0,
            14,
            28,
            42,
            56,
            70,
            84,
            98,
            112,
            126,
            140,
        ],
        string: 'down'
    },
    STOP: {
        value: 4,
        isStart: Boolean(0),
        isDead: Boolean(1),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'dead'
    },
    DEAD: {
        value: 4,
        isStart: Boolean(0),
        isDead: Boolean(1),
        isMove: Boolean(0),
        canAction: Boolean(0),
        string: 'dead'
    },
});

const lanePosX = [
    SCREEN_CENTER_X + (140 * 1) - 140 * 7,    // 低速（前方の敵：低速、後方の敵：高速）
    SCREEN_CENTER_X + (140 * 1) - 140 * 6,
    SCREEN_CENTER_X + (140 * 1) - 140 * 5,
    SCREEN_CENTER_X + (140 * 1) - 140 * 4,
    SCREEN_CENTER_X + (140 * 1) - 140 * 3,
    SCREEN_CENTER_X + (140 * 1) - 140 * 2,
    SCREEN_CENTER_X + (140 * 1) - 140 * 1,
    SCREEN_CENTER_X + (140 * 1) + 140 * 0,
    SCREEN_CENTER_X + (140 * 1) + 140 * 1,    // 高速（前方の敵：高速、後方の敵：低速）
];
const lanePosBonusX = [
    -8,
    -4,
    -2,
    -1,
    0,
    1,
    2,
    4,
    8,
];

const spdOfs = [
    4 * 2,
    3 * 2,
    2 * 2,
    1 * 2,
    0 * 2,
    -1 * 2,
    -2 * 2,
    -3 * 2,
    -4 * 2,
];
const lanePosY = [
    0 + 140 * 3,    // レーン0
    0 + 140 * 4,    // レーン1
    0 + 140 * 5,    // レーン2
    0 + 140 * 6,    // レーン3
    0 + 140 * 7,    // レーン4
];
const lanePosBonusY = [
    1,    // レーン0
    2,    // レーン1
    4,    // レーン2
    8,    // レーン3
    16,    // レーン4
];

var group0 = null;  // 背景
var group1 = null;  // 家
var group2 = null;  // 道路
var group3 = null;  // ene
var group4 = null;  // player
var group5 = null;  // 荷物
var group6 = null;  // 雨
var player = null;
var packageArray = [];
var enemyArray = [];
var houseArray = [];
var arrowArray = [];
var uidCounter = 0;
var prknCounter = 0;
var nowScore = 0;
var nowDeliveryCount = 0;
var packageLeft = 0;
var houseCounter = 0;
var timeLeft = 0;
var totalFrame = 0;
var totalSec = 0;
const BASE_SPD = -10;

var bgRoadX = SCREEN_CENTER_X;

var randomSeed = 3557;
var randomMode = Boolean(0);

tm.main(function () {
    // アプリケーションクラスを生成
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
    app.fitWindow();                            // 自動フィッティング有効
    app.background = "rgba(77, 136, 255, 1.0)"; // 背景色
    app.fps = FPS;                              // フレーム数

    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });

    // 読み込み完了後に呼ばれるメソッドを登録
    loading.onload = function () {
        app.replaceScene(LogoScene());
    };

    // ローディングシーンに入れ替える
    app.replaceScene(loading);

    // 実行
    app.run();
});

/*
 * ロゴ
 */
tm.define("LogoScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "logoLabel",
                    x: SCREEN_CENTER_X,
                    y: 320,
                    fillStyle: "#888",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "UNOFFICIAL GAME",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
    },

    update: function (app) {
        // 時間が来たらタイトルへ
        //        if (++this.localTimer >= 5 * app.fps)
        this.app.replaceScene(TitleScene());
    }
});

/*
 * タイトル
 */
tm.define("TitleScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "titleLabel",
                    x: SCREEN_CENTER_X,
                    y: 320,
                    fillStyle: "#fff",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "T.T.",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "startButton",
                    init: [
                        {
                            text: "START",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X,
                    y: 580,
                },
            ]
        });
        this.localTimer = 0;

        var self = this;
        this.startButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };
    },

    update: function (app) {
        app.background = "rgba(0, 0, 0, 1.0)"; // 背景色
    }
});

/*
 * ゲーム
 */
tm.define("GameScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();

        group0 = tm.display.CanvasElement().addChildTo(this);   // 空
        group1 = tm.display.CanvasElement().addChildTo(this);   // 家、矢印
        group2 = tm.display.CanvasElement().addChildTo(this);   // 道路
        group3 = tm.display.CanvasElement().addChildTo(this);   // 敵
        group4 = tm.display.CanvasElement().addChildTo(this);   // プレイヤー、小包
        group5 = tm.display.CanvasElement().addChildTo(this);   // 雨
        group6 = tm.display.CanvasElement().addChildTo(this);

        this.bgGradation = tm.display.Sprite("bg_sky", SCREEN_WIDTH, 280).addChildTo(group0);
        this.bgGradation.setPosition(SCREEN_CENTER_X, 140);

        this.bgRoad0 = tm.display.Sprite("bg_road", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(group0);
        this.bgRoad0.setPosition(bgRoadX, SCREEN_CENTER_Y - 80);
        this.bgRoad1 = tm.display.Sprite("bg_road", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(group0);
        this.bgRoad1.setPosition(bgRoadX + SCREEN_WIDTH, SCREEN_CENTER_Y - 80);

        this.fgRain0 = new Rain(0,).addChildTo(group5);
        this.fgRain1 = new Rain(SCREEN_WIDTH).addChildTo(group5);

        clearArrays();
        player = new Player().addChildTo(group4);

        this.fromJSON({
            children: [
                {
                    type: "Label", name: "nowScoreLabel",
                    x: 0 + 16,
                    y: 32,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "SCORE:0",
                    align: "left",
                },
                {
                    type: "Label", name: "packageLeftLabel",
                    x: 0 + 16,
                    y: 80,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "0",
                    align: "left",
                },
                {
                    type: "Label", name: "timeLeftLabel",
                    x: SCREEN_CENTER_X,
                    y: 80,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 128,
                    fontFamily: FONT_FAMILY,
                    text: "0",
                    align: "center",
                },
                {
                    type: "Label", name: "startLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y + 80,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 96,
                    fontFamily: FONT_FAMILY,
                    text: "TAP TO START",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "tweetButton",
                    init: [
                        {
                            text: "TWEET",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            bgColor: "hsl(240, 80%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 140 * 2,
                    y: SCREEN_CENTER_Y + 140 * 3,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "restartButton",
                    init: [
                        {
                            text: "RESTART",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            cornerRadius: 8,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 140 * 2,
                    y: SCREEN_CENTER_Y + 140 * 3,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyUp",
                    init: [
                        {
                            text: "↑",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (0 + 96) + 96 + 192,
                    y: (SCREEN_HEIGHT - 96) - 96 - 192,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyDown",
                    init: [
                        {
                            text: "↓",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (0 + 96) + 96 + 192,
                    y: (SCREEN_HEIGHT - 96) - 96,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyLeft",
                    init: [
                        {
                            text: "←",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (0 + 96) + 96,
                    y: (SCREEN_HEIGHT - 96) - 192,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyRight",
                    init: [
                        {
                            text: "→",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (0 + 96) + 96 + 192 + 192,
                    y: (SCREEN_HEIGHT - 96) - 192,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "buttonA",
                    init: [
                        {
                            text: "Ａ",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (SCREEN_WIDTH - 96) - 96 - 192,
                    y: (SCREEN_HEIGHT - 96) - 192,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "buttonB",
                    init: [
                        {
                            text: "Ｂ",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 180,
                            height: 180,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: (SCREEN_WIDTH - 96) - 96,
                    y: (SCREEN_HEIGHT - 96) - 192,
                    alpha: 0.0,
                },
            ]
        });

        this.shurikenLeftSprite = tm.display.Sprite("package").addChildTo(group2);
        this.shurikenLeftSprite.setPosition(0 + 128, 80).setScale(0.9, 0.9);

        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };

        this.keyUp.sleep();
        this.keyUp.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneY <= 0) return;
            player.status = PL_STATUS.MOVE_UP;
            player.nextLaneY = player.nowLaneY - 1;
            player.moveCounter = 0;
        };

        this.keyDown.sleep();
        this.keyDown.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneY >= lanePosY.length - 1) return;
            player.status = PL_STATUS.MOVE_DOWN;
            player.nextLaneY = player.nowLaneY + 1;
            player.moveCounter = 0;
        };

        this.keyLeft.sleep();
        this.keyLeft.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneX <= 0) return;
            player.status = PL_STATUS.MOVE_LEFT;
            player.nextLaneX = player.nowLaneX - 1;
            player.moveCounter = 0;
        };

        this.keyRight.sleep();
        this.keyRight.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneX >= lanePosX.length - 1) return;
            player.status = PL_STATUS.MOVE_RIGHT;
            player.nextLaneX = player.nowLaneX + 1;
            player.moveCounter = 0;
        };

        this.buttonA.sleep();
        this.buttonA.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (packageLeft <= 0) return;
            player.status = PL_STATUS.SHOT;
            player.moveCounter = 0;
            shotSE.play();
            packageLeft--;
        };

        this.buttonB.sleep();
        this.buttonB.onpointingstart = function () {
            if (!player.status.canAction) return;
            player.status = PL_STATUS.JUMP;
            player.moveCounter = 0;
            jumpSE.play();
            player.gotoAndPlay("jump");
        };

        this.buttonAlpha = 0.0;

        uidCounter = 0;
        prknCounter = 0;
        nowScore = 0;
        nowDeliveryCount = 0;
        packageLeft = 10;
        houseCounter = 0;
        totalFrame = 0;
        timeLeft = 60 * FPS;
        randomSeed = 3557;

        this.frame = 0;

        this.stopBGM = false;

        //　最初の家を表示
        for (var ii = 20; ii >= 0; ii--) {
            var kind = myRandom(1, 8);  // house_01〜08なので
            var house = House(++uidCounter, kind, 128 * ii, false);
            house.addChildTo(group1);
            houseArray.push(house);
        }
    },

    onpointingstart: function () {
        if (player.status.isDead) return;

        if (!player.status.isStart) {
            this.startLabel.remove();

            this.keyUp.setAlpha(0.4);
            this.keyDown.setAlpha(0.4);
            this.keyLeft.setAlpha(0.4);
            this.keyRight.setAlpha(0.4);
            this.buttonA.setAlpha(0.4);
            this.buttonB.setAlpha(0.4);

            this.keyUp.wakeUp();
            this.keyDown.wakeUp();
            this.keyLeft.wakeUp();
            this.keyRight.wakeUp();
            this.buttonA.wakeUp();
            this.buttonB.wakeUp();
            player.status = PL_STATUS.STAND;
            player.gotoAndPlay("run");
        }
    },

    update: function (app) {
        if (!player.status.isDead) {
            if (player.status.isStart) {
                this.frame++;
                timeLeft--;
                this.tmpSec = Math.floor(this.frame / app.fps);
                if (this.tmpSec > FPS) this.frame = 0;
                totalFrame++;
                totalSec = Math.floor(totalFrame / app.fps);

                // 道路のスクロール
                bgRoadX += (BASE_SPD + spdOfs[player.nowLaneX]);
                if (bgRoadX < -SCREEN_CENTER_X) bgRoadX += SCREEN_WIDTH;
                this.bgRoad0.setPosition(bgRoadX, SCREEN_CENTER_Y - 80);
                this.bgRoad1.setPosition(bgRoadX + SCREEN_WIDTH, SCREEN_CENTER_Y - 80);

                this.fgRain0.setPosition(bgRoadX, SCREEN_CENTER_Y - 80);
                this.fgRain1.setPosition(bgRoadX + SCREEN_WIDTH, SCREEN_CENTER_Y - 80);

                // 家の発生
                // ターゲットかどうかの判定
                var isTarget = myRandom(0, 9) == 0 ? true : false; // 1/10の確率で配達先
                houseCounter += (BASE_SPD + spdOfs[player.nowLaneX]);
                if (houseCounter <= -128) {
                    var kind = myRandom(1, 8);  // house_01〜08なので
                    var xofs = houseCounter + 128;
                    houseCounter = xofs;
                    var house = House(++uidCounter, kind, -xofs, isTarget);
                    house.addChildTo(group1);
                    houseArray.push(house);
                    if (isTarget) {
                        var arrow = Arrow(++uidCounter, xofs);
                        arrow.addChildTo(group1);
                        arrowArray.push(house);
                    }
                }

                // 敵の発生
                var tmpInterval;
                if (totalSec < 60) tmpInterval = 2.5 * FPS; // 2.5秒ごとに発生
                else if (totalSec < 120) tmpInterval = 2 * FPS; // 2秒ごとに発生
                else tmpInterval = 1 * FPS; // 1秒ごとに発生
                if ((totalFrame % tmpInterval) === 0) {
                    // 敵の数の決定
                    this.enemyNum = -1;
                    var spdRate = 1.0;
                    if (totalSec < 60) {
                        this.enemyNum = 1;
                        spdRate = 1.0;
                    } else if (totalSec < 120) {
                        this.enemyNum = 2;
                        spdRate = 1.3;
                    } else if (totalSec < 180) {
                        this.enemyNum = 2;
                        spdRate = 1.2;
                    } else {
                        this.enemyNum = 3;
                        spdRate = 1.2;
                    }
                    // 敵の種類の決定
                    (this.enemyNum).times(function () {
                        // 敵種別の決定
                        var enemyKind = -1;
                        if (this.tmpSec < 10) enemyKind = 0;
                        else if (this.tmpSec < 20) enemyKind = 1;
                        else if (this.tmpSec < 30) enemyKind = 2;
                        else if (this.tmpSec < 40) enemyKind = 3;
                        else if (this.tmpSec < 50) enemyKind = 4;
                        else enemyKind = myRandom(0, 4);
                        var pgkRate = packageLeft;
                        if (pgkRate >= 9) pgkRate = 9;
                        else if (pgkRate <= 4) pgkRate = 4;
                        if (myRandom(0, pgkRate) === 0) {
                            if (myRandom(0, 9) === 0) enemyKind = PACKAGE_S_KIND;
                            else enemyKind = PACKAGE_L_KIND;
                        }
                        var fromRight = (myRandom(0, 1) === 0);
                        if (totalSec <= 60) fromRight = true;
                        var enemy = Enemy(++uidCounter, enemyKind, fromRight, spdRate);
                        enemy.addChildTo(group3);
                        enemyArray.push(enemy);
                    }, this);
                }

                if (player.status === PL_STATUS.SHOT) {
                    if (++player.moveCounter >= 5) {
                        player.status = PL_STATUS.STAND;
                        var package = Package(++uidCounter, player.x, player.y);
                        package.addChildTo(group4);
                        packageArray.push(package);
                    }
                }
            }
            if (timeLeft < 0) {
                timeLeft = 0;
                player.status = PL_STATUS.DEAD;
                player.gotoAndPlay("stand");
            }
            this.timeLeftLabel.text = Math.floor(timeLeft / app.fps);
            this.nowScoreLabel.text = "SCORE:" + nowScore;
            if (packageLeft < 999) this.packageLeftLabel.text = "     x" + packageLeft;
            else this.packageLeftLabel.text = 999;
        } else {
            if (!this.stopBGM) {
                fallSE.play();
                this.stopBGM = true;

                var self = this;
                // tweet ボタン
                this.tweetButton.onclick = function () {
                    var twitterURL = tm.social.Twitter.createURL({
                        type: "tweet",
                        text: "T.T. スコア: " + nowScore + " (" + nowDeliveryCount + "軒に配達)",
                        hashtags: ["ネムレス", "NEMLESSS"],
                        url: "https://iwasaku.github.io/test9/TT/",
                    });
                    window.open(twitterURL);
                };

                this.keyUp.sleep();
                this.keyDown.sleep();
                this.keyLeft.sleep();
                this.keyRight.sleep();
                this.buttonA.sleep();
                this.buttonB.sleep();
            }
            this.buttonAlpha += 0.05;
            if (this.buttonAlpha > 1.0) {
                this.buttonAlpha = 1.0;
            }
            this.tweetButton.setAlpha(this.buttonAlpha);
            this.restartButton.setAlpha(this.buttonAlpha);
            if (this.buttonAlpha > 0.7) {
                this.tweetButton.wakeUp();
                this.restartButton.wakeUp();
            }
        }
    }
});

/*
* Rain
*/
tm.define("Rain", {
    superClass: "tm.app.AnimationSprite",

    init: function (ofs) {
        var ss = tm.asset.SpriteSheet({
            // 画像
            image: "fg_rain",
            // １コマのサイズ指定および全コマ数
            frame: {
                width: 350,
                height: 196,
                count: 7
            },
            // アニメーションの定義（開始コマ、終了コマ、次のアニメーション）
            animations: {
                "start": [0, 6, "start", 10],
            }
        });

        this.superInit(ss, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.setPosition(SCREEN_CENTER_X + ofs, SCREEN_CENTER_Y).setScale(1, 1);
        this.setInteractive(false);
        this.alphaInc = true;
        this.alpha = 0.1;

        this.gotoAndPlay("start");
    },

    update: function (app) {
        if (this.alphaInc) {
            this.alpha += 0.01;
            if (this.alpha >= 0.5) {
                this.alpha = 0.5;
                this.alphaInc = false;
            }
        } else {
            this.alpha -= 0.01;
            if (this.alpha <= 0.1) {
                this.alpha = 0.1;
                this.alphaInc = true;
            }
        }
    },
});

/*
 * Player
 */
tm.define("Player", {
    superClass: "tm.app.AnimationSprite",

    init: function () {
        var ss = tm.asset.SpriteSheet({
            // 画像
            image: "player",
            // １コマのサイズ指定および全コマ数
            frame: {
                width: 128,
                height: 128,
                count: 11
            },
            // アニメーションの定義（開始コマ、終了コマ、次のアニメーション）
            animations: {
                "stand": [1, 2, "stand", 60],
                "run": [0, 2, "run", 10],
                "jump": [0, 1, "jump", 60],
            }
        });

        this.superInit(ss, 128, 128);
        this.direct = '';
        this.zRot = 0;
        this.nowLaneX = 4;
        this.nowLaneY = 2;
        this.nextLaneX = this.nowLaneX;
        this.nextLaneY = this.nowLaneY;
        this.setPosition(lanePosX[this.nowLaneX], lanePosY[this.nowLaneY]).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.status = PL_STATUS.INIT;
        this.moveCounter = 0;
        this.gotoAndPlay("stand");
    },

    update: function (app) {
        if (this.status === PL_STATUS.INIT) return;

        if (this.status.isMove) {
            if (this.status.isMoveX) this.x = lanePosX[this.nowLaneX] + this.status.ofs_table[this.moveCounter];
            else this.y = lanePosY[this.nowLaneY] + this.status.ofs_table[this.moveCounter];
            if (++this.moveCounter >= 11) {
                this.status = PL_STATUS.STAND;
                this.nowLaneX = this.nextLaneX;
                this.nowLaneY = this.nextLaneY;
                this.x = lanePosX[this.nowLaneX];
                this.y = lanePosY[this.nowLaneY];
            }
        } else {
            if (this.status === PL_STATUS.JUMP) {
                var maxY = 140.0 + 70.0;
                var totalTime = 60;  // 60フレームでジャンプ終了
                var halfTime = totalTime / 2;
                var nowTime = this.moveCounter - halfTime;
                var yOfs = -(maxY / (halfTime * halfTime)) * nowTime * nowTime + maxY;
                this.y = lanePosY[this.nowLaneY] - yOfs;
                if (++this.moveCounter >= totalTime) {
                    this.moveCounter = 0;
                    this.status = PL_STATUS.STAND;
                    this.gotoAndPlay("run");
                    this.nowLaneX = this.nextLaneX;
                    this.nowLaneY = this.nextLaneY;
                    this.x = lanePosX[this.nowLaneX];
                    this.y = lanePosY[this.nowLaneY];
                }
            }
        }
    },
});

/*
 * Package
 */
tm.define("Package", {
    superClass: "tm.app.Sprite",

    init: function (uid, xPos, yPos) {
        this.superInit("package", 64, 64);
        this.uid = uid;
        this.direct = '';
        this.zRot = 0;
        this.setPosition(xPos, yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.isDead = Boolean(0);
    },

    update: function (app) {
        if (player.status.isDead) return;
        this.y -= 20;
        // 画面上端から出た?
        if (this.y <= 0 - 80) {
            timeLeft -= 0.1 * FPS;
            missSE.play();
            packageArray.erase(this);
            this.remove();
        }

    },
});

/*
 * Enemey
 */
tm.define("Enemy", {
    superClass: "tm.app.AnimationSprite",

    init: function (uid, kind, fromRight, spdRate) {
        var tmpDir = fromRight ? 1 : -1;
        this.spriteName = "";
        switch (kind) {
            case 0:
                this.spriteName = "prkn";
                this.xSpd = (BASE_SPD - 1) * spdRate * tmpDir;
                break;
            case 1:
                this.spriteName = "jp";
                this.xSpd = (BASE_SPD - 2) * spdRate * tmpDir;
                break;
            case 2:
                this.spriteName = "ymt";
                this.xSpd = (BASE_SPD - 3) * spdRate * tmpDir;
                break;
            case 3:
                this.spriteName = "dhl";
                this.xSpd = (BASE_SPD - 4) * spdRate * tmpDir;
                break;
            case 4:
                this.spriteName = "fdx";
                this.xSpd = (BASE_SPD - 5) * spdRate * tmpDir;
                break;
            case 5:
                this.spriteName = "pkg_s";
                tmpDir = 1; // 必ず右から
                this.xSpd = BASE_SPD;
                break;
            case 6:
                this.spriteName = "pkg_l";
                tmpDir = 1; // 必ず右から
                this.xSpd = BASE_SPD;
                break;
            default:
                console.log('Unknown enemy kind');
                break;
        }

        var ss = tm.asset.SpriteSheet({
            // 画像
            image: this.spriteName,
            // １コマのサイズ指定および全コマ数
            frame: {
                width: 128,
                height: 128,
                count: 11
            },
            // アニメーションの定義（開始コマ、終了コマ、次のアニメーション）
            animations: {
                "stand": [1, 2, "stand", 60],
                "run": [0, 2, "run", 10],
                "jump": [0, 1, "jump", 60],
            }
        });

        this.superInit(ss, 128, 128);
        this.setScale(-tmpDir, 1);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.laneChangeCounterLimit = 0;
        this.laneChangeCounter = 0;
        this.yOfsCounter = 0;
        this.moveCounter = 0;
        this.mutekiCounter = 0;
        this.isHit = Boolean(0);

        this.uid = uid;
        this.kind = kind;
        this.vec = tm.geom.Vector2(0, 0);
        if (kind == 0) {
            if ((++prknCounter % 2) === 0) {
                this.nowLaneY = player.nowLaneY;
            } else {
                this.nowLaneY = myRandom(0, 4);
            }
        } else {
            this.nowLaneY = myRandom(0, 4);
        }
        this.nextLaneY = this.nowLaneY;
        if (tmpDir === 1) {
            // 右から
            if (kind === PACKAGE_S_KIND) {
                this.setScale(0.5, 0.5);
                this.position.set(SCREEN_WIDTH + 64, lanePosY[this.nowLaneY] + 32);
            } else {
                this.position.set(SCREEN_WIDTH + 64, lanePosY[this.nowLaneY]);
            }
        } else {
            // 左から
            this.position.set(0 - 64, lanePosY[this.nowLaneY]);
        }

        this.isMoveUp = (myRandom(0, 1) === 0);
        this.moveWaitCounter = 0;

        this.counter = 0;
        this.status = EN_STATUS.MOVE_FORWARD;
        this.gotoAndPlay("run");
    },

    update: function (app) {
        if (player.status.isDead) {
            if (this.status != EN_STATUS.STOP) {
                this.status = EN_STATUS.STOP;
                this.gotoAndPlay("stand");
            }
            return;
        }
        if (this.status.isDead) return;

        // 移動
        switch (this.kind) {
            case 0:
            case 5:
            case 6:
                // 直進
                this.vec.x = this.xSpd + spdOfs[player.nowLaneX];
                this.position.add(this.vec);
                break;
            case 1:
            case 3:
                // 上下端で反転
                if (!this.status.isMove) {
                    if (--this.moveWaitCounter <= 0) {
                        this.moveWaitCounter = myRandom(5, 40) * 0.1 * FPS;
                        if ((this.kind != 3) || (this.nowLaneY != player.nowLaneY)) {
                            if (this.isMoveUp) {
                                // 上
                                if (--this.nextLaneY < 0) {
                                    this.nextLaneY = 1;
                                    this.isMoveUp = false;
                                    this.status = EN_STATUS.MOVE_DOWN;
                                } else {
                                    this.status = EN_STATUS.MOVE_UP;
                                }
                                this.moveCounter = 0;
                            } else {
                                // 下
                                if (++this.nextLaneY > 4) {
                                    this.nextLaneY = 3;
                                    this.isMoveUp = true;
                                    this.status = EN_STATUS.MOVE_UP;
                                } else {
                                    this.status = EN_STATUS.MOVE_DOWN;
                                }
                            }
                            this.moveCounter = 0;
                        }
                    }
                }
                if (this.status.isMove) {
                    this.y = lanePosY[this.nowLaneY] + this.status.ofs_table[this.moveCounter];
                    if (++this.moveCounter >= 10) {
                        this.status = EN_STATUS.MOVE_FORWARD;
                        this.nowLaneY = this.nextLaneY;
                        this.y = lanePosY[this.nowLaneY];
                    }
                }
                this.vec.x = this.xSpd + spdOfs[player.nowLaneX];
                this.position.add(this.vec);
                break;
            case 2:
            case 4:
                // ランダム
                if (!this.status.isMove) {
                    if (--this.moveWaitCounter <= 0) {
                        this.moveWaitCounter = myRandom(5, 30) * 0.1 * FPS;
                        if ((this.kind != 4) || (this.nowLaneY != player.nowLaneY)) {
                            if (myRandom(0, 1) === 0) {
                                // 上
                                if (--this.nextLaneY < 0) {
                                    this.nextLaneY = 1;
                                    this.status = EN_STATUS.MOVE_DOWN;
                                } else {
                                    this.status = EN_STATUS.MOVE_UP;
                                }
                                this.moveCounter = 0;
                            } else {
                                // 下
                                if (++this.nextLaneY > 4) {
                                    this.nextLaneY = 3;
                                    this.status = EN_STATUS.MOVE_UP;
                                } else {
                                    this.status = EN_STATUS.MOVE_DOWN;
                                }
                            }
                            this.moveCounter = 0;
                        }
                    }
                }
                if (this.status.isMove) {
                    this.y = lanePosY[this.nowLaneY] + this.status.ofs_table[this.moveCounter];
                    if (++this.moveCounter >= 10) {
                        this.status = EN_STATUS.MOVE_FORWARD;
                        this.nowLaneY = this.nextLaneY;
                        this.y = lanePosY[this.nowLaneY];
                    }
                }
                this.vec.x = this.xSpd + spdOfs[player.nowLaneX];
                this.position.add(this.vec);
                break;
            default:
                console.log('Unknown enemy kind');
                break;
        }
        this.isHit = Boolean(0);
        if (this.mutekiCounter > 0) this.mutekiCounter--;

        // 画面内外チェック
        if ((this.x <= 0 - 80) || (this.x >= SCREEN_WIDTH + 80)) {
            // 画面端から出た?
            enemyArray.erase(this);
            this.remove();
        } else {
            // 当たり判定
            var check = true;
            if (player.status === PL_STATUS.JUMP) {
                if (player.nowLaneY !== this.nowLaneY) {
                    check = false;
                } else if ((player.moveCounter >= 10) && (player.moveCounter <= 50)) {
                    check = false;
                }
            }
            if (check && chkCollision(this.x, this.y, 96, 96, player.x, player.y, 96, 96)) {
                if ((this.kind === PACKAGE_S_KIND) || (this.kind === PACKAGE_L_KIND)) {
                    if (this.kind === PACKAGE_S_KIND) packageLeft += 10;
                    else packageLeft += 50;
                    if (packageLeft >= 999) packageLeft = 999;
                    coinSE.play();

                    enemyArray.erase(this);
                    this.remove();
                } else {
                    player.status = PL_STATUS.DEAD;
                    player.gotoAndPlay("stand");
                }
            }
        }
    },
});



/*
 * house
 */
tm.define("House", {
    superClass: "tm.app.Sprite",

    init: function (uid, kind, xofs, isTaget) {
        this.spriteName = "";
        this.isTaget = isTaget;
        this.spriteName = "house_" + kind;
        this.superInit(this.spriteName, 128, 128);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.isHit = Boolean(0);

        this.uid = uid;
        this.kind = kind;
        this.vec = tm.geom.Vector2(0, 0);
        this.xSpd = BASE_SPD;
        this.position.set(SCREEN_WIDTH + 64 - xofs, 0 + 140 * 1);
        this.counter = 0;
    },

    update: function (app) {
        if (!player.status.isStart) return;
        if (player.status.isDead) return;

        // 移動
        this.vec.x = this.xSpd + spdOfs[player.nowLaneX];
        this.position.add(this.vec);
        this.isHit = Boolean(0);

        // 画面端から出た?
        if (this.x <= 0 - 80) {
            houseArray.erase(this);
            this.remove();
        }
    },
});

/*
 * Arrow
 */
tm.define("Arrow", {
    superClass: "tm.app.Sprite",

    init: function (uid, xofs) {
        this.spriteName = "arrow";
        this.superInit(this.spriteName, 128, 128);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.uid = uid;
        this.vec = tm.geom.Vector2(0, 0);
        this.xSpd = BASE_SPD;
        this.yOrg = 0 + 140 * 0;
        this.yOfs = 0;
        this.position.set(SCREEN_WIDTH + 64 - xofs, 0 + 140 * 0);
        this.counter = 0;
        this.status = EN_STATUS.MOVE_FORWARD;
    },

    update: function (app) {
        if (player.status.isDead) return;

        // 移動
        if (++this.counter > 60) this.counter = 0;
        if (this.counter == 0) {
            this.yOfs = 0;
        } else if (this.counter < 30) {
            this.yOfs++;
        } else {
            this.yOfs--;
        }
        this.y = this.yOrg + this.yOfs;
        this.vec.x = this.xSpd + spdOfs[player.nowLaneX];
        this.position.add(this.vec);

        // 画面端から出た?
        if (this.x <= 0 - 80) {
            arrowArray.erase(this);
            this.remove();
        }

        // 当たり判定
        for (var ii = 0; ii < packageArray.length; ii++) {
            var tmp = packageArray[ii];
            if (chkCollision(this.x, this.yOrg + 140, 128, 128, tmp.x, tmp.y, 64, 64)) {
                arrowArray.erase(this);
                this.remove();

                packageArray.erase(tmp);
                tmp.remove();

                var tmpPnt = 10;    // 基準点
                tmpPnt += lanePosBonusX[player.nowLaneX];   // 0〜8 → -8〜8 ※速度が早いほど高得点
                tmpPnt *= lanePosBonusY[player.nowLaneY];   // 0〜4 → 1〜16 ※家との距離が遠いほど高得点
                nowScore += tmpPnt;
                timeLeft += 5 * FPS;
                nowDeliveryCount++;
                hitSE.play();
                break;
            }
        }
    },
});

// 
function clearArrays() {
    var self = this;

    // 敵を消す
    for (var ii = self.enemyArray.length - 1; ii >= 0; ii--) {
        var tmp = self.enemyArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enemyArray.erase(tmp);
    }

    // 荷物を消す
    for (var ii = self.packageArray.length - 1; ii >= 0; ii--) {
        var tmp = self.packageArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.packageArray.erase(tmp);
    }

    // 家を消す
    for (var ii = self.houseArray.length - 1; ii >= 0; ii--) {
        var tmp = self.houseArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.houseArray.erase(tmp);
    }

    // 矢印を消す
    for (var ii = self.arrowArray.length - 1; ii >= 0; ii--) {
        var tmp = self.arrowArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.arrowArray.erase(tmp);
    }
}

// 絶対値を返す関数
// https://iwb.jp/javascript-math-abs-deprecated/
function abs(val) {
    return val < 0 ? -val : val;
}

// 指定の範囲で乱数を求める
// ※start < end
// ※startとendを含む
function myRandom(start, end) {
    if (randomMode) {
        var max = (end - start) + 1;
        return Math.floor(Math.random() * Math.floor(max)) + start;
    } else {
        const MAX_RND_SEED = 1801439850948197;    // Math,].floor(Number.MAX_SAFE_INTEGER / 5)-1
        var mod = (end - start) + 1;
        randomSeed = (randomSeed * 5) + 1;
        for (; ;) {
            if (randomSeed < MAX_RND_SEED) break;
            randomSeed -= MAX_RND_SEED;
        }
        return (randomSeed % mod) + start;
    }
}

// 矩形当たり判定
// https://yttm-work.jp/collision/collision_0005.html
function chkCollision(rect_a_x, rect_a_y, rect_a_w, rect_a_h, rect_b_x, rect_b_y, rect_b_w, rect_b_h) {
    // X軸、Y軸の距離
    distance_x = abs(rect_a_x - rect_b_x);
    distance_y = abs(rect_a_y - rect_b_y);

    // ２つの矩形のX軸、Y軸のサイズの和を算出する
    size_sum_x = (rect_a_w + rect_b_w) / 2.0;
    size_sum_y = (rect_a_h + rect_b_h) / 2.0;

    // サイズの和と距離を比較する
    if ((distance_x < size_sum_x) && (distance_y < size_sum_y)) {
        return true;
    }
    return false;
}
