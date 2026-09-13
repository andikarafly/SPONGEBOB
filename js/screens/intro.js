/* ============================================================
   INTRO.JS — dialog pembuka cerita, beberapa panel/slide
   Cast disederhanakan: hanya SpongeBob & Patrick yang mengalami
   sendiri semua masalah IT di Krusty Krab. Di tiap momen, cuma
   1 karakter yang aktif tampil di layar.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const dialogueLines = [
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Patrick, gawat! Krusty Krab lagi kacau banget urusan IT-nya. Sistem pemesanan online aneh, data pelanggan katanya juga nggak aman, kas selisih, dan rencana ekspansi jalan sendiri tanpa arah!",
    },
    {
      speaker: "Patrick",
      portrait: "patrick",
      text:
        "Wah, kedengarannya serius! Tapi... itu kan urusan komputer-komputer gitu ya? Kita berdua bisa bantu apa, SpongeBob?",
    },
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Justru itu, Patrick! Kita berdua ditunjuk jadi konsultan IT Governance dadakan buat Krusty Krab. Ada 4 masalah besar, dan tiap masalah butuh 'framework' alias kerangka kerja yang beda-beda buat menyelesaikannya.",
    },
    {
      speaker: "Patrick",
      portrait: "patrick",
      text:
        "Framework? Governance? Itu semacam gubernur yang tinggal di laut, ya?",
    },
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Hehe, bukan, Patrick! Governance itu artinya cara kita mengatur dan mengawasi supaya teknologi di Krusty Krab benar-benar membantu, bukan malah bikin runyam. Framework itu semacam 'panduan langkah demi langkah'-nya.",
    },
    {
      speaker: "Patrick",
      portrait: "patrick",
      text:
        "Oke, aku ngerti! Ya udah, ayo kita berdua turun tangan langsung! Aku siap jadi konsultan hebat bareng kamu, SpongeBob!",
    },
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Semangat, Patrick! Tapi sebelum turun ke lapangan, ayo kita kenalan dulu dengan framework-framework yang akan kita pakai. Aku siap sedia! Aku siap sedia!",
    },
  ];

  let currentIndex = 0;

  function renderLine() {
    const line = dialogueLines[currentIndex];
    const portraitEl = document.getElementById("intro-portrait");
    const speakerEl = document.getElementById("intro-speaker");
    const textEl = document.getElementById("intro-text");
    const hintEl = document.getElementById("intro-hint");
    const btnNext = document.getElementById("btn-intro-next");

    portraitEl.className = "dialogue-portrait portrait--" + line.portrait;
    window.Game.Characters.mount(portraitEl, line.portrait, "neutral");
    speakerEl.textContent = line.speaker;
    textEl.textContent = line.text;
    hintEl.textContent = `${currentIndex + 1} / ${dialogueLines.length}`;

    btnNext.textContent =
      currentIndex === dialogueLines.length - 1 ? "Kenali Framework" : "Lanjut";
  }

  function next() {
    if (currentIndex < dialogueLines.length - 1) {
      currentIndex += 1;
      renderLine();
    } else {
      window.Game.Screens.Matching.start();
    }
  }

  function start() {
    currentIndex = 0;
    window.Game.Navigation.goTo("screen-intro", 0);
    renderLine();
  }

  function init() {
    document.getElementById("btn-intro-next").addEventListener("click", next);
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Intro = { init, start };
})();
