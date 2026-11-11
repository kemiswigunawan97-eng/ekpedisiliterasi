/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PGQuestion, PGKQuestion, BenarSalahQuestion, IsianQuestion, UraianQuestion } from '../types/game';

export const WACANA_1_KELAS7 = {
  id: 'wacana1',
  type: 'Teks Deskripsi (Non-Sastra)',
  title: 'Keindahan Alam dan Kesejukan Curug Landung Kuningan',
  paragraphs: [
    {
      num: 1,
      text: 'Curug Landung merupakan salah satu destinasi wisata alam terpopuler yang terletak di Desa Palutungan, Kecamatan Cigugur, Kabupaten Kuningan. Berada tepat di kaki Gunung Ciremai, objek wisata ini menawarkan pemandangan alam yang asri serta udara pegunungan yang sangat sejuk.'
    },
    {
      num: 2,
      text: 'Air terjun Curug Landung memiliki ketinggian sekitar 30 meter. Hempasan airnya meluncur deras menerpa bebatuan hitam di bagian dasar kolam. Di sekeliling curug, dinding tebing batu ditumbuhi lumut hijau yang subur serta pepohonan rindang. Percikan air yang terbawa angin menciptakan sensasi dingin dan menyegarkan bagi para pengunjung yang berdiri di sekitarnya.'
    },
    {
      num: 3,
      text: 'Selain menikmati pemandangan alam, pengunjung dapat memanfaatkan area foto buatan yang tertata rapi tanpa merusak keaslian lingkungan. Namun, seiring meningkatnya jumlah wisatawan di akhir pekan, pengelola menghadapi kendala terkait kesadaran pengunjung dalam membuang sampah. Timbulan sampah plastik bungkus makanan sering kali berserakan di sekitar bangku peristirahatan, sehingga berpotensi merusak keindahan dan kebersihan kawasan wisata alam ini.'
    }
  ]
};

export const WACANA_2_KELAS7 = {
  id: 'wacana2',
  type: 'Pantun (Sastra)',
  title: 'Pantun Nasihat',
  baits: [
    {
      num: 1,
      lines: [
        'Ke toko buku membeli kain,',
        'Kain sutra indah dipandang.',
        'Jangan suka menyakiti orang lain,',
        'Agar hidupmu selamanya tenang.'
      ]
    },
    {
      num: 2,
      lines: [
        'Pagi hari memetik selasih,',
        'Bunga diikat bunga melati.',
        'Jika lingkungan bersih dan asri,',
        'Badan sehat tenanglah hati.'
      ]
    },
    {
      num: 3,
      lines: [
        'Tinggi menjulang Gunung Ciremai,',
        'Tampak indah berhias awan.',
        'Mari bersikap santun dan damai,',
        'Pasti dicintai semua teman.'
      ]
    }
  ]
};

export const POS_INFO_KELAS7 = {
  pos1: {
    id: 'pos1',
    title: 'Pos 1: Lembah Curug Landung',
    subtitle: 'Teks Deskripsi & Observasi Keaslian Alam',
    wacanaName: 'Wacana 1 (Teks Deskripsi)',
    description: 'Jelajahi keasrian Curug Landung Palutungan di kaki Gunung Ciremai. Amati ketinggian 30 meter, tebing lumut hijau, dan kesadaran lingkungan.',
    targetQuestions: 14
  },
  pos2: {
    id: 'pos2',
    title: 'Pos 2: Saung Pantun Nasihat',
    subtitle: 'Sastra Tradisional & Nilai Karakter',
    wacanaName: 'Wacana 2 (Pantun Nasihat)',
    description: 'Pelajari struktur sampiran dan isi, pola rima akhir a-b-a-b, pesan moral santun dan damai, serta nasihat lingkungan asri.',
    targetQuestions: 14
  },
  pos3: {
    id: 'pos3',
    title: 'Pos 3: Puncak Harmoni',
    subtitle: 'Sintesis Deskripsi & Makna Pantun',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Hubungkan pesan menjaga kebersihan Curug Landung dengan nasihat pantun kesehatan dan keasrian lingkungan.',
    targetQuestions: 2
  },
  bonus: {
    id: 'bonus',
    title: 'Misi Bonus: Uraian & Kreasi Sastra',
    subtitle: 'Karya Deskripsi & Menulis Pantun Mandiri',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Uraikan struktur teks deskripsi, tulis ide kampanye anti-sampah, jelaskan fungsi sampiran vs isi, ciptakan pantun orisinal, dan buat paragraf deskripsi.',
    targetQuestions: 5
  }
};

