/* ============================================================
   MISSION.JS — menampilkan skenario kasus tiap misi sebelum kuis
   Cast disederhanakan: hanya SpongeBob & Patrick, bergantian
   menemukan masalah lalu menceritakannya ke satu sama lain.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const missionCaseText = [
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Patrick, lihat ini! Pelanggan memesan satu Krabby Patty, tapi sistem malah mengirim dua pesanan ke dapur, dan tidak ada yang tahu pesanan mana yang harus dibatalkan. Ini terjadi hampir tiap hari!",
    },
    {
      speaker: "Patrick",
      portrait: "patrick",
      text:
        "SpongeBob, tadi aku lihat laptop kasir yang nyimpen data pelanggan dan resep rahasia itu ketinggalan kebuka gitu aja, terus ada yang iseng coba-coba mengintip layarnya! Untung ketahuan, tapi serem juga ya kalau sampai bocor.",
    },
    {
      speaker: "SpongeBob",
      portrait: "spongebob",
      text:
        "Aku baru saja menghitung ulang kas hari ini, Patrick, dan angkanya tidak cocok dengan catatan penjualan! Ada selisih yang aneh, seperti ada pencatatan yang salah... atau malah sengaja diakali.",
    },
    {
      speaker: "Patrick",
      portrait: "patrick",
      text:
        "Eh SpongeBob, kudengar Krusty Krab mau buka drive-thru online dan cabang baru biar makin untung. Tapi katanya tim TI-nya suka mengambil keputusan sendiri, nggak pernah tanya dulu apa yang restoran ini benar-benar butuhkan. Kacau, ya?",
    },
  ];

  function start(index) {
    const state = window.Game.State.get();
    state.currentMissionIndex = index;
    state.currentQuestionIndex = 0;

    const mission = window.Game.State.missionOrder[index];
    const caseInfo = missionCaseText[index];

    document.getElementById("mission-eyebrow").textContent =
      `Misi ${index + 1} dari 4`;
    document.getElementById("mission-title").textContent = mission.title;

    const portraitEl = document.getElementById("mission-portrait");
    portraitEl.className = "dialogue-portrait portrait--" + caseInfo.portrait;
    window.Game.Characters.mount(portraitEl, caseInfo.portrait, "neutral");
    document.getElementById("mission-speaker").textContent = caseInfo.speaker;
    document.getElementById("mission-text").textContent = caseInfo.text;

    window.Game.Navigation.goTo("screen-mission", 2 + index);

    // HUD skor + kesehatan Krusty Krab tampil mulai misi pertama
    window.Game.HUD.show();
    window.Game.HUD.update();

    // Maskot pojok bawah ikut jadi karakter yang sedang "bicara" di misi ini
    window.Game.Mascot.setCharacter(caseInfo.portrait);
    window.Game.Mascot.say("Ayo kita analisis bareng!", "happy");
  }

  function init() {
    document
      .getElementById("btn-mission-continue")
      .addEventListener("click", () => {
        window.Game.Screens.Quiz.startQuestion(0);
      });
  }

  // Dipakai quiz.js untuk menampilkan portrait karakter kasus yang sesuai
  // di layar kuis (murni referensi visual, tidak memengaruhi data/logic).
  function getCaseCharacter(index) {
    const caseInfo = missionCaseText[index];
    return caseInfo ? caseInfo.portrait : "spongebob";
  }

  window.Game.Screens = window.Game.Screens || {};
  window.Game.Screens.Mission = {
    init,
    startMission: start,
    getCaseCharacter,
  };
})();
