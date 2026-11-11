/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PGQuestion, PGKQuestion, BenarSalahQuestion, IsianQuestion, UraianQuestion } from '../types/game';

export const WACANA_1_KELAS9 = {
  id: 'wacana1',
  type: 'Teks Laporan Hasil Observasi',
  title: 'Rumah Megah dan Kesuksesan Petani Kopi Modern Lereng Anjung',
  paragraphs: [
    {
      num: 1,
      text: 'KUNINGAN – Keberhasilan Gerakan Reboisasi dan Budidaya Kopi di lereng Gunung Anjung kini membuahkan hasil nyata bagi kesejahteraan masyarakat. Pak Maman dan puluhan petani binaan kelompok tani Situgede berhasil membangun rumah-rumah permanen bertingkat yang megah dan asri dari akumulasi omzet panen biji kopi arabika dan robusta kualitas ekspor.'
    },
    {
      num: 2,
      text: '“Dahulu lereng kami rawan erosi dan penghasilan keluarga sangat pas-pasan. Namun sejak tekun merawat ribuan bibit kopi berakar kuat, hasil panen melonjak hingga 15 ton per musim,” tutur Pak Maman di teras rumah barunya. Bangunan bergaya arsitektur modern tropis itu dilengkapi fasilitas green-house penjemuran biji kopi serta galeri edukasi seduh mandiri bagi pengunjung agrowisata Kuningan.'
    },
    {
      num: 3,
      text: 'Keberhasilan ekonomi ini membuktikan bahwa konservasi lereng dan kemakmuran keluarga petani dapat berjalan beriringan. Rumah bagus para petani kopi menjadi saksi nyata bahwa sebatang pohon kopi yang dirawat dengan disiplin mampu mengubah nasib ekonomi keluarga sekaligus melestarikan alam pegunungan untuk generasi penerus.'
    }
  ]
};

export const WACANA_2_KELAS9 = {
  id: 'wacana2',
  type: 'Iklan Komersial Logistik',
  title: 'ARMADA MOBIL IDAMANKU PENGANGKUT BIBIT KOPI SITUGEDE',
  tagline: 'Mobil Idamanku: Mitra Sejati Petani Menembus Medan Terjal Pegunungan Anjung!',
  headline: 'MOBIL IDAMANKU: SOLUSI DISTRIBUSI CEPAT, BIBIT SEGAR HINGGA KE PUNCAK LERENG!',
  body: 'Ingin mengangkut ribuan bibit kopi tanpa risiko patah ranting dan rusak akar? CV Situgede Bersatu menghadirkan armada Mobil Idamanku — mobil pick-up double cabin 4x4 tangguh bermesin bertenaga tinggi. Dilengkapi bak bertingkat aerodinamis bersirkulasi udara optimal yang sanggup memuat hingga 2.000 polibag bibit kopi sekali jalan.',
  promo: 'Khusus kelompok tani dan sekolah mitra Spensit-Bersatu, nikmati potongan tarif sewa 25% plus gratis asuransi bibit selamat. Promo berlaku sepanjang musim tanam 2026!',
  contact: 'Kantor Logistik Terpadu: Jalan Raya Situgede No. 45, Kuningan · Call/WhatsApp: 0813-9999-8888'
};

export const POS_INFO_KELAS9 = {
  pos1: {
    id: 'pos1',
    title: 'Pos 1: Kediaman Petani Makmur',
    subtitle: 'Laporan Agribisnis & Rumah Hasil Panen Kopi',
    wacanaName: 'Wacana 1 (Laporan Observasi)',
    description: 'Pelajari laporan keberhasilan Pak Maman membangun rumah megah modern dari omzet panen 15 ton kopi lereng Anjung, serta perpaduan konservasi dan ekonomi.',
    targetQuestions: 14
  },
  pos2: {
    id: 'pos2',
    title: 'Pos 2: Terminal Mobil Idamanku',
    subtitle: 'Iklan Logistik & Mobil Idamanku 4x4',
    wacanaName: 'Wacana 2 (Iklan Logistik Kopi)',
    description: 'Analisis strategi promosi armada Mobil Idamanku 4x4 berkapasitas 2.000 bibit, diskon kemitraan 25%, dan keunggulan teknologi distribusi ke lereng terjal.',
    targetQuestions: 14
  },
  pos3: {
    id: 'pos3',
    title: 'Pos 3: Puncak Agribisnis Modern',
    subtitle: 'Sintesis Rantai Pasok Kopi Terpadu',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Sintesiskan keterkaitan antara armada transportasi bibit yang tangguh dengan kelancaran panen yang mewujudkan kemakmuran rumah petani.',
    targetQuestions: 2
  },
  bonus: {
    id: 'bonus',
    title: 'Misi Bonus: Agropreneurship Kritis',
    subtitle: 'Uraian Analisis Bisnis & Pelestarian Alam',
    wacanaName: 'Wacana 1 & Wacana 2',
    description: 'Tuliskan ide kewirausahaan agribisnis, rancang kampanye logistik kopi sekolah, evaluasi dampak ekonomi rumah petani, dan buat teks eksposisi.',
    targetQuestions: 5
  }
};

