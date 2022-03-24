let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector(".score");
let gameOver = document.querySelector(".game-over");
let ment = document.querySelector(".over-ment");
let replay = document.querySelector(".replay");

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

// let background = new Image();
// background.src = "img/background.png";

// class Back{
//     constructor(){
//         this.x=0;
//         this.y=140;
//         this.width = 500;
//         this.height= 200;
//     }
//     draw(){
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//         ctx.drawImage(background, this.x, this.y, this.width, this.height);
//     }
// }

let img2 = new Image();
img2.src = "img/dino.png";

let dino = {
    x : 10,
    y : 200,
    width : 70,
    height : 50,
    draw(){
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

}
let img1 = new Image();
img1.src = "img/cactus.png";

class Cactus{
    constructor(){
        this.x = 500;
        this.y =178;
        this.width = 40;
        this.height = 70;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let jumpTimer =0;
let cactusArr =[];
let backArr=[];
let jumping = false;
let animation;

function moveCactus(){
    animation = requestAnimationFrame(moveCactus);
    timer++;
    
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer%70 ===0){
        let cactus = new Cactus();
        cactusArr.push(cactus);
    }

    //score표시
    score.innerHTML=`Score : ${Math.round(timer/2)}`;
    ment.innerHTML=`Your score is ${Math.round(timer/2)}`;

    console.log(timer);
    cactusArr.forEach((a,i,o) =>{
        //지나간 cactus는 배열에서 제거
        if(a.x < 0){
            o.splice(i,1);
        }
        if(timer < 300) a.x -= 5;
        else if(timer < 600) a.x -= 6;
        else if(timer <900) a.x -= 8;
        else if(timer < 1500) a.x -= 17;
        else if(timer <2000) a.x -= 25;
        else if(timer <2200) a.x -= 5;
        else if(timer <3000) a.x -= 30;
        else if(timer <3300) a.x -= 15;
        else if(timer <4000) a.x -= 40;

        else a.x -= 50;

        isCollision(dino, a);

        a.draw();
    })
    
    //점프기능
    if(jumping === true){
        dino.y -= 7;
        jumpTimer++;
    }
    if(jumping ===false){
        if(dino.y < 200)
        dino.y +=7;

    }
    if(jumpTimer > 20){
        jumping = false;
        jumpTimer=0;
    }
    
    dino.draw();
}
moveCactus();

//충돌판정
function isCollision(dino, cactus){
    let  Xdiff = cactus.x - (dino.x + dino.width)+10 ;
    let  Ydiff = cactus.y - (dino.y + dino.height)+40;
    if(Xdiff<0 && Ydiff<0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        gameOver.classList.remove("game-over--hide");
    }

}


//리플레이
replay.addEventListener("click", ()=>{
    timer = 0;
    jumpTimer =0;
    cactusArr =[];
    jumping = false;
    moveCactus();
    gameOver.classList.add("game-over--hide");
    

})

document.addEventListener("keydown", (e)=>{
    if(e.code === "Space"){
        jumping = true;
    }
})

canvas.addEventListener("click", (e)=>{
    jumping = true;
})

