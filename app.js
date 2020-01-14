//selects our major elements
const gameBoard = document.querySelector("#gameBoard");
const gameInfo = document.querySelector("#gameInfo");
const button = document.querySelector("#button");
const startGameScreen = document.querySelector("div.hideAfterLoad");
let bestScorePrintout = document.querySelector("#bestScorePrintout");
const newGame = document.querySelector("#newButton");
const footer = document.querySelector("#footer");
const newButton = document.querySelector("#newButton");
const winner = document.querySelector("#winner");
let count = 0;
let tileTurnovers = 0;
let bestScoreNum;
let firstSelectedTile;
let secondSelectedTile;
let firstTileID;
let secondTileID;
let randomizeImageNumbers1 = [];
let randomizeImageNumbers2 = [];

//each of these functions scrambles the order of the 12 image array to get the random order of the tiles
shuffle1();
shuffle2();

function shuffle1() {
  randomizeImageNumbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // for (let i = randomizeImageNumbers1.length - 1; i > 0; i--) {
  //   let j = Math.floor(Math.random() * (i + 1));
  //   [randomizeImageNumbers1[i], randomizeImageNumbers1[j]] = [
  //     randomizeImageNumbers1[j],
  //     randomizeImageNumbers1[i]
  //   ];
  // }
}

function shuffle2() {
  randomizeImageNumbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // for (let i = randomizeImageNumbers2.length - 1; i > 0; i--) {
  //   let j = Math.floor(Math.random() * (i + 1));
  //   [randomizeImageNumbers2[i], randomizeImageNumbers2[j]] = [
  //     randomizeImageNumbers2[j],
  //     randomizeImageNumbers2[i]
  //   ];
  // }
}

//checks to see if there is a best score in local storage
if (localStorage.bestScore && localStorage.bestScore !== '-1') {
  bestScoreNum = localStorage.bestScore;
  bestScorePrintout.innerText = bestScoreNum;
  console.log("local stroage true");
} else {  
    bestScoreNum = "not yet established";
    localStorage.setItem("bestScore", -1);
  console.log("local stroage else loop");
}



//starting the game via a button press on the start screen
button.addEventListener("click", function() {
  startGameScreen.remove();
  gameBoard.classList.remove("hidden");
  gameInfo.classList.remove("hidden");
  footer.classList.remove("hidden");
  bestScorePrintout.innerText = `Your Best Score Was ${bestScoreNum}`;
});


//this is the new game button that appears on the game play area
newButton.addEventListener("click", function() {
  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  };
  window.location.reload(true);
});

createTiles();
checkMatch();

//creates the tiles and sets a numeric data-id for each element
function createTiles() {
  //tiles 1-12
  for (let i = 0; i < 12; i++) {
    const newDiv = document.createElement("div");
    const newTile = document.createElement("img");
    newDiv.classList.add("tileHolder");
    newTile.setAttribute("src", `images/${randomizeImageNumbers1[i]}.jpg`);
    newTile.setAttribute("data-id", `${i}`);
    newTile.classList.add("tile");
    gameBoard.appendChild(newDiv);
    newDiv.appendChild(newTile);
  }
  //tiles 13-24
  for (let i = 0; i < 12; i++) {
    const newDiv = document.createElement("div");
    const newTile = document.createElement("img");
    newDiv.classList.add("tileHolder");
    newTile.setAttribute("src", `images/${randomizeImageNumbers2[i]}.jpg`);
    newTile.setAttribute("data-id", `${i + 12}`);
    newTile.classList.add("tile");
    gameBoard.appendChild(newDiv);
    newDiv.appendChild(newTile);
  }
}

//checks to see if clicked tiles match
function checkMatch() {
  const allTiles = document.querySelectorAll("img");
  const scorePrintout = document.querySelector("#scorePrintout");
  let isMatch = 0;
  let tilesClicked = 0;

  gameBoard.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
      tilesClicked++;
      switch (tilesClicked) {
        case 0:
          tileTurnovers++;
        case 1:
          tileTurnovers++;
          event.target.setAttribute("data-picked-flag", "picked");
          firstSelectedTile = event.target.getAttribute("src");
          firstTileID = event.target.getAttribute("data-id");
          break;
        case 2:
          tileTurnovers++;
          event.target.setAttribute("data-picked-flag", "picked");
          secondSelectedTile = event.target.getAttribute("src");
          secondTileID = event.target.getAttribute("data-id");
          if (
            firstSelectedTile === secondSelectedTile &&
            firstTileID !== secondTileID
          ) {
            for (let i = 0; i < allTiles.length; i++) {
              if (allTiles[i].getAttribute("data-picked-flag", "picked")) {
                allTiles[i].setAttribute("data-match", "yes");
                allTiles[i].removeAttribute("data-picked-flag", "picked");
              }
            }
            count++;
            checkIfHighScore();
            tilesClicked = 0;
          } else {
            if ((tilesClicked = 2)) {
              for (let i = 0; i < allTiles.length; i++) {
                const timeout = setTimeout(function() {
                  allTiles[i].removeAttribute("data-picked-flag", "picked");
                  tilesClicked = 0;
                }, 1500);
              }
            }
          }
          break;
      }
      scorePrintout.innerHTML = `Current score is ${tileTurnovers}`;
    }
  });
}

//checks to see if the player has won the game, closes out the game, and also sets the new best score in local storage if appropriate
function checkIfHighScore() {
  if (count === 12) {
    setTimeout(function() {
      gameBoard.remove();
      winner.innerHTML = "Awesome!";
    }, 800);
    if (tileTurnovers < (localStorage.bestScore) * -10000) {
      bestScorePrintout.innerText = `Your Best Score Was ${tileTurnovers}`;
      localStorage.setItem("bestScore", tileTurnovers);
    }
  }
}
