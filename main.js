const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const CanvasWrapper = document.querySelector("#wrapper");
const GameArea = new CanvasManager(new Vector2(1280, 720), MainCanvas, CanvasWrapper);
const keyInput = new keyInputManager();
const Sound = new SoundManager();
GameArea.refresh();

let IsGameRunning = false;
//バーだよぉ
const bar = new CanvasComponents({
    ctx: MainContext,
    img: "demo-breakout/assets/bar.png",
    size: new Vector2(134,17),
    position: new Vector2(GameArea.x / 2, GameArea.y - 100),
    update : function () {
        if (keyInput.IsPressed("ArrowLeft") & this.position.x > 0 + this.size.x / 2) {
             this.position.x -=20 
        }     
       if (keyInput.IsPressed("ArrowRight") & this.position.x < 1280 - this.size.x / 2) {
        this.position.x +=20
        }
    }
})
Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
function gameStart() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    IsGameRunning = true;
}

function gameOver() {
    document.querySelector("#gameEnd").style.display = "block";
    IsGameRunning = false;
}

function backMenu() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#gameEnd").style.display = "none";
}

function update() {
    
}

//ゲームループの定義・開始
const GameLoop = new GameLoopManager(() => {
    MainContext.clearRect(0, 0, GameArea.x, GameArea.y);
    CanvasComponents.components.forEach((component) => {
        component.update();
        component.render();
    });
    update();
}, 30);
GameLoop.start();
