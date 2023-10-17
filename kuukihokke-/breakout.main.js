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
let donts = false;
let receiver = false;
let gamedeath = document.getElementById("gameEnd");
let block=[];
let randomiser = Math.random();

//バーだよぉ
const bar = new CanvasComponents({
    ctx: MainContext,
    img: "demo-breakout/assets/bar.png",
    size: new Vector2(134, 17),
    position: new Vector2(GameArea.x / 2, GameArea.y - 100),
    update: function () {
        if (keyInput.IsPressed("ArrowLeft") && this.position.x > 0 + this.size.x / 2 && IsGameRunning == true) {
             this.position.x -=15
        }     
       if (keyInput.IsPressed("ArrowRight") && this.position.x < 1280 - this.size.x / 2 && IsGameRunning == true) {
        this.position.x +=15
        }
    }
})


//soundloading
Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
Sound.LoadSound("explosion", "explosion.mp3")
Sound.LoadSound("death", "キャンセル5.mp3")
Sound.LoadSound("clear", "決定ボタンを押す20.mp3")

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
        const board = [
            "          ",
            " ▪▪▪▪▪▪▪▪ ",
            " ▪▪▪▪▪▪▪▪ ",
            " ▪▪▪▪▪▪▪▪ "
        ];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "▪") {
                    randomiser = Math.random();
                    if (randomiser<0.25){
                    block.push ( new CanvasComponents({
                        ctx: MainContext,
                        img: "aho.jpg",
                        size: new Vector2(GameArea.x / 10, 70),
                        position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10) , 15 + i * 70),
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
                            Sound.PlaySound("death");
                            score += 1;
                            if (hs < score) {
                                hs = score;
                            }
                            if (score == 24) {
                                gameClear();
                            }
                            board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                            if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2)
                                {ball.direction.y *= -1;
                                ball.direction.x += Math.random();}
                            else {ball.direction.x *= -1;
                                ball.direction.y += Math.random();}
    
                            this.position = new Vector2(-100, -100);
                            }
                        },
                    }));
                }else if (0.25 <= randomiser && randomiser <0.5){
                    block.push ( new CanvasComponents({
                        ctx: MainContext,
                        img: "shingo.png",
                        size: new Vector2(GameArea.x / 10, 70),
                        position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10) , 15 + i * 70),
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
                            Sound.PlaySound("death");
                            score += 1;
                            if (hs < score) {
                                hs = score;
                            }
                            if (score == 24) {
                                gameClear();
                            }
                            board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                            if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2)
                                {ball.direction.y *= -1;
                                ball.direction.x += Math.random();}
                            else {ball.direction.x *= -1;
                                ball.direction.y += Math.random();}
    
                            this.position = new Vector2(-100, -100);
                            }
                        },
                    }));
                }else if(0.5<=randomiser&&randomiser<0.75){
                    block.push ( new CanvasComponents({
                        ctx: MainContext,
                        img: "yuutos2.jpg",
                        size: new Vector2(GameArea.x / 10, 70),
                        position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10) , 15 + i * 70),
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
                            Sound.PlaySound("death");
                            score += 1;
                            if (hs < score) {
                                hs = score;
                            }
                            if (score == 24) {
                                gameClear();
                            }
                            board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                            if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2)
                                {ball.direction.y *= -1;
                                ball.direction.x += Math.random();}
                            else {ball.direction.x *= -1;
                                ball.direction.y += Math.random();}
    
                            this.position = new Vector2(-100, -100);
                            }
                        },
                    }));
                }else block.push ( new CanvasComponents({
                    ctx: MainContext,
                    img: "tanakas.webp",
                    size: new Vector2(GameArea.x / 10, 70),
                    position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10) , 15 + i * 70),
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
                        Sound.PlaySound("death");
                        score += 1;
                        if (hs < score) {
                            hs = score;
                        }
                        if (score == 24) {
                            gameClear();
                        }
                        board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                        if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2)
                            {ball.direction.y *= -1;
                            ball.direction.x += Math.random();}
                        else {ball.direction.x *= -1;
                            ball.direction.y += Math.random();}

                        this.position = new Vector2(-100, -100);
                        }
                    },
                }));
            }
            }
        }
    }


function gameOver() {
    gamedeath.innerHTML = "GAME OVER<br><br>SCORE: "+score+"<br>HIGHSCORE: "+hs+"<br><br>PRESS R TO RESTART";
    donts = true;
    receiver = true;
    document.querySelector("#gameEnd").style.display = "block";
    IsGameRunning = false;
    Sound.PlaySound("explosion");
}

function backMenu() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#gameEnd").style.display = "none";
    receiver = false;
    donts = false;
    killblock();
    score = 0;
}

function gameClear() {
    Sound.PlaySound("clear");
    IsGameRunning = false;
    donts = true;
    document.querySelector("#gameEnd").style.display = "block";
    gamedeath.textContent = "CLEAR";
}

function killblock() {
    for(let k = 0;k<block.length;k++){
        block[k].position.x = 99999999;
    }
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
        if(keyInput.IsPressed("s") && IsGameRunning == false && donts == false){
            gameStart()
        }
        if(keyInput.IsPressed("r") && IsGameRunning == false && receiver == true){
            backMenu()
        }
    });
}, 30);
GameLoop.start()