/* ============================================================
   SCORING.JS
   Menghitung skor per framework & menentukan narasi rekomendasi
   akhir. Sesuai konsep game: COBIT selalu ditampilkan sebagai
   rekomendasi utama (karena game ini berfokus pada penyelarasan
   IT governance dengan kebutuhan bisnis secara menyeluruh),
   namun framework lain tetap dijelaskan sebagai valid untuk
   konteksnya masing-masing.
   ============================================================ */

window.Game = window.Game || {};

(function () {
  const MAIN_RECOMMENDATION = "COBIT";

  function getMaxScorePerFramework() {
    return 3; // 3 soal per framework
  }

  function getScoreSummary() {
    const { scores } = window.Game.State.get();
    const max = getMaxScorePerFramework();
    return Object.keys(scores).map((key) => ({
      key,
      score: scores[key],
      max,
      percent: Math.round((scores[key] / max) * 100),
    }));
  }

  function getTopScoringFramework() {
    const summary = getScoreSummary();
    return summary.reduce((best, cur) =>
      cur.score > best.score ? cur : best
    );
  }

  function buildRecommendationText() {
    const summary = getScoreSummary();
    const cobit = summary.find((s) => s.key === "COBIT");
    const top = getTopScoringFramework();
    const { totalCorrect, totalQuestions } = window.Game.State.get();

    let confirmationLine;
    if (top.key === "COBIT") {
      confirmationLine =
        "Skor kamu di COBIT juga menjadi yang tertinggi — makin memantapkan kesimpulan ini!";
    } else {
      confirmationLine =
        "Walau skor tertinggimu ada di framework lain, kesimpulan konsultasi ini tetap mengarah ke COBIT, karena seluruh rangkaian kasus Krusty Krab — dari layanan, keamanan, sampai kontrol keuangan — pada akhirnya adalah soal bagaimana keputusan TI diselaraskan dengan tujuan bisnis Mr. Krabs secara menyeluruh.";
    }

    return {
      main: MAIN_RECOMMENDATION,
      headline: "Rekomendasi Utama: COBIT",
      body: `Dari total ${totalCorrect} dari ${totalQuestions} jawaban benar, kamu sudah membantu Krusty Krab mengenali framework yang tepat untuk tiap masalah spesifik: ITIL untuk layanan, ISO/IEC 17799 untuk keamanan informasi, dan COSO untuk pengendalian internal. Namun sebagai konsultan IT Governance, kesimpulan besarnya adalah COBIT — karena COBIT menjadi payung yang menghubungkan semua aspek itu agar TI benar-benar selaras dengan arah bisnis Krusty Krab secara keseluruhan. ${confirmationLine}`,
      note:
        "Ini bukan berarti ITIL, ISO/IEC 17799, dan COSO 'kalah' — ketiganya tetap menjadi framework yang tepat dan penting untuk masalah spesifiknya masing-masing. COBIT direkomendasikan di sini karena skenario dominan dalam game ini adalah soal penyelarasan governance TI dengan kebutuhan bisnis.",
    };
  }

  window.Game.Scoring = {
    getScoreSummary,
    getTopScoringFramework,
    buildRecommendationText,
    MAIN_RECOMMENDATION,
  };
})();
