/* ============================================================
   TITLE.JS — halaman pembuka
   ============================================================ */

window.Game = window.Game || {};

(function () {
  function mountCharacterBadges() {
    const badgeMap = [
      ["spongebob", ".char-badge--spongebob"],
      ["patrick", ".char-badge--patrick"],
    ];
    badgeMap.forEach(([character, selector]) => {
      const el = document.querySelector(selector);
      window.Game.Characters.mount(el, character, "happy");
    });
  }

  function init() {
    mountCharacterBadges();

    // BGM mulai dari title screen. playBGM() aman dipanggil berkali-kali
    // (misalnya saat "Main Lagi" kembali ke title) karena tidak akan
    // me-restart BGM yang sudah berjalan.
    window.Game.Audio.playBGM();

    const btnStart = document.getElementById("btn-start-game");
    btnStart.addEventListener("click", () => {
      // Maskot & HUD baru muncul setelah intro / mulai dari misi pertama
      window.Game.Mascot.hide();
      window.Game.HUD.hide();
      window.Game.Screens.Intro.start();
    });
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Title = { init };
})();
