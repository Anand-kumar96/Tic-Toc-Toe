const start=new Audio('ting.mp3');
const gameOver=new Audio('game.mp3');
const playMusic=new Audio('music.mp3');
const boxes=document.querySelectorAll(".box");
let turn ="X";
let volume=true;
let win=false;

let bodyStatus=document.body.clientWidth;
const findBodyWidth=()=>{
   return bodyStatus>=550?1:2;
}
//function to change turn
const changeTurn=()=>{
    return (turn==="X"?"O":"X");
};

//function to check Win
const checkWin=()=>{
    let boxText= document.getElementsByClassName("boxtext");
    let wins=[
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135]
    ]
    wins.forEach(e=>{
        if((boxText[e[0]].innerText===boxText[e[1]].innerText)&& (boxText[e[1]].innerText===boxText[e[2]].innerText)&& 
           boxText[e[0]].innerText!==''){
           win=true;
           boxes.forEach((box)=>{
            box.classList.remove("b");
           })
           startConfetti();
           document.querySelector('.user').innerText="User"+":"+boxText[e[0]].innerText+" Won";
           document.querySelector(".imgfile").querySelector("img").style.width="180px";
           var b=findBodyWidth();
           document.querySelector(".line").style.width=`${20*b}vw`;
           document.querySelector(".line").style.transform=`translate(${e[3]*b}vw,${e[4]*b}vw) rotate(${e[5]}deg)`;
           playMusic.pause();
           gameOver.play();
        }
    }) 
}

playMusic.play();
//Game logic
boxes.forEach((box)=>{
    let boxText= box.querySelector(".boxtext");
    box.classList.add("b");
    box.addEventListener('click',(e)=>{
    if(boxText.innerText==='' && win==false){
     start.play();
     boxText.innerText=turn;
     turn=changeTurn();
     checkWin();
     if(!win){
        document.querySelector(".info").innerText='Turn for : '+ turn;
     }else{
        document.querySelector(".info").innerText='Game Over 🥳🥳';
     }
    }
    })
})
// reset button
const reset=document.querySelector("button");
reset.addEventListener("click",()=>{
    let boxText= document.querySelectorAll(".boxtext");
    boxText.forEach((boxts)=>{
        boxts.innerText=" ";
    });
    boxes.forEach((box)=>{
        box.classList.add("b");
    });
    if(volume){
        playMusic.play();
    }
    win=false;
    stopConfetti();
    turn="X";
    document.querySelector(".line").style.width="0";
    document.querySelector(".info").innerText='Turn for : '+ turn;
    document.querySelector(".imgfile").querySelector("img").style.width="0px";
    document.querySelector('.user').innerText='';
})

//for sound
const sound=document.querySelector(".sound").querySelector("img");
sound.addEventListener('click',()=>{
    volume=!volume;
    if(volume==false){
        playMusic.pause();
        sound.src="mute.png";
    }else{
        playMusic.play(); 
        sound.src="play.png";
    }

})
