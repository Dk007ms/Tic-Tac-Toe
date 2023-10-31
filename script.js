var current_player=document.querySelector(".current_player");
var current_player_name=document.querySelector(".current_player_name");
const boxes=document.querySelectorAll(".boxes");
const modal=document.querySelector(".modal");
const container=document.querySelector(".container");
const wrapper=document.querySelector(".wrapper");
const modal_newgame=document.querySelector(".modal_newgame");
const start_game_btn=document.querySelector(".start_button");
const exit_btn=document.querySelector(".exit_button");
const overlay = document.querySelector(".overlay");
const result=document.querySelector(".result");
let input1=document.querySelector("#player1");
let input2=document.querySelector("#player2");
let gamegrid=["","","","","","","","",""];

let player1="";
let player2="";
let p1;
let p2;
let count=0;

function openmodal(){
    modal.classList.add("active");
    overlay.classList.add("overlayactive");
    container.classList.add("active2");
}


function closemodal(){
    modal.classList.remove("active");
    overlay.classList.remove("overlayactive");
    container.classList.remove("active2");
    result.innerText="";
}


var winning_conditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [2,5,8],
    [1,4,7]
];

function startgame(callback){
    current_player.textContent="";
    count=0;
    wrapper.style.backgroundImage="url(assets/Lawrencium.jpg)";
    player1=input1.value;
    player2=input2.value;
    p1=true;
    p2=false;
    current_player.innerText=`${player1}'s Turn`;
    gamegrid=["","","","","","","","",""];
    boxes.forEach((value,index)=>{
        boxes[index].innerText="";
        boxes[index].style.pointerEvents="all";
    });
    callback();
}

function checkGameover(){
    winning_conditions.forEach((position)=>{
        if((gamegrid[position[0]]!=="") && (gamegrid[position[1]]!=="") && (gamegrid[position[2]]!=="")
           && (gamegrid[position[0]]===gamegrid[position[1]]) && (gamegrid[position[1]]===gamegrid[position[2]])){
            result.innerText=`${current_player_name.innerText} won`;
            current_player.textContent=`${current_player_name.innerText} won`;
            wrapper.style.backgroundImage="url(assets/won.png)";
            openmodal();
        }

        else if(count===9){
            current_player.textContent="Match Tied"
            result.innerText="Match Tied";
            wrapper.style.backgroundImage="url(assets/Designer.png)";
            openmodal();
        }

        else{
            return;
        }

    });
}

function flipplayer(){
    if(p1==true){
        p1=false;
        current_player_name.innerText=`${player2}`;
    }

    else{
        p1=true;
        current_player_name.innerText=`${player1}`;
    }
}

function handleclick(index){
    if(p1==true){
        boxes[index].textContent="X";
        gamegrid[index]="X";
        count++;
        boxes[index].style.pointerEvents="none";
        checkGameover();
        flipplayer();
    }

    else{
        boxes[index].textContent="O";
        gamegrid[index]="O";
        count++;
        boxes[index].style.pointerEvents="none";
        checkGameover();
        flipplayer();
    }
}



boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
});

start_game_btn.addEventListener("click",()=>{
    result.innerText="Who wants to Battle"
    openmodal();
});

modal_newgame.addEventListener("click",()=>{
    startgame(closemodal);
})

exit_btn.addEventListener("click",()=>{
    closemodal();
});