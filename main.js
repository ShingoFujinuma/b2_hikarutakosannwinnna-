const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const CanvasWrapper = document.querySelector("#wrapper");
const GameArea = new CanvasManager(new Vector2(1280, 720), MainCanvas, CanvasWrapper);
const keyInput = new keyInputManager();
const Sound = new SoundManager();
GameArea.refresh();

let score = 0;
let hs = 0;
let dis = document.getElementById("menu");
dis.innerHTML = "BREAK OUT<br><br>HIGH SCORE: "+hs+"<br><br>PRESS S TO START";
let IsGameRunning = false;

//バーだよぉ
const bar = new CanvasComponents({
    ctx: MainContext,
    img: "demo-breakout/assets/bar.png",
    size: new Vector2(134, 17),
    position: new Vector2(GameArea.x / 2, GameArea.y - 100),
    update: function () {
        if (keyInput.IsPressed("ArrowLeft") & this.position.x > 0 + this.size.x / 2) {
             this.position.x -=15
        }     
       if (keyInput.IsPressed("ArrowRight") & this.position.x < 1280 - this.size.x / 2) {
        this.position.x +=15
        }
    }
})

const board = [
    "          ",
    "          ",
    " ▪▪▪▪▪▪▪▪ ",
    " ▪▪▪▪▪▪▪▪ ",
    " ▪▪▪▪▪▪▪▪ "
];
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "▪") {
            new CanvasComponents({
                ctx: MainContext,
                img: "aho.jpg",
                size: new Vector2(GameArea.x / 10, 30),
                position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10), 15 + i * 30),
                update: function () {
                    if (
                        (

                            ball.position.x > this.position.x - this.size.x / 2 - ball.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 + ball.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2
                        ) || (

                            ball.position.x > this.position.x - this.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 - ball.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2 + ball.size.y / 2
                        )
                    ) {
                        Sound.PlaySound("hit");
                        score += 1;
                        if (hs < score) {
                            hs = score;
                        }
                        if (score == 4) {
                            gameClear();
                        }
                        board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                        if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2)
                            ball.direction.y *= -1;
                        else ball.direction.x *= -1;

                        this.position = new Vector2(-100, -100);
                    }
                },
            });
        }
    }
}

//soundloading
Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
Sound.LoadSound("explosion", "explosion.mp3")
Sound.LoadSound("death", "キャンセル5.mp3")

function gameStart() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    ball.position.x = GameArea.x / 3;
    ball.position.y = GameArea.y / 2;
    ball.direction.x = 0.6;
    ball.direction.y = 0.8;
    bar.position.x = GameArea.x / 2;
    IsGameRunning = true;
}

function gameOver() {
   // let gamedeath = document.getElementById("gameEnd");
    document.querySelector("#gameEnd").style.display = "block";
    IsGameRunning = false;
    Sound.PlaySound("explosion");
}

function backMenu() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#gameEnd").style.display = "none";
}

function gameClear() {
    Sound.PlaySound("death");
    IsGameRunning = false;
    let gameend = document.getElementById("gameEnd");
    document.querySelector("#gameEnd").style.display = "block";
    gameend.textContent = "CLEAR";
}

//ballsyoukan
const ball = new CanvasComponents({
  ctx: MainContext,
  img: "ball2.png",
  position: new Vector2(GameArea.x / 3, GameArea.y / 2),
  update: function () {
    //every flame
    this.rotate += 501
    if(IsGameRunning == true){
    this.motion = this.direction.normalized().multiply(15);
    this.position = this.position.add(this.motion);
    if(this.position.x > GameArea.x - this.size.x/2)
    {this.direction.x = this.direction.x - this.direction.x * 2
    Sound.PlaySound("click")}
    if(this.position.x < 0+this.size.x/2)
    {this.direction.x = this.direction.x - this.direction.x * 2
        Sound.PlaySound("click")}
    if(this.position.y < 0+this.size.y/2)
    {this.direction.y = this.direction.y - this.direction.y * 2
        Sound.PlaySound("click")}
    if (
        this.position.x > bar.position.x - bar.size.x / 2 &&
        this.position.x < bar.position.x + bar.size.x / 2 &&
        this.position.y > bar.position.y - bar.size.y / 2 - this.size.y / 2 + 25 &&
        this.position.y < bar.position.y + bar.size.y / 2 + this.size.y / 2 - 25
    ) {
        this.direction.y *= -1;
        Sound.PlaySound("click");
    } 
    else if (
        this.position.x > bar.position.x - bar.size.x / 2 - this.size.x / 2 - 25 &&
        this.position.x < bar.position.x + bar.size.x / 2 + this.size.x / 2 + 25 &&
        this.position.y > bar.position.y - bar.size.y / 2 &&
        this.position.y < bar.position.y + bar.size.y / 2
    ) {
        this.direction.x *= -1;
        Sound.PlaySound("click");
    }
    if(this.position.y > GameArea.y)
    {gameOver();}
    }
}});
ball.direction = new Vector2(0.6, 0.8);

//ゲームループの定義・開始
const GameLoop = new GameLoopManager(() => {
    MainContext.clearRect(0, 0, GameArea.x, GameArea.y);
    CanvasComponents.components.forEach((component) => {
        component.update();
        component.render();
        if(keyInput.IsPressed("s") && IsGameRunning == false){
            Sound.PlaySound("click");
            document.querySelector("#menu").style.display = "none";
            document.querySelector("#game").style.display = "block";
            ball.position.x = GameArea.x / 3;
            ball.position.y = GameArea.y / 2;
            ball.direction.x = 0.6;
            ball.direction.y = 0.8;
            bar.position.x = GameArea.x / 2;
            IsGameRunning = true;
        } else if(keyInput.IsPressed("r") && IsGameRunning == false){
            Sound.PlaySound("click");
            document.querySelector("#menu").style.display = "none";
            document.querySelector("#game").style.display = "block";
            ball.position.x = GameArea.x / 3;
            ball.position.y = GameArea.y / 2;
            ball.direction.x = 0.6;
            ball.direction.y = 0.8;
            bar.position.x = GameArea.x / 2;
            IsGameRunning = true;
        }
    });
}, 30);
GameLoop.start();
