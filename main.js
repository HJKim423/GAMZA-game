let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let scoreTXT = document.querySelector(".score");
let gameOver = document.querySelector(".game-over");
let ment = document.querySelector(".over-ment");
let replay = document.querySelector(".replay");

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;


let img2 = new Image();
img2.src = "img/dino.png";

let dino = {
    x : 30,
    y : 200,
    width : 80,
    height : 50,
    draw(){
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

}
let img1 = new Image();
img1.src = "img/cactus.png";

class Cactus{
    constructor(){
        this.x = 700;
        this.y =170;
        this.width = 45;
        this.height = 80;
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
    let score = Math.round(timer/2);
    scoreTXT.innerHTML=`SCORE : ${score}`;
    if(score <= 200){
        ment.innerHTML=`${score}점이야.. <img src='img/200점.png' width = '60' height = '60'>`;
    }
    else if(score <= 400){
        ment.innerHTML=`${score}점이야 <img src='img/400점.png' width = '60' height = '60'>`;
    }
    else if(score <= 700){
        ment.innerHTML=`${score}점이야! <img src='img/700점.png' width = '60' height = '60'>`;
    }
    else if(score >= 1000){
        ment.innerHTML=`${score}점이야..... <img src='img/1000점.png' width = '60' height = '60'>`;
    }
    

    cactusArr.forEach((a,i,o) =>{
        //지나간 cactus는 배열에서 제거
        if(a.x < 0){
            o.splice(i,1);
        }
        if(timer < 200) a.x -= 12;
        else if(timer < 400) a.x -= 14;
        else if(timer <600) a.x -= 16;
        else if(timer < 800) a.x -= 18;
        else if(timer <900) a.x -= 20;
        else if(timer <1200) a.x -= 22;
        else if(timer <1500) a.x -= 24;
        else if(timer <3300) a.x -= 26;
        else if(timer <4000) a.x -= 30;

        else a.x -= 40;

        isCollision(dino, a);

        a.draw();
    })
    
    //점프기능
    if(jumping === true){
        dino.y -= 15;
        jumpTimer++;
    }
    if(jumping ===false){
        if(dino.y < 200)
        dino.y +=15;

    }
    if(jumpTimer > 10){
        jumping = false;
        jumpTimer=0;
    }


    dino.draw();
}
moveCactus();

//충돌판정
function isCollision(dino, cactus){
    let  Xdiff = cactus.x - (dino.x + dino.width)+20 ;
    let  Ydiff = cactus.y - (dino.y + dino.height)+50;
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
    if(timer > 10 && dino.y < 200){
        e.preventDefault();
    }
    else  
    jumping = true;
})

