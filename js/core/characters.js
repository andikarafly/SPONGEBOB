/* ============================================================
   CHARACTERS.JS
   Modul ilustrasi karakter berbasis GAMBAR ASLI (<img>), bukan
   lagi generate SVG lewat kode. Cast sudah disederhanakan jadi
   hanya SpongeBob & Patrick.

   Setiap karakter hanya punya 1 gambar (pose netral, tanpa
   variasi ekspresi wajah). Reaksi "senang" / "kecewa ringan"
   disimulasikan lewat ANIMASI CSS pada gambar itu sendiri
   (lihat .char-visual--happy / .char-visual--sad di
   mascot-hud.css), bukan lewat penggantian gambar.

   Modul ini juga menangani ANIMASI TRANSISI setiap kali
   IDENTITAS karakter yang tampil di sebuah container berganti
   (mis. dari SpongeBob ke Patrick): karakter lama turun+fade out
   dulu sampai hilang, baru setelah itu karakter baru pop-up+fade in.
   Transisi ini terpisah dari animasi reaksi benar/salah di atas.

   API (dipertahankan sama seperti sebelumnya supaya pemanggil
   di file lain tidak perlu direvisi strukturnya):
     Game.Characters.mount(el, character, expression)

   Modul ini murni presentasional — tidak menyentuh state,
   skor, atau logic game manapun.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const IMAGE_SRC = {
    spongebob: "assets/images/spongebob.png",
    patrick: "assets/images/patrick.png",
  };

  const ALT_TEXT = {
    spongebob: "SpongeBob",
    patrick: "Patrick",
  };

  const VALID_EXPRESSIONS = ["neutral", "happy", "sad"];

  // Durasi harus selaras dengan keyframes charSwapExit / charSwapEnter
  // di css/mascot-hud.css (total ±580ms, di dalam rentang 500-700ms).
  const EXIT_MS = 260;

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function normalizeExpression(expression) {
    return VALID_EXPRESSIONS.includes(expression) ? expression : "neutral";
  }

  function buildImg(character) {
    const img = document.createElement("img");
    img.className = "char-img";
    img.src = IMAGE_SRC[character] || "";
    img.alt = ALT_TEXT[character] || "";
    img.draggable = false;
    return img;
  }

  function applyExpressionClass(el, expression) {
    el.classList.remove(
      "char-visual--neutral",
      "char-visual--happy",
      "char-visual--sad"
    );
    // Reflow paksa supaya animasi reaksi bisa diulang walau class-nya sama
    // seperti sebelumnya (mis. jawaban benar dua kali berturut-turut).
    // eslint-disable-next-line no-unused-expressions
    void el.offsetWidth;
    el.classList.add("char-visual--" + expression);
  }

  function renderCharacter(el, character, expression) {
    el.innerHTML = "";
    if (!IMAGE_SRC[character]) return;
    el.appendChild(buildImg(character));
    applyExpressionClass(el, expression);
  }

  // Menempelkan gambar karakter ke sebuah elemen container, sambil
  // menjaga class lain yang sudah ada di elemen tersebut (mis.
  // portrait--spongebob). Jika identitas karakter berubah dari mount
  // sebelumnya pada elemen yang sama, jalankan animasi transisi
  // keluar -> masuk. Jika karakter sama (cuma ekspresi yang beda,
  // mis. reaksi jawaban), langsung update ekspresi tanpa transisi.
  function mount(el, character, expression) {
    if (!el || !IMAGE_SRC[character]) return;

    el.classList.add("char-visual");
    const exp = normalizeExpression(expression);
    const previousCharacter = el.dataset.character;
    const isFirstMount = el.childElementCount === 0;

    if (previousCharacter === character && !isFirstMount) {
      // Karakter yang sama masih tampil — cuma ganti ekspresi reaksi.
      applyExpressionClass(el, exp);
      return;
    }

    el.dataset.character = character;

    if (isFirstMount || prefersReducedMotion()) {
      renderCharacter(el, character, exp);
      return;
    }

    // Identitas berubah: animasikan karakter lama turun+fade out dulu,
    // baru setelah itu karakter baru muncul dengan pop-up+fade in.
    el.classList.remove("char-visual--enter");
    el.classList.add("char-visual--exit");

    window.setTimeout(() => {
      renderCharacter(el, character, exp);
      el.classList.remove("char-visual--exit");
      el.classList.add("char-visual--enter");
      window.setTimeout(() => {
        el.classList.remove("char-visual--enter");
      }, 400);
    }, EXIT_MS);
  }

  window.Game.Characters = { mount };
})();
