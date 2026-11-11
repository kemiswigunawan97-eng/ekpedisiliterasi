/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PGQuestion, PGKQuestion, BenarSalahQuestion, IsianQuestion, UraianQuestion } from '../types/game';

export const WACANA_1 = {
  id: 'wacana1',
  type: 'Teks Berita',
  title: 'Ratusan Pelajar Tanam Seribu Bibit Kopi di Lereng Gunung Anjung',
  paragraphs: [
    {
      num: 1,
      text: 'KUNINGAN – Sebanyak 300 pelajar dari sepuluh sekolah menengah pertama di Kabupaten Kuningan menanam seribu bibit kopi di kebun lereng Gunung Anjung, Sabtu (21/11/2026) pagi. Kegiatan bertajuk Gerakan Sekolah Cinta Kopi itu diselenggarakan oleh Dinas Pertanian bersama kelompok tani setempat untuk memperluas kebun kopi dan menjaga lereng dari longsor.'
    },
    {
      num: 2,
      text: 'Jenis kopi yang ditanam dipilih dengan pertimbangan khusus. Kepala Dinas Pertanian, Rahmawati, menjelaskan bahwa bibit yang dibagikan adalah kopi arabika, robusta, dan liberika. “Kopi ini dipilih karena akarnya mampu menahan tanah dan bijinya dapat dijual warga,” ujarnya. Menurutnya, sebagian lereng sering longsor kecil pada musim hujan karena lahan terbuka semakin luas.'
    },
    {
      num: 3,
      text: 'Para peserta tidak hanya menanam, tetapi juga bertanggung jawab merawat bibit mereka. Setiap pelajar memasang papan nama berisi namanya pada satu bibit. Selama tiga bulan ke depan, petugas akan memantau pertumbuhan bibit setiap dua pekan. Salah satu peserta, Dimas, siswa kelas VIII, mengaku senang bisa ikut menjaga kebun. “Saya ingin kopi ini berbuah lebat saat saya sudah dewasa,” katanya.'
    }
  ]
};

export const WACANA_2 = {
  id: 'wacana2',
  type: 'Iklan',
  title: 'BIBIT KOPI UNGGUL SINAPEUL',
  tagline: 'Sebatang Pohon Kopi, Sejuta Harapan',
  headline: 'TANAM HARI INI, PANEN MANFAAT ESOK HARI!',
  body: 'Ingin sekolah dan rumahmu punya kebun kopi sendiri? Kopi Sinapeul menyediakan bibit kopi arabika dan robusta yang sehat, berakar kuat, dan berumur enam bulan. Setiap bibit sudah dilengkapi pot ramah lingkungan dan panduan menanam yang mudah dipahami.',
  promo: 'Beli 10 bibit, GRATIS 1 bibit! Khusus sekolah, dapatkan diskon 20%. Promo berlaku sampai 31 Desember 2026.',
  contact: 'Jalan Raya Situgede No. 12, Kuningan · WhatsApp 0812-0000-0000'
};

export const POS_INFO = {
  pos1: {
    id: 'pos1',
    title: 'Pos 1: Lereng Gunung Anjung',
    subtitle: 'Analisis Teks Berita & Reboisasi Lereng',
    wacanaName: 'Wacana 1 (Teks Berita)',
    description: 'Jelajahi kebun lereng Gunung Anjung bersama 300 pelajar Kuningan. Terapkan pemahaman struktur teks berita, fakta vs opini, dan aksi peduli lingkungan.',
    targetQuestions: 14
  },
  pos2: {
    id: 'pos2',
    title: 'Pos 2: Kios Kopi Sinapeul',
    subtitle: 'Literasi Iklan & Kritis Konsumen',
    wacanaName: 'Wacana 2 (Iklan Komersial)',
    description: 'Kunjungi kios bibit Sinapeul di Jalan Situgede. Bedah tujuan iklan, strategi kata penarik minat (GRATIS/Diskon), kalimat persuasif, dan sikap kritis.',
    targetQuestions: 14
  },
  pos3: {
    id: 'pos3',
    title: 'Pos 3: Puncak Sinergi',
    subtitle: 'Sintesis & Hubungan Antarwacana',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Padukan kedua wacana untuk memahami hubungan timbal balik antara kampanye penghijauan sekolah dan penawaran bibit unggul.',
    targetQuestions: 2
  },
  bonus: {
    id: 'bonus',
    title: 'Misi Bonus: Aksi Konservasi Uraian',
    subtitle: 'Uraian Kritis & Refleksi Mandiri',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Tuliskan analisis mendalam, ide kepemimpinan OSIS, perbandingan struktur teks, pembuatan iklan layanan masyarakat, dan paragraf deduktif.',
    targetQuestions: 5
  }
};

