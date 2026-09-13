/* ============================================================
   MASCOT.JS
   Maskot pemandu — muncul mengambang di pojok layar pada semua
   screen setelah intro, menampilkan komentar singkat kontekstual
   lewat speech bubble kecil.

   Maskot ini sekarang ikut BERGANTI mengikuti karakter mana
   (SpongeBob atau Patrick) yang sedang "aktif berbicara" di
   cerita saat itu, lewat Game.Mascot.setCharacter(character).

   API:
     Game.Mascot.init()                 -> pasang elemen ke DOM (dipanggil sekali)
     Game.Mascot.show()                 -> tampilkan maskot
     Game.Mascot.hide()                 -> sembunyikan maskot (mis. di title screen)
     Game.Mascot.setCharacter(character)-> ganti karakter yang tampil sbg maskot
     Game.Mascot.say(text, expression)  -> ganti ekspresi & tampilkan komentar
                                            (memakai karakter aktif saat ini)

   Modul ini tidak menyentuh state/skor/logic game manapun —
   murni lapisan UI tambahan.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  let bubbleTimer = null;
  let elWidget = null;
  let elAvatar = null; // wrapper luar (yang "mengambang" / bob animation)
  let elAvatarVisual = null; // wrapper dalam (target Game.Characters.mount)
  let elBubble = null;
  let elBubbleText = null;
  let currentCharacter = "spongebob";

  function init() {
    elWidget = document.getElementById("game-mascot");
    elAvatar = document.getElementById("mascot-avatar");
    elAvatarVisual = document.getElementById("mascot-avatar-visual");
    elBubble = document.getElementById("mascot-bubble");
    elBubbleText = document.getElementById("mascot-bubble-text");

    if (!elWidget) return;

    window.Game.Characters.mount(elAvatarVisual, currentCharacter, "happy");

    // Klik pada maskot menyembunyikan gelembung sementara (biar tidak menutupi layar)
    elWidget.addEventListener("click", () => {
      elBubble.classList.add("mascot-bubble--hidden");
    });
  }

  function show() {
    if (elWidget) elWidget.classList.remove("mascot-widget--hidden");
  }

  function hide() {
    if (elWidget) elWidget.classList.add("mascot-widget--hidden");
    if (elBubble) elBubble.classList.add("mascot-bubble--hidden");
  }

  // Menentukan karakter mana (spongebob/patrick) yang tampil sbg maskot,
  // tanpa langsung memunculkan komentar. Dipanggil dari screen lain saat
  // karakter yang "aktif" di cerita berganti.
  function setCharacter(character) {
    if (character !== "spongebob" && character !== "patrick") return;
    currentCharacter = character;
    if (elAvatarVisual) {
      window.Game.Characters.mount(elAvatarVisual, currentCharacter, "happy");
    }
  }

  function say(text, expression) {
    if (!elWidget) return;
    show();

    window.Game.Characters.mount(
      elAvatarVisual,
      currentCharacter,
      expression || "happy"
    );
    elBubbleText.textContent = text;
    elBubble.classList.remove("mascot-bubble--hidden");

    // restart animasi "pop" tiap kali komentar baru muncul
    elBubble.classList.remove("mascot-bubble--pop");
    // eslint-disable-next-line no-unused-expressions
    void elBubble.offsetWidth; // reflow paksa supaya animasi bisa diulang
    elBubble.classList.add("mascot-bubble--pop");

    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      elBubble.classList.add("mascot-bubble--hidden");
    }, 4200);
  }

  window.Game.Mascot = { init, show, hide, setCharacter, say };
})();
