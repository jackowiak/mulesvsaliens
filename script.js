const startButton = document.getElementById("btn-start");
let firstPlayer;
let secondPlayer;
const squares = document.querySelectorAll(".square");
const gameStatus = document.getElementById("gamestatus");
let freeSpot;
const xorobtnX = document.getElementById("xbutton");
const xorobtnO = document.getElementById("obutton");
let inprogress;
let firstPlayerImage;
let secondPlayerImage;
let x = '<i class="fab fa-sticker-mule"></i>';
let o = '<i class="fab fa-reddit-alien"></i>';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let freeSquares;

function choosexoro(e) {
    let who = e.target.id;

    document.getElementsByClassName("mainChoosePlayer")[0].style.display = "none";
        
    if (who == "xbutton") {
        firstPlayer = "x";
        firstPlayerImage = x;
        secondPlayer = "o";
        secondPlayerImage = o;        
    } else {
        firstPlayer = "o";
        firstPlayerImage = o;
        secondPlayer = "x";
        secondPlayerImage = x;
    }
    
    startGame();
}

function startGame() {
    inprogress = true;
    
    gameStatus.textContent = "";
    
    freeSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
        squares[i].style.color = "#222";
        squares[i].addEventListener("click", firstPlayerMove);
    }
}

function firstPlayerMove(e) {   
    
    move(e.target.id, firstPlayer, firstPlayerImage);
    
    freeSpot = freeSquares.filter(o => typeof o == 'number');

    if (freeSpot.length != 0) {
        if (inprogress) {
            move(machineMove(), secondPlayer, secondPlayerImage);
        }
    }
    
    tie();
}

function tie() {    
    if ((gameStatus.innerHTML != `${x} won` && gameStatus.textContent != `${o} won`) && (freeSpot.length == 0)) {
        gameStatus.innerHTML = "tie";
        setTimeout(startGame, 1000);
    }
}

function move(squareId, player, playerImage) {
    squares[squareId].innerHTML = playerImage;
    squares[squareId].removeEventListener("click", firstPlayerMove);
    freeSquares[squareId] = player;
    checkWinner(freeSquares);
}

function checkWinner(freeSquares) {
    var currentComboFirstPlayer = [];
    var currentComboSecondPlayer = [];
    
    for (var j = 0; j < freeSquares.length; j++) {
        if (freeSquares[j] == firstPlayer) {
            currentComboFirstPlayer.push(j);
        }
    }
    
    for (var k = 0; k < freeSquares.length; k++) {
        if (freeSquares[k] == secondPlayer) {
            currentComboSecondPlayer.push(k);
        }
    }    
    
    checkFirstPlayerCommonSquares(currentComboFirstPlayer);
    checkSecondPlayerCommonSquares(currentComboSecondPlayer);
}


function machineMove() {
    freeSpot = freeSquares.filter(n => typeof n == 'number');
    
    if (freeSpot.length > 0) {
        var randomNumber = Math.floor(Math.random() * freeSpot.length);

        return freeSpot[randomNumber];        
    }
}


function checkFirstPlayerCommonSquares(currentComboFirstPlayer) {
    for (var g = 0; g < winningCombos.length; g++) {
        var arr1;
        arr1 = currentComboFirstPlayer.filter(obj => winningCombos[g].indexOf(obj) !== -1);
        
        if (arr1.length > 2) {
            
            for (var u = 0; u < arr1.length; u++) {
                squares[arr1[u]].style.color = "#d3415d";
            }
            
            inprogress = false;
            for (var w = 0; w < squares.length; w++) {
                squares[w].removeEventListener("click", firstPlayerMove);
            }

            gameStatus.innerHTML = `${firstPlayerImage} won`;
            
            setTimeout(startGame, 1000);
        }
    }
}

function checkSecondPlayerCommonSquares(currentComboSecondPlayer) {
    for (var h = 0; h < winningCombos.length; h++) {
        var arr2;
        arr2 = currentComboSecondPlayer.filter(obje => winningCombos[h].indexOf(obje) !== -1);
        
        if (arr2.length > 2) {
            
            for (var u = 0; u < arr2.length; u++) {
                squares[arr2[u]].style.color = "#d3415d";
            }
            
            inprogress = false;
            for (var q = 0; q < squares.length; q++) {
                squares[q].removeEventListener("click", firstPlayerMove);
            }

            gameStatus.innerHTML = `${secondPlayerImage} won`;            
            
            setTimeout(startGame, 1000);
        }
    }
}

xorobtnX.addEventListener("click", choosexoro);
xorobtnO.addEventListener("click", choosexoro);