// POS 1 QUESTIONS (Wacana 1)
export const POS1_QUESTIONS: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 1,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Berdasarkan Wacana 1, berapa jumlah bibit kopi yang ditanam oleh para pelajar?',
    options: [
      { key: 'A', text: '300 bibit' },
      { key: 'B', text: '500 bibit' },
      { key: 'C', text: '1.000 bibit' },
      { key: 'D', text: '10 bibit' }
    ],
    correctKey: 'C',
    explanation: 'Paragraf 1 menyatakan: "...menanam seribu bibit kopi di kebun lereng Gunung Anjung". Jawaban yang tepat adalah 1.000 bibit (C).'
  },
  {
    id: 2,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Unsur kapan pada paragraf pertama Wacana 1 ditunjukkan oleh keterangan ....',
    options: [
      { key: 'A', text: 'Sabtu (21/11/2026) pagi' },
      { key: 'B', text: 'lereng Gunung Anjung' },
      { key: 'C', text: 'sepuluh sekolah menengah pertama' },
      { key: 'D', text: 'Gerakan Sekolah Cinta Kopi' }
    ],
    correctKey: 'A',
    explanation: 'Keterangan waktu pelaksanaan kegiatan tercantum pada kalimat pertama: "Sabtu (21/11/2026) pagi" (A).'
  },
  {
    id: 3,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Topik utama yang dibahas dalam Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Longsor kecil yang sering terjadi di lereng Gunung Anjung.' },
      { key: 'B', text: 'Kegiatan penanaman seribu bibit kopi oleh pelajar di lereng Gunung Anjung.' },
      { key: 'C', text: 'Harga jual biji kopi bagi warga di sekitar Gunung Anjung.' },
      { key: 'D', text: 'Tugas petugas dalam memantau pertumbuhan bibit setiap dua pekan.' }
    ],
    correctKey: 'B',
    explanation: 'Wacana 1 secara menyeluruh memberitakan kegiatan penanaman seribu bibit kopi oleh para pelajar di lereng Gunung Anjung (B).'
  },
  {
    id: 7,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Kalimat utama pada paragraf kedua Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Jenis kopi yang ditanam dipilih dengan pertimbangan khusus.' },
      { key: 'B', text: 'Kepala Dinas Pertanian, Rahmawati, menjelaskan bahwa bibit yang dibagikan adalah kopi arabika, robusta, dan liberika.' },
      { key: 'C', text: '“Kopi ini dipilih karena akarnya mampu menahan tanah dan bijinya dapat dijual warga,” ujarnya.' },
      { key: 'D', text: 'Menurutnya, sebagian lereng sering longsor kecil pada musim hujan karena lahan terbuka semakin luas.' }
    ],
    correctKey: 'A',
    explanation: 'Kalimat pertama paragraf kedua ("Jenis kopi yang ditanam dipilih dengan pertimbangan khusus") merupakan kalimat utama deduktif yang dijelaskan oleh kalimat-kalimat berikutnya.'
  },
  {
    id: 8,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Ide pokok paragraf ketiga Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Peserta bertanggung jawab merawat bibit yang mereka tanam.' },
      { key: 'B', text: 'Petugas memantau pertumbuhan bibit setiap dua pekan.' },
      { key: 'C', text: 'Dimas senang bisa ikut menjaga kebun.' },
      { key: 'D', text: 'Papan nama dipasang pada setiap bibit kopi.' }
    ],
    correctKey: 'A',
    explanation: 'Paragraf ketiga berpusat pada gagasan bahwa peserta tidak hanya menanam, melainkan juga bertanggung jawab memelihara bibitnya (A).'
  },
  {
    id: 10,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Unsur-unsur berita yang terdapat pada paragraf pertama Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Apa: penanaman seribu bibit kopi' },
      { key: 'B', text: 'Di mana: lereng Gunung Anjung' },
      { key: 'C', text: 'Mengapa: untuk memperluas kebun kopi dan menjaga lereng dari longsor' },
      { key: 'D', text: 'Kapan: Minggu (22/11/2026) siang' }
    ],
    correctKeys: ['A', 'B', 'C'],
    explanation: 'Keterangan kapan pada teks adalah Sabtu (21/11/2026) pagi, bukan Minggu siang. Maka yang benar adalah A, B, dan C.'
  },
  {
    id: 11,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Manakah pernyataan yang merupakan fakta berdasarkan Wacana 1?',
    options: [
      { key: 'A', text: 'Sebanyak 300 pelajar dari sepuluh SMP ikut menanam bibit kopi' },
      { key: 'B', text: 'Kegiatan itu adalah kegiatan pertanian terbaik di Indonesia' },
      { key: 'C', text: 'Bibit yang dibagikan terdiri atas kopi arabika, robusta, dan liberika' },
      { key: 'D', text: 'Semua longsor di Kuningan pasti berhenti setelah penanaman' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'A dan C adalah fakta nyata yang tertulis di teks. Opsi B dan D merupakan opini atau klaim berlebihan yang tidak tercantum dalam wacana.'
  },
  {
    id: 12,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Ciri kebahasaan teks berita yang terdapat pada Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Menggunakan kalimat langsung yang diapit tanda petik' },
      { key: 'B', text: 'Menggunakan kata ganti “aku” sebagai sudut pandang utama' },
      { key: 'C', text: 'Menggunakan kata penghubung sebab, seperti karena' },
      { key: 'D', text: 'Menggunakan slogan yang bersajak untuk menarik pembeli' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Teks berita menggunakan kutipan langsung berpetik dari Rahmawati dan Dimas (A) serta konjungsi kausalitas "karena" (C).'
  },
  {
    id: 16,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Tindakan nyata yang sejalan dengan pesan dalam Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Merawat tanaman kopi yang sudah ditanam secara rutin' },
      { key: 'B', text: 'Menebang pohon muda di lereng untuk kayu bakar' },
      { key: 'C', text: 'Membakar tumpukan daun kering di dalam kebun' },
      { key: 'D', text: 'Menanam pohon di halaman sekolah' }
    ],
    correctKeys: ['A', 'D'],
    explanation: 'Pesan Wacana 1 adalah penghijauan dan konservasi tanah lereng. Tindakan yang sejalan adalah merawat tanaman (A) dan menanam pohon (D).'
  },
  {
    id: 20,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Gerakan Sekolah Cinta Kopi diselenggarakan oleh Dinas Pertanian bersama kelompok tani setempat.',
    correctAnswer: true,
    explanation: 'Benar. Paragraf 1 secara eksplisit menuliskan bahwa kegiatan diselenggarakan oleh Dinas Pertanian bersama kelompok tani setempat.'
  },
  {
    id: 21,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Paragraf pertama Wacana 1 merupakan teras berita yang memuat informasi pokok peristiwa, yaitu apa, siapa, kapan, dan di mana.',
    correctAnswer: true,
    explanation: 'Benar. Paragraf pertama berfungsi sebagai lead (teras berita) yang merangkum apa (penanaman seribu bibit kopi), siapa (300 pelajar SMP), kapan (Sabtu pagi), dan di mana (lereng Gunung Anjung).'
  },
  {
    id: 22,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Ide pokok paragraf kedua Wacana 1 adalah pemantauan pertumbuhan bibit oleh petugas selama tiga bulan.',
    correctAnswer: false,
    explanation: 'Salah. Ide pokok paragraf kedua adalah pertimbangan pemilihan jenis kopi (arabika, robusta, liberika). Pemantauan bibit dibahas di paragraf ketiga.'
  },
  {
    id: 26,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Gerakan Sekolah Cinta Kopi diikuti oleh .... pelajar dari sepuluh sekolah menengah pertama.',
    acceptedAnswers: ['300', 'tiga ratus'],
    explanation: 'Berdasarkan teks: "Sebanyak 300 pelajar dari sepuluh sekolah menengah pertama di Kabupaten Kuningan..."'
  },
  {
    id: 27,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Menurut Kepala Dinas Pertanian, akar kopi yang kuat berfungsi menahan ....',
    acceptedAnswers: ['tanah'],
    explanation: 'Berdasarkan ucapan Rahmawati: "Kopi ini dipilih karena akarnya mampu menahan tanah..."'
  }
];

// POS 2 QUESTIONS (Wacana 2)
export const POS2_QUESTIONS: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 4,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Tujuan utama Wacana 2 dibuat adalah ....',
    options: [
      { key: 'A', text: 'menginformasikan sekaligus membujuk pembaca agar membeli bibit kopi' },
      { key: 'B', text: 'memberitakan kegiatan penanaman bibit kopi yang baru saja terjadi' },
      { key: 'C', text: 'menceritakan pengalaman pribadi dalam merawat tanaman' },
      { key: 'D', text: 'memberi petunjuk langkah demi langkah cara menanam kopi' }
    ],
    correctKey: 'A',
    explanation: 'Wacana 2 adalah iklan komersial yang bertujuan memberikan informasi sekaligus membujuk konsumen membeli bibit kopi Sinapeul (A).'
  },
  {
    id: 5,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Kata GRATIS pada Wacana 2 ditulis dengan huruf kapital untuk ....',
    options: [
      { key: 'A', text: 'menunjukkan nama merek bibit' },
      { key: 'B', text: 'menarik perhatian pembaca pada keuntungan yang ditawarkan' },
      { key: 'C', text: 'menandai nama orang yang dituju' },
      { key: 'D', text: 'mengakhiri kalimat sebelumnya' }
    ],
    correctKey: 'B',
    explanation: 'Huruf kapital pada kata penawaran promo digunakan dalam iklan sebagai teknik tipografi persuasif untuk memikat perhatian konsumen (B).'
  },
  {
    id: 6,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Berdasarkan Wacana 2, keuntungan khusus yang diperoleh pihak sekolah adalah ....',
    options: [
      { key: 'A', text: 'potongan harga sebesar 20%' },
      { key: 'B', text: 'gratis sepuluh bibit kopi' },
      { key: 'C', text: 'gratis ongkos kirim ke sekolah' },
      { key: 'D', text: 'tambahan satu bibit di setiap pembelian' }
    ],
    correctKey: 'A',
    explanation: 'Teks menyatakan secara gamblang: "Khusus sekolah, dapatkan diskon 20%" (A).'
  },
  {
    id: 13,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Ciri iklan yang terdapat pada Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Menggunakan kalimat yang bersifat membujuk' },
      { key: 'B', text: 'Menggunakan ungkapan menarik, seperti “sejuta harapan”' },
      { key: 'C', text: 'Disusun kronologis dengan unsur apa, siapa, kapan, dan di mana' },
      { key: 'D', text: 'Menyajikan informasi secara netral tanpa ajakan apa pun' }
    ],
    correctKeys: ['A', 'B'],
    explanation: 'Iklan menggunakan gaya persuasif (A) dan slogan/metafora menarik seperti "sejuta harapan" (B).'
  },
  {
    id: 14,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Manakah kalimat persuasif (membujuk) pada Wacana 2?',
    options: [
      { key: 'A', text: '“Tanam hari ini, panen manfaat esok hari!”' },
      { key: 'B', text: '“Setiap bibit sudah dilengkapi pot ramah lingkungan dan panduan menanam.”' },
      { key: 'C', text: '“Beli 10 bibit, GRATIS 1 bibit!”' },
      { key: 'D', text: '“Promo berlaku sampai 31 Desember 2026.”' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Kalimat A (slogan ajakan berpantun) dan C (ajakan membeli dengan iming-iming bonus) adalah kalimat persuasif.'
  },
  {
    id: 15,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Informasi yang dapat disimpulkan dari Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Bibit yang dijual sudah berumur enam bulan dan berakar kuat' },
      { key: 'B', text: 'Bibit hanya dijual untuk pembeli perorangan' },
      { key: 'C', text: 'Promo berlaku tanpa batas waktu' },
      { key: 'D', text: 'Pemesanan dapat dilakukan melalui WhatsApp' }
    ],
    correctKeys: ['A', 'D'],
    explanation: 'Bibit berumur 6 bulan dan berakar kuat (A), serta pemesanan dapat dilakukan via WhatsApp 0812-0000-0000 (D).'
  },
  {
    id: 17,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Agar tidak tertipu oleh iklan seperti Wacana 2, pembaca sebaiknya ....',
    options: [
      { key: 'A', text: 'langsung membeli karena ada kata GRATIS' },
      { key: 'B', text: 'memeriksa kebenaran informasi, harga, dan syarat promo' },
      { key: 'C', text: 'mengabaikan syarat dan ketentuan yang berlaku' },
      { key: 'D', text: 'membandingkan penawaran dengan penjual lain' }
    ],
    correctKeys: ['B', 'D'],
    explanation: 'Konsumen cerdas harus memverifikasi syarat promo (B) dan membandingkan harga/mutu dengan penjual lain (D).'
  },
  {
    id: 19,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Bagian-bagian iklan yang dapat ditemukan pada Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Judul pemikat: “Tanam hari ini, panen manfaat esok hari!”' },
      { key: 'B', text: 'Isi yang memuat keunggulan produk dan tawaran promo' },
      { key: 'C', text: 'Ekor berita yang memuat komentar narasumber' },
      { key: 'D', text: 'Identitas penjual berupa alamat dan nomor kontak' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Struktur iklan pada teks memuat headline pemikat (A), tubuh iklan/keunggulan (B), dan identitas penjual/kontak (D). Ekor berita (C) adalah struktur berita, bukan iklan.'
  },
  {
    id: 23,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Wacana 2 bertujuan menyampaikan peristiwa secara netral tanpa maksud menjual produk.',
    correctAnswer: false,
    explanation: 'Salah. Wacana 2 adalah iklan komersial yang sengaja dibuat untuk mempromosikan dan menjual bibit kopi.'
  },
  {
    id: 24,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Kalimat “Beli 10 bibit, GRATIS 1 bibit!” pada Wacana 2 merupakan contoh kalimat persuasif.',
    correctAnswer: true,
    explanation: 'Benar. Kalimat tersebut merangsang dan mengajak calon pembeli untuk melakukan transaksi dengan imbalan bibit gratis.'
  },
  {
    id: 25,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Bahasa iklan umumnya singkat, menarik, dan bersifat membujuk pembaca.',
    correctAnswer: true,
    explanation: 'Benar. Bahasa iklan bercirikan ringkas, memikat, sugestif, dan persuasif.'
  },
  {
    id: 28,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Bagian iklan yang memuat alamat dan nomor yang dapat dihubungi pembeli disebut ....',
    acceptedAnswers: ['kontak', 'identitas', 'identitas penjual', 'penutup'],
    explanation: 'Bagian akhir iklan yang memuat alamat toko dan nomor WhatsApp dinamakan kontak / identitas penjual.'
  },
  {
    id: 29,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Kalimat yang bertujuan mengajak atau membujuk pembaca, seperti “Beli 10 bibit, GRATIS 1 bibit!”, disebut kalimat ....',
    acceptedAnswers: ['persuasif', 'bujukan', 'ajakan'],
    explanation: 'Kalimat ajakan dalam bahasa Indonesia dan kaidah teks iklan disebut kalimat persuasif.'
  },
  {
    id: 30,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Diskon yang diberikan khusus untuk sekolah pada Wacana 2 sebesar .... persen.',
    acceptedAnswers: ['20', '20%'],
    explanation: 'Berdasarkan iklan: "Khusus sekolah, dapatkan diskon 20%."'
  }
];

// POS 3 QUESTIONS (Wacana 1 & Wacana 2)
export const POS3_QUESTIONS: (PGQuestion | PGKQuestion)[] = [
  {
    id: 9,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pg',
    points: 1,
    question: 'Manakah hubungan yang tepat antara isi Wacana 1 dan Wacana 2?',
    options: [
      { key: 'A', text: 'Keduanya berbentuk berita yang melaporkan peristiwa penting.' },
      { key: 'B', text: 'Wacana 1 melaporkan kegiatan penanaman bibit kopi, sedangkan Wacana 2 menawarkan bibit yang dapat mendukung kegiatan serupa.' },
      { key: 'C', text: 'Wacana 2 membantah informasi tentang jenis kopi pada Wacana 1.' },
      { key: 'D', text: 'Keduanya menjelaskan cara menanam bibit di lereng gunung.' }
    ],
    correctKey: 'B',
    explanation: 'Wacana 1 merupakan laporan berita penanaman seribu bibit kopi di Gunung Anjung, sedangkan Wacana 2 adalah iklan penawaran bibit tanaman kopi yang relevan untuk kegiatan penghijauan tersebut (B).'
  },
  {
    id: 18,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pgk',
    points: 2,
    question: 'Persamaan gagasan antara Wacana 1 dan Wacana 2 terletak pada ....',
    options: [
      { key: 'A', text: 'upaya menghijaukan lereng gunung dengan menanam kopi' },
      { key: 'B', text: 'tujuan utama untuk menjual produk kepada pembaca' },
      { key: 'C', text: 'pesan bahwa menanam kopi bermanfaat bagi manusia dan lingkungan' },
      { key: 'D', text: 'penggunaan kalimat langsung dari seorang narasumber' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Kedua wacana berfokus pada manfaat budidaya kopi untuk kelestarian alam/lereng dan manfaat ekonomis/manfaat nyata bagi manusia (A dan C).'
  }
];

// BONUS ESSAY QUESTIONS (Soal 31 - 35)
export const BONUS_QUESTIONS: UraianQuestion[] = [
  {
    id: 31,
    pos: 'bonus',
    wacanaRef: 'wacana1',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Tentukan topik berita pada Wacana 1, kemudian tuliskan ide pokok dari setiap paragraf (paragraf 1, 2, dan 3)!',
    prompt: 'Tentukan topik berita pada Wacana 1, kemudian tuliskan ide pokok dari setiap paragraf (paragraf 1, 2, dan 3)!',
    sampleAnswer: 'Topik: kegiatan penanaman seribu bibit kopi oleh pelajar di lereng Gunung Anjung.\n• Ide pokok paragraf 1: pelaksanaan penanaman seribu bibit kopi oleh 300 pelajar untuk memperluas kebun dan menjaga lereng.\n• Paragraf 2: pertimbangan pemilihan jenis kopi yang ditanam.\n• Paragraf 3: tanggung jawab peserta merawat bibit yang mereka tanam.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Topik dan ketiga ide pokok benar.\n• 2 poin = Topik dan dua ide pokok benar, atau tiga ide pokok tanpa topik.\n• 1 poin = Hanya topik atau satu ide pokok benar.\n• 0 poin = Tidak sesuai / tidak menjawab.'
  },
  {
    id: 32,
    pos: 'bonus',
    wacanaRef: 'wacana1',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Jika kamu ditunjuk sebagai ketua OSIS, tuliskan 2 ide kegiatan lanjutan (selain menanam) agar bibit kopi yang sudah ditanam tetap terawat, beserta alasannya!',
    prompt: 'Jika kamu ditunjuk sebagai ketua OSIS, tuliskan 2 ide kegiatan lanjutan (selain menanam) agar bibit kopi yang sudah ditanam tetap terawat, beserta alasannya!',
    sampleAnswer: '(1) Membuat jadwal piket penyiraman dan pemantauan bibit oleh tiap kelas, karena bibit yang tidak disiram dan dipantau mudah mati.\n(2) Mengadakan lomba kelas dengan bibit paling sehat setiap bulan, karena persaingan sehat membuat siswa lebih rajin merawat bibitnya.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Dua ide logis, relevan, disertai alasan.\n• 2 poin = Dua ide tanpa alasan atau satu ide dengan alasan.\n• 1 poin = Satu ide singkat tanpa alasan.\n• 0 poin = Tidak relevan.'
  },
  {
    id: 33,
    pos: 'bonus',
    wacanaRef: 'keduanya',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Jelaskan 2 perbedaan antara teks berita (Wacana 1) dan iklan (Wacana 2) ditinjau dari tujuan dan bahasanya, disertai contoh dari wacana!',
    prompt: 'Jelaskan 2 perbedaan antara teks berita (Wacana 1) dan iklan (Wacana 2) ditinjau dari tujuan dan bahasanya, disertai contoh dari wacana!',
    sampleAnswer: '• Tujuan: berita menyampaikan informasi peristiwa secara faktual dan objektif (Wacana 1 melaporkan penanaman seribu bibit kopi), sedangkan iklan membujuk pembaca membeli (Wacana 2 menawarkan bibit).\n• Bahasa: berita lugas, baku, dan memuat kutipan narasumber (“Kopi ini dipilih karena akarnya mampu menahan tanah…”), sedangkan iklan singkat, menarik, persuasif, dengan huruf kapital dan tanda seru (“Beli 10 bibit, GRATIS 1 bibit!”).',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Dua perbedaan (tujuan dan bahasa) benar disertai contoh konkret dari teks.\n• 2 poin = Dua perbedaan benar tanpa contoh kutipan teks.\n• 1 poin = Satu perbedaan benar.\n• 0 poin = Tidak sesuai / keliru.'
  },
  {
    id: 34,
    pos: 'bonus',
    wacanaRef: 'wacana2',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Buatlah iklan layanan masyarakat singkat (3–4 kalimat) yang mengajak teman-temanmu gemar membaca di perpustakaan sekolah! Iklan harus memuat 1 slogan yang menarik dan 1 kalimat persuasif.',
    prompt: 'Buatlah iklan layanan masyarakat singkat (3–4 kalimat) yang mengajak teman-temanmu gemar membaca di perpustakaan sekolah! Iklan harus memuat 1 slogan yang menarik dan 1 kalimat persuasif.',
    sampleAnswer: 'Buka Buku, Buka Dunia!\nPerpustakaan sekolah menyediakan ratusan buku cerita dan pengetahuan yang seru. Ayo, luangkan 15 menit setiap hari untuk membaca di perpustakaan! Perpustakaan SMPN Satu Atap Situgede, buka pukul 07.00–14.00 WIB.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Ada slogan yang menarik.\n• 1 poin = Ada kalimat persuasif/ajakan.\n• 1 poin = Isi sesuai tema gemar membaca dan terdiri atas 3–4 kalimat.'
  },
  {
    id: 35,
    pos: 'bonus',
    wacanaRef: 'keduanya',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Berdasarkan Wacana 1 dan Wacana 2, buatlah 1 paragraf deduktif (3–4 kalimat) bertopik manfaat menanam kopi di lereng gunung! Letakkan kalimat utama di awal paragraf dan gunakan informasi dari kedua wacana sebagai kalimat penjelas.',
    prompt: 'Berdasarkan Wacana 1 dan Wacana 2, buatlah 1 paragraf deduktif (3–4 kalimat) bertopik manfaat menanam kopi di lereng gunung! Letakkan kalimat utama di awal paragraf dan gunakan informasi dari kedua wacana sebagai kalimat penjelas.',
    sampleAnswer: 'Menanam kopi di lereng gunung memberi banyak manfaat. Akar tanaman kopi membantu menahan tanah sehingga lereng tidak mudah longsor, seperti pada kegiatan pelajar di lereng Gunung Anjung. Selain itu, biji kopinya dapat dijual warga, dan bibitnya mudah didapat dari penjual bibit yang menawarkan promo. Karena itu, kita perlu mulai menanam dan merawat kopi dari sekarang.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Kalimat utama berada di awal paragraf (deduktif).\n• 1 poin = Terdapat 2–3 kalimat penjelas relevan (total 3–4 kalimat).\n• 1 poin = Memadukan informasi dari kedua wacana (pencegahan longsor & bibit berkualitas).'
  }
];

export const ALL_QUESTIONS = [...POS1_QUESTIONS, ...POS2_QUESTIONS, ...POS3_QUESTIONS];
