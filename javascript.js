const choices = ["rock", "paper", "scissors"];
let winners = [];

function resetGame() {
    winners = [];
    document.querySelector(".playerScore").textContent = "Score: 0";
    document.querySelector(".computerScore").textContent = "Score: 0";
    document.querySelector(".ties").textContent = "Ties: 0";
    document.querySelector(".winner").textContent = "";
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".computerChoice").textContent = "";
    document.querySelector(".reset").style.display = "none";
}


function playRound(playerSelection) {
    let wins = checkWins();
    if(wins >= 5) {
        return;
    }
    const computerSelection = getComputerChoice();
    const winner = checkWinner(playerSelection,computerSelection);
    winners.push(winner);
    tallyWins();
    displayRound(playerSelection, computerSelection, winner);
    wins = checkWins();
    if (wins == 5) {
        displayEnd();
    }
}

function displayEnd() {
    let playerWins = winners.filter((item) => item == "Player").length;
    if (playerWins == 5){
        document.querySelector(".winner").textContent = "You  won 5 games, congrats!";
    } else {
        document.querySelector(".winner").textContent = "Sorry, the computer won 5 times";
    }
    document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerSelection, computerSelection, winner) {
    document.querySelector(".playerChoice").textContent = `You chose: ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`;
    document.querySelector(".computerChoice").textContent = `The computer chose: ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;
    displayRoundWinner(winner);
}

function displayRoundWinner(winner) {
    if (winner == "Player") {
        document.querySelector(".winner").textContent = "You won the round!";
    } else if (winner == "Computer") {
        document.querySelector(".winner").textContent = "Sorry, the computer won the round";
    } else {
        document.querySelector(".winner").textContent = "The round was a tie";
    }
}

function tallyWins() {
    let playerWins = winners.filter((item) => item == "Player").length;
    let computerWins = winners.filter((item) => item == "Computer").length;
    let ties = winners.filter((item) => item == "Tie").length;    
    document.querySelector(".playerScore").textContent = `Score: ${playerWins}`;
    document.querySelector(".computerScore").textContent = `Score: ${computerWins}`;
    document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function checkWins() {
    let playerWins = winners.filter((item) => item == "Player").length;
    let computerWins = winners.filter((item) => item == "Computer").length;
    //Math.max is a function that returns the highest value of two selections
    return Math.max(playerWins, computerWins);
}

function checkWinner(choiceP, choiceC) {
    if (choiceP === choiceC) {
        return  "Tie";
    } else if (
        (choiceP === "rock" && choiceC === "scissors")||
        (choiceP === "scissors" && choiceC === "paper")||
        (choiceP === "paper" && choiceC === "rock")
    ) {
        return "Player";
        } else {
        return "Computer";
    }
}

function logWins() {
    let playerWins = winners.filter((item) => item == "Player").length;
    let computerWins = winners.filter((item) => item == "Computer").length;
    let ties = winners.filter((item) => item == "Tie").length;    
   
}

let imgs = document.querySelectorAll("img");
imgs.forEach((img) => 
        img.addEventListener(("click"), () => {
            if(img.id) {
                playRound(img.id);
            }
        })
    );

document.querySelector(".reset").addEventListener("click", resetGame);

