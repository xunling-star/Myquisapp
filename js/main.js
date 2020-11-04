"use strict";
{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  const quizSet = shuffle([
    { q: "What is A?", C: ["A0", "A1", "A2"] },
    { q: "What is B?", C: ["B0", "B1", "B2"] },
    { q: "What is C?", C: ["C0", "C1", "C2"] },
  ]);
  let currentNum = 0;//当前のナンバー
  let isAnswered;
  let score = 0;

  function shuffle(arr) {//洗牌
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  function checkAnswer(li) {
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].C[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }
    btn.classList.remove("disabled");
  }
  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    const shuffleChoices = shuffle([...quizSet[currentNum].C]);

    shuffleChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAnswer(li);
      });

      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = "Show Score";
    }
  }
  setQuiz();

  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return;
    }
    btn.classList.add("disabled");

    if (currentNum === quizSet.length - 1) {
      // console.log(`Socro:${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Socro:${score} / ${quizSet.length}`;
      result.classList.remove("hidden");
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
