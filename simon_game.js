let gameSeq=[];
let userSeq=[];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});
startBtn.addEventListener("click", function(){
    if(started == false){
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];

        startBtn.style.display = "none"; // button hide
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(Idx){
    // let Idx = level - 1;

    if(userSeq[Idx] === gameSeq[Idx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){
            // levelUp();
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game over!  your socore was <b>${level}</b> <br> Press any key to start. `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
    }, 150);
        reset();
        startBtn.style.display = "block";
        startBtn.innerText = "Restart Game";
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);


    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = false;
    gameSeq = []; 
    userSeq = [];
    level = 0;
}
