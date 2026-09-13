/* ============================================================
   NAVIGATION.JS
   Mengatur perpindahan antar screen (section) + progress bar
   ============================================================ */

window.Game = window.Game || {};

(function () {
  // Urutan langkah untuk progress bar (tidak termasuk title screen)
  const progressSteps = [
    "Intro",
    "Kenali Framework",
    "Misi 1",
    "Misi 2",
    "Misi 3",
    "Misi 4",
    "Hasil Akhir",
  ];

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((el) => {
      el.classList.remove("screen--active");
    });
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("screen--active");
      target.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateProgress(stepIndex) {
    const bar = document.getElementById("progress-bar-fill");
    const label = document.getElementById("progress-label");
    const wrapper = document.getElementById("progress-wrapper");

    if (stepIndex < 0) {
      wrapper.classList.add("progress--hidden");
      return;
    }
    wrapper.classList.remove("progress--hidden");

    const total = progressSteps.length;
    const percent = ((stepIndex + 1) / total) * 100;
    bar.style.width = percent + "%";
    label.textContent = `Langkah ${stepIndex + 1} dari ${total}: ${progressSteps[stepIndex]}`;
  }

  window.Game.Navigation = {
    goTo(screenId, progressStepIndex) {
      showScreen(screenId);
      updateProgress(
        typeof progressStepIndex === "number" ? progressStepIndex : -1
      );
      window.Game.State.get().currentScreen = screenId;
    },
    progressSteps,
  };
})();
