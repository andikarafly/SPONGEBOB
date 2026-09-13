/* ============================================================
   MATCHING.JS
   Data pasangan untuk mode klik-untuk-pasangkan
   Setiap pair punya id yang sama di sisi kiri (framework)
   dan sisi kanan (fokus utama / istilah kunci)
   ============================================================ */

window.GameData = window.GameData || {};

window.GameData.matchingPairs = [
  {
    id: "itil",
    left: "ITIL",
    right: "Manajemen Layanan TI (IT Service Management)",
  },
  {
    id: "iso17799",
    left: "ISO/IEC 17799",
    right: "Keamanan Informasi (Information Security)",
  },
  {
    id: "coso",
    left: "COSO",
    right: "Pengendalian Internal (Internal Control)",
  },
  {
    id: "cobit",
    left: "COBIT",
    right: "Tata Kelola TI Selaras Bisnis (Business-aligned Governance)",
  },
];
