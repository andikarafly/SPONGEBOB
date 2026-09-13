/* ============================================================
   STATE.JS
   State global game — disimpan di memory (variabel JS biasa).
   Direset total oleh Game.State.reset()
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const initialState = () => ({
    currentScreen: "title",
    introStep: 0,
    matchingDone: false,
    currentMissionIndex: 0, // 0..3
    currentQuestionIndex: 0, // 0..2 dalam misi aktif
    answeredCurrent: false,
    scores: {
      ITIL: 0,
      ISO17799: 0,
      COSO: 0,
      COBIT: 0,
    },
    totalCorrect: 0,
    totalQuestions: 12,
  });

  let state = initialState();

  const missionOrder = [
    { key: "itil", framework: "ITIL", title: "Misi 1: Kekacauan Sistem Pemesanan" },
    { key: "iso17799", framework: "ISO17799", title: "Misi 2: Ancaman Kebocoran Data" },
    { key: "coso", framework: "COSO", title: "Misi 3: Selisih Kas & Kecurangan" },
    { key: "cobit", framework: "COBIT", title: "Misi 4: Ekspansi Bisnis vs Strategi TI" },
  ];

  window.Game.State = {
    get: () => state,
    reset: () => {
      state = initialState();
    },
    missionOrder,
    getCurrentMission: () => missionOrder[state.currentMissionIndex],
    addScore: (framework, points) => {
      if (state.scores.hasOwnProperty(framework)) {
        state.scores[framework] += points;
      }
    },
    incrementCorrect: () => {
      state.totalCorrect += 1;
    },
  };
})();
