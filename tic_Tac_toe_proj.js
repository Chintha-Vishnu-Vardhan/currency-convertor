let boxes = document.querySelectorAll(".btn");
console.log(boxes) //array of all boxes
let turnO = true; //either play O or X;
let c = document.querySelector(".msg_container");
let a = document.querySelector(".winner");
let winning_patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let d = document.querySelector(".newbtn");
let e = document.querySelector(".reset");

const resetgame=()=>{
    //either or newbtn or reset btn is clicked this fun is called
    let turnO = true;
    c.classList.add("hide");
    a.innerText="";
    enableallbutton();
}
const disableallbutton=()=>{
    for (let b of boxes){
        b.disabled = true;
        b.innerText="";
    }
}
const enableallbutton=()=>{
    for (let b of boxes){
        b.disabled = false;
        b.innerText="";
    }
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO){
            console.log("clicked");
            box.innerText = "O";
            turnO = !turnO;
        }
        else{
            box.innerText = "X";
            turnO = !turnO;

        }
        box.disabled = true;
        checkwinner();
    })
})
const showwinner=(index)=>{
    c.classList.remove("hide");
    // console.log(`congratulations ${p1} is winner`)
    a.innerText=`congratulations ${index} is winner`;
    //we have to disable all buttons so that game doesnt contiue even afeter one player wins
    disableallbutton();
}
const checkwinner = ()=>{
    for (let pattern of winning_patterns ){
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1!="" && p2!="" &&p3!=""){
            if (p1===p2&p2===p3){
                showwinner(p1);
            }
        }
    }
}
d.addEventListener("click",resetgame);
e.addEventListener("click",resetgame);