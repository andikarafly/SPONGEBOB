/* ============================================================
   QUIZ.JS — soal pilihan ganda per misi, feedback, & skor
   ============================================================ */

window.Game = window.Game || {};

(function () {
  function getCurrentQuestions() {
    const mission = window.Game.State.getCurrentMission();
    return window.GameData.questions[mission.key];
  }

  function startQuestion(questionIndex) {
    const state = window.Game.State.get();
    state.currentQuestionIndex = questionIndex;
    state.answeredCurrent = false;

    const mission = window.Game.State.getCurrentMission();
    const questions = getCurrentQuestions();
    const question = questions[questionIndex];

    document.getElementById("quiz-eyebrow").textContent =
      `${mission.title.split(":")[0]} · Soal ${questionIndex + 1} dari ${questions.length}`;
    document.getElementById("quiz-question").textContent = question.prompt;

    const optionsWrap = document.getElementById("quiz-options");
    optionsWrap.innerHTML = "";

    question.options.forEach((optionText, idx) => {
      const wrap = document.createElement("div");
      wrap.className = "quiz-option-wrap";

      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = optionText;
      btn.addEventListener("click", () => handleAnswer(idx));

      wrap.appendChild(btn);
      optionsWrap.appendChild(wrap);
    });

    // Portrait karakter kasus misi ini, ekspresi netral menunggu jawaban
    const missionIndex = window.Game.State.get().currentMissionIndex;
    const caseCharacter = window.Game.Screens.Mission.getCaseCharacter(missionIndex);
    window.Game.Characters.mount(
      document.getElementById("quiz-portrait"),
      caseCharacter,
      "neutral"
    );
    window.Game.Mascot.setCharacter(caseCharacter);

    document.getElementById("quiz-feedback").classList.add("feedback-box--hidden");
    window.Game.Navigation.goTo(
      "screen-quiz",
      2 + window.Game.State.get().currentMissionIndex
    );
  }

  function handleAnswer(selectedIndex) {
    const state = window.Game.State.get();
    if (state.answeredCurrent) return;
    state.answeredCurrent = true;

    const question = getCurrentQuestions()[state.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    const optionButtons = document.querySelectorAll(".quiz-option");

    optionButtons.forEach((btn, idx) => {
      btn.classList.add("quiz-option--disabled");
      if (idx === question.correctIndex) {
        btn.classList.add("quiz-option--correct");
        if (isCorrect) {
          window.Game.Effects.burst(btn);
        }
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add("quiz-option--incorrect");
        window.Game.Effects.shake(btn);
      }
    });

    if (isCorrect) {
      window.Game.State.addScore(question.framework, 1);
      window.Game.State.incrementCorrect();
      window.Game.Audio.playCorrect();
    } else {
      window.Game.Audio.playWrong();
    }

    // Reaksi maskot SpongeBob + portrait karakter kasus misi ini
    const missionIndex = state.currentMissionIndex;
    const caseCharacter = window.Game.Screens.Mission.getCaseCharacter(missionIndex);
    const quizPortrait = document.getElementById("quiz-portrait");
    // Maskot pojok bawah ikut jadi karakter kasus misi ini saat bereaksi
    window.Game.Mascot.setCharacter(caseCharacter);

    if (isCorrect) {
      window.Game.Mascot.say("Yeay, bener banget!", "happy");
      window.Game.Characters.mount(quizPortrait, caseCharacter, "happy");
    } else {
      window.Game.Mascot.say("Hmm, coba baca lagi penjelasannya!", "sad");
      window.Game.Characters.mount(quizPortrait, caseCharacter, "sad");
    }

    // Update HUD skor + kesehatan Krusty Krab secara real-time
    window.Game.HUD.update();

    const feedbackBox = document.getElementById("quiz-feedback");
    const verdictEl = document.getElementById("quiz-verdict");
    const explanationEl = document.getElementById("quiz-explanation");

    verdictEl.textContent = isCorrect ? "Benar!" : "Kurang tepat.";
    verdictEl.className =
      "feedback-verdict " +
      (isCorrect ? "feedback-verdict--correct" : "feedback-verdict--incorrect");
    explanationEl.textContent = question.explanation;
    feedbackBox.classList.remove("feedback-box--hidden");
  }

  function goNext() {
    const state = window.Game.State.get();
    const questions = getCurrentQuestions();
    const nextQuestionIndex = state.currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      startQuestion(nextQuestionIndex);
      return;
    }

    // Misi selesai, lanjut ke misi berikutnya atau ke hasil akhir
    const nextMissionIndex = state.currentMissionIndex + 1;
    if (nextMissionIndex < window.Game.State.missionOrder.length) {
      window.Game.Screens.Mission.startMission(nextMissionIndex);
    } else {
      window.Game.Screens.Result.start();
    }
  }

  function init() {
    document.getElementById("btn-quiz-next").addEventListener("click", goNext);
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Quiz = { init, startQuestion };
})();
