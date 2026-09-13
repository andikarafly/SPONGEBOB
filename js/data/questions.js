/* ============================================================
   QUESTIONS.JS
   Bank soal — 12 soal (3 soal x 4 misi)
   Setiap soal ditandai "framework" = kategori skor yang akan
   bertambah jika dijawab benar (dipakai scoring.js)
   ============================================================ */

window.GameData = window.GameData || {};

window.GameData.questions = {
  itil: [
    {
      id: "itil-1",
      framework: "ITIL",
      prompt:
        "Sistem pemesanan online Krusty Krab sering menghasilkan pesanan ganda, dan tidak ada alur yang jelas dari pesanan masuk sampai makanan siap disajikan. Framework governance TI mana yang paling tepat untuk menata ulang layanan ini?",
      options: ["ITIL", "ISO/IEC 17799", "COSO", "COBIT"],
      correctIndex: 0,
      explanation:
        "ITIL berfokus pada IT Service Management — mengatur siklus hidup layanan TI mulai dari perancangan, transisi, hingga operasional. Masalah seperti pesanan ganda dan alur yang kacau adalah persoalan operasional layanan, sehingga proses ITIL seperti Incident Management dan Problem Management sangat relevan di sini.",
    },
    {
      id: "itil-2",
      framework: "ITIL",
      prompt:
        "Krusty Krab ingin mencari akar penyebab kenapa sistem pemesanan terus-menerus error, bukan hanya menambal gejalanya saja. Proses ITIL apa yang bertugas untuk ini?",
      options: [
        "Incident Management",
        "Problem Management",
        "Change Management",
        "Service Desk",
      ],
      correctIndex: 1,
      explanation:
        "Problem Management dalam ITIL berfokus mencari akar penyebab (root cause) dari insiden yang berulang, berbeda dengan Incident Management yang hanya menangani gangguan secara cepat agar layanan kembali normal.",
    },
    {
      id: "itil-3",
      framework: "ITIL",
      prompt:
        "Saat pelanggan komplain karena pesanannya salah, mereka menghubungi satu titik kontak di Krusty Krab. Dalam ITIL, fungsi ini disebut?",
      options: [
        "Service Desk",
        "Configuration Management Database",
        "Service Catalog",
        "Change Advisory Board",
      ],
      correctIndex: 0,
      explanation:
        "Service Desk adalah titik kontak tunggal (single point of contact) antara pengguna layanan dan penyedia layanan TI, tempat keluhan dan permintaan layanan pertama kali diterima dan dicatat.",
    },
  ],

  iso17799: [
    {
      id: "iso-1",
      framework: "ISO17799",
      prompt:
        "Laptop kasir Krusty Krab yang berisi resep rahasia Krabby Patty dan data pelanggan hilang, dan Plankton dicurigai mengincarnya. Framework mana yang paling relevan untuk mencegah kejadian seperti ini?",
      options: ["ITIL", "ISO/IEC 17799", "COSO", "COBIT"],
      correctIndex: 1,
      explanation:
        "ISO/IEC 17799 (kini menjadi bagian dari ISO/IEC 27002) adalah standar praktik terbaik untuk keamanan informasi — mencakup kebijakan, kontrol akses, dan perlindungan aset informasi seperti data rahasia dan data pelanggan.",
    },
    {
      id: "iso-2",
      framework: "ISO17799",
      prompt:
        "ISO/IEC 17799 menekankan tiga aspek utama keamanan informasi yang dikenal dengan sebutan segitiga CIA, yaitu?",
      options: [
        "Confidentiality, Integrity, Availability",
        "Control, Inspection, Audit",
        "Cost, Investment, Assets",
        "Compliance, Integrity, Accountability",
      ],
      correctIndex: 0,
      explanation:
        "CIA Triad terdiri dari Confidentiality (kerahasiaan), Integrity (keutuhan data), dan Availability (ketersediaan). Resep rahasia yang bocor adalah pelanggaran terhadap aspek Confidentiality.",
    },
    {
      id: "iso-3",
      framework: "ISO17799",
      prompt:
        "Agar kejadian laptop hilang berisi data sensitif tidak berakibat fatal, kontrol keamanan informasi apa yang paling tepat diterapkan lebih dulu?",
      options: [
        "Enkripsi data dan kebijakan akses perangkat",
        "Menaikkan harga menu Krabby Patty",
        "Menambah jam operasional restoran",
        "Melakukan survei kepuasan pelanggan",
      ],
      correctIndex: 0,
      explanation:
        "Enkripsi data dan kebijakan kontrol akses perangkat adalah kontrol keamanan informasi mendasar yang direkomendasikan ISO/IEC 17799, sehingga meskipun perangkat hilang, data di dalamnya tetap terlindungi dari pihak tidak berwenang.",
    },
  ],

  coso: [
    {
      id: "coso-1",
      framework: "COSO",
      prompt:
        "Bagian keuangan Krusty Krab menemukan selisih kas dan ada indikasi kecurangan dalam pencatatan penjualan harian. Framework mana yang paling tepat untuk membenahi hal ini?",
      options: ["ITIL", "ISO/IEC 17799", "COSO", "COBIT"],
      correctIndex: 2,
      explanation:
        "COSO adalah kerangka kerja pengendalian internal yang dirancang untuk mencegah dan mendeteksi kecurangan (fraud) serta memastikan keandalan pelaporan keuangan dan operasional, sehingga sangat sesuai untuk kasus selisih kas ini.",
    },
    {
      id: "coso-2",
      framework: "COSO",
      prompt:
        "COSO Internal Control Framework terdiri dari lima komponen. Komponen yang bertugas memantau apakah pengendalian tetap berjalan efektif dari waktu ke waktu disebut?",
      options: [
        "Control Environment",
        "Risk Assessment",
        "Monitoring Activities",
        "Information & Communication",
      ],
      correctIndex: 2,
      explanation:
        "Monitoring Activities memastikan bahwa kelima komponen pengendalian internal terus berjalan efektif dari waktu ke waktu, termasuk mendeteksi jika ada kontrol yang mulai melemah seperti pada kasus selisih kas ini.",
    },
    {
      id: "coso-3",
      framework: "COSO",
      prompt:
        "Agar orang yang mencatat transaksi penjualan tidak juga menjadi orang yang memegang kas, Krusty Krab menerapkan pemisahan tugas (segregation of duties). Ini adalah contoh komponen COSO yaitu?",
      options: [
        "Control Activities",
        "Control Environment",
        "Risk Assessment",
        "Monitoring Activities",
      ],
      correctIndex: 0,
      explanation:
        "Pemisahan tugas adalah salah satu bentuk Control Activities — kebijakan dan prosedur konkret yang membantu memastikan arahan manajemen dijalankan dan risiko kecurangan atau kesalahan dapat diminimalkan.",
    },
  ],

  cobit: [
    {
      id: "cobit-1",
      framework: "COBIT",
      prompt:
        "Mr. Krabs ingin membuka layanan drive-thru online dan cabang baru, tapi keputusan investasi TI selama ini diambil sepihak tanpa mempertimbangkan strategi bisnis restoran secara keseluruhan. Framework mana yang paling tepat digunakan?",
      options: ["ITIL", "ISO/IEC 17799", "COSO", "COBIT"],
      correctIndex: 3,
      explanation:
        "COBIT dirancang khusus untuk menyelaraskan governance dan management TI dengan kebutuhan dan tujuan bisnis secara menyeluruh, sehingga investasi dan keputusan TI tidak lagi diambil sepihak, melainkan mendukung strategi bisnis Krusty Krab.",
    },
    {
      id: "cobit-2",
      framework: "COBIT",
      prompt:
        "COBIT menekankan bahwa kebutuhan stakeholder harus diterjemahkan menjadi tujuan perusahaan, lalu ke tujuan TI, hingga ke tujuan enabler. Prinsip berjenjang ini disebut?",
      options: [
        "Goals Cascade",
        "Service Catalog",
        "Segregation of Duties",
        "Configuration Baseline",
      ],
      correctIndex: 0,
      explanation:
        "Goals Cascade adalah prinsip inti COBIT yang menerjemahkan kebutuhan stakeholder menjadi tujuan perusahaan, kemudian tujuan TI, sehingga setiap inisiatif TI — termasuk rencana ekspansi Mr. Krabs — tetap selaras dengan tujuan bisnis.",
    },
    {
      id: "cobit-3",
      framework: "COBIT",
      prompt:
        "COBIT membedakan antara 'Governance' yang menjadi tanggung jawab dewan/pemilik bisnis (dalam hal ini Mr. Krabs) dengan 'Management' yang dijalankan oleh?",
      options: [
        "Manajemen eksekutif operasional",
        "Pelanggan restoran",
        "Vendor eksternal",
        "Auditor independen",
      ],
      correctIndex: 0,
      explanation:
        "COBIT memisahkan peran Governance (mengevaluasi, mengarahkan, memantau — dilakukan pemilik/dewan) dari Management (merencanakan, membangun, menjalankan, memantau operasional sehari-hari — dilakukan manajemen eksekutif).",
    },
  ],
};
