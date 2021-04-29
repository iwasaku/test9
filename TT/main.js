const fallSE = new Howl({
    src: 'https://iwasaku.github.io/test3/SHU/resource/fall.mp3'
});

// 横画面
const SCREEN_WIDTH = 2436;              // スクリーン幅
const SCREEN_HEIGHT = 1124;              // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
var ASSETS = {
    "player": "./resource/angus_128_anim.png",

    "bg_gra": "./resource/bg_gra.png",
};

// 定義
var PL_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStart: Boolean(0),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'init'
    },
    STAND: {
        value: 1,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(1),
        string: 'stand'
    },
    MOVE_UP: {
        value: 2,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'up'
    },
    MOVE_DOWN: {
        value: 3,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'down'
    },
    SHOT: {
        value: 4,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'shot'
    },
    DEAD: {
        value: 5,
        isStart: Boolean(0),
        isDead: Boolean(1),
        canAction: Boolean(0),
        string: 'dead'
    },
});

var EN_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStart: Boolean(0),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'init'
    },
    MOVE_FORWARD: {
        value: 1,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(1),
        string: 'forward'
    },
    MOVE_UP: {
        value: 2,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'up'
    },
    MOVE_DOWN: {
        value: 3,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'down'
    },
    SHOT: {
        value: 4,
        isStart: Boolean(1),
        isDead: Boolean(0),
        canAction: Boolean(0),
        string: 'shot'
    },
    DEAD: {
        value: 5,
        isStart: Boolean(0),
        isDead: Boolean(1),
        canAction: Boolean(0),
        string: 'dead'
    },
});
const moveUpOffset = [
    0,
    -51,
    -97,
    -137,
    -171,
    -200,
    -222,
    -239,
    -251,
    -257,
    -257,
    -251,
    -239,
    -222,
    -200,
];
const moveDownOffset = [
    0,
    -22,
    -39,
    -51,
    -57,
    -57,
    -51,
    -39,
    -22,
    0,
    29,
    63,
    103,
    149,
    200,
];
const floorYPos = [
    SCREEN_CENTER_Y + 210,
    SCREEN_CENTER_Y + 10,
    SCREEN_CENTER_Y - 190,
];

