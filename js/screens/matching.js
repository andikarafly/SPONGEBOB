/* ============================================================
   MATCHING.JS (screen) — mode klik-untuk-pasangkan
   Klik kartu kiri (framework) lalu kartu kanan (fokus utama).
   Cocok = kedua kartu ditandai matched. Tidak cocok = shake lalu
   reset. Stabil di HP karena tidak pakai drag-and-drop.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  let selectedLeft = null; // { id, el }
  let matchedCount = 0;
  const totalPairs = window.GameData.matchingPairs.length;

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function render() {
    const leftCol = document.getElementById("matching-left");
    const rightCol = document.getElementById("matching-right");
    leftCol.innerHTML = "";
    rightCol.innerHTML = "";

    const pairs = window.GameData.matchingPairs;
    const leftOrder = shuffle(pairs);
    const rightOrder = shuffle(pairs);

    leftOrder.forEach((pair) => {
      const btn = document.createElement("button");
      btn.className = "match-card";
      btn.textContent = pair.left;
      btn.dataset.id = pair.id;
      btn.dataset.side = "left";
      btn.addEventListener("click", () => handleClick(btn, pair.id, "left"));
      leftCol.appendChild(btn);
    });

    rightOrder.forEach((pair) => {
      const btn = document.createElement("button");
      btn.className = "match-card";
      btn.textContent = pair.right;
      btn.dataset.id = pair.id;
      btn.dataset.side = "right";
      btn.addEventListener("click", () => handleClick(btn, pair.id, "right"));
      rightCol.appendChild(btn);
    });

    updateStatus();
  }

  function updateStatus() {
    document.getElementById("matching-status").textContent =
      `${matchedCount} dari ${totalPairs} pasangan cocok`;

    if (matchedCount === totalPairs) {
      document.getElementById("btn-matching-continue").classList.remove("btn--hidden");
      document.getElementById("matching-status").textContent =
        "Semua pasangan cocok! Krusty Krab bisa lanjut ke tahap analisis.";
    }
  }

  function clearSelection() {
    if (selectedLeft) {
      selectedLeft.el.classList.remove("match-card--selected");
    }
    selectedLeft = null;
  }

  function handleClick(el, id, side) {
    if (el.classList.contains("match-card--matched")) return;

    if (side === "left") {
      clearSelection();
      selectedLeft = { id, el };
      el.classList.add("match-card--selected");
      return;
    }

    // side === "right"
    if (!selectedLeft) {
      // Belum pilih kartu kiri dulu — beri isyarat singkat
      el.classList.add("match-card--wrong");
      setTimeout(() => el.classList.remove("match-card--wrong"), 350);
      return;
    }

    if (selectedLeft.id === id) {
      // MATCH!
      selectedLeft.el.classList.remove("match-card--selected");
      selectedLeft.el.classList.add("match-card--matched");
      el.classList.add("match-card--matched");
      matchedCount += 1;
      selectedLeft = null;
      updateStatus();
    } else {
      // Tidak cocok
      el.classList.add("match-card--wrong");
      selectedLeft.el.classList.add("match-card--wrong");
      setTimeout(() => {
        el.classList.remove("match-card--wrong");
        selectedLeft.el.classList.remove("match-card--wrong");
        clearSelection();
      }, 400);
    }
  }

  function start() {
    matchedCount = 0;
    selectedLeft = null;
    document.getElementById("btn-matching-continue").classList.add("btn--hidden");
    window.Game.Navigation.goTo("screen-matching", 1);
    render();

    // Maskot mulai tampil dari sini (semua screen setelah intro)
    window.Game.Mascot.setCharacter("spongebob");
    window.Game.Mascot.say("Yuk, cocokkan dulu framework-nya!", "happy");
  }

  function init() {
    document
      .getElementById("btn-matching-continue")
      .addEventListener("click", () => {
        window.Game.State.get().matchingDone = true;
        window.Game.Screens.Mission.startMission(0);
      });
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Matching = { init, start };
})();
