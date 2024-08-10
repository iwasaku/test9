phina.globalize();

var FPS = 60;  // 60フレ

const SCREEN_WIDTH = 2436;              // スクリーン幅
const SCREEN_HEIGHT = 1124;              // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FONT_FAMILY = "'Press Start 2P','Meiryo',sans-serif";
var ASSETS = {
    image: {
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
    },
    spritesheet: {
        player_ss: {
            frame: {
                "width": 128,
                "height": 128,
                "cols": 11, // フレーム数（横）
                "rows": 1, // フレーム数（縦）
            },
            // アニメーションの定義（開始コマ、終了コマ、次のアニメーション）
            animations: {
                "stand": {
                    "frames": [1],
                    "next": "stand",
                    "frequency": 60,
                },
                "run": {
                    "frames": [0, 1],
                    "next": "run",
                    "frequency": 10,
                },
                "jump": {
                    "frames": [0],
                    "next": "jump",
                    "frequency": 60,
                },
            },
        },
        fg_rain_ss: {
            frame: {
                "width": 350,
                "height": 196,
                "cols": 7, // フレーム数（横）
                "rows": 1, // フレーム数（縦）
            },
            animations: {
                "start": {
                    "frames": [0, 1, 2, 3, 4, 5],
                    "next": "start",
                    "frequency": 10,
                },
            }
        },
    },
    sound: {
        "fall_se": 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/fall.mp3',
        "coin_se": 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3',
        "hit_se": 'https://iwasaku.github.io/test9/TT/resource/crrect_answer1.mp3',
        "miss_se": 'https://iwasaku.github.io/test9/TT/resource/blip02.mp3',
        "jump_se": 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/jump.mp3',
        "shot_se": 'https://iwasaku.github.io/test9/TT/resource/laser1.mp3',
    }

};
const PACKAGE_S_KIND = 5;  // 小包(S)を表す敵種別
const PACKAGE_L_KIND = 6;  // 小包(L)を表す敵種別


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
const lanePosPenaltyY = [
    0.5,    // レーン0
    1.0,    // レーン1
    1.5,    // レーン2
    2.0,    // レーン3
    2.5,    // レーン4
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

phina.main(function () {
    var app = GameApp({
        startLabel: 'logo',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        backgroundColor: 'black',
        fps: FPS,

        // シーンのリストを引数で渡す
        scenes: [
            {
                className: 'LogoScene',
                label: 'logo',
                nextLabel: 'title',
            },
            {
                className: 'TitleScene',
                label: 'title',
                nextLabel: 'game',
            },
            {
                className: 'GameScene',
                label: 'game',
                nextLabel: 'game',
            },
        ]
    });

    // iOSなどでユーザー操作がないと音がならない仕様対策
    // 起動後初めて画面をタッチした時に『無音』を鳴らす
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // fps表示
    //app.enableStats();

    // 実行
    app.run();
});

/*
* ローディング画面をオーバーライド
*/
phina.define('LoadingScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        // 背景色

        var self = this;
        var loader = phina.asset.AssetLoader();

        // 明滅するラベル
        let label = phina.display.Label({
            text: "",
            fontSize: 64,
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        // ロードが進行したときの処理
        loader.onprogress = function (e) {
            // 進捗具合を％で表示する
            label.text = "{0}%".format((e.progress * 100).toFixed(0));
        };

        // ローダーによるロード完了ハンドラ
        loader.onload = function () {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            self.flare('loaded');
        };

        // ロード開始
        loader.load(options.assets);
    },

});

/*
 * ロゴ
 */
phina.define("LogoScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);
        this.localTimer = 0;
    },

    update: function (app) {
        // フォント読み込み待ち
        var self = this;
        document.fonts.load('10pt "Press Start 2P"').then(function () {
            self.exit();
        });
    }
});

/*
 * タイトル
 */
phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);

        this.titleLabel = Label({
            text: "T.T.",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: 320,
        }).addChildTo(this);
        this.startButton = Button({
            text: "START",
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fill: "#444",
            x: SCREEN_CENTER_X,
            y: 580,
            width: 512,
            cornerRadius: 8,
        }).addChildTo(this);

        var self = this;
        this.startButton.onpointstart = function () {
            self.exit();
        };

        this.localTimer = 0;
    },

    update: function (app) {
    }
});

/*
 * ゲーム
 */
