/* ============================================================
   EFFECTS.JS
   Efek visual singkat untuk feedback jawaban kuis:
     - burst(el)  -> gelembung kecil "pecah" di sekitar tombol benar
     - shake(el)  -> goyang halus pada tombol yang dipilih salah

   Menghormati prefers-reduced-motion secara otomatis karena
   animasi CSS yang dipakai sudah tercakup oleh aturan global
   di style.css (animation-duration dipaksa ke ~0 untuk semua
   elemen ketika pengaturan itu aktif).
   ============================================================ */

window.Game = window.Game || {};

(function () {
  function burst(el) {
    if (!el) return;
    const wrap = el.closest(".quiz-option-wrap") || el.parentElement;
    if (!wrap) return;

    const bubbleCount = 6;
    for (let i = 0; i < bubbleCount; i += 1) {
      const bubble = document.createElement("span");
      bubble.className = "answer-bubble";
      const size = Math.random() * 10 + 6;
      const angle = (360 / bubbleCount) * i + Math.random() * 20;
      const distance = Math.random() * 18 + 22;
      const dx = Math.cos((angle * Math.PI) / 180) * distance;
      const dy = Math.sin((angle * Math.PI) / 180) * distance;

      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = "50%";
      bubble.style.top = "50%";
      bubble.style.setProperty("--dx", dx + "px");
      bubble.style.setProperty("--dy", dy + "px");

      wrap.appendChild(bubble);
      // eslint-disable-next-line no-loop-func
      setTimeout(() => bubble.remove(), 650);
    }
  }

  function shake(el) {
    if (!el) return;
    el.classList.remove("quiz-option--shake");
    // eslint-disable-next-line no-unused-expressions
    void el.offsetWidth; // reflow paksa supaya animasi bisa diulang
    el.classList.add("quiz-option--shake");
    setTimeout(() => el.classList.remove("quiz-option--shake"), 450);
  }

  window.Game.Effects = { burst, shake };
})();
