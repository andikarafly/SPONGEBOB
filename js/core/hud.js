/* ============================================================
   HUD.JS
   HUD skor real-time + bar "Kesehatan Krusty Krab", tampil mulai
   dari misi pertama sampai halaman hasil akhir.

   API:
     Game.HUD.init()    -> pasang referensi elemen (dipanggil sekali)
     Game.HUD.show()    -> tampilkan HUD
     Game.HUD.hide()    -> sembunyikan HUD (title/intro/matching)
     Game.HUD.update()  -> baca ulang skor dari Game.State & re-render

   Modul ini hanya MEMBACA Game.State (totalCorrect/totalQuestions) —
   tidak pernah mengubah nilai skor atau logic penilaian apa pun.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  let elHud = null;
  let elScoreValue = null;
  let elHealthFill = null;
  let elHealthLabel = null;

  function init() {
    elHud = document.getElementById("game-hud");
    elScoreValue = document.getElementById("hud-score-value");
    elHealthFill = document.getElementById("hud-health-fill");
    elHealthLabel = document.getElementById("hud-health-label");
  }

  function show() {
    if (elHud) elHud.classList.remove("game-hud--hidden");
  }

  function hide() {
    if (elHud) elHud.classList.add("game-hud--hidden");
  }

  function update() {
    if (!elHud) return;
    const state = window.Game.State.get();
    const correct = state.totalCorrect;
    const total = state.totalQuestions;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    elScoreValue.textContent = `${correct} / ${total}`;
    elHealthFill.style.width = percent + "%";

    let label = "Krusty Krab dalam bahaya";
    if (percent >= 34) label = "Krusty Krab mulai stabil";
    if (percent >= 67) label = "Krusty Krab makin sehat";
    if (percent === 100) label = "Krusty Krab aman terkendali!";
    elHealthLabel.textContent = label;
  }

  window.Game.HUD = { init, show, hide, update };
})();