var group0 = null;
var group1 = null;
var group2 = null;
var player = null;
var plShurikenArray = [];
var enemyArray = [];
var eneShurikenArray = [];
var uidCounter = 0;
var nowScore = 0;
var shurikenLeft = 50;
var totalFrame = 0;
var totalSec = 0;
tm.main(function () {
    // アプリケーションクラスを生成
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
    app.fitWindow();                            // 自動フィッティング有効
    app.background = "rgba(77, 136, 255, 1.0)"; // 背景色
    app.fps = 30;                               // フレーム数

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
        if (++this.localTimer >= 5 * app.fps)
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
                    text: "TRNSPSNTRP",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "startButton",
                    init: [
                        {
                            text: "START",
                            fontFamily: FONT_FAMILY,
                            fontSize: 32,
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

        group0 = tm.display.CanvasElement().addChildTo(this);
        group1 = tm.display.CanvasElement().addChildTo(this);
        group2 = tm.display.CanvasElement().addChildTo(this);

        this.bgGradation = tm.display.Sprite("bg_gra", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(group0);
        this.bgGradation.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        this.bgFloor0 = tm.display.Sprite("bg_yuka_0").addChildTo(group0);
        this.bgFloor0.setPosition(SCREEN_CENTER_X, 600 - 60);
        this.bgFloor1 = tm.display.Sprite("bg_yuka_1").addChildTo(group0);
        this.bgFloor1.setPosition(SCREEN_CENTER_X, 400 - 60);
        this.bgFloor2 = tm.display.Sprite("bg_yuka_2").addChildTo(group0);
        this.bgFloor2.setPosition(SCREEN_CENTER_X, 150 - 55);

        clearArrays();
        player = new Player().addChildTo(group1);

        this.fromJSON({
            children: [
                {
                    type: "Label", name: "nowScoreLabel",
                    x: SCREEN_WIDTH - 16,
                    y: 32,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 32,
                    fontFamily: FONT_FAMILY,
                    text: "0",
                    align: "right",
                },
                {
                    type: "Label", name: "shurikenLeftLabel",
                    x: SCREEN_WIDTH - 16,
                    y: 80,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 32,
                    fontFamily: FONT_FAMILY,
                    text: "10",
                    align: "right",
                },
                {
                    type: "Label", name: "startLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y + 80,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 32,
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
                            fontSize: 32,
                            bgColor: "hsl(240, 80%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 160,
                    y: 580,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "restartButton",
                    init: [
                        {
                            text: "RESTART",
                            fontFamily: FONT_FAMILY,
                            fontSize: 32,
                            cornerRadius: 8,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 160,
                    y: 580,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "upButton",
                    init: [
                        {
                            text: "⬆",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            width: 128,
                            height: 128,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: 128,
                    y: 400,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "downButton",
                    init: [
                        {
                            text: "⬇",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            width: 128,
                            height: 128,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: 128,
                    y: 550,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "aButton",
                    init: [
                        {
                            text: "A",
                            fontFamily: FONT_FAMILY,
                            fontSize: 64,
                            width: 128,
                            height: 128,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: 1136 - 128,
                    y: 550,
                    alpha: 0.0,
                },
            ]
        });
        this.shurikenLeftSprite = tm.display.Sprite("pl_shuriken").addChildTo(group2);
        this.shurikenLeftSprite.setPosition(SCREEN_WIDTH - 128, 80);

        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };

        this.upButton.sleep();
        this.upButton.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowFloor >= 2) return;
            player.status = PL_STATUS.MOVE_UP;
            player.nextFloor = player.nowFloor + 1;
            player.moveCounter = 0;
        };
        this.downButton.sleep();
        this.downButton.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (player.nowFloor <= 0) return;
            player.status = PL_STATUS.MOVE_DOWN;
            player.nextFloor = player.nowFloor - 1;
            player.moveCounter = 0;
        };
        this.aButton.sleep();
        this.aButton.onpointingstart = function () {
            if (!player.status.canAction) return;
            if (shurikenLeft <= 0) return;
            player.status = PL_STATUS.SHOT;
            player.moveCounter = 0;
            player.gotoAndPlay("shot");
            shurikenLeft--;
        };

        this.buttonAlpha = 0.0;

        nowScore = 0;
        shurikenLeft = 50;
        totalFrame = 0;

        this.frame = 0;

        this.stopBGM = false;
    },

    onpointingstart: function () {
        if (player.status.isDead) return;

        if (!player.status.isStart) {
            this.startLabel.remove();

            this.upButton.setAlpha(0.4);
            this.downButton.setAlpha(0.4);
            this.aButton.setAlpha(0.4);

            this.upButton.wakeUp();
            this.downButton.wakeUp();
            this.aButton.wakeUp();
            player.status = PL_STATUS.STAND;
        }
    },

    update: function (app) {
        if (!player.status.isDead) {
            if (player.status.isStart) {
                this.frame++;
                this.tmpSec = Math.floor(this.frame / app.fps);
                if (this.tmpSec > 60) this.frame = 0;
                totalFrame++;
                totalSec = Math.floor(totalFrame / app.fps);

                if (totalFrame % 60 === 0) {
                    this.enemyNum = -1;
                    var rnd = tm.util.Random.randint(1, 10);
                    // 敵発生数の決定
                    if (totalSec < 30) {
                        this.enemyNum = 1;
                    } else if (totalSec < 60) {
                        if (rnd === 1) this.enemyNum = 2;
                        else this.enemyNum = 1;
                    } else if (totalSec < 90) {
                        if (rnd === 1) this.enemyNum = 3;
                        else if (rnd === 2) this.enemyNum = 2;
                        else this.enemyNum = 1;
                    } else {
                        if (rnd === 1) this.enemyNum = 4;
                        else if (rnd === 2) this.enemyNum = 3;
                        else if (rnd === 3) this.enemyNum = 2;
                        else this.enemyNum = 1;
                    }

                    (this.enemyNum).times(function () {
                        // 敵種別の決定
                        this.enemyKind = -1;
                        if (this.tmpSec < 5) this.enemyKind = 0;
                        else if (this.tmpSec < 10) this.enemyKind = 1;
                        else if (this.tmpSec < 15) this.enemyKind = 2;
                        else if (this.tmpSec < 20) this.enemyKind = 3;
                        else if (this.tmpSec < 25) this.enemyKind = 4;
                        else if (this.tmpSec < 30) this.enemyKind = 5;
                        else if (this.tmpSec < 35) this.enemyKind = tm.util.Random.randint(0, 2);
                        else if (this.tmpSec < 40) this.enemyKind = tm.util.Random.randint(2, 4);
                        else if (this.tmpSec < 45) this.enemyKind = tm.util.Random.randint(3, 5);
                        else if (this.tmpSec < 50) {
                            var tmpRnd = tm.util.Random.randint(0, 2);
                            if (tmpRnd == 0) this.enemyKind = 0;
                            else if (tmpRnd == 1) this.enemyKind = 2;
                            else this.enemyKind = 4;
                        } else {
                            var tmpRnd = tm.util.Random.randint(0, 2);
                            if (tmpRnd == 0) this.enemyKind = 1;
                            else if (tmpRnd == 1) this.enemyKind = 3;
                            else this.enemyKind = 5;
                        }
                        var enemy = Enemy(++uidCounter, this.enemyKind);

                        enemy.addChildTo(group1);
                        enemyArray.push(enemy);
                    }, this);
                }
                if (player.status === PL_STATUS.SHOT) {
                    if (++player.moveCounter >= 5) {
                        player.status = PL_STATUS.STAND;
                        var shuriken = PlayerShuriken(++uidCounter, player.y);
                        shuriken.addChildTo(group1);
                        plShurikenArray.push(shuriken);
                    }
                }
            }
            this.nowScoreLabel.text = nowScore;
            if (shurikenLeft < 999) this.shurikenLeftLabel.text = shurikenLeft;
            else this.shurikenLeftLabel.text = 999;

            // 当たり判定
            checkPlShurikenToEnemy();
            checkEneShurikenToPlayer();
        } else {
            if (!this.stopBGM) {
                fallSE.play();
                this.stopBGM = true;

                var self = this;
                // tweet ボタン
                this.tweetButton.onclick = function () {
                    var twitterURL = tm.social.Twitter.createURL({
                        type: "tweet",
                        text: "SHRKN NG-NG スコア: " + self.nowScoreLabel.text,
                        hashtags: ["ネムレス", "NEMLESSS"],
                        url: "https://iwasaku.github.io/test3/SHU/index.html",
                    });
                    window.open(twitterURL);
                };

                this.upButton.sleep();
                this.downButton.sleep();
                this.aButton.sleep();
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
        this.shurikenLeftSprite.rotation += 10;
    }
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
                count: 3
            },
            // アニメーションの定義（開始コマ、終了コマ、次のアニメーション）
            animations: {
                "stand": [0, 2, "stand", 10],
                "shot": [1, 3, "stand", 5],
            }
        });

        this.superInit(ss, 100, 100);
        this.direct = '';
        this.zRot = 0;
        this.setPosition(64, floorYPos[1]).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");

        this.status = PL_STATUS.INIT;
        this.moveCounter = 0;
        this.nowFloor = 1;
        this.nextFloor = 1;
        this.gotoAndPlay("stand");
    },


    update: function (app) {
        if (this.status === PL_STATUS.INIT) return;

        if ((this.status === PL_STATUS.MOVE_UP) || (this.status === PL_STATUS.MOVE_DOWN)) {
            var ofs = 0;
            if (this.status === PL_STATUS.MOVE_UP) ofs = moveUpOffset[this.moveCounter]
            else ofs = moveDownOffset[this.moveCounter]
            this.y = floorYPos[this.nowFloor] + ofs;
            if (ofs < 0) this.zRot = -16;
            if (ofs > 0) {
                this.zRot += 2;
                if (this.zRot > 35) this.zRot = 35;
            }
            if (++this.moveCounter >= 15) {
                this.status = PL_STATUS.STAND;
                this.nowFloor = this.nextFloor;
                this.y = floorYPos[this.nowFloor];
                this.zRot = 0;
            }
        }
        this.rotation = this.zRot;
    },
});

/*
 * PlayerShuriken
 */
tm.define("PlayerShuriken", {
});

/*
 * Enemey
 */
tm.define("Enemy", {
    superClass: "tm.app.Sprite",

    init: function (uid, kind) {
        this.spriteName = "";
        this.point = "";
        switch (kind) {
            case 0:
                // 普通
                this.spriteName = "utena5";
                this.point = 1;
                this.shuriken = 2;
                this.xSpd = -4;
                this.life = 1;
                this.laneChangeCounterLimit = 0;
                this.laneChangeCounter = 0;
                this.attackCounterLimit = (totalSec < 90) ? 120 : 80;
                this.attackCounter = tm.util.Random.randint(0, this.attackCounterLimit);
                break;
            case 1:
                // 早い
                this.spriteName = "utena2";
                this.point = 2;
                this.shuriken = 2;
                this.xSpd = -7;
                this.life = 1;
                this.laneChangeCounterLimit = 0;
                this.laneChangeCounter = 0;
                this.attackCounterLimit = (totalSec < 90) ? 90 : 60;
                this.attackCounter = tm.util.Random.randint(0, this.attackCounterLimit);
                break;
            case 2:
                // 頻繁にレーンチェンジ
                this.spriteName = "utena7";
                this.point = 3;
                this.shuriken = 5;
                this.xSpd = -6;
                this.life = 1;
                this.laneChangeCounterLimit = 30;
                this.laneChangeCounter = tm.util.Random.randint(0, this.laneChangeCounterLimit);
                this.attackCounterLimit = (totalSec < 90) ? 60 : 40;
                this.attackCounter = tm.util.Random.randint(0, this.attackCounterLimit);
                break;
            case 3:
                // 固くて遅い
                this.spriteName = "utena1";
                this.point = 4;
                this.shuriken = 20;
                this.xSpd = -1;
                this.life = 5;
                this.laneChangeCounterLimit = 0;
                this.laneChangeCounter = 0;
                this.attackCounterLimit = (totalSec < 90) ? 120 : 80;
                this.attackCounter = tm.util.Random.randint(0, this.attackCounterLimit);
                break;
            case 4:
                // 稀にレーンチェンジ
                this.spriteName = "utena6";
                this.point = 5;
                this.shuriken = 10;
                this.xSpd = -3;
                this.life = 2;
                this.laneChangeCounterLimit = (totalSec < 90) ? 60 : 40;
                this.laneChangeCounter = tm.util.Random.randint(0, this.laneChangeCounterLimit);
                this.attackCounterLimit = 0;
                this.attackCounter = 0;
                break;
            case 5:
                // 手裏剣に当たるとレーンチェンジ
                this.spriteName = "utena3";
                this.point = 6;
                this.shuriken = 10;
                this.xSpd = -5;
                this.life = 3;
                this.laneChangeCounterLimit = 0;
                this.laneChangeCounter = 0;
                this.attackCounterLimit = 0;
                this.attackCounter = 0;
                break;
            default:
                console.log('Unknown enemy kind');
                break;

        }
        this.superInit(this.spriteName, 128, 128);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.moveCounter = 0;
        this.mutekiCounter = 0;
        this.isHit = Boolean(0);

        this.uid = uid;
        this.kind = kind;
        this.vec = tm.geom.Vector2(0, 0);
        this.nowFloor = tm.util.Random.randint(0, 2);
        this.nextFloor = this.nowFloor;
        this.position.set(SCREEN_WIDTH + 64, floorYPos[this.nowFloor]);
        this.counter = 0;
        this.status = EN_STATUS.MOVE_FORWARD;
    },

    update: function (app) {
        if (player.status.isDead) return;
        if (this.status.isDead) return;

        // 移動
        switch (this.kind) {
            case 0:
            case 1:
            case 3:
                this.vec.x = this.xSpd;
                this.position.add(this.vec);
                break;
            case 2:
            case 4:
                if ((this.status === EN_STATUS.MOVE_UP) || (this.status === EN_STATUS.MOVE_DOWN)) {
                    var ofs = 0;
                    if (this.status === EN_STATUS.MOVE_UP) ofs = moveUpOffset[this.moveCounter]
                    else ofs = moveDownOffset[this.moveCounter]
                    this.y = floorYPos[this.nowFloor] + ofs;
                    if (++this.moveCounter >= 15) {
                        this.moveCounter = 0;
                        this.status = EN_STATUS.MOVE_FORWARD;
                        this.nowFloor = this.nextFloor;
                        this.y = floorYPos[this.nowFloor];
                    }
                } else {
                    this.vec.x = this.xSpd;
                    this.position.add(this.vec);
                    if (++this.laneChangeCounter > this.laneChangeCounterLimit) {
                        this.laneChangeCounter = 0;
                        this.moveCounter = 0;
                        if (this.nowFloor == 0) {
                            this.nextFloor = 1;
                            this.status = EN_STATUS.MOVE_UP;
                        }
                        if (this.nowFloor == 1) {
                            if (tm.util.Random.randint(0, 1) == 0) {
                                this.nextFloor = 2;
                                this.status = EN_STATUS.MOVE_UP;
                            } else {
                                this.nextFloor = 0;
                                this.status = EN_STATUS.MOVE_DOWN;
                            }
                        }
                        if (this.nowFloor == 2) {
                            this.nextFloor = 1;
                            this.status = EN_STATUS.MOVE_DOWN;
                        }
                    }
                }
                break;
            case 5:
                if ((this.status === EN_STATUS.MOVE_UP) || (this.status === EN_STATUS.MOVE_DOWN)) {
                    var ofs = 0;
                    if (this.status === EN_STATUS.MOVE_UP) ofs = moveUpOffset[this.moveCounter]
                    else ofs = moveDownOffset[this.moveCounter]
                    this.y = floorYPos[this.nowFloor] + ofs;
                    if (++this.moveCounter >= 15) {
                        this.moveCounter = 0;
                        this.status = EN_STATUS.MOVE_FORWARD;
                        this.nowFloor = this.nextFloor;
                        this.y = floorYPos[this.nowFloor];
                    }
                } else {
                    this.vec.x = this.xSpd;
                    this.position.add(this.vec);
                    if (this.isHit) {
                        this.moveCounter = 0;
                        if (this.nowFloor == 0) {
                            this.nextFloor = 1;
                            this.status = EN_STATUS.MOVE_UP;
                            this.mutekiCounter = 5;
                        }
                        if (this.nowFloor == 1) {
                            if (tm.util.Random.randint(0, 1) == 0) {
                                this.nextFloor = 2;
                                this.status = EN_STATUS.MOVE_UP;
                                this.mutekiCounter = 5;
                            } else {
                                this.nextFloor = 0;
                                this.status = EN_STATUS.MOVE_DOWN;
                                this.mutekiCounter = 10;
                            }
                        }
                        if (this.nowFloor == 2) {
                            this.nextFloor = 1;
                            this.status = EN_STATUS.MOVE_DOWN;
                            this.mutekiCounter = 10;
                        }
                    }
                }
                break;
            default:
                console.log('Unknown enemy kind');
                break;
        }
        this.isHit = Boolean(0);
        if (this.mutekiCounter > 0) this.mutekiCounter--;

        // 攻撃
        if (Math.floor(totalFrame / app.fps) > 60) {
            switch (this.kind) {
                case 0:
                case 1:
                case 2:
                case 3:
                    if (this.status === EN_STATUS.MOVE_FORWARD) {
                        if (++this.attackCounter > this.attackCounterLimit) {
                            this.attackCounter = 0;
                            var eneShu = EnemyShuriken(++uidCounter, this.x, this.y);
                            eneShu.addChildTo(group1);
                            eneShurikenArray.push(eneShu);
                        }
                    }
                    break;
                case 4:
                case 5:
                    if ((this.status === EN_STATUS.MOVE_UP) || (this.status === EN_STATUS.MOVE_DOWN)) {
                        if (this.moveCounter == 0) {
                            var eneShu = EnemyShuriken(++uidCounter, this.x, this.y);
                            eneShu.addChildTo(group1);
                            eneShurikenArray.push(eneShu);
                            var eneShu2 = EnemyShuriken(++uidCounter, this.x, this.y);
                            eneShu2.addChildTo(group1);
                            eneShurikenArray.push(eneShu2);
                        }
                    }
                default:
                    console.log('Unknown enemy kind');
                    break;
            }
        }

        // 画面左端から出た?
        if (this.x < +64) {
            enemyArray.erase(this);
            //this.remove();
            player.status = PL_STATUS.DEAD;
        }
    },
});

// プレイヤー手裏剣と敵との当たり判定
function checkPlShurikenToEnemy() {
}

// 敵手裏剣とプレイヤーとの当たり判定
function checkEneShurikenToPlayer() {
}

// 
function clearArrays() {
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