// POS 1 KELAS 7 (Wacana 1)
export const POS1_QUESTIONS_KELAS7: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 1,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Berdasarkan Wacana 1, berapa ketinggian air terjun Curug Landung?',
    options: [
      { key: 'A', text: '15 meter' },
      { key: 'B', text: '25 meter' },
      { key: 'C', text: '30 meter' },
      { key: 'D', text: '50 meter' }
    ],
    correctKey: 'C',
    explanation: 'Paragraf 2 menyatakan: "Air terjun Curug Landung memiliki ketinggian sekitar 30 meter."'
  },
  {
    id: 2,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Curug Landung berlokasi di Desa Palutungan, Kecamatan ....',
    options: [
      { key: 'A', text: 'Cigugur' },
      { key: 'B', text: 'Darma' },
      { key: 'C', text: 'Cilimus' },
      { key: 'D', text: 'Kadugede' }
    ],
    correctKey: 'A',
    explanation: 'Paragraf 1 menyatakan: "...terletak di Desa Palutungan, Kecamatan Cigugur, Kabupaten Kuningan."'
  },
  {
    id: 3,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Apa yang menyebabkan udara di sekitar Curug Landung terasa sangat sejuk dan segar?',
    options: [
      { key: 'A', text: 'Adanya tempat sampah yang cukup di sekitar bangku.' },
      { key: 'B', text: 'Letaknya di kaki Gunung Ciremai serta dikelilingi pepohonan rindang.' },
      { key: 'C', text: 'Banyaknya spot foto buatan di sekitar kolam.' },
      { key: 'D', text: 'Hembusan angin kencang dari pemukiman warga Desa Palutungan.' }
    ],
    correctKey: 'B',
    explanation: 'Wacana 1 paragraf 1 dan 2 menjelaskan letaknya di kaki Gunung Ciremai serta dikelilingi pepohonan rindang dan percikan air yang sejuk.'
  },
  {
    id: 7,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Paragraf kedua pada Wacana 1 menggunakan cerapan pancaindra ....',
    options: [
      { key: 'A', text: 'Penglihatan dan pendengaran' },
      { key: 'B', text: 'Penglihatan dan perabaan/perasaan' },
      { key: 'C', text: 'Penciuman dan pengecapan' },
      { key: 'D', text: 'Pendengaran dan penciuman' }
    ],
    correctKey: 'B',
    explanation: 'Paragraf 2 menyajikan cerapan visual (bebatuan hitam, lumut hijau) dan perabaan/suhu (sensasi dingin dan menyegarkan).'
  },
  {
    id: 8,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Masalah utama yang dihadapi pengelola Curug Landung seiring meningkatnya pengunjung adalah ....',
    options: [
      { key: 'A', text: 'Tebing batu yang mulai runtuh karena lumut.' },
      { key: 'B', text: 'Air terjun yang mengering di musim kemarau.' },
      { key: 'C', text: 'Rendahnya kesadaran pengunjung dalam menjaga kebersihan sampah plastik.' },
      { key: 'D', text: 'Hilangnya spot foto buatan akibat terendam air.' }
    ],
    correctKey: 'C',
    explanation: 'Paragraf 3 menyatakan: "...pengelola menghadapi kendala terkait kesadaran pengunjung dalam membuang sampah. Timbulan sampah plastik bungkus makanan sering kali berserakan..."'
  },
  {
    id: 10,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Manakah rincian fisik yang menggambarkan keindahan Curug Landung dalam Wacana 1?',
    options: [
      { key: 'A', text: 'Tebing batu ditumbuhi lumut hijau' },
      { key: 'B', text: 'Dikelilingi pepohonan yang rindang' },
      { key: 'C', text: 'Bangunan gedung bertingkat di pinggir kolam' },
      { key: 'D', text: 'Ketinggian air terjun mencapai 30 meter' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Wacana menyebutkan tebing lumut hijau (A), pepohonan rindang (B), dan ketinggian 30 meter (D). Tidak ada gedung bertingkat.'
  },
  {
    id: 11,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Manakah pemicu utama yang dapat merusak lingkungan wisata Curug Landung berdasarkan teks?',
    options: [
      { key: 'A', text: 'Wisatawan membuang bungkus plastik sembarangan' },
      { key: 'B', text: 'Keberadaan lumut hijau di dinding tebing' },
      { key: 'C', text: 'Kurangnya kesadaran pengunjung di akhir pekan' },
      { key: 'D', text: 'Hawa sejuk dari kaki Gunung Ciremai' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Pemicu kerusakan lingkungan adalah timbulan sampah plastik sembarangan (A) akibat rendahnya kesadaran pengunjung di akhir pekan (C).'
  },
  {
    id: 12,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Ciri-ciri kata konkret dan kata sifat yang terdapat dalam Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Bebatuan hitam dan tebing batu (kata konkret)' },
      { key: 'B', text: 'Sejuk, dingin, dan rimbun (kata sifat)' },
      { key: 'C', text: 'Menyakiti dan tenang (kata kerja)' },
      { key: 'D', text: 'Gunung Ciremai dan Palutungan (kata benda nama diri)' }
    ],
    correctKeys: ['A', 'B'],
    explanation: 'A (batu, tebing) adalah kata konkret yang dapat diindera fisik; B (sejuk, dingin, rimbun) adalah kata sifat tekstual dalam teks deskripsi.'
  },
  {
    id: 16,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Tindakan nyata yang dapat dilakukan wisatawan untuk menjaga keaslian Curug Landung adalah ....',
    options: [
      { key: 'A', text: 'Membawa kantong sampah sendiri dari rumah' },
      { key: 'B', text: 'Mencoret-coret tebing batu sebagai kenang-kenangan' },
      { key: 'C', text: 'Menggunakan botol minum ulang pakai (tumbler)' },
      { key: 'D', text: 'Membuang sisa makanan ke dalam kolam air terjun' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Aksi ramah lingkungan yang tepat adalah membawa kantong sampah (A) dan memakai tumbler ramah lingkungan (C).'
  },
  {
    id: 20,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Curug Landung berjarak sangat dekat dengan laut selatan Jawa Barat.',
    correctAnswer: false,
    explanation: 'Salah. Curug Landung berada di lereng Gunung Ciremai, Kabupaten Kuningan bagian utara/timur Jawa Barat, bukan di pesisir laut selatan.'
  },
  {
    id: 21,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Penataan area foto buatan di Curug Landung dibuat tanpa merusak keaslian lingkungan alam sekitar.',
    correctAnswer: true,
    explanation: 'Benar. Paragraf 3 menyatakan area foto buatan tertata rapi tanpa merusak keaslian lingkungan.'
  },
  {
    id: 22,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Pengolahan sampah yang buruk di area objek wisata alam dapat merusak daya tarik estetika dan menurunkan jumlah pengunjung.',
    correctAnswer: true,
    explanation: 'Benar. Timbulan sampah berpotensi mencemari keindahan kawasan wisata dan menurunkan kenyamanan wisatawan.'
  },
  {
    id: 26,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Kawasan objek wisata Curug Landung terletak tepat di bawah kaki Gunung ....................',
    acceptedAnswers: ['Ciremai', 'Gunung Ciremai'],
    explanation: 'Berdasarkan teks: "Berada tepat di kaki Gunung Ciremai..."'
  },
  {
    id: 27,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Warna lumut yang tumbuh subur melapisi dinding tebing batu di Curug Landung adalah ....................',
    acceptedAnswers: ['hijau', 'lumut hijau'],
    explanation: 'Berdasarkan teks: "...dinding tebing batu ditumbuhi lumut hijau yang subur..."'
  }
];

// POS 2 KELAS 7 (Wacana 2)
export const POS2_QUESTIONS_KELAS7: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 4,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Berdasarkan Bait 1 pada Wacana 2, apakah pesan yang ingin disampaikan penyair?',
    options: [
      { key: 'A', text: 'Anjuran membeli kain sutra di toko buku.' },
      { key: 'B', text: 'Imbauan agar tidak menyakiti orang lain agar hidup tenang.' },
      { key: 'C', text: 'Ajaran untuk memetik bunga selasih di pagi hari.' },
      { key: 'D', text: 'Larangan mendaki Gunung Ciremai saat berawan.' }
    ],
    correctKey: 'B',
    explanation: 'Bait 1 baris 3-4 menyatakan: "Jangan suka menyakiti orang lain, / Agar hidupmu selamanya tenang."'
  },
  {
    id: 5,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Rima akhir (pola persajakan) pada Bait 3 Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'a - a - a - a' },
      { key: 'B', text: 'a - b - a - b' },
      { key: 'C', text: 'a - a - b - b' },
      { key: 'D', text: 'a - b - b - a' }
    ],
    correctKey: 'B',
    explanation: 'Pola rima pantun Bait 3 adalah rima silang a-b-a-b (Ciremai [ai], awan [an], damai [ai], teman [an]).'
  },
  {
    id: 6,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Baris ke-1 dan ke-2 pada Bait 2 Wacana 2 dinamakan bagian ....',
    options: [
      { key: 'A', text: 'Isi pantun' },
      { key: 'B', text: 'Sampiran pantun' },
      { key: 'C', text: 'Makna pantun' },
      { key: 'D', text: 'Amanat pantun' }
    ],
    correctKey: 'B',
    explanation: 'Pada struktur pantun, dua baris awal (baris 1 dan 2) merupakan sampiran yang mengantarkan rima bunyi.'
  },
  {
    id: 13,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Ciri-ciri umum dari bentuk pantun yang tepat di bawah ini adalah ....',
    options: [
      { key: 'A', text: 'Terdiri atas 4 baris dalam satu bait' },
      { key: 'B', text: 'Baris 1 dan 2 adalah isi, baris 3 dan 4 adalah sampiran' },
      { key: 'C', text: 'Baris 1 dan 2 adalah sampiran, baris 3 dan 4 adalah isi' },
      { key: 'D', text: 'Memiliki rima silang (a-b-a-b)' }
    ],
    correctKeys: ['A', 'C', 'D'],
    explanation: 'Kaidah pantun: terdiri dari 4 baris (A), baris 1-2 sampiran & 3-4 isi (C), dan pola rima a-b-a-b (D).'
  },
  {
    id: 14,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Pesan moral atau amanat yang terkandung dalam Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Menjaga kebersihan lingkungan agar badan sehat' },
      { key: 'B', text: 'Berperilaku santun agar dicintai teman' },
      { key: 'C', text: 'Menjual kain sutra di pasar baru' },
      { key: 'D', text: 'Membiarkan sampah berserakan di tempat wisata' }
    ],
    correctKeys: ['A', 'B'],
    explanation: 'Amanat pada Bait 2 adalah menjaga kebersihan (A) dan Bait 3 adalah berperilaku santun dan damai (B).'
  },
  {
    id: 15,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Manakah pasangan kata yang berima sama pada bagian isi Bait 3 Wacana 2?',
    options: [
      { key: 'A', text: 'Damai (baris 3) dengan Teman (baris 4)' },
      { key: 'B', text: 'Damai (baris 3) berima dengan Gunung (baris 1)' },
      { key: 'C', text: 'Menjulang (baris 1) berima dengan Damai (baris 3)' },
      { key: 'D', text: 'Awannya (baris 2) berima dengan Teman (baris 4)' }
    ],
    correctKeys: ['C', 'D'],
    explanation: 'Pasangan rima yang berpadanan silang pada Bait 3 adalah baris 1 (Ciremai) dengan baris 3 (damai) dan baris 2 (awan) dengan baris 4 (teman).'
  },
  {
    id: 17,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Jika seseorang menerapkan isi nasihat Bait 3 (“Mari bersikap santun dan damai”), akibat positif yang dirasakannya di sekolah adalah ....',
    options: [
      { key: 'A', text: 'Memiliki banyak teman yang menghargainya' },
      { key: 'B', text: 'Sering terlibat perselisihan dengan teman' },
      { key: 'C', text: 'Suasana belajar di kelas menjadi rukun dan nyaman' },
      { key: 'D', text: 'Tidak diperhatikan oleh guru dan kawan' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Sikap santun dan damai mendatangkan banyak teman setia (A) dan menciptakan suasana belajar yang rukun (C).'
  },
  {
    id: 19,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Manakah kalimat yang memuat kata berkonotasi estetik/kiasan pada puisi atau pantun?',
    options: [
      { key: 'A', text: '“Kain sutra indah dipandang”' },
      { key: 'B', text: '“Tinggi menjulang Gunung Ciremai”' },
      { key: 'C', text: '“Tampak indah berhias awan”' },
      { key: 'D', text: '“Curug Landung setinggi 30 meter”' }
    ],
    correctKeys: ['A', 'C'],
    explanation: 'Ungkapan puitis dan bermakna estetik terdapat pada "Kain sutra indah dipandang" (A) dan personifikasi puitis "berhias awan" (C).'
  },
  {
    id: 23,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Baris ketiga dan keempat pada sebuah bait pantun merupakan bagian penjelas atau sampiran.',
    correctAnswer: false,
    explanation: 'Salah. Baris ke-3 dan ke-4 adalah bagian isi/pesan pantun, sedangkan sampiran terletak pada baris ke-1 dan ke-2.'
  },
  {
    id: 24,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Bait 1 mengandung ajakan moral untuk saling menghormati dan tidak menyakiti sesama manusia.',
    correctAnswer: true,
    explanation: 'Benar. Bait 1 berpesan: "Jangan suka menyakiti orang lain, agar hidupmu selamanya tenang."'
  },
  {
    id: 25,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Menjaga kesantunan berbahasa saat berinteraksi di lingkungan sekolah adalah wujud penerapan isi Bait 3 Pantun.',
    correctAnswer: true,
    explanation: 'Benar. Bait 3 menganjurkan bersikap santun dan damai agar dicintai semua kawan.'
  },
  {
    id: 28,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Jumlah baris (larik) dalam satu bait pantun standar adalah .................... baris.',
    acceptedAnswers: ['4', 'empat'],
    explanation: 'Kaidah baku pantun Melayu/Indonesia memiliki 4 baris per bait.'
  },
  {
    id: 29,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Persamaan bunyi akhir pada setiap baris pantun disebut ....................',
    acceptedAnswers: ['rima', 'sajak', 'rima akhir', 'persajakan'],
    explanation: 'Persamaan bunyi akhir pada puisi/pantun disebut rima atau sajak.'
  },
  {
    id: 30,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Bagian pantun yang memuat inti pesan atau nasihat terletak pada baris ke-3 dan baris ke-....................',
    acceptedAnswers: ['4', 'empat'],
    explanation: 'Isi pantun selalu terletak pada baris ke-3 dan baris ke-4.'
  }
];

// POS 3 KELAS 7 (Wacana 1 & Wacana 2)
export const POS3_QUESTIONS_KELAS7: (PGQuestion | PGKQuestion)[] = [
  {
    id: 9,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pg',
    points: 1,
    question: 'Manakah hubungan yang tepat antara Bait 2 Wacana 2 dengan kondisi lingkungan pada Wacana 1?',
    options: [
      { key: 'A', text: 'Keduanya melarang pengunjung mendaki Gunung Ciremai.' },
      { key: 'B', text: 'Bait 2 memberikan nasihat pentingnya menjaga kebersihan agar hidup sehat, relevan dengan masalah sampah di Curug Landung.' },
      { key: 'C', text: 'Keduanya menjelaskan cara memetik bunga selasih di kaki Gunung Ciremai.' },
      { key: 'D', text: 'Bait 2 memprotes penataan tempat foto di Curug Landung.' }
    ],
    correctKey: 'B',
    explanation: 'Bait 2 mengajarkan menjaga lingkungan bersih dan asri demi tubuh sehat, sangat relevan sebagai solusi kendala sampah plastik di Curug Landung (B).'
  },
  {
    id: 18,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pgk',
    points: 2,
    question: 'Persamaan gagasan antara Wacana 1 paragraf ke-3 dan Wacana 2 Bait 2 terletak pada ....',
    options: [
      { key: 'A', text: 'Pentingnya kebersihan bagi kenyamanan dan kesehatan' },
      { key: 'B', text: 'Kepedulian terhadap keaslian kondisi alam' },
      { key: 'C', text: 'Tata cara penulisan struktur sampiran' },
      { key: 'D', text: 'Penggunaan majas personifikasi' }
    ],
    correctKeys: ['A', 'B'],
    explanation: 'Keduanya menekankan urgensi memelihara kebersihan lingkungan (A) serta peduli merawat keaslian alam sekitar (B).'
  }
];

// BONUS URAIAN KELAS 7 (Soal 31 - 35)
export const BONUS_QUESTIONS_KELAS7: UraianQuestion[] = [
  {
    id: 31,
    pos: 'bonus',
    wacanaRef: 'wacana1',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Uraikanlah struktur Teks Deskripsi pada Wacana 1 ke dalam 2 bagian utama (Identifikasi dan Deskripsi Bagian) beserta bukti paragrafnya!',
    prompt: 'Uraikanlah struktur Teks Deskripsi pada Wacana 1 ke dalam 2 bagian utama (Identifikasi dan Deskripsi Bagian) beserta bukti paragrafnya!',
    sampleAnswer: '• Bagian Identifikasi (Deskripsi Umum): Terdapat pada Paragraf 1 yang mengenalkan nama objek wisata Curug Landung, lokasinya di Desa Palutungan, Kecamatan Cigugur, kaki Gunung Ciremai, serta gambaran umumnya yang sejuk dan asri.\n• Bagian Deskripsi Bagian: Terdapat pada Paragraf 2 dan 3 yang merinci fisik air terjun setinggi 30 meter, hempasan air, bebatuan hitam berlumut hijau, pepohonan rindang, spot foto, hingga persoalan sampah pengunjung.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Menjelaskan bagian identifikasi dan deskripsi bagian dengan tepat disertai bukti paragraf.\n• 2 poin = Menyebutkan kedua struktur tetapi bukti paragraf kurang lengkap.\n• 1 poin = Hanya menyebutkan salah satu bagian struktur.\n• 0 poin = Tidak sesuai / tidak menjawab.'
  },
  {
    id: 32,
    pos: 'bonus',
    wacanaRef: 'wacana1',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Jika kamu ditunjuk sebagai ketua kelompok pencinta alam di sekolahmu yang berkunjung ke Curug Landung, tuliskan 2 ide kampanye kreatif untuk mengajak wisatawan tidak membuang sampah plastik sembarangan!',
    prompt: 'Jika kamu ditunjuk sebagai ketua kelompok pencinta alam di sekolahmu yang berkunjung ke Curug Landung, tuliskan 2 ide kampanye kreatif untuk mengajak wisatawan tidak membuang sampah plastik sembarangan!',
    sampleAnswer: '(1) Gerakan Operasi Semut & Tukar Sampah: Memberikan suvenir stiker alam atau bibit tanaman kepada wisatawan yang mengumpulkan 1 kantong sampah plastik di sekitar curug.\n(2) Memasang plang imbauan estetik berupa pantun atau poster kreatif di dekat spot foto dan bangku peristirahatan agar pengunjung tergerak membuang sampah pada tempatnya.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Dua ide kreatif, logis, relevan, dan terarah.\n• 2 poin = Dua ide tanpa penjelasan atau satu ide dengan penjelasan baik.\n• 1 poin = Satu ide singkat.\n• 0 poin = Tidak relevan.'
  },
  {
    id: 33,
    pos: 'bonus',
    wacanaRef: 'wacana2',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Jelaskan perbedaan fungsi antara bagian sampiran dan isi dalam sebuah bait pantun!',
    prompt: 'Jelaskan perbedaan fungsi antara bagian sampiran dan isi dalam sebuah bait pantun!',
    sampleAnswer: '• Sampiran (baris 1 dan 2): Berfungsi menyiapkan rima akhir, pembayang bunyi, dan irama untuk memikat pendengar/pembaca sebelum masuk ke maksud utama.\n• Isi (baris 3 dan 4): Berfungsi menyampaikan maksud pokok, pesan moral, nasihat, atau ajaran bijak yang sebenarnya ingin diutarakan oleh penyair.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Menjelaskan fungsi sampiran dan isi secara jelas, tepat, dan lengkap.\n• 2 poin = Menjelaskan perbedaan fungsi namun kurang mendalam.\n• 1 poin = Hanya menjelaskan salah satu fungsi (sampiran saja atau isi saja).\n• 0 poin = Tidak sesuai / keliru.'
  },
  {
    id: 34,
    pos: 'bonus',
    wacanaRef: 'wacana2',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Buatlah 1 bait pantun nasihat karya sendiri (4 baris) berkarakteristik rima a-b-a-b yang bertemakan semangat belajar di sekolah!',
    prompt: 'Buatlah 1 bait pantun nasihat karya sendiri (4 baris) berkarakteristik rima a-b-a-b yang bertemakan semangat belajar di sekolah!',
    sampleAnswer: 'Pergi berlayar ke Pulau Sebatik,\nSinggah sebentar membeli kelapa.\nRajin belajar sejak detik ini,\nKelak cita-cita pasti tercapai.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Terdiri dari 4 baris dalam 1 bait (baris 1-2 sampiran, baris 3-4 isi).\n• 1 poin = Memiliki rima bersilang a-b-a-b yang konsisten.\n• 1 poin = Isi bermakna nasihat semangat belajar di sekolah.'
  },
  {
    id: 35,
    pos: 'bonus',
    wacanaRef: 'keduanya',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Berdasarkan pemahamanmu tentang Teks Deskripsi dan Pantun, buatlah 1 paragraf singkat (3–4 kalimat) yang mendeskripsikan kebersihan kelasmu dengan menyisipkan 1 bait pantun nasihat di dalamnya!',
    prompt: 'Berdasarkan pemahamanmu tentang Teks Deskripsi dan Pantun, buatlah 1 paragraf singkat (3–4 kalimat) yang mendeskripsikan kebersihan kelasmu dengan menyisipkan 1 bait pantun nasihat di dalamnya!',
    sampleAnswer: 'Ruang kelas VIII Spensit-Bersatu terlihat sangat bersih, rapi, dan sejuk. Meja kursi tertata berjajar teratur tanpa sampah kertas yang tercecer di lantai. Di sudut kelas terpasang poster pantun: "Pagi hari memetik melati, disimpan rapi di dalam cawan. Jika kelasku bersih dan asri, belajar nyaman bersama kawan." Suasana kelas yang terawat ini membuat seluruh siswa bersemangat menuntut ilmu setiap hari.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Paragraf deskriptif 3–4 kalimat yang menggambarkan kondisi kelas bersih.\n• 1 poin = Menyisipkan 1 bait pantun nasihat yang harmonis di dalam narasi.\n• 1 poin = Menggunakan bahasa yang runtut dan tanda baca yang tepat.'
  }
];
