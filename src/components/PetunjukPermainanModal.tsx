/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
  Compass,
  ArrowRight,
  X,
  Keyboard,
  Sprout,
  Users,
  CheckSquare,
  FileText,
  Volume2,
  Share2
} from 'lucide-react';
import { sound } from '../utils/audio';
import { StudentProfile } from '../types/game';
import { GradeLevel } from '../data/curriculum';

interface PetunjukPermainanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmStart?: () => void;
  profile?: StudentProfile | null;
  selectedGrade?: GradeLevel;
  isPreGameBriefing?: boolean;
}

export const PetunjukPermainanModal: React.FC<PetunjukPermainanModalProps> = ({
  isOpen,
  onClose,
  onConfirmStart,
  profile,
  selectedGrade = 'Kelas VIII',
  isPreGameBriefing = false
}) => {
  const [activeTab, setActiveTab] = useState<'alur' | 'tipe_soal' | 'fitur' | 'skor'>('alur');

  if (!isOpen) return null;

  const GRADE_CONTEXT_MAP: Record<GradeLevel, {
    title: string;
    wacana: string;
    themeBadge: string;
    color: string;
  }> = {
    'Kelas VII': {
      title: 'Petualangan Curug Landung & Konservasi Lereng Ciremai',
      wacana: 'Wacana Teks Deskripsi Wisata Alam & Pantun Pesan Pelestarian Lingkungan',
      themeBadge: 'Curug Landung · Kelas VII',
      color: 'sky'
    },
    'Kelas VIII': {
      title: 'Gerakan Sekolah Cinta Kopi Gunung Anjung',
      wacana: 'Wacana Berita Konservasi Kopi Lereng Anjung & Brosur Iklan Bibit Sinapeul',
      themeBadge: 'Lereng Anjung · Kelas VIII',
      color: 'emerald'
    },
    'Kelas IX': {
      title: 'Agribisnis Kopi Mandiri & Kendaraan Tangguh 4x4',
      wacana: 'Wacana Kisah Sukses Petani Modern Situgede & Iklan Mobil Pick-Up Tangguh',
      themeBadge: 'Mobil Idamanku · Kelas IX',
      color: 'amber'
    }
  };

  const currentGrade = (profile?.grade as GradeLevel) || selectedGrade || 'Kelas VIII';
  const gradeContext = GRADE_CONTEXT_MAP[currentGrade] || GRADE_CONTEXT_MAP['Kelas VIII'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 p-1 flex items-center justify-center shrink-0 shadow-inner">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black tracking-wider uppercase bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Panduan &amp; Petunjuk
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  {gradeContext.themeBadge}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-stone-100 mt-0.5">
                Petunjuk Ekspedisi Literasi Membaca
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 transition-colors cursor-pointer"
            title="Tutup Petunjuk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Personalized Welcome Banner if user has profile */}
        {profile && isPreGameBriefing && (
          <div className="px-5 py-2.5 bg-emerald-950/40 border-b border-emerald-900/40 flex items-center gap-2.5 text-xs text-stone-300">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Selamat bertualang,{' '}
              <strong className="text-emerald-300">
                {profile.mode === 'team'
                  ? `${profile.teamName || 'Tim Literasi'} (${profile.name})`
                  : profile.name}
              </strong>
              ! Perhatikan petunjuk di bawah ini sebelum memasuki <span className="text-amber-300 font-semibold">Pos 1</span>.
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 border-b border-stone-800 bg-stone-950/60 p-1.5 gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('alur');
            }}
            className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'alur'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">1. Alur Pos</span>
            <span className="sm:hidden">Alur</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('tipe_soal');
            }}
            className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tipe_soal'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">2. Tipe Soal</span>
            <span className="sm:hidden">Soal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('fitur');
            }}
            className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'fitur'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">3. Fitur Pohon</span>
            <span className="sm:hidden">Fitur</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('skor');
            }}
            className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'skor'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">4. Skor &amp; Piagam</span>
            <span className="sm:hidden">Skor</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-stone-200 text-xs sm:text-sm">
          {/* TAB 1: ALUR POS & MISI */}
          {activeTab === 'alur' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300">
                <span className="font-semibold text-emerald-400 block mb-1">
                  📚 Tema Wacana Pembelajaran:
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {gradeContext.wacana}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Pos 1 */}
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-emerald-400 text-xs uppercase tracking-wide">
                        Pos 1 · Informasi Tersurat
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        10 Soal
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Fokus pada <strong>Wacana 1</strong>. Temukan fakta langsung, tokoh, lokasi, angka, dan pernyataan yang tertulis eksplisit dalam teks.
                    </p>
                  </div>
                  <div className="text-[11px] text-stone-400 bg-stone-900/80 p-2 rounded-lg border border-stone-800">
                    💡 <em>Tipe Soal: Pilihan Ganda &amp; Pernyataan Benar/Salah</em>
                  </div>
                </div>

                {/* Pos 2 */}
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-sky-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-sky-400 text-xs uppercase tracking-wide">
                        Pos 2 · Memahami &amp; Menyimpulkan
                      </span>
                      <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                        10 Soal
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Fokus pada <strong>Wacana 2</strong>. Tarik simpulan tersirat, pahami makna kosakata istilah baru, dan kenali maksud terselubung penulis.
                    </p>
                  </div>
                  <div className="text-[11px] text-stone-400 bg-stone-900/80 p-2 rounded-lg border border-stone-800">
                    💡 <em>Tipe Soal: Pilihan Ganda &amp; Pilihan Ganda Kompleks (PGK)</em>
                  </div>
                </div>

                {/* Pos 3 */}
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-amber-400 text-xs uppercase tracking-wide">
                        Pos 3 · Evaluasi &amp; Sintesis
                      </span>
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                        10 Soal
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Membandingkan <strong>Wacana 1 &amp; Wacana 2</strong> secara kritis. Uji daya analisis membedakan fakta vs opini dan korelasi kedua teks.
                    </p>
                  </div>
                  <div className="text-[11px] text-stone-400 bg-stone-900/80 p-2 rounded-lg border border-stone-800">
                    💡 <em>Tipe Soal: Isian Singkat &amp; Evaluasi Argumen Kritis</em>
                  </div>
                </div>

                {/* Pos Bonus */}
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-rose-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-rose-400 text-xs uppercase tracking-wide">
                        Pos Bonus · Uraian Reflektif
                      </span>
                      <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                        5 Misi Esai
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Tuliskan gagasan orisinalmu mengenai pelestarian lingkungan, kearifan lokal, dan solusi nyata. Nilai dengan rubrik mandiri (0–3 poin).
                    </p>
                  </div>
                  <div className="text-[11px] text-stone-400 bg-stone-900/80 p-2 rounded-lg border border-stone-800">
                    💡 <em>Tipe Soal: Uraian Mendalam dengan Rubrik Terbuka</em>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIPE SOAL & CARA MENJAWAB */}
          {activeTab === 'tipe_soal' && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-emerald-400 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Pilihan Ganda Biasa (PG)</span>
                </div>
                <p className="text-xs text-stone-300 mb-1.5">
                  Pilihlah <strong>1 (satu) jawaban</strong> yang paling tepat dari pilihan A, B, C, atau D.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 bg-stone-900 p-2 rounded-lg">
                  <Keyboard className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                  <span><strong>Tip Keyboard Cepat:</strong> Kamu bisa menekan angka <strong>1, 2, 3, 4</strong> di keyboard untuk langsung memilih opsi!</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sky-400 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-500/50 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Pilihan Ganda Kompleks (PGK)</span>
                </div>
                <p className="text-xs text-stone-300 mb-1.5">
                  Centang <strong>semua pernyataan yang benar</strong> (bisa lebih dari satu jawaban, misalnya 2 atau 3 jawaban yang sesuai teks).
                </p>
                <div className="text-[11px] text-sky-300 bg-sky-950/40 p-2 rounded-lg border border-sky-900/40">
                  Perhatikan instruksi: Jawaban baru dianggap tepat jika seluruh kotak pernyataan benar telah kamu centang!
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-amber-400 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Pernyataan Benar / Salah</span>
                </div>
                <p className="text-xs text-stone-300">
                  Klik tombol <strong>[Benar]</strong> jika pernyataan sesuai dengan isi teks bacaan wacana, atau <strong>[Salah]</strong> jika bertentangan dengan fakta teks.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-purple-400 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500/50 flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Isian Singkat &amp; Uraian Berbobot</span>
                </div>
                <p className="text-xs text-stone-300">
                  Untuk soal isian, ketik kata kunci ringkas (misal: angka, nama tempat, nama varietas). Untuk soal bonus uraian, tuangkan gagasan solutifmu dan nilai jawabanmu menggunakan rubrik penskoran objektif 0–3 poin.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: FITUR POHON VIRTUAL & TEKS */}
          {activeTab === 'fitur' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-300 text-xs sm:text-sm mb-1">
                    Visualisasi Pohon Virtual Interaktif
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Setiap jawaban benar akan menyiram nutrisi ke pohon virtualmu di panel kanan! Pohon akan tumbuh bertahap dari bibit polibag Sinapeul, bertunas, bertangkai rimbun, berbunga harum, hingga memunculkan buah merah segar!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sky-300 text-xs sm:text-sm mb-1">
                    Tab &amp; Tombol &quot;Teks Wacana&quot; Selalu Siaga
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Jangan menebak! Kamu bisa membuka bacaan wacana kapan saja dengan mengklik tombol <strong>&quot;Teks Wacana&quot;</strong> di bilah atas atau tab wacana di sisi kanan layar untuk memverifikasi kutipan teks.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-300 text-xs sm:text-sm mb-1">
                    Bisa Bermain Mandiri Maupun Gotong Royong
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Tersedia mode <strong>Individu (1 Siswa)</strong> atau <strong>Tim Gotong Royong (2–5 Siswa)</strong>. Saat bermain dalam tim, seluruh nama anggota akan tertera secara resmi pada piagam penghargaan kelulusan!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 text-stone-300" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-200 text-xs sm:text-sm mb-1">
                    Musik Trendy Pengiring Fokus Belajar
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Dilengkapi pemutar musik dengan 3 pilihan aransemen (Pop Trendy, Lo-Fi Chill, &amp; Petualangan Alam). Kamu dapat mengatur volume atau mematikan musik sewaktu-waktu.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SISTEM SKOR & PIAGAM */}
          {activeTab === 'skor' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <h4 className="font-bold text-amber-300 text-xs sm:text-sm mb-2">
                  Struktur Perhitungan Nilai (Skala 0 – 100)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
                  <div className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">Soal Pokok (Pos 1–3)</span>
                    <span className="text-base font-bold font-mono text-emerald-400">45 Poin</span>
                    <span className="text-[10px] text-stone-500 block">30 Soal (@1.5 poin)</span>
                  </div>
                  <div className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">Misi Bonus Uraian</span>
                    <span className="text-base font-bold font-mono text-amber-400">15 Poin</span>
                    <span className="text-[10px] text-stone-500 block">5 Soal (@3 poin)</span>
                  </div>
                  <div className="bg-stone-900/90 p-2.5 rounded-xl border border-emerald-500/30 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-emerald-300 block">Nilai Maksimal</span>
                    <span className="text-lg font-black font-mono text-emerald-400">100</span>
                    <span className="text-[10px] text-emerald-200/70 block">Konversi Otomatis</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <h4 className="font-bold text-stone-200 text-xs sm:text-sm mb-2">
                  Tingkatan Predikat Literasi:
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
                    <span className="font-bold text-emerald-300">Nilai 90 – 100</span>
                    <span className="text-stone-300">Pahlawan Ekologi Sangat Mahir (A+)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-sky-950/40 border border-sky-500/20">
                    <span className="font-bold text-sky-300">Nilai 75 – 89</span>
                    <span className="text-stone-300">Duta Konservasi Cakap (A)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/40 border border-amber-500/20">
                    <span className="font-bold text-amber-300">Nilai 60 – 74</span>
                    <span className="text-stone-300">Penjelajah Hijau Berkembang (B)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-bold text-stone-400">Nilai &lt; 60</span>
                    <span className="text-stone-400">Perintis Literasi Pemula (C)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>Piagam Penghargaan Resmi:</strong> Di akhir petualangan, kamu dapat mencetak atau mengunduh Piagam Berpenghargaan resmi bertandatangan dari SMPN Satu Atap Situgede!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-400 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Baca teliti wacana untuk raih skor sempurna 100!</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isPreGameBriefing && onConfirmStart ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                >
                  Ubah Profil
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playVictory();
                    onConfirmStart();
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/60 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Saya Siap, Masuk Pos 1!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Tutup Petunjuk
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