// POS 1 KELAS 9
export const POS1_QUESTIONS_KELAS9: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 1,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Berdasarkan Wacana 1, berapa hasil lonjakan panen kopi Pak Maman per musim setelah tekun merawat bibit kopi?',
    options: [
      { key: 'A', text: '5 ton' },
      { key: 'B', text: '10 ton' },
      { key: 'C', text: '15 ton' },
      { key: 'D', text: '25 ton' }
    ],
    correctKey: 'C',
    explanation: 'Paragraf 2 menyatakan: "...hasil panen melonjak hingga 15 ton per musim..."'
  },
  {
    id: 2,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Fasilitas edukasi yang dibangun melengkapi rumah tinggal baru Pak Maman adalah ....',
    options: [
      { key: 'A', text: 'Kolam pemancingan air tawar dan penginapan vila' },
      { key: 'B', text: 'Green-house penjemuran biji kopi dan galeri edukasi seduh mandiri' },
      { key: 'C', text: 'Pabrik pengolahan pupuk kimia berskala besar' },
      { key: 'D', text: 'Bale desa untuk rapat perangkat kecamatan' }
    ],
    correctKey: 'B',
    explanation: 'Paragraf 2 menyebutkan bangunan dilengkapi green-house penjemuran kopi serta galeri edukasi seduh mandiri.'
  },
  {
    id: 3,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Gagasan utama paragraf ketiga pada Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Harga jual pupuk organik yang terus melonjak tinggi.' },
      { key: 'B', text: 'Konservasi lereng dan kemakmuran keluarga petani dapat berjalan beriringan.' },
      { key: 'C', text: 'Bencana longsor yang selalu menghantui lereng Gunung Anjung.' },
      { key: 'D', text: 'Cara merancang arsitektur rumah modern tropis.' }
    ],
    correctKey: 'B',
    explanation: 'Paragraf 3 menyimpulkan bahwa konservasi lereng dan kemakmuran ekonomi petani dapat berjalan beriringan (B).'
  },
  {
    id: 7,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Penyebab utama keluarga Pak Maman sebelumnya berpenghasilan pas-pasan menurut wacana adalah ....',
    options: [
      { key: 'A', text: 'Tingginya harga jual bibit kopi di pasar' },
      { key: 'B', text: 'Kondisi lahan lereng yang terbuka dan rawan erosi' },
      { key: 'C', text: 'Kekurangan armada mobil pengangkut pupuk' },
      { key: 'D', text: 'Kurangnya minat pembeli terhadap kopi Kuningan' }
    ],
    correctKey: 'B',
    explanation: 'Pak Maman menyatakan: "Dahulu lereng kami rawan erosi dan penghasilan keluarga sangat pas-pasan..."'
  },
  {
    id: 8,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pg',
    points: 1,
    question: 'Kata "omzet" pada teks laporan Wacana 1 memiliki padanan makna dengan istilah ....',
    options: [
      { key: 'A', text: 'Jumlah modal utang yang dipinjam dari bank' },
      { key: 'B', text: 'Total nilai uang hasil penjualan produk dalam jangka waktu tertentu' },
      { key: 'C', text: 'Sisa pupuk organik yang belum dipakai petani' },
      { key: 'D', text: 'Biaya perbaikan atap rumah warga' }
    ],
    correctKey: 'B',
    explanation: 'Omzet adalah jumlah nilai uang hasil penjualan barang/dagangan secara keseluruhan selama periode tertentu.'
  },
  {
    id: 10,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Fakta-fakta ekonomi dan fisik yang tertera pada Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Hasil panen melonjak mencapai 15 ton per musim' },
      { key: 'B', text: 'Petani menanam jenis kopi arabika dan robusta kualitas ekspor' },
      { key: 'C', text: 'Setiap petani di lereng Anjung memiliki helikopter pribadi' },
      { key: 'D', text: 'Rumah petani dilengkapi green-house penjemuran biji kopi' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'A, B, dan D tercantum nyata dalam teks, sedangkan C adalah klaim fiktif.'
  },
  {
    id: 11,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Karakteristik wirausaha unggul yang ditunjukkan oleh Pak Maman adalah ....',
    options: [
      { key: 'A', text: 'Tekun dan disiplin dalam merawat tanaman' },
      { key: 'B', text: 'Inovatif dengan melengkapi rumahnya sarana agrowisata edukasi' },
      { key: 'C', text: 'Cepat putus asa saat musim kemarau datang' },
      { key: 'D', text: 'Memadukan orientasi keuntungan finansial dengan konservasi alam' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Pak Maman memperlihatkan ketekunan (A), inovasi agrowisata (B), dan wawasan ekologis (D).'
  },
  {
    id: 12,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Ciri kebahasaan teks laporan hasil observasi pada Wacana 1 adalah ....',
    options: [
      { key: 'A', text: 'Menggunakan istilah teknis bidang pertanian (omzet, green-house, erosi)' },
      { key: 'B', text: 'Menggunakan kalimat definisi dan deskripsi faktual' },
      { key: 'C', text: 'Menggunakan rima akhir a-b-a-b berpola pantun' },
      { key: 'D', text: 'Menyajikan data kuantitatif yang dapat diverifikasi (15 ton)' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Teks laporan observasi memakai istilah teknis (A), kalimat deskriptif faktual (B), dan data kuantitatif (D).'
  },
  {
    id: 16,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'pgk',
    points: 2,
    question: 'Manakah nilai karakter profil pelajar Pancasila yang tecermin dari figur petani kopi pada Wacana 1?',
    options: [
      { key: 'A', text: 'Mandiri dalam membangun ekonomi keluarga' },
      { key: 'B', text: 'Bernalar kritis dalam mengantisipasi erosi tanah' },
      { key: 'C', text: 'Konsumtif dan gemar memamerkan harta secara berlebihan' },
      { key: 'D', text: 'Bergotong royong bersama kelompok tani Situgede' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Sikap yang tecermin adalah kemandirian (A), nalar kritis ekologi (B), dan gotong royong kelompok (D).'
  },
  {
    id: 20,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Rumah megah bertingkat milik Pak Maman dibangun murni dari keuntungan hasil panen kopi.',
    correctAnswer: true,
    explanation: 'Benar. Wacana menegaskan rumah permanen megah dibangun dari akumulasi omzet panen kopi kualitas ekspor.'
  },
  {
    id: 21,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Budidaya kopi di lereng gunung terbukti merusak struktur tanah dan mempercepat tanah longsor.',
    correctAnswer: false,
    explanation: 'Salah. Akar tanaman kopi justru menahan tanah dari erosi sehingga konservasi dan ekonomi berjalan beriringan.'
  },
  {
    id: 22,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 1:',
    statement: 'Galeri edukasi seduh mandiri di rumah Pak Maman bertujuan menarik minat wisatawan berkunjung ke Kuningan.',
    correctAnswer: true,
    explanation: 'Benar. Galeri tersebut menjadi sarana edukasi bagi pengunjung agrowisata di Kabupaten Kuningan.'
  },
  {
    id: 26,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Pak Maman merupakan salah satu petani binaan dari kelompok tani ....................',
    acceptedAnswers: ['Situgede', 'kelompok tani Situgede'],
    explanation: 'Berdasarkan teks: "...Pak Maman dan puluhan petani binaan kelompok tani Situgede..."'
  },
  {
    id: 27,
    pos: 'pos1',
    wacanaRef: 'wacana1',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 1:',
    prompt: 'Dua varietas kopi unggulan yang dibudidayakan oleh para petani adalah arabika dan ....................',
    acceptedAnswers: ['robusta'],
    explanation: 'Berdasarkan wacana: "...omzet panen biji kopi arabika dan robusta kualitas ekspor."'
  }
];

// POS 2 KELAS 9
export const POS2_QUESTIONS_KELAS9: (PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion)[] = [
  {
    id: 4,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Kapasitas muat maksimal armada mobil pick-up 4x4 pada Wacana 2 adalah ....',
    options: [
      { key: 'A', text: '500 polibag bibit kopi' },
      { key: 'B', text: '1.000 polibag bibit kopi' },
      { key: 'C', text: '2.000 polibag bibit kopi' },
      { key: 'D', text: '5.000 polibag bibit kopi' }
    ],
    correctKey: 'C',
    explanation: 'Wacana 2 menyebutkan: "...sanggup memuat hingga 2.000 polibag bibit kopi sekali jalan."'
  },
  {
    id: 5,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Keuntungan khusus yang diberikan bagi kelompok tani dan sekolah mitra Spensit-Bersatu adalah ....',
    options: [
      { key: 'A', text: 'Gratis mobil pick-up baru' },
      { key: 'B', text: 'Potongan tarif sewa 25% plus gratis asuransi bibit selamat' },
      { key: 'C', text: 'Bonus 10 karung pupuk kimia' },
      { key: 'D', text: 'Bebas biaya bahan bakar seumur hidup' }
    ],
    correctKey: 'B',
    explanation: 'Teks menyatakan: "...nikmati potongan tarif sewa 25% plus gratis asuransi bibit selamat."'
  },
  {
    id: 6,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pg',
    points: 1,
    question: 'Fitur mobil angkut yang dirancang agar bibit kopi tidak kepanasan dan rusak selama perjalanan adalah ....',
    options: [
      { key: 'A', text: 'Sistem rem hidrolik ganda' },
      { key: 'B', text: 'Bak bertingkat aerodinamis bersirkulasi udara optimal' },
      { key: 'C', text: 'Lampu sorot LED berdaya tinggi' },
      { key: 'D', text: 'Knalpot berlapis kromium' }
    ],
    correctKey: 'B',
    explanation: 'Bak bertingkat aerodinamis dengan sirkulasi udara optimal dirancang khusus menjaga kesegaran bibit.'
  },
  {
    id: 13,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Keunggulan teknis armada mobil angkut CV Situgede Bersatu pada Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Penggerak roda 4x4 tangguh menembus lereng curam' },
      { key: 'B', text: 'Bak bertingkat aerodinamis memuat 2.000 polibag' },
      { key: 'C', text: 'Mesin bertenaga tinggi dan ramah lingkungan' },
      { key: 'D', text: 'Hanya bisa melaju di jalan tol beraspal datar' }
    ],
    correctKeys: ['A', 'B', 'C'],
    explanation: 'Mobil berpenggerak 4x4 (A), berkapasitas 2.000 polibag (B), dan bermesin bertenaga tangguh (C).'
  },
  {
    id: 14,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Kalimat persuasif yang bertujuan memotivasi pembaca agar menggunakan jasa angkut adalah ....',
    options: [
      { key: 'A', text: '“Solusi distribusi cepat, bibit segar hingga ke puncak lereng!”' },
      { key: 'B', text: '“Mitra Sejati Petani Menembus Medan Terjal Pegunungan!”' },
      { key: 'C', text: '“Kantor Logistik Terpadu: Jalan Raya Situgede No. 45, Kuningan”' },
      { key: 'D', text: '“Nikmati potongan tarif sewa 25% plus gratis asuransi bibit selamat!”' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'A, B, dan D merupakan headline persuasif dan tawaran promo menarik, sedangkan C adalah identitas kontak.'
  },
  {
    id: 15,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Pentingnya asuransi keselamatan bibit bagi petani saat pengangkutan lereng adalah ....',
    options: [
      { key: 'A', text: 'Menghindari kerugian modal bila bibit rusak di jalan terjal' },
      { key: 'B', text: 'Memberikan jaminan kepastian penggantian bibit yang patah' },
      { key: 'C', text: 'Menaikkan harga jual kopi secara sepihak' },
      { key: 'D', text: 'Memberikan rasa tenang dan kepastian jadwal tanam' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Asuransi memitigasi kerugian (A), menjamin bibit pengganti (B), dan memberi ketenangan logistik (D).'
  },
  {
    id: 17,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Strategi promosi efektif yang diterapkan pada Wacana 2 meliputi ....',
    options: [
      { key: 'A', text: 'Pemberian diskon 25% bagi kemitraan sekolah dan kelompok tani' },
      { key: 'B', text: 'Pencantuman nomor kontak layanan WhatsApp yang jelas' },
      { key: 'C', text: 'Mengharuskan pembeli membayar uang muka tanpa tanda terima' },
      { key: 'D', text: 'Pemberian garansi jaminan perlindungan asuransi' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Diskon 25% (A), kontak jelas (B), dan asuransi garansi (D) merupakan teknik promosi yang profesional.'
  },
  {
    id: 19,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'pgk',
    points: 2,
    question: 'Struktur teks iklan yang dapat diidentifikasi pada Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Judul pemikat (headline): Armada Mobil Idamanku Tangguh' },
      { key: 'B', text: 'Tubuh iklan: Uraian spesifikasi kapasitas 2.000 polibag dan mesin 4x4' },
      { key: 'C', text: 'Koda/Amanat pantun dengan rima silang a-b-a-b' },
      { key: 'D', text: 'Penutup identitas penjual: Alamat kantor dan kontak WhatsApp' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Struktur iklan terdiri dari headline pemikat (A), tubuh iklan/spesifikasi (B), dan identitas kontak (D).'
  },
  {
    id: 23,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Mobil pengangkut bibit pada Wacana 2 hanya boleh disewa oleh pemilik perkebunan luar negeri.',
    correctAnswer: false,
    explanation: 'Salah. Armada disediakan untuk petani lokal, kelompok tani, dan sekolah mitra Spensit-Bersatu.'
  },
  {
    id: 24,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Sistem penggerak empat roda (4x4) sangat dibutuhkan untuk menembus jalan perkebunan lereng yang terjal dan licin.',
    correctAnswer: true,
    explanation: 'Benar. Penggerak roda 4x4 memberikan traksi kuat di jalan pegunungan yang terjal.'
  },
  {
    id: 25,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'benar_salah',
    points: 1,
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan Wacana 2:',
    statement: 'Promo potongan harga 25% pada Wacana 2 berlaku sepanjang musim tanam 2026.',
    correctAnswer: true,
    explanation: 'Benar. Wacana menyatakan: "Promo berlaku sepanjang musim tanam 2026!"'
  },
  {
    id: 28,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Nama perusahaan penyedia armada mobil pengangkut bibit kopi pada Wacana 2 adalah CV ....................',
    acceptedAnswers: ['Situgede Bersatu', 'CV Situgede Bersatu'],
    explanation: 'Berdasarkan iklan: "CV Situgede Bersatu menghadirkan armada Mobil Idamanku..."'
  },
  {
    id: 29,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Besaran diskon tarif sewa khusus kelompok tani dan sekolah Spensit-Bersatu adalah .... persen.',
    acceptedAnswers: ['25', '25%'],
    explanation: 'Berdasarkan teks: "...nikmati potongan tarif sewa 25%..."'
  },
  {
    id: 30,
    pos: 'pos2',
    wacanaRef: 'wacana2',
    type: 'isian',
    points: 2,
    question: 'Isilah titik-titik berikut dengan jawaban yang tepat sesuai Wacana 2:',
    prompt: 'Kantor logistik terpadu CV Situgede Bersatu beralamat di Jalan Raya Situgede No. ....',
    acceptedAnswers: ['45', 'No. 45'],
    explanation: 'Berdasarkan teks kontak: "Jalan Raya Situgede No. 45, Kuningan"'
  }
];

// POS 3 KELAS 9
export const POS3_QUESTIONS_KELAS9: (PGQuestion | PGKQuestion)[] = [
  {
    id: 9,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pg',
    points: 1,
    question: 'Manakah hubungan yang paling tepat antara isi Wacana 1 dan Wacana 2?',
    options: [
      { key: 'A', text: 'Wacana 1 melaporkan pembangunan rumah mewah tanpa kaitan dengan bibit tanaman kopi.' },
      { key: 'B', text: 'Wacana 1 menyajikan bukti kemakmuran petani berkat panen kopi, sedangkan Wacana 2 menyediakan sarana armada transportasi bibit yang mendukung kelancaran rantai agribisnis tersebut.' },
      { key: 'C', text: 'Wacana 2 membantah keberhasilan panen raya 15 ton yang dilaporkan oleh Pak Maman pada Wacana 1.' },
      { key: 'D', text: 'Keduanya berbentuk teks drama yang menceritakan perselisihan sopir truk dan petani kopi.' }
    ],
    correctKey: 'B',
    explanation: 'Wacana 1 menyajikan hasil nyata kemakmuran panen kopi, sedangkan Wacana 2 menawarkan solusi transportasi logistik bibit yang memperkuat rantai produksi agribisnis (B).'
  },
  {
    id: 18,
    pos: 'pos3',
    wacanaRef: 'keduanya',
    type: 'pgk',
    points: 2,
    question: 'Persamaan tujuan dan nilai positif yang terkandung dalam Wacana 1 dan Wacana 2 adalah ....',
    options: [
      { key: 'A', text: 'Mendorong modernisasi tata kelola agribisnis perkebunan kopi di Kabupaten Kuningan' },
      { key: 'B', text: 'Menghargai sinergi kemitraan antara petani, sekolah, dan penyedia logistik' },
      { key: 'C', text: 'Mengajak warga berutang membeli kendaraan mewah demi gengsi semata' },
      { key: 'D', text: 'Mengutamakan pemeliharaan kelestarian lingkungan lereng pegunungan yang aman dari erosi' }
    ],
    correctKeys: ['A', 'B', 'D'],
    explanation: 'Kedua wacana menekankan modernisasi agribisnis (A), kemitraan sinergis (B), dan kelestarian lereng (D).'
  }
];

// BONUS URAIAN KELAS 9 (Soal 31 - 35)
export const BONUS_QUESTIONS_KELAS9: UraianQuestion[] = [
  {
    id: 31,
    pos: 'bonus',
    wacanaRef: 'wacana1',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Berdasarkan Wacana 1, jelaskan faktor-faktor kunci yang membuat Pak Maman dan kelompok tani Situgede berhasil mengubah nasib ekonominya hingga mampu membangun rumah megah!',
    prompt: 'Berdasarkan Wacana 1, jelaskan faktor-faktor kunci yang membuat Pak Maman dan kelompok tani Situgede berhasil mengubah nasib ekonominya hingga mampu membangun rumah megah!',
    sampleAnswer: '1. Ketekunan dan komitmen merawat ribuan pohon kopi berakar kuat secara disiplin.\n2. Pemilihan varietas bernilai ekonomi tinggi (arabika dan robusta kualitas ekspor).\n3. Inovasi agrowisata dengan melengkapi rumah green-house penjemuran dan galeri seduh mandiri yang memberikan nilai tambah ekonomi selain penjualan biji kopi mentah.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Menjelaskan 3 faktor kunci secara logis, runtut, dan sesuai teks wacana.\n• 2 poin = Menjelaskan 2 faktor kunci dengan baik.\n• 1 poin = Hanya menjelaskan 1 faktor singkat.\n• 0 poin = Tidak sesuai / tidak menjawab.'
  },
  {
    id: 32,
    pos: 'bonus',
    wacanaRef: 'wacana2',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Sebagai ketua OSIS atau pegiat literasi Spensit-Bersatu, rancanglah 1 proposal kegiatan kemitraan antara sekolah dan CV Situgede Bersatu untuk mendukung penghijauan lereng gunung!',
    prompt: 'Sebagai ketua OSIS atau pegiat literasi Spensit-Bersatu, rancanglah 1 proposal kegiatan kemitraan antara sekolah dan CV Situgede Bersatu untuk mendukung penghijauan lereng gunung!',
    sampleAnswer: 'Proposal Program "Ekspedisi Angkut Hijau Spensit": Sekolah bermitra dengan CV Situgede Bersatu memanfaatkan diskon 25% armada Mobil Idamanku 4x4 untuk mengangkut 2.000 bibit kopi karya siswa dari persemaian sekolah menuju lereng Gunung Anjung. Di lereng, siswa bersama sopir dan kelompok tani menanam bibit secara serentak demi mencegah bahaya longsor.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Gagasan kemitraan jelas, realistis, memanfaatkan promo wacana, dan bertema penghijauan.\n• 2 poin = Gagasan baik namun kurang terperinci dalam langkah implementasinya.\n• 1 poin = Gagasan singkat tanpa rincian kemitraan.\n• 0 poin = Tidak relevan.'
  },
  {
    id: 33,
    pos: 'bonus',
    wacanaRef: 'keduanya',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Bandingkan gaya bahasa dan tujuan penyampaian antara teks laporan hasil observasi (Wacana 1) dengan teks iklan armada logistik (Wacana 2)!',
    prompt: 'Bandingkan gaya bahasa dan tujuan penyampaian antara teks laporan hasil observasi (Wacana 1) dengan teks iklan armada logistik (Wacana 2)!',
    sampleAnswer: '• Wacana 1 (Laporan Observasi): Bertujuan menginformasikan fakta pencapaian riil secara objektif dan mendalam. Bahasanya lugas, baku, informatif, dan memuat kutipan narasumber ("Dahulu lereng kami rawan erosi...").\n• Wacana 2 (Iklan): Bertujuan membujuk pembaca agar menggunakan jasa sewa mobil angkut bibit. Bahasanya ringkas, persuasif, sugestif, memanfaatkan tanda seru dan kata promo berhuruf kapital ("DISKON 25%").',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 3 poin = Dua perbedaan (tujuan dan gaya bahasa) dijelaskan tepat disertai kutipan contoh dari teks.\n• 2 poin = Dua perbedaan dijelaskan tepat tanpa contoh kutipan.\n• 1 poin = Hanya menjelaskan salah satu aspek.\n• 0 poin = Tidak sesuai.'
  },
  {
    id: 34,
    pos: 'bonus',
    wacanaRef: 'wacana2',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Buatlah sebuah slogan iklan komersial singkat (1–2 kalimat) karya sendiri yang mempromosikan mobil angkut bibit kopi bagi petani di daerah pegunungan!',
    prompt: 'Buatlah sebuah slogan iklan komersial singkat (1–2 kalimat) karya sendiri yang mempromosikan mobil angkut bibit kopi bagi petani di daerah pegunungan!',
    sampleAnswer: '"Tangguh di Tanjakan, Aman Sampai Puncak! Mobil Idamanku Situgede, Pastikan Bibit Kopimu Siap Panen Menghijaukan Lereng Anjung!"',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Mengandung rima atau bunyi puitis yang memikat.\n• 1 poin = Menyoroti keunggulan mobil di jalan pegunungan.\n• 1 poin = Relevan dengan misi bibit kopi dan logistik.'
  },
  {
    id: 35,
    pos: 'bonus',
    wacanaRef: 'keduanya',
    type: 'uraian',
    points: 3,
    maxScore: 3,
    question: 'Berdasarkan Wacana 1 dan Wacana 2, tuliskan 1 paragraf argumentatif (3–4 kalimat) yang membuktikan bahwa modernisasi logistik dan budidaya kopi mampu menciptakan masa depan cerah bagi generasi muda Kuningan!',
    prompt: 'Berdasarkan Wacana 1 dan Wacana 2, tuliskan 1 paragraf argumentatif (3–4 kalimat) yang membuktikan bahwa modernisasi logistik dan budidaya kopi mampu menciptakan masa depan cerah bagi generasi muda Kuningan!',
    sampleAnswer: 'Modernisasi logistik dan budidaya kopi membuka peluang kemakmuran nyata bagi generasi muda Kabupaten Kuningan. Keberadaan armada mobil angkut 4x4 memastikan bibit kopi berkualitas tinggi terdistribusi cepat dan aman ke lereng perbukitan tanpa mengalami kerusakan akar. Hasilnya, produktivitas panen kopi melonjak tajam hingga mampu mewujudkan rumah idaman para petani dan sarana agrowisata mandiri. Dengan demikian, sektor agribisnis kopi terbukti menjadi profesi masa depan yang membanggakan sekaligus penjaga kelestarian alam sekitar.',
    rubric: 'Pedoman Penskoran (0-3 Poin):\n• 1 poin = Memuat kalimat topik argumentatif di awal paragraf.\n• 1 poin = Menyertakan kalimat penjelas yang memadukan wacana rumah petani dan armada mobil.\n• 1 poin = Bahasa baku, kohesif, dan terdiri atas 3–4 kalimat runtut.'
  }
];
