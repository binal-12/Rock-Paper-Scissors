const body = document.getElementsByTagName("body")[0]
const start = document.getElementById("start")
const main = document.getElementsByTagName("main")[0]
const logo = document.getElementsByClassName("logo")[0]
const title = logo.children[0] 
const des = logo.children[1] 
const imgs = document.getElementsByClassName("imgs")[0]
const btn = document.getElementsByClassName("btn")
const sec = document.createElement("section")

const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")

const buttons = document.getElementsByClassName("buttons")

start.addEventListener("click", onStart)

function onStart(){

    // IMAGE CHANGES
    imgs.style.bottom = "-500px"

    // MAIN CHANGES
    main.style.flexDirection = "row"
    main.style.alignItems = "center"
    main.style.justifyContent = "center"
    main.style.width = "80%"
    main.style.marginTop = "45px"

    // LOGO STYLING

    title.style.fontSize = "30px"
    title.style.lineHeight = "36px"

    des.style.fontSize = "12px"
    des.style.lineHeight = "18px"
    des.style.marginBottom = "0"

    // BTN STYLING

    btn[0].style.display = "none"
    // btn[1].style.transform = "scale(0.75)"
    // btn[1].style.margin = "0 0"
    // btn[2].style.margin = "0 0"
    // btn[2].style.transform = "scale(0.75)"

    setTimeout(addButtons, 1000)
    // addButtons();
}

function addButtons(){
    sec.innerHTML = `<div class="score-card">
    <h2 class="player">User: </h2>
    <h2 class="user-scores">0</h2>
    <h2 class="user-score">
    </h2>
    <h2 class="player">Computer: </h2>
    <h2 class="comp-scores">0</h2>
    <h2 class="comp-score">
    </h2>
    </div>

    <div class="buttons">
    <div class="sec-btn light" id="rock" onclick="select(this)">
        <h2 class="btn-txt">Rock</h2>
    </div>
    <div class="sec-btn light" id="paper" onclick="select(this)">
        <h2 class="btn-txt">Paper</h2>
    </div>
    <div class="sec-btn light" id="scissors" onclick="select(this)">
        <h2 class="btn-txt">Scissors</h2>
    </div>
    </div>`
    body.append(sec)
}

let user, comp, comb, winner
const options = ["Rock", "Paper", "Scissors"]
let bl = false

function select(crr){
    if(bl){
        resetHand()
    }
    bl = true
    
    user = crr.children[0].textContent
    comp = options[Math.floor(Math.random() * 2)]
    console.log(comp)
    comb = user + comp
    // console.log(comb)
    switch(comb){
        case "RockScissors":
        case "PaperRock":
        case "ScissorsPaper":
            winner = "user"
            break
        case "ScissorsScissors":
        case "RockRock" :
        case "PaperPaper" :
            winner = "tie"
            break
        case "ScissorsRock":
        case "RockPaper":
        case "PaperScissors":
            winner = "comp"
            break
    }
    // console.log(winner)
    showHand(user,comp)
    updateScore(winner)
    setTimeout(resetHand, 1700)
    // console.log(userScore)
    // console.log(compScore)
}

let userHand = document.getElementsByClassName("user")
let compHand = document.getElementsByClassName("comp")
let userimg, compimg

function showHand(user, comp){
    switch (user){
        case "Rock":
            userimg = userHand[0]
            break;
        case "Paper":
            userimg = userHand[1]
            break;
        case "Scissors":
            userimg = userHand[2]
            break;   
    }
    switch (comp){
        case "Rock":
            compimg = compHand[0]
            break;
        case "Paper":
            compimg = compHand[1]
            break;
        case "Scissors":
            compimg = compHand[2]
            break;   
    }
    userimg.style.bottom = "0"
    compimg.style.bottom = "0"
}

function resetHand(){
    userimg.style.bottom = "-500px"
    compimg.style.bottom = "-500px"
}

let userScore = 0
let compScore = 0
function updateScore(winner){
    if(winner == "user"){
        userScore += 1
        // console.log(userScore)
        setTimeout(addScores(winner), 1000)
    } else if (winner == "comp"){
        compScore += 1
        // console.log(compScore)
        setTimeout(addScores(winner), 1000)
    }

    if(userScore >= 5){
        buttons[1].remove()
        setTimeout(announceResult, 1000)
        // console.log(gameOver)
    } else if(compScore >= 5){
        buttons[1].remove()
        setTimeout(announceResult, 1000)
        // console.log(gameOver)
    }
    

}

function addScores(winner){
    const userLoc = document.getElementsByClassName("user-score")[0]
    const compLoc = document.getElementsByClassName("comp-score")[0]
    
    userLoc.previousElementSibling.textContent = userScore
    compLoc.previousElementSibling.textContent = compScore
    
    const win = document.createElement("span")
    win.className = "material-icons"
    win.textContent = "check_circle"
    const lose = document.createElement("span")
    lose.className = "material-icons"
    lose.textContent = "cancel"


    if(winner == "user"){
        userLoc.append(win)
        compLoc.append(lose)
    }else if(winner == "comp"){
        compLoc.append(win)
        userLoc.append(lose)
    }
}

function announceResult(){
    let announce;
    if(userScore == 5){
        announce = "You Win!"
    } else if(compScore == 5){
        announce = "You Lose!"
    } else{
        announce = "It's a Tie!"
    }
    const add = document.createElement("h1")
    add.className = "announce"
    add.textContent = announce
    sec.append(add)
    
}