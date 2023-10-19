const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const CanvasWrapper = document.querySelector("#wrapper");
const GameArea = new CanvasManager(new Vector2(1280, 720), MainCanvas, CanvasWrapper);
const keyInput = new keyInputManager();
const Sound = new SoundManager();
GameArea.refresh();

let lpoint = 0;
let rpoint = 0;
let dis = document.getElementById("menu");
dis.innerHTML = "LEGENDARY AIR HOCKEY<br><br><br>PRESS SPACE TO START";
let IsGameRunning = false;
let donts = false;
let receiver = false;
let gamedeath = document.getElementById("gameEnd");
let block=[];
let randomiser = Math.random();

//soundloading
Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
Sound.LoadSound("explosion", "explosion.mp3")
Sound.LoadSound("death", "キャンセル5.mp3")
Sound.LoadSound("clear", "決定ボタンを押す20.mp3")

//バーだよぉL
const barL = new CanvasComponents({
    ctx: MainContext,
    img: "barL.png",
    size: new Vector2(17, 134),
    position: new Vector2(GameArea.x / 10, GameArea.y /2),
    update: function () {
        if (keyInput.IsPressed("w") && this.position.y > 0 + this.size.y / 2 && IsGameRunning == true) {
             this.position.y -=15
        }     
       if (keyInput.IsPressed("s") && this.position.y < 720 - this.size.y / 2 && IsGameRunning == true) {
        this.position.y +=15
        }
    }
})

//バーだよぉR
const barR = new CanvasComponents({
    ctx: MainContext,
    img: "barR.png",
    size: new Vector2(17, 134),
    position: new Vector2(GameArea.x / 10*9, GameArea.y /2),
    update: function () {
        if (keyInput.IsPressed("ArrowUp") && this.position.y > 0 + this.size.y / 2 && IsGameRunning == true) {
             this.position.y -=15
        }     
       if (keyInput.IsPressed("ArrowDown") && this.position.y < 720 - this.size.y / 2 && IsGameRunning == true) {
        this.position.y +=15
        }
        if (keyInput.IsPressed("f")) {
            Sound.PlaySound("death")
            lgoal
        }
    }
})


function gameStart() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    barL.position.y = GameArea.y/2;
    barR.position.y = GameArea.y/2;
    // ball.position.x = GameArea.x / 3;
    // ball.position.y = GameArea.y / 2;
     ball.direction.x = 0.6;
     ball.direction.y = 0.8;

    IsGameRunning = true;
}

function lgoal(){
    lpoint+=1;
    dis.innerHTML = "G O A L<br>L PLAYER<br><br><br>"+lpoint+" : "+rpoint+"<br><br>PRESS SPACE TO START NEXT";
    document.querySelector("#gameEnd").style.display="none";
}

// function gameOver() {
//     gamedeath.innerHTML = "GAME OVER<br><br>SCORE: "+score+"<br>HIGHSCORE: "+hs+"<br><br>PRESS R TO RESTART";
//     donts = true;
//     receiver = true;
//     document.querySelector("#gameEnd").style.display = "block";
//     IsGameRunning = false;
//     Sound.PlaySound("explosion");
// }

// function backMenu() {
//     Sound.PlaySound("click");
//     document.querySelector("#menu").style.display = "block";
//     document.querySelector("#game").style.display = "none";
//     document.querySelector("#gameEnd").style.display = "none";
//     receiver = false;
//     donts = false;
//     killblock();
//     score = 0;
// }

// function gameClear() {
//     Sound.PlaySound("clear");
//     IsGameRunning = false;
//     donts = true;
//     document.querySelector("#gameEnd").style.display = "block";
//     gamedeath.textContent = "CLEAR";
// }

 //ballsyoukan
 const ball = new CanvasComponents({
   ctx: MainContext,
   img: "kuukihokke-/スクリーンショット 2023-10-17 164429.png",
   position: new Vector2(GameArea.x / 3, GameArea.y / 2),
   update: function  () {
    // every flame
     this.rotate += 501
     if(IsGameRunning == true){
     this.motion = this.direction.normalized().multiply(15);
     this.position = this.position.add(this.motion);
     if(this.position.x > GameArea.x - this.size.x/2)
     {this.direction.x = this.direction.x - this.direction.x * 2
     Sound.PlaySound("click")}
     if(this.position.x < 0 + this.size.x/2)
     {this.direction.x = this.direction.x - this.direction.x * 2
         Sound.PlaySound("click")}
     if(this.position.y < 0 + this.size.y/2)
     {this.direction.y = this.direction.y * -1 //- this.direction.y * 2
         Sound.PlaySound("click")}
     if(this.position.y > GameArea.y - this.size.y/2)
     {this.direction.y = this.direction.y * -1 //+ this.direction.y * 2 
         Sound.PlaySound("click")}    
     if (
         this.position.x > barR.position.x - barR.size.x / 2 &&
         this.position.x < barR.position.x + barR.size.x / 2 &&
         this.position.y > barR.position.y - barR.size.y / 2 - this.size.y / 2 + 25 &&
         this.position.y < barR.position.y + barR.size.y / 2 + this.size.y / 2 - 25
     ) {
         this.direction.x *= -1;
         Sound.PlaySound("click");
     } 
     else if (
        this.position.x > barL.position.x - barL.size.x / 2 &&
        this.position.x < barL.position.x + barL.size.x / 2 &&
        this.position.y > barL.position.y - barL.size.y / 2 - this.size.y / 2 + 25 &&
        this.position.y < barL.position.y + barL.size.y / 2 + this.size.y / 2 - 25
    ) {
        this.direction.x *= -1;
        Sound.PlaySound("click");
 }}}});
 ball.direction = new Vector2(0.6, 0.8);

//ゲームループの定義・開始
const GameLoop = new GameLoopManager(() => {
    MainContext.clearRect(0, 0, GameArea.x, GameArea.y);
    CanvasComponents.components.forEach((component) => {
        component.update();
        component.render();
        if(keyInput.IsPressed(" ") && IsGameRunning == false && donts == false){
           gameStart()
        }
         if(keyInput.IsPressed("r") && IsGameRunning == false && receiver == true){
            backMenu()
        }
    });
}, 47);
GameLoop.start()

//質素な画面に色をこめて
box.style.background = "kuukihokke-/スクリーンショット 2023-10-17 174059.png";

//障害物
const board = [
    "▪        ▪",
    "   ▪  ▪   ",
    "          ",
    "   ▪  ▪   ",
    "▪        ▪",
];
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "▪") {
            new CanvasComponents({
                ctx: MainContext,
                img: "assets/bar.png",
                size: new Vector2(GameArea.x / 10 , 30),
                position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10), 15 + i * 30),
                update: function () {
                    if (
                        (
                            //横長の判定
                            ball.position.x > this.position.x - this.size.x / 2 - ball.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 + ball.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2
                        ) || ( 
                            //縦長の判定
                            ball.position.x > this.position.x - this.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 - ball.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2 + ball.size.y / 2
                        )
                    ) {
                        Sound.PlaySound("hit");
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
