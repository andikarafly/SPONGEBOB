/* ============================================================
   AUDIO.JS
   Modul audio global untuk seluruh game:
   - SFX klik tombol (delegasi global, otomatis kena semua tombol
     termasuk yang dibuat dinamis seperti opsi kuis / kartu matching)
   - SFX jawaban benar / salah (dipanggil manual dari quiz.js)
   - BGM latar yang loop terus dari title screen sampai selesai,
     tidak restart tiap pindah screen
   - Toggle mute/unmute (ikon speaker, fixed di pojok layar)

   State (isMuted, instance BGM, dsb) disimpan di closure module ini
   saja (bukan di window.Game.State), jadi otomatis konsisten dan
   TIDAK ikut ke-reset oleh Game.State.reset() saat "Main Lagi".
   Screen di game ini cuma show/hide section (lihat navigation.js),
   bukan reload halaman, jadi modul ini tetap hidup terus.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const AUDIO_PATHS = {
    click: "assets/audio/sfx-click.mp3",
    correct: "assets/audio/sfx-correct.mp3",
    wrong: "assets/audio/sfx-wrong.mp3",
    bgm: "assets/audio/bgm-main.mp3",
  };

  // Volume BGM sengaja dibuat lebih rendah dari SFX supaya SFX tetap
  // terdengar jelas dan BGM tidak mengganggu.
  const SFX_VOLUME = 0.7;
  const BGM_VOLUME = 0.25;

  let isMuted = false;
  let bgmAudio = null; // instance <audio> BGM, dibuat sekali saja (lazy)
  let bgmUnlockBound = false; // guard supaya listener "unlock" tidak dobel

  /* ---------- SFX ---------- */

  // Setiap SFX dibuat sebagai objek Audio baru saat diputar, supaya kalau
  // pemain klik cepat berkali-kali, suara sebelumnya tidak "kepotong" —
  // bisa saling tumpuk tanpa harus menunggu selesai dulu.
  function playSfx(src) {
    if (isMuted) return;
    try {
      const sfx = new Audio(src);
      sfx.volume = SFX_VOLUME;
      const playPromise = sfx.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Diabaikan: browser bisa menolak play() sebelum ada interaksi
          // pengguna, atau file belum sempat ter-load. Tidak fatal.
        });
      }
    } catch (err) {
      // Diabaikan supaya kegagalan audio tidak pernah mematahkan
      // logic scoring/navigasi game.
    }
  }

  function playClick() {
    playSfx(AUDIO_PATHS.click);
  }

  function playCorrect() {
    playSfx(AUDIO_PATHS.correct);
  }

  function playWrong() {
    playSfx(AUDIO_PATHS.wrong);
  }

  /* ---------- BGM ---------- */

  function getBgm() {
    if (!bgmAudio) {
      bgmAudio = new Audio(AUDIO_PATHS.bgm);
      bgmAudio.loop = true; // WAJIB: mengulang otomatis tanpa jeda
      bgmAudio.volume = BGM_VOLUME;
    }
    return bgmAudio;
  }

  // Coba mulai BGM. Aman dipanggil berkali-kali dari screen manapun —
  // kalau BGM sudah main, panggilan berikutnya tidak akan me-restart-nya.
  function playBGM() {
    const bgm = getBgm();
    if (isMuted) return; // jangan mulai play kalau sedang mute
    if (!bgm.paused) return; // sudah jalan, jangan disentuh lagi

    const playPromise = bgm.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Banyak browser memblokir autoplay dengan suara sebelum ada
        // interaksi pengguna pertama kali. Kalau gagal, coba lagi
        // otomatis begitu pengguna klik/tap apapun di layar.
        bindBgmUnlockOnFirstInteraction();
      });
    }
  }

  function bindBgmUnlockOnFirstInteraction() {
    if (bgmUnlockBound) return;
    bgmUnlockBound = true;

    const tryUnlock = () => {
      bgmUnlockBound = false;
      document.removeEventListener("click", tryUnlock);
      document.removeEventListener("touchstart", tryUnlock);
      playBGM();
    };

    document.addEventListener("click", tryUnlock, { once: true });
    document.addEventListener("touchstart", tryUnlock, { once: true });
  }

  /* ---------- Mute toggle ---------- */

  function updateMuteButtonUI(btn) {
    const el = btn || document.getElementById("btn-audio-mute-toggle");
    if (!el) return;
    el.textContent = isMuted ? "\uD83D\uDD07" : "\uD83D\uDD0A"; // 🔇 / 🔊
    el.classList.toggle("audio-mute-toggle--muted", isMuted);
    el.setAttribute(
      "aria-label",
      isMuted ? "Nyalakan suara" : "Matikan suara"
    );
    el.setAttribute("aria-pressed", isMuted ? "true" : "false");
  }

  function toggleMute() {
    isMuted = !isMuted;
    const bgm = getBgm();

    if (isMuted) {
      bgm.pause();
    } else {
      // Baru dinyalakan lagi: lanjutkan BGM dari posisi terakhir (loop
      // tetap jalan seperti biasa karena properti .loop tidak berubah).
      playBGM();
    }

    updateMuteButtonUI();
  }

  /* ---------- Setup: tombol mute (fixed, konsisten di semua screen) ---------- */

  function injectMuteToggleStyles() {
    if (document.getElementById("audio-mute-toggle-styles")) return;
    const style = document.createElement("style");
    style.id = "audio-mute-toggle-styles";
    style.textContent = `
      .audio-mute-toggle {
        position: fixed;
        top: 14px;
        right: 14px;
        z-index: 9999;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.85);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        font-size: 20px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.15s ease, background 0.15s ease;
      }
      .audio-mute-toggle:hover {
        transform: scale(1.08);
      }
      .audio-mute-toggle:active {
        transform: scale(0.95);
      }
      .audio-mute-toggle--muted {
        background: rgba(255, 255, 255, 0.6);
        opacity: 0.85;
      }
      @media (max-width: 600px) {
        .audio-mute-toggle {
          top: 10px;
          right: 10px;
          width: 38px;
          height: 38px;
          font-size: 17px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setupMuteButton() {
    injectMuteToggleStyles();

    let btn = document.getElementById("btn-audio-mute-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "btn-audio-mute-toggle";
      btn.type = "button";
      btn.className = "audio-mute-toggle";
      document.body.appendChild(btn);
    }

    updateMuteButtonUI(btn);
    btn.addEventListener("click", toggleMute);
  }

  /* ---------- Setup: SFX klik global (delegasi ke seluruh game) ---------- */

  function setupGlobalClickSfx() {
    // Delegasi di level document supaya SEMUA tombol di seluruh game —
    // termasuk tombol yang dibuat secara dinamis (opsi kuis, kartu
    // matching) — otomatis memicu SFX klik, tanpa perlu mengubah
    // handler klik yang sudah ada di masing-masing screen.
    document.addEventListener("click", (event) => {
      const target = event.target.closest("button, .btn");
      if (target) {
        playClick();
      }
    });
  }

  function init() {
    setupMuteButton();
    setupGlobalClickSfx();
  }

  window.Game.Audio = {
    init,
    playClick,
    playCorrect,
    playWrong,
    playBGM,
    toggleMute,
  };
})();
