class Game {
  static gameStarted = false;
  static counter = 0;
  static clickedSquare = [];
  static score = 0;
  static random = [];

  static setClickedSquare(clicked) {
    const showIns = document.getElementById("instruction");
    showIns.innerHTML = `${Game.random[Game.counter]}`;

    Game.clickedSquare[Game.counter] = { click: clicked, result: "" };

    if (
      Game.random[Game.counter] === Game.clickedSquare[Game.counter]["click"]
    ) {
      Game.setScore();
      Game.clickedSquare[Game.counter]["result"] = true;
    } else {
      Game.clickedSquare[Game.counter]["result"] = false;
    }

    Game.declareResult(Game.clickedSquare[Game.counter]);
    Game.increaseCounter();
    Game.genrateRandomInstructions();

    showIns.innerHTML = `${Game.random[Game.counter]}`;
  }
  static increaseCounter() {
    Game.counter++;
  }
  static setScore() {
    Game.score++;
    const scoreElm = document.getElementById("score-board");
    scoreElm.innerHTML = `Score: ${Game.score}`;
  }
  static showInsAtCenter(click) {
    const boardHolder = document.getElementById("board-holder");
    if (document.getElementById("declare-selection"))
      boardHolder.removeChild(document.getElementById("declare-selection"));
    const text = document.createElement("h1");
    text.id = "declare-selection";

    text.innerHTML = `${click}`;

    text.style.position = "absolute";
    text.style.right = "80vw";
    text.style.top = "35vh";
    text.style.transform = "translateX(-50%);translateX(-50%)";
    text.style.color = "wheat";
    text.style.fontSize = "80px";
    text.style.display = "inline";
    text.style.height = "fit-content";
    text.style.pointerEvents = "none";

    boardHolder.appendChild(text);

    setTimeout(function () {
      boardHolder.removeChild(text);
    }, 800);
  }
  static genrateRandomInstructions() {
    const ascii = Math.ceil(Math.random() * (0 - 8) + 8);
    const number = Math.ceil(Math.random() * (0 - 8) + 8);

    Game.random[Game.counter] = `${number}${String.fromCharCode(ascii + 96)}`;
    Game.showInsAtCenter(Game.random[Game.counter]);
  }

  static declareResult(res) {
    const resultDiv = document.getElementById("result");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");

    //style div
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.flexDirection = "column";
    div.style.width = "30px";
    //style img
    img.src = res["result"] ? "../img/tick.JPG" : "../img/cross.JPG";
    p.innerHTML = res["click"];
    p.style.textAlign = "center";
    p.style.color = "white";

    div.appendChild(img);
    div.appendChild(p);
    resultDiv.appendChild(div);
  }

  static timeKeeper(time) {
    setTimeout(() => {
      const counterElm = document.getElementById("counter");
      counterElm.innerText = `00:${time}`;
      console.log(time);
      if (time > 0) Game.timeKeeper(time - 1);
      else Game.endGame(time);
    }, 1000);
  }
  static countBeforeStart(time = 10000, counter = 3) {
    const boardHolder = document.getElementById("board-holder");
    if (document.getElementById("declare-selection"))
      boardHolder.removeChild(document.getElementById("declare-selection"));
    const text = document.createElement("h1");
    text.id = "declare-selection";

    text.innerHTML = `${counter}`;

    text.style.position = "absolute";
    text.style.right = "80vw";
    text.style.top = "35vh";
    text.style.transform = "translateX(-50%);translateX(-50%)";
    text.style.color = "wheat";
    text.style.fontSize = "80px";
    text.style.display = "inline";
    text.style.height = "fit-content";
    text.style.pointerEvents = "none";

    boardHolder.appendChild(text);
    setTimeout(() => {
      if (counter > 0) {
        console.log(counter);
        Game.countBeforeStart(time, counter - 1);
      } else {
        const colorMenu = document.getElementById("color");
        const boardHolder = document.getElementById("board-holder");

        boardHolder.innerHTML = "";
        drawChessBoard(colorMenu.value);
        Game.startGame(time);
      }
    }, 1000);
  }
  // when start button is pressed
  static startGame(time) {
    if (time > 30000) return;
    Game.timeKeeper(time - 1);
    Game.gameStarted = true;
    Game.score = 0;
    const scoreElm = document.getElementById("score-board");
    const dropMenu = document.getElementById("drop-menu");
    const startBtn = document.getElementById("btn");
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";
    scoreElm.innerHTML = `Score: ${Game.score}`;

    // toggle  buttons
    startBtn.style.visibility = "hidden";
    dropMenu.style.visibility = "hidden";

    const showIns = document.getElementById("instruction");
    Game.genrateRandomInstructions();
    showIns.innerHTML = `${Game.random[Game.counter]}`;
  }

  static endGame(time) {
    const instructions = document.getElementById("instruction");
    const dropMenu = document.getElementById("drop-menu");
    // end game
    setTimeout(() => {
      Game.gameStarted = false;
      startBtn.style.visibility = "";
      dropMenu.style.visibility = "";
      instructions.innerHTML = "Vision";
    }, time * 1000);
  }
}

// draw chess board
function drawChessBoard(chessColor = "white") {
  const div = document.getElementById("board-holder");

  let color;
  // to give each square an index and use it to toggle color
  let toggler = 0;

  // column
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.style.width = "200px";
    //row
    for (let j = 0; j < 8; j++) {
      // toggle color
      if (toggler % 2 === 0) {
        color = "#eeeed2";
      } else {
        color = "#769656";
      }

      const childDiv = document.createElement("div");
      childDiv.className =
        chessColor === "white"
          ? `${8 - j}${String.fromCharCode(97 + i)}`
          : `${j + 1}${String.fromCharCode(104 - i)}`;

      chessColor === "white" ? `` : ``;
      // styling
      childDiv.style.display = "flex";
      childDiv.style.width = "100%";
      childDiv.style.height = "9.4vh";

      childDiv.style.backgroundColor = color;

      // write information
      if (i === 0 && j === 7) {
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");

        div1.className = div2.className = childDiv.className;

        div1.innerHTML = chessColor === "white" ? "1" : "8";
        div2.innerHTML = chessColor === "white" ? "a" : "h";

        div2.style.textAlign = "right";
        div1.style.color = div2.style.color = "#eeeed2";

        childDiv.style.flexDirection = "column";
        childDiv.style.justifyContent = "space-between";

        childDiv.appendChild(div1);
        childDiv.appendChild(div2);
      } else if (i === 0) {
        childDiv.innerHTML = chessColor === "white" ? `${8 - j}` : `${j + 1}`;
        childDiv.style.color = color === "#769656" ? "#eeeed2" : "#769656";
      } else if (j === 7) {
        childDiv.innerHTML =
          chessColor === "white"
            ? `${String.fromCharCode(97 + i)}`
            : `${String.fromCharCode(104 - i)}`;
        childDiv.style.justifyContent = "flex-end";
        childDiv.style.alignItems = "end";
        childDiv.style.color = color === "#769656" ? "#eeeed2" : "#769656";
      }

      childDiv.onclick = (elm) => {
        if (Game.gameStarted === true) {
          Game.setClickedSquare(elm.target.className);
        }
      };
      row.appendChild(childDiv);
      toggler++;
    }
    toggler++;
    div.appendChild(row);
  }
}

// fire the game
const startBtn = document.getElementById("btn");
const dropDown = document.getElementById("timer");
const dropDownValue = Number(dropDown.value);

drawChessBoard();
startBtn.onclick = () =>
  Game.gameStarted ? false : Game.countBeforeStart(dropDownValue);
