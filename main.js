//랜덤번호 지정
//유저가 번호 입력 후 go 버튼
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다
//랜덤번호 < 유저번호 -> down
//랜덤번호 > 유저번호 -> up
//reset버튼을 누르면 게임 리셋
//5번의 기회를 다쓰면 게임 끝(더이상 추측 불가, 버튼이 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다, 기회를 깍지 않는다


// 필요한 html elements 다 가져오기
let computerNumber = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 5; // 남은 기회
let userValueList = []; // 유저가 입력한 숫자들 리스트

chanceArea.innerHTML = `남은 기회:${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  // 랜덤숫자 뽑기

  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

function play() {
  // 숫자 추측하기
  const userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1부터 100 사이의 숫자를 입력 해주세요";

    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";

    return;
  }

  chances--;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList.push(userValue);
  if (userValue < computerNumber) {
    resultAreaImg.src =
      "https://mblogthumb-phinf.pstatic.net/20150630_61/nikei0613_1435650812442Ag6k1_JPEG/downloadfile-189.jpg?type=w420";
    resultText.textContent = "Up!";
  } else if (userValue > computerNumber) {
    resultAreaImg.src = "https://mblogthumb-phinf.pstatic.net/MjAyMDA4MjVfMTU4/MDAxNTk4MzU5NjQ2MTc2.Mg8bFUtNZN-mhniYh6bhGB5_vXYDcjEA-RAnB1rjTTYg.oc3kCIsw6TKpRUHS74Tt9WrVuxc9ifRT3lr0dfGka2Qg.JPEG.ttb717/IMG_4632.JPG?type=w800";
    resultText.textContent = "Down!";
  } else {
    resultAreaImg.src =
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA4MjVfMjEy/MDAxNTk4MzU5NDA3ODI4.suxRrmDlTYZxodWFWiyTw6grx5dUYLl9CaXzyNBdJBAg.OtzhRhQCkMX8tE_FO5KZkqVsA7Teap3GrnGiAnlJgrkg.JPEG.ttb717/IMG_4593.JPG?type=w800";
    resultText.textContent = "정답!";
    gameOver = true;
  }

  if (chances == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  //리셋
  pickRandomNumber();
  userInput.value = "";
  resultAreaImg.src =
    "https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif";
  resultText.textContent = "죽기 싫다면 맞춰라";
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList = [];
}

pickRandomNumber();