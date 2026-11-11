/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Award, Printer, RotateCcw, CheckCircle, XCircle, Search, Sparkles, Users, Table } from 'lucide-react';
import { sound } from '../utils/audio';
import { StudentProfile, UserAnswerState, ClassScoreEntry } from '../types/game';
import { CurriculumData } from '../data/curriculum';
import { TrendyMusicPlayer } from './TrendyMusicPlayer';
import { GoogleSheetsSyncModal } from './GoogleSheetsSyncModal';

interface VictoryScreenProps {
  profile: StudentProfile;
  userAnswers: UserAnswerState;
  curriculum: CurriculumData;
  onRestart: () => void;
  onOpenLeaderboard: () => void;
  onRecordScore: (entry: ClassScoreEntry) => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  profile,
  userAnswers,
  curriculum,
  onRestart,
  onOpenLeaderboard,
  onRecordScore
}) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'sertifikat' | 'pembahasan'>('ringkasan');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [savedEntry, setSavedEntry] = useState<ClassScoreEntry | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const allQuestions = curriculum.allQuestions;
  const bonusQuestions = curriculum.bonusQuestions;

  // Calculate Scores
  let mainScore = 0;
  let correctCount = 0;
  let wrongCount = 0;

  allQuestions.forEach((q) => {
    if (q.type === 'pg') {
      const isCorrect = userAnswers.pgAnswers[q.id] === q.correctKey;
      if (isCorrect) {
        mainScore += q.points;
        correctCount++;
      } else if (userAnswers.pgAnswers[q.id]) {
        wrongCount++;
      }
    } else if (q.type === 'pgk') {
      const selected = userAnswers.pgkAnswers[q.id] || [];
      const isAll =
        q.correctKeys.length === selected.length &&
        q.correctKeys.every((k) => selected.includes(k));
      if (isAll) {
        mainScore += q.points;
        correctCount++;
      } else if (selected.length > 0) {
        wrongCount++;
      }
    } else if (q.type === 'benar_salah') {
      const ans = userAnswers.benarSalahAnswers[q.id];
      if (ans === q.correctAnswer) {
        mainScore += q.points;
        correctCount++;
      } else if (typeof ans === 'boolean') {
        wrongCount++;
      }
    } else if (q.type === 'isian') {
      const text = userAnswers.isianAnswers[q.id] || '';
      const isMatch = q.acceptedAnswers.some(
        (acc) => acc.trim().toLowerCase() === text.trim().toLowerCase()
      );
      if (isMatch) {
        mainScore += q.points;
        correctCount++;
      } else if (text.trim().length > 0) {
        wrongCount++;
      }
    }
  });

  // Bonus Uraian score
  let bonusScore = 0;
  bonusQuestions.forEach((bq) => {
    const item = userAnswers.uraianAnswers[bq.id];
    if (item && item.score) {
      bonusScore += item.score;
    }
  });

  const totalScore = mainScore + bonusScore; // max 45 + 15 = 60
  const nilaiSkala100 = Math.round((totalScore / 60) * 100);

  const getPredicate = (val: number) => {
    if (val >= 90) return { title: 'Pahlawan Ekologi Sangat Mahir', grade: 'A+' };
    if (val >= 78) return { title: 'Duta Konservasi Cakap', grade: 'A' };
    if (val >= 65) return { title: 'Sahabat Bibit Mahir', grade: 'B+' };
    return { title: 'Perintis Literasi Hijau', grade: 'B' };
  };

  const pred = getPredicate(nilaiSkala100);

  // Trigger celebration & record score on mount
  useEffect(() => {
    sound.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);

    // Save score to class records
    const displayName = profile.mode === 'team'
      ? (profile.teamName || profile.name)
      : profile.name;

    const entry: ClassScoreEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      mode: profile.mode,
      displayName,
      teamMembers: profile.teamMembers,
      school: profile.school,
      grade: profile.grade,
      mainScore,
      bonusScore,
      totalScore,
      finalGrade: nilaiSkala100,
      predicate: pred.title,
      completedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setSavedEntry(entry);
    onRecordScore(entry);

    return () => clearTimeout(timer);
  }, []);

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Tabs between Summary, Certificate, and Detailed Review */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('ringkasan');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ringkasan'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              Ringkasan Hasil
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('sertifikat');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'sertifikat'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              Sertifikat Resmi
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('pembahasan');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'pembahasan'
                  ? 'bg-stone-700 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              Kunci &amp; Pembahasan
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <TrendyMusicPlayer
              isMuted={sound.getMuted()}
              onToggleMute={() => sound.setMuted(!sound.getMuted())}
            />

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsSheetsModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              title="Sinkronkan Nilai Siswa ke Google Sheets"
            >
              <Table className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sinkron Google Sheets</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Nilai Kelas &amp; CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SUMMARY / RINGKASAN */}
        {activeTab === 'ringkasan' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hero Badge Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-emerald-950/60 to-stone-900 border border-emerald-500/30 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl">
                <img
                  src={curriculum.badgeImage}
                  alt={curriculum.themeTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center sm:text-left space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{curriculum.themeTitle} Tuntas</span>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                    Pengembang: Kemis Wigunawan
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-100">
                  Selamat, {profile.mode === 'team' ? (profile.teamName || profile.name) : profile.name}!
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                  {profile.mode === 'team' ? 'Tim kamu' : 'Kamu'} telah berhasil menuntaskan seluruh 35 pos tantangan literasi membaca untuk <strong>{profile.grade}</strong> ({curriculum.tagline}) bersama platform inovasi digital <strong>Spensit-Bersatu</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-400">
                  <span>Asal: <strong className="text-stone-200">{profile.school}</strong></span>
                  <span>·</span>
                  <span>Kelas: <strong className="text-stone-200">{profile.grade}</strong></span>
                  <span>·</span>
                  <span>Predikat: <strong className="text-amber-400">{pred.title}</strong></span>
                </div>
              </div>
            </div>

            {/* Score Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[11px] font-medium text-stone-400 block mb-1">Skor Pokok (Pos 1–3)</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">{mainScore}</span>
                  <span className="text-xs text-stone-500 font-mono">/ 45</span>
                </div>
                <span className="text-[10px] text-stone-500 block mt-1">30 Soal Terstruktur</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[11px] font-medium text-stone-400 block mb-1">Bonus Uraian</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-amber-400 tabular-nums">+{bonusScore}</span>
                  <span className="text-xs text-stone-500 font-mono">/ 15</span>
                </div>
                <span className="text-[10px] text-stone-500 block mt-1">5 Soal Refleksi Kritis</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-emerald-500/30">
                <span className="text-[11px] font-medium text-emerald-400 block mb-1">Total Skor Kumulatif</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-stone-100 tabular-nums">{totalScore}</span>
                  <span className="text-xs text-stone-500 font-mono">/ 60</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 block mt-1">Skor Gabungan</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[11px] font-medium text-stone-400 block mb-1">Nilai Akhir (Skala 100)</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-amber-300 tabular-nums">{nilaiSkala100}</span>
                  <span className="text-xs text-stone-500 font-mono">/ 100</span>
                </div>
                <span className="text-[10px] text-amber-400 block mt-1">Predikat: {pred.grade}</span>
              </div>
            </div>

            {/* Action CTA strip */}
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-stone-200">
                  Cetak Sertifikat Literasi Pembaca Cendekia ({profile.grade})
                </h4>
                <p className="text-xs text-stone-400">
                  Simpan sertifikat resmi berstempel dan tanda tangan pengembang Kemis Wigunawan &amp; Satuan Pendidikan Spensit-Bersatu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('sertifikat')}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
              >
                Lihat &amp; Cetak Sertifikat →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATE VIEW (Printable) */}
        {activeTab === 'sertifikat' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-end gap-2 print:hidden">
              <button
                type="button"
                onClick={handlePrintCertificate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>

            {/* Certificate Template */}
            <div
              ref={certificateRef}
              className="relative p-8 sm:p-12 rounded-2xl bg-stone-100 text-stone-900 border-8 border-double border-emerald-900 shadow-2xl overflow-hidden font-sans"
            >
              {/* Corner Watermarks */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-amber-700/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-center space-y-4 relative z-10">
                <div className="flex items-center justify-center gap-3.5">
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1 bg-white rounded-xl border-2 border-emerald-800 shadow">
                    <img
                      src="/logo.png"
                      alt="Logo Resmi SMPN Satu Atap Situgede"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-sm font-black tracking-widest text-emerald-950 uppercase">
                      SMPN SATU ATAP SITUGEDE · SPENSIT-BERSATU
                    </h3>
                    <p className="text-[11px] text-stone-600 font-medium">
                      Pemerintah Kabupaten Kuningan · Pengembang: Kemis Wigunawan
                    </p>
                    <p className="text-[10px] text-amber-900 font-semibold uppercase tracking-wider">
                      Literasi Membaca {curriculum.gradeBadge}
                    </p>
                  </div>
                </div>

                <div className="py-2">
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-950 font-heading uppercase">
                    Piagam Penghargaan Literasi
                  </h1>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-widest mt-1">
                    {curriculum.themeTitle} · {curriculum.tagline}
                  </p>
                </div>

                <div className="w-24 h-0.5 bg-amber-700/40 mx-auto" />

                <div className="py-2 space-y-1">
                  <p className="text-xs text-stone-600">
                    {profile.mode === 'team' ? 'Diberikan dengan penuh kehormatan kepada TIM:' : 'Diberikan dengan penuh kehormatan kepada:'}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading underline decoration-amber-600 underline-offset-8">
                    {profile.mode === 'team' ? (profile.teamName || profile.name) : profile.name}
                  </h2>
                  {profile.mode === 'team' && profile.teamMembers && profile.teamMembers.length > 0 && (
                    <div className="pt-2 text-xs font-semibold text-emerald-950 max-w-xl mx-auto">
                      <span className="text-[11px] font-normal text-stone-600 block">Anggota Tim Gotong Royong:</span>
                      <span className="font-bold">{profile.teamMembers.join(' · ')}</span>
                    </div>
                  )}
                  <p className="text-sm font-medium text-stone-700 pt-1">
                    {profile.school} · {profile.grade}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl mx-auto pt-2">
                  Atas kecakapan dan dedikasinya dalam menuntaskan 35 Tantangan Literasi Membaca pada materi <strong>{curriculum.themeTitle}</strong> dengan capaian predikat <strong>{pred.title}</strong> ({nilaiSkala100}/100).
                </p>

                {/* Score badge in certificate */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="text-center px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">Skor Pokok</span>
                    <span className="text-lg font-black font-mono text-emerald-900">{mainScore}/45</span>
                  </div>
                  <div className="text-center px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold block uppercase">Bonus Uraian</span>
                    <span className="text-lg font-black font-mono text-amber-900">+{bonusScore}/15</span>
                  </div>
                  <div className="text-center px-4 py-2 rounded-xl bg-stone-50 border border-stone-300">
                    <span className="text-[10px] text-stone-700 font-bold block uppercase">Total Nilai</span>
                    <span className="text-lg font-black font-mono text-stone-900">{nilaiSkala100} ({pred.grade})</span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-1 sm:grid-cols-3 pt-6 text-xs text-stone-800 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="h-10 flex items-center justify-center">
                      <span className="font-serif italic text-stone-600 text-sm">Kemis Wigunawan</span>
                    </div>
                    <div className="w-28 h-px bg-stone-400 mx-auto mb-1" />
                    <p className="font-bold">Kemis Wigunawan</p>
                    <p className="text-[10px] text-stone-500">Pengembang &amp; Guru Spensit-Bersatu</p>
                  </div>

                  <div className="text-center">
                    <div className="h-10 flex items-center justify-center">
                      <span className="font-serif italic text-stone-600 text-sm">Kepala Sekolah</span>
                    </div>
                    <div className="w-28 h-px bg-stone-400 mx-auto mb-1" />
                    <p className="font-bold">Kepala SMPN Satu Atap</p>
                    <p className="text-[10px] text-stone-500">Situgede · Kab. Kuningan</p>
                  </div>

                  <div className="text-center">
                    <div className="h-10 flex items-center justify-center">
                      <span className="font-serif italic text-stone-600 text-sm">Mitra Komunitas</span>
                    </div>
                    <div className="w-28 h-px bg-stone-400 mx-auto mb-1" />
                    <p className="font-bold">Mitra Komunitas Situgede</p>
                    <p className="text-[10px] text-stone-500">Kabupaten Kuningan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PEMBAHASAN LENGKAP */}
        {activeTab === 'pembahasan' && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter buttons */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400">
                Filter Pembahasan ({allQuestions.length} Soal Pokok + {bonusQuestions.length} Uraian):
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Semua ({allQuestions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Benar ({correctCount})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Salah ({wrongCount})
                </button>
              </div>
            </div>

            {/* Question Items list */}
            <div className="space-y-4">
              {allQuestions.map((q) => {
                let isQCorrect = false;
                let studentDisplay = '-';
                let keyDisplay = '';

                if (q.type === 'pg') {
                  const ans = userAnswers.pgAnswers[q.id];
                  isQCorrect = ans === q.correctKey;
                  studentDisplay = ans ? `${ans}. ${q.options.find((o) => o.key === ans)?.text}` : 'Belum dijawab';
                  keyDisplay = `${q.correctKey}. ${q.options.find((o) => o.key === q.correctKey)?.text}`;
                } else if (q.type === 'pgk') {
                  const ans = userAnswers.pgkAnswers[q.id] || [];
                  isQCorrect =
                    q.correctKeys.length === ans.length &&
                    q.correctKeys.every((k) => ans.includes(k));
                  studentDisplay = ans.length > 0 ? ans.join(', ') : 'Belum dijawab';
                  keyDisplay = q.correctKeys.join(', ');
                } else if (q.type === 'benar_salah') {
                  const ans = userAnswers.benarSalahAnswers[q.id];
                  isQCorrect = ans === q.correctAnswer;
                  studentDisplay = ans === true ? 'Benar' : ans === false ? 'Salah' : 'Belum dijawab';
                  keyDisplay = q.correctAnswer ? 'Benar' : 'Salah';
                } else if (q.type === 'isian') {
                  const ans = userAnswers.isianAnswers[q.id] || '';
                  isQCorrect = q.acceptedAnswers.some(
                    (acc) => acc.trim().toLowerCase() === ans.trim().toLowerCase()
                  );
                  studentDisplay = ans || 'Belum diisi';
                  keyDisplay = q.acceptedAnswers.join(' atau ');
                }

                if (reviewFilter === 'correct' && !isQCorrect) return null;
                if (reviewFilter === 'wrong' && isQCorrect) return null;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-950 text-stone-300">
                          Soal {q.id}
                        </span>
                        <span className="text-xs text-stone-400 capitalize">
                          {q.pos.toUpperCase()} · {q.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {isQCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Tepat (+{q.points} Poin)</span>
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Belum Tepat (0 Poin)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-stone-200">
                      {q.type === 'benar_salah' ? (
                        <>
                          {q.question} &ldquo;{q.statement}&rdquo;
                        </>
                      ) : q.type === 'isian' ? (
                        q.prompt
                      ) : (
                        q.question
                      )}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                        <span className="text-stone-500 block mb-0.5 font-medium">Jawabanmu:</span>
                        <span className={isQCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                          {studentDisplay}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                        <span className="text-emerald-400/80 block mb-0.5 font-medium">Kunci Resmi:</span>
                        <span className="text-emerald-300 font-semibold">{keyDisplay}</span>
                      </div>
                    </div>

                    {q.explanation && (
                      <p className="text-xs text-stone-400 bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80 leading-relaxed">
                        <strong className="text-stone-300">Penjelasan: </strong>
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Bonus Uraian Review */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-amber-400">
                  Hasil Misi Bonus (5 Soal Uraian Mandiri):
                </h4>
                {bonusQuestions.map((bq) => {
                  const userEssay = userAnswers.uraianAnswers[bq.id];
                  return (
                    <div key={bq.id} className="p-5 rounded-xl bg-stone-900 border border-amber-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                          Soal Uraian {bq.id}
                        </span>
                        <span className="text-xs font-semibold text-amber-400">
                          Skor Diraih: {userEssay?.score || 0} / {bq.maxScore} Poin
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-stone-200">{bq.prompt}</p>
                      <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs">
                        <span className="text-stone-500 block mb-1 font-semibold">Teks Jawaban Siswa/Tim:</span>
                        <p className="text-stone-300 whitespace-pre-wrap">{userEssay?.text || 'Tidak ada teks jawaban'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                        <span className="text-emerald-400 block mb-1 font-semibold">Contoh Jawaban Acuan:</span>
                        <p className="text-emerald-300 whitespace-pre-wrap">{bq.sampleAnswer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Sheets Sync Modal */}
      <GoogleSheetsSyncModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        scores={savedEntry ? [savedEntry] : []}
        currentStudentEntry={savedEntry || undefined}
      />
    </div>
  );
};
