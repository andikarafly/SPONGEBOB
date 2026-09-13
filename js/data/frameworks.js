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
    strengths: [
      "Praktik best practice yang matang dan teruji untuk operasional layanan TI sehari-hari",
      "Proses (incident, problem, change management) terstruktur jelas dan mudah diadopsi bertahap",
      "Berfokus pada pengalaman pengguna/pelanggan layanan TI",
    ],
    weaknesses: [
      "Kurang menyentuh sisi strategis dan penyelarasan TI dengan tujuan bisnis secara menyeluruh",
      "Tidak dirancang khusus untuk isu keamanan informasi atau pengendalian internal-keuangan",
      "Implementasi penuh butuh perubahan budaya kerja, bukan hanya prosedur",
    ],
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
    strengths: [
      "Cakupan kontrol keamanan informasi yang luas dan rinci (kebijakan, akses, fisik, hingga insiden)",
      "Diakui secara internasional dan menjadi dasar sertifikasi keamanan informasi",
      "Fleksibel diterapkan untuk berbagai jenis dan ukuran organisasi",
    ],
    weaknesses: [
      "Fokusnya sempit pada keamanan informasi, tidak mencakup tata kelola TI atau kontrol keuangan secara umum",
      "Sifatnya berupa kumpulan kontrol/praktik, bukan kerangka manajemen operasional layanan TI",
      "Butuh kombinasi dengan framework lain untuk gambaran governance TI yang utuh",
    ],
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
    strengths: [
      "Kerangka pengendalian internal yang matang dan jadi acuan baku laporan keuangan & kepatuhan",
      "Membantu mencegah sekaligus mendeteksi kecurangan melalui lima komponen kontrolnya",
      "Berlaku luas lintas industri, tidak terbatas pada organisasi berbasis TI",
    ],
    weaknesses: [
      "Tidak dirancang khusus untuk mengatur teknologi informasi atau keamanan siber",
      "Sifatnya lebih pada prinsip umum, sehingga butuh penjabaran lebih detail saat diterapkan",
      "Kurang membahas penyelarasan strategi TI dengan tujuan bisnis secara spesifik",
    ],
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
    strengths: [
      "Komprehensif — menghubungkan kebutuhan stakeholder, tujuan bisnis, hingga tujuan TI dalam satu kerangka besar",
      "Cocok jadi payung governance yang mengintegrasikan framework lain (ITIL, ISO, COSO) di bawahnya",
      "Menekankan akuntabilitas dan pengukuran kinerja TI yang jelas",
    ],
    weaknesses: [
      "Cakupannya luas dan konseptual sehingga bisa terasa kompleks/berat untuk diimplementasikan, terutama bagi organisasi kecil",
      "Butuh sumber daya, waktu, dan komitmen manajemen puncak yang cukup besar untuk adopsi penuh",
      "Kurang memberi panduan teknis operasional sedetail ITIL untuk penanganan masalah layanan TI sehari-hari",
    ],
  },
};
