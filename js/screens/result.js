/* ============================================================
   RESULT.JS — ringkasan skor per framework & rekomendasi akhir
   ============================================================ */

window.Game = window.Game || {};

(function () {
  function renderScoreGrid() {
    const grid = document.getElementById("score-grid");
    grid.innerHTML = "";
    const summary = window.Game.Scoring.getScoreSummary();
    const frameworks = window.GameData.frameworks;

    summary.forEach((item) => {
      const fw = frameworks[item.key];
      const card = document.createElement("div");
      card.className = "score-card";
      card.style.setProperty("--score-color", fw.color);
      card.innerHTML = `
        <p class="score-card__name">${fw.name}</p>
        <p class="score-card__value">${item.score} / ${item.max}</p>
        <div class="score-card__bar-track">
          <div class="score-card__bar-fill" style="width:${item.percent}%"></div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderRecommendation() {
    const rec = window.Game.Scoring.buildRecommendationText();
    document.getElementById("recommendation-headline").textContent = rec.headline;
    document.getElementById("recommendation-body").textContent = rec.body;
    document.getElementById("recommendation-note").textContent = rec.note;
  }

  function renderFrameworkDirectory() {
    const wrap = document.getElementById("framework-directory");
    wrap.innerHTML = "";
    const frameworks = window.GameData.frameworks;

    Object.values(frameworks).forEach((fw) => {
      const item = document.createElement("div");
      item.className = "framework-item";
      item.style.setProperty("--fw-color", fw.color);
      item.innerHTML = `
        <p class="framework-item__name">${fw.name}</p>
        <p class="framework-item__focus">${fw.focus}</p>
        <p class="framework-item__desc">${fw.description}</p>
        <p class="framework-item__best">${fw.bestFor}</p>
      `;
      wrap.appendChild(item);
    });
  }

  function renderSummaryLine() {
    const state = window.Game.State.get();
    document.getElementById("result-summary-line").textContent =
      `Kamu menjawab benar ${state.totalCorrect} dari ${state.totalQuestions} soal. Berikut ringkasan skor kamu per framework:`;
  }

  function start() {
    renderSummaryLine();
    renderScoreGrid();
    renderRecommendation();
    renderFrameworkDirectory();
    window.Game.Navigation.goTo("screen-result", 6);

    // HUD tetap tampil sampai halaman hasil akhir, maskot memberi selamat
    window.Game.HUD.update();
    window.Game.Mascot.setCharacter("spongebob");
    window.Game.Mascot.say("Kerja bagus, konsultan!", "happy");
  }

  function init() {
    document.getElementById("btn-play-again").addEventListener("click", () => {
      window.Game.State.reset();
      window.Game.HUD.hide();
      window.Game.Mascot.hide();
      window.Game.Navigation.goTo("screen-title", -1);
    });
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Result = { init, start };
})();