phina.define("GameScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);

        group0 = DisplayElement().addChildTo(this);   // 空
        group1 = DisplayElement().addChildTo(this);   // 家、矢印
        group2 = DisplayElement().addChildTo(this);   // 道路
        group3 = DisplayElement().addChildTo(this);   // 敵
        group4 = DisplayElement().addChildTo(this);   // プレイヤー、小包
        group5 = DisplayElement().addChildTo(this);   // 雨
        group6 = DisplayElement().addChildTo(this);

        this.bgGradation = phina.display.Sprite("bg_sky").addChildTo(group0);
        this.bgGradation.setPosition(SCREEN_CENTER_X, 140).setSize(SCREEN_WIDTH, 280);

        this.bgRoad0 = phina.display.Sprite("bg_road").addChildTo(group0);
        this.bgRoad0.setPosition(bgRoadX, SCREEN_CENTER_Y - 80).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.bgRoad1 = phina.display.Sprite("bg_road").addChildTo(group0);
        this.bgRoad1.setPosition(bgRoadX + SCREEN_WIDTH, SCREEN_CENTER_Y - 80).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        this.fgRain0 = new Rain(0,).addChildTo(group5);
        this.fgRain1 = new Rain(SCREEN_WIDTH).addChildTo(group5);

        clearArrays();
        player = new Player().addChildTo(group4);

        this.nowScoreLabel = Label({
            text: "SCORE:0",
            fontSize: 48,
            fontFamily: FONT_FAMILY,
            align: "left",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: 0 + 16,
            y: 32,
        }).addChildTo(group6);
        this.packageLeftLabel = Label({
            text: "0",
            fontSize: 48,
            fontFamily: FONT_FAMILY,
            align: "left",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: 0 + 16,
            y: 80,
        }).addChildTo(group6);
        this.timeLeftLabel = Label({
            text: "0",
            fontSize: 128,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: 80,
        }).addChildTo(group6);
        this.startLabel = Label({
            text: "TAP TO START",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + 80,
        }).addChildTo(group6);
        this.tweetButton = Button({
            text: "POST",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            fill: "#7575EF",
            x: SCREEN_CENTER_X - 140 * 2,
            y: SCREEN_CENTER_Y + 140 * 3,
            width: 512,
            cornerRadius: 8,
        }).addChildTo(group6);
        this.tweetButton.alpha = 0.0;
        this.restartButton = Button({
            text: "RESTART",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            fill: "#B2B2B2",
            x: SCREEN_CENTER_X + 140 * 2,
            y: SCREEN_CENTER_Y + 140 * 3,
            cornerRadius: 8,
            width: 512,
        }).addChildTo(group6);
        this.restartButton.alpha = 0.0;

        this.screenButton = Button({
            text: "",
            fontSize: 32,
            fontFamily: FONT_FAMILY,
            fill: "#444",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        }).addChildTo(group6);
        this.screenButton.alpha = 0.0;

        this.keyUp = Button({
            text: "▲",
            fontSize: 96,
            fontFamily: "misaki_gothic",
            fill: "hsl(0, 100%, 50%)",
            x: (0 + 96) + 96 + 192,
            y: (SCREEN_HEIGHT - 96) - 96 - 192,
            width: 180,
            height: 180,
        }).addChildTo(group6);
        this.keyUp.alpha = 0.0;
        this.keyDown = Button({
            text: "▼",
            fontSize: 96,
            fontFamily: "misaki_gothic",
            fill: "hsl(0, 100%, 50%)",
            x: (0 + 96) + 96 + 192,
            y: (SCREEN_HEIGHT - 96) - 96,
            width: 180,
            height: 180,
        }).addChildTo(group6);
        this.keyDown.alpha = 0.0;
        this.keyLeft = Button({
            text: "<",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            fill: "hsl(0, 100%, 50%)",
            x: (0 + 96) + 96,
            y: (SCREEN_HEIGHT - 96) - 192,
            width: 180,
            height: 180,
        }).addChildTo(group6);
        this.keyLeft.alpha = 0.0;
        this.keyRight = Button({
            text: ">",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            fill: "hsl(0, 100%, 50%)",
            x: (0 + 96) + 96 + 192 + 192,
            y: (SCREEN_HEIGHT - 96) - 192,
            width: 180,
            height: 180,
        }).addChildTo(group6);
        this.keyRight.alpha = 0.0;
        this.buttonA = Button({
            text: "A",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            fill: "hsl(0, 100%, 50%)",
            x: (SCREEN_WIDTH - 96) - 96 - 192,
            y: (SCREEN_HEIGHT - 96) - 192,
            width: 180,
            height: 180,
        }).addChildTo(group6);
        this.buttonA.alpha = 0.0;
        this.buttonB = Button({
            text: "B",
            fontFamily: FONT_FAMILY,
            fontSize: 96,
            width: 180,
            height: 180,
            fill: "hsl(0, 100%, 50%)",
            x: (SCREEN_WIDTH - 96) - 96,
            y: (SCREEN_HEIGHT - 96) - 192,
        }).addChildTo(group6);
        this.buttonB.alpha = 0.0;

        this.shurikenLeftSprite = phina.display.Sprite("package").addChildTo(group6);
        this.shurikenLeftSprite.setPosition(0 + 128, 80).setScale(0.9, 0.9);

        this.tweetButton.sleep();
        this.tweetButton.onclick = function () {
            var twitterURL = phina.social.Twitter.createURL({
                type: "tweet",
                text: "T.T. スコア: " + nowScore + " (" + nowDeliveryCount + "軒に配達)\n",
                hashtags: ["ネムレス", "NEMLESSS"],
                url: "https://iwasaku.github.io/test9/TT/",
            });
            window.open(twitterURL);
        };

        this.restartButton.sleep();
        var self = this;
        this.restartButton.onpointstart = function () {
            self.exit();
        };

        this.screenButton.onclick = function () {
            if (player.status.isDead) return;

            if (!player.status.isStart) {
                self.startLabel.remove();

                self.keyUp.alpha = 0.4;
                self.keyDown.alpha = 0.4;
                self.keyLeft.alpha = 0.4;
                self.keyRight.alpha = 0.4;
                self.buttonA.alpha = 0.4;
                self.buttonB.alpha = 0.4;

                self.keyUp.wakeUp();
                self.keyDown.wakeUp();
                self.keyLeft.wakeUp();
                self.keyRight.wakeUp();
                self.buttonA.wakeUp();
                self.buttonB.wakeUp();
                player.status = PL_STATUS.STAND;
                player.anim.gotoAndPlay("run");
            }
        }

        this.keyUp.sleep();
        this.keyUp.onpointstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneY <= 0) return;
            player.status = PL_STATUS.MOVE_UP;
            player.nextLaneY = player.nowLaneY - 1;
            player.moveCounter = 0;
        };

        this.keyDown.sleep();
        this.keyDown.onpointstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneY >= lanePosY.length - 1) return;
            player.status = PL_STATUS.MOVE_DOWN;
            player.nextLaneY = player.nowLaneY + 1;
            player.moveCounter = 0;
        };

        this.keyLeft.sleep();
        this.keyLeft.onpointstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneX <= 0) return;
            player.status = PL_STATUS.MOVE_LEFT;
            player.nextLaneX = player.nowLaneX - 1;
            player.moveCounter = 0;
        };

        this.keyRight.sleep();
        this.keyRight.onpointstart = function () {
            if (!player.status.canAction) return;
            if (player.nowLaneX >= lanePosX.length - 1) return;
            player.status = PL_STATUS.MOVE_RIGHT;
            player.nextLaneX = player.nowLaneX + 1;
            player.moveCounter = 0;
        };

        this.buttonA.sleep();
        this.buttonA.onpointstart = function () {
            if (!player.status.canAction) return;
            if (packageLeft <= 0) return;
            player.status = PL_STATUS.SHOT;
            player.moveCounter = 0;
            SoundManager.play("shot_se");
            packageLeft--;
        };

        this.buttonB.sleep();
        this.buttonB.onpointstart = function () {
            if (!player.status.canAction) return;
            player.status = PL_STATUS.JUMP;
            player.moveCounter = 0;
            SoundManager.play("jump_se");
            player.anim.gotoAndPlay("jump");
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
                    } else if (totalSec < 90) {
                        this.enemyNum = 1;
                        spdRate = 1.1;
                    } else if (totalSec < 120) {
                        this.enemyNum = 2;
                        spdRate = 1.2;
                    } else if (totalSec < 150) {
                        this.enemyNum = 1;
                        spdRate = 1.3;
                    } else if (totalSec < 180) {
                        this.enemyNum = 2;
                        spdRate = 1.4;
                    } else {
                        this.enemyNum = 3;
                        spdRate = 1.5;
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
                            if (myRandom(0, 9) === 0) enemyKind = PACKAGE_L_KIND;
                            else enemyKind = PACKAGE_S_KIND;
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
                player.anim.gotoAndPlay("stand");
            }
            this.timeLeftLabel.text = Math.floor(timeLeft / app.fps);
            this.nowScoreLabel.text = "SCORE:" + nowScore;
            if (packageLeft < 999) this.packageLeftLabel.text = "   x" + packageLeft;
            else this.packageLeftLabel.text = 999;
        } else {
            if (!this.stopBGM) {
                SoundManager.play("fall_se");
                this.stopBGM = true;
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
            this.tweetButton.alpha = this.buttonAlpha;
            this.restartButton.alpha = this.buttonAlpha;
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
phina.define("Rain", {
    superClass: 'Sprite',

    init: function (ofs) {
        this.superInit("fg_rain", SCREEN_WIDTH, SCREEN_HEIGHT);
        this.anim = FrameAnimation('fg_rain_ss').attachTo(this);
        this.anim.fit = false;
        this.setPosition(SCREEN_CENTER_X + ofs, SCREEN_CENTER_Y).setScale(1.0, 1.0);
        this.setInteractive(false);
        this.alphaInc = true;
        this.alpha = 0.1;

        this.anim.gotoAndPlay("start");
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
phina.define("Player", {
    superClass: 'Sprite',

    init: function (option) {
        this.superInit("player");
        this.anim = FrameAnimation('player_ss').attachTo(this);
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
        this.anim.gotoAndPlay("stand");
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
                    this.anim.gotoAndPlay("run");
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
phina.define("Package", {
    superClass: "Sprite",

    init: function (uid, xPos, yPos) {
        this.superInit("package");
        this.uid = uid;
        this.direct = '';
        this.zRot = 0;
        this.setPosition(xPos, yPos).setSize(64, 64).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.isDead = Boolean(0);
    },

    update: function (app) {
        if (player.status.isDead) return;
        this.y -= 20;
        // 画面上端から出た?
        if (this.y <= 0 - 80) {
            timeLeft -= lanePosPenaltyY[player.nowLaneY] * FPS;
            SoundManager.play("miss_se");
            packageArray.erase(this);
            this.remove();
        }

    },
});

/*
 * Enemey
 */
phina.define("Enemy", {
    superClass: 'Sprite',

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

        this.superInit(this.spriteName);
        this.anim = FrameAnimation('player_ss').attachTo(this);
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
        this.vec = phina.geom.Vector2(0, 0);
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
                this.setPosition(SCREEN_WIDTH + 64, lanePosY[this.nowLaneY] + 32);
            } else {
                this.setPosition(SCREEN_WIDTH + 64, lanePosY[this.nowLaneY]);
            }
        } else {
            // 左から
            this.setPosition(0 - 64, lanePosY[this.nowLaneY]);
        }

        this.isMoveUp = (myRandom(0, 1) === 0);
        this.moveWaitCounter = 0;

        this.counter = 0;
        this.status = EN_STATUS.MOVE_FORWARD;
        this.anim.gotoAndPlay("run");
    },

    update: function (app) {
        if (player.status.isDead) {
            if (this.status != EN_STATUS.STOP) {
                this.status = EN_STATUS.STOP;
                this.anim.gotoAndPlay("stand");
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
                    SoundManager.play("coin_se");

                    enemyArray.erase(this);
                    this.remove();
                } else {
                    player.status = PL_STATUS.DEAD;
                    player.anim.gotoAndPlay("stand");
                }
            }
        }
    },
});



/*
 * house
 */
phina.define("House", {
    superClass: "Sprite",

    init: function (uid, kind, xofs, isTaget) {
        this.spriteName = "";
        this.isTaget = isTaget;
        this.spriteName = "house_" + kind;
        this.superInit(this.spriteName);
        this.setSize(128, 128);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.isHit = Boolean(0);

        this.uid = uid;
        this.kind = kind;
        this.vec = phina.geom.Vector2(0, 0);
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
phina.define("Arrow", {
    superClass: "Sprite",

    init: function (uid, xofs) {
        this.spriteName = "arrow";
        this.superInit(this.spriteName);
        this.direct = '';
        this.setSize(128, 128);
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.uid = uid;
        this.vec = phina.geom.Vector2(0, 0);
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
                SoundManager.play("hit_se");
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
