/* ============================================================
   FRAMEWORKS.JS
   Deskripsi tiap framework untuk halaman hasil akhir
   ============================================================ */

window.GameData = window.GameData || {};

window.GameData.frameworks = {
  ITIL: {
    name: "ITIL",
    fullName: "Information Technology Infrastructure Library",
    focus: "Manajemen Layanan TI (IT Service Management)",
    color: "var(--color-itil)",
    description:
      "ITIL membantu organisasi merancang, mengirimkan, dan mengelola layanan TI sehari-hari agar berjalan stabil dan efisien — mulai dari menangani gangguan (incident), mencari akar masalah (problem), sampai mengatur perubahan (change) dengan aman.",
    bestFor:
      "Paling tepat saat masalahnya ada di level operasional layanan TI, seperti sistem yang sering error atau proses dukungan pelanggan yang berantakan.",
  },
  ISO17799: {
    name: "ISO/IEC 17799",
    fullName: "ISO/IEC 17799 (kini bagian dari ISO/IEC 27002)",
    focus: "Keamanan Informasi (Information Security)",
    color: "var(--color-iso)",
    description:
      "ISO/IEC 17799 menyediakan kumpulan praktik terbaik untuk melindungi kerahasiaan, keutuhan, dan ketersediaan informasi — mencakup kebijakan keamanan, kontrol akses, hingga penanganan insiden kebocoran data.",
    bestFor:
      "Paling tepat saat organisasi menghadapi risiko kebocoran data, akses tidak sah, atau ancaman terhadap aset informasi penting.",
  },
  COSO: {
    name: "COSO",
    fullName: "Committee of Sponsoring Organizations of the Treadway Commission",
    focus: "Pengendalian Internal (Internal Control)",
    color: "var(--color-coso)",
    description:
      "COSO menyediakan kerangka pengendalian internal untuk memastikan keandalan pelaporan keuangan, kepatuhan terhadap aturan, dan efisiensi operasional — sekaligus mencegah dan mendeteksi kecurangan.",
    bestFor:
      "Paling tepat saat masalahnya menyangkut kontrol keuangan-operasional, seperti kecurangan, selisih kas, atau pelaporan yang tidak akurat.",
  },
  COBIT: {
    name: "COBIT",
    fullName: "Control Objectives for Information and Related Technologies",
    focus: "Tata Kelola & Manajemen TI Selaras Bisnis",
    color: "var(--color-cobit)",
    description:
      "COBIT adalah kerangka kerja menyeluruh untuk governance dan management TI yang memastikan setiap keputusan dan investasi TI selaras dengan tujuan bisnis — menghubungkan kebutuhan stakeholder, tujuan perusahaan, hingga tujuan TI melalui prinsip Goals Cascade.",
    bestFor:
      "Paling tepat sebagai payung besar ketika organisasi perlu memastikan bahwa TI benar-benar mendukung arah dan strategi bisnis secara keseluruhan — bukan hanya menyelesaikan satu masalah teknis, tapi menyelaraskan semuanya.",
  },
};
