/* ============================================================
   MAIN.JS — entry point, inisialisasi semua screen,
   generate dekorasi gelembung, load screen pertama
   ============================================================ */

(function () {
  function generateBubbles() {
    const field = document.getElementById("bubble-field");
    const bubbleCount = window.innerWidth < 600 ? 12 : 20;

    for (let i = 0; i < bubbleCount; i += 1) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";

      const size = Math.random() * 34 + 10; // 10px - 44px
      const left = Math.random() * 100; // vw
      const duration = Math.random() * 10 + 10; // 10s - 20s
      const delay = Math.random() * 14; // 0s - 14s
      const drift = (Math.random() * 60 - 30) + "px";

      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = left + "vw";
      bubble.style.animationDuration = duration + "s";
      bubble.style.animationDelay = delay + "s";
      bubble.style.setProperty("--drift", drift);

      field.appendChild(bubble);
    }
  }

  function initGame() {
    generateBubbles();

    window.Game.Mascot.init();
    window.Game.HUD.init();

    window.Game.Screens.Title.init();
    window.Game.Screens.Intro.init();
    window.Game.Screens.Matching.init();
    window.Game.Screens.Mission.init();
    window.Game.Screens.Quiz.init();
    window.Game.Screens.Result.init();

    window.Game.State.reset();
    window.Game.Navigation.goTo("screen-title", -1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
  } else {
    initGame();
  }
})();
