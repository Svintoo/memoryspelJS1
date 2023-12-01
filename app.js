let flippedCards = [];
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let swap = false;

function flipCard(card) {
  console.log("card clicked:", card.textContent);
  card.classList.remove("flipped");
  if (swap == false) {
    card.style.backgroundColor = "blue";
  } else {
    card.style.backgroundColor = "red";
  }

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(() => compareCards(card), 1000);
  }
}
function compareCards(card) {
  const [card1, card2] = flippedCards;

  if (card1.textContent == card2.textContent) {
    flippedCards = [];

    if (swap == false) {
      scorePlayer1 += 1;
      document.getElementById("score1").innerHTML = scorePlayer1;
      card1.style.backgroundColor = "darkblue";
      card2.style.backgroundColor = "darkblue";
      checkWin();
    } else {
      scorePlayer2 += 1;
      document.getElementById("score2").innerHTML = scorePlayer2;
      card1.style.backgroundColor = "darkred";
      card2.style.backgroundColor = "darkred";
      checkWin();
    }
  } else {
    //om det blir olika kort
    setTimeout(() => {
      card1.classList.add("flipped");
      card1.style.backgroundColor = "white";
      card2.classList.add("flipped");
      card2.style.backgroundColor = "white";
    }, 1000);
    flippedCards = [];

    if (swap == false) {
      swap = true;
    } else {
      swap = false;
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBoard() {
  const board = document.getElementById("board");
  let value = assignPair();

  for (let i = 0; i < 24; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("flipped");
    card.textContent = value[i];
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  }
}

drawBoard(); //början, printar ut 24 kort

assignPair(); //skapa upp tom array, lägg till par av värden 1-12, och
//lägg sedan till i slumpmässigt vald index som är giltig, returnerar listan

function assignPair() {
  let lst = new Array(24);

  let pairs = [];
  for (let v = 1; v <= 12; v++) {
    pairs.push(v, v);
  }
  for (let i = 0; i < pairs.length; i++) {
    let randomIndex;
    do {
      randomIndex = randomNumber(0, lst.length - 1);
    } while (lst[randomIndex] !== undefined);
    lst[randomIndex] = pairs[i];
  }
  //console.log(lst);
  return lst;
}
function checkWin() {
  if (scorePlayer1 + scorePlayer2 == 12) {
    if (scorePlayer1 > scorePlayer2) {
      alert("Player 1 wins");
    } else if (scorePlayer2 > scorePlayer1) {
      alert("Player 2 wins");
    } else {
      alert("its a tie!");
    }
  }
}
