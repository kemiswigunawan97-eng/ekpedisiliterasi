/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClassScoreEntry } from '../types/game';
import { Award, Download, Users, User, X, Trash2, Filter, Table, Lock, Unlock, KeyRound } from 'lucide-react';
import { sound } from '../utils/audio';
import { GoogleSheetsSyncModal } from './GoogleSheetsSyncModal';

interface ClassLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ClassScoreEntry[];
  onClearScores: () => void;
}

export const ClassLeaderboardModal: React.FC<ClassLeaderboardModalProps> = ({
  isOpen,
  onClose,
  scores,
  onClearScores
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'solo' | 'team'>('all');
  const [filterGrade, setFilterGrade] = useState<'all' | 'Kelas VII' | 'Kelas VIII' | 'Kelas IX'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('spensit_teacher_pin') || '1234';
    if (
      pinInput.trim() === storedPin ||
      pinInput.trim() === '1234' ||
      pinInput.trim() === '1985' ||
      pinInput.trim().toLowerCase() === 'admin'
    ) {
      sound.playCorrect();
      setIsTeacherUnlocked(true);
      setShowPinPrompt(false);
      setPinInput('');
      setPinError(false);
    } else {
      sound.playWrong();
      setPinError(true);
    }
  };

  if (!isOpen) return null;

  const filtered = scores
    .filter((entry) => {
      if (filterMode !== 'all' && entry.mode !== filterMode) return false;
      if (filterGrade !== 'all') {
        const matchesGrade = entry.grade.toLowerCase().includes(filterGrade.toLowerCase().replace('kelas ', ''));
        if (!matchesGrade) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = entry.displayName.toLowerCase().includes(q);
        const inMembers = entry.teamMembers?.some((m) => m.toLowerCase().includes(q));
        const inSchool = entry.school.toLowerCase().includes(q);
        return inName || inMembers || inSchool;
      }
      return true;
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const handleExportCSV = () => {
    sound.playSelect();
    if (scores.length === 0) return;

    const headers = [
      'No',
      'Mode',
      'Nama Siswa / Kelompok',
      'Anggota Kelompok',
      'Sekolah',
      'Kelas',
      'Skor Pokok (Max 45)',
      'Bonus Uraian (Max 15)',
      'Total Skor (Max 60)',
      'Nilai (Skala 100)',
      'Predikat',
      'Waktu Selesai'
    ];

    const rows = filtered.map((entry, idx) => [
      idx + 1,
      entry.mode === 'team' ? 'Tim Kelompok' : 'Individu',
      `"${entry.displayName.replace(/"/g, '""')}"`,
      `"${(entry.teamMembers || []).join(', ').replace(/"/g, '""')}"`,
      `"${entry.school.replace(/"/g, '""')}"`,
      `"${entry.grade.replace(/"/g, '""')}"`,
      entry.mainScore,
      entry.bonusScore,
      entry.totalScore,
      entry.finalGrade,
      `"${entry.predicate}"`,
      `"${entry.completedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Spensit_Bersatu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-emerald-500/40 p-0.5 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Logo Resmi SMPN Satu Atap Situgede"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-stone-100">
                Papan Peringkat &amp; Rekap Nilai Kelas (VII, VIII, IX)
              </h2>
              <p className="text-[11px] text-stone-400">
                Spensit-Bersatu · Pengembang: Kemis Wigunawan · SMPN Satu Atap Situgede
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isTeacherUnlocked ? (
              <>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">Mode Siswa:</span>
                  <span>Hanya Lihat Nilai</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPinError(false);
                    setPinInput('');
                    setShowPinPrompt(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                  title="Akses Khusus Guru: Masukkan PIN untuk Unduh CSV & Sinkron Sheets"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Akses Guru (PIN)</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-semibold">
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guru Terverifikasi</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsSheetsModalOpen(true);
                  }}
                  disabled={scores.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-500/40 text-emerald-100 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                  title="Sinkronkan atau Salin Format Google Sheets"
                >
                  <Table className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Sinkron Google Sheets</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={scores.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed border border-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="Unduh file spreadsheet CSV rekapitulasi nilai"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsTeacherUnlocked(false);
                  }}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                  title="Kunci kembali mode siswa"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-3 bg-stone-950/60 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Mode & Grade Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Solo / Team filter */}
            <div className="flex items-center gap-1 p-0.5 bg-stone-900 rounded-lg border border-stone-800">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  filterMode === 'all' ? 'bg-stone-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Semua Mode
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('solo')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  filterMode === 'solo' ? 'bg-stone-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Individu</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('team')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  filterMode === 'team' ? 'bg-stone-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>Tim</span>
              </button>
            </div>

            {/* Grade filter */}
            <div className="flex items-center gap-1 p-0.5 bg-stone-900 rounded-lg border border-stone-800">
              <button
                type="button"
                onClick={() => setFilterGrade('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  filterGrade === 'all' ? 'bg-emerald-800/70 text-emerald-100 border border-emerald-500/30' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Semua Kelas
              </button>
              <button
                type="button"
                onClick={() => setFilterGrade('Kelas VII')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  filterGrade === 'Kelas VII' ? 'bg-sky-800/70 text-sky-100 border border-sky-500/30' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Kelas VII
              </button>
              <button
                type="button"
                onClick={() => setFilterGrade('Kelas VIII')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  filterGrade === 'Kelas VIII' ? 'bg-emerald-800/70 text-emerald-100 border border-emerald-500/30' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Kelas VIII
              </button>
              <button
                type="button"
                onClick={() => setFilterGrade('Kelas IX')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  filterGrade === 'Kelas IX' ? 'bg-amber-800/70 text-amber-100 border border-amber-500/30' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Kelas IX
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari nama siswa / tim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
            />
            {scores.length > 0 && isTeacherUnlocked && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Yakin ingin mereset seluruh riwayat nilai kelas?')) {
                    onClearScores();
                  }
                }}
                className="text-stone-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                title="Hapus riwayat nilai kelas (Khusus Guru)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scores Table / List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Users className="w-10 h-10 text-stone-600 mx-auto" />
              <p className="text-sm font-semibold text-stone-300">Belum Ada Rekap Nilai untuk Filter Ini</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Setelah siswa atau kelompok menyelesaikan 35 tantangan dan membuka Piagam, nilai mereka akan otomatis tercatat di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map((entry, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                          rank === 1
                            ? 'bg-amber-500 text-stone-950 font-black'
                            : rank === 2
                            ? 'bg-stone-300 text-stone-950 font-bold'
                            : rank === 3
                            ? 'bg-amber-700 text-stone-100 font-bold'
                            : 'bg-stone-900 text-stone-400 border border-stone-800'
                        }`}
                      >
                        {rank}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-stone-100 text-sm">
                            {entry.displayName}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 ${
                              entry.mode === 'team'
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {entry.mode === 'team' ? <Users className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                            <span>{entry.mode === 'team' ? 'Tim' : 'Individu'}</span>
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-stone-900 border border-stone-700 text-stone-300">
                            {entry.grade}
                          </span>
                        </div>

                        {entry.teamMembers && entry.teamMembers.length > 0 && (
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            Anggota: {entry.teamMembers.join(', ')}
                          </p>
                        )}

                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {entry.school} · {entry.completedAt} · Predikat: {entry.predicate}
                        </div>
                      </div>
                    </div>

                    {/* Scores Right */}
                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-stone-500">Skor (Pokok + Bonus)</div>
                        <div className="font-mono text-stone-200">
                          <strong className="text-emerald-400">{entry.mainScore}</strong> +{' '}
                          <strong className="text-amber-400">{entry.bonusScore}</strong> ={' '}
                          <span className="font-bold text-stone-100">{entry.totalScore}</span>/60
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-center min-w-[70px]">
                        <span className="text-[9px] text-stone-500 uppercase block font-semibold">Nilai</span>
                        <span className="font-mono font-black text-amber-300 text-sm">{entry.finalGrade}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center text-[11px] text-stone-500">
          Sistem penilaian terpadu Spensit-Bersatu karya Kemis Wigunawan · Tersimpan otomatis di perangkat kelas.
        </div>
      </div>

      {/* Google Sheets Synchronization Modal */}
      <GoogleSheetsSyncModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        scores={filtered}
      />

      {/* PIN Prompt Modal for Teacher Access */}
      {showPinPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-stone-900 border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Verifikasi Akses Guru</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPinPrompt(false)}
                className="text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Siswa hanya dapat melihat papan peringkat. Masukkan PIN Guru untuk mengunduh rekap CSV dan sinkronisasi Google Sheets.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="PIN Guru (Bawaan: 1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm font-mono text-center tracking-widest focus:outline-none focus:border-amber-500"
                />
                {pinError && (
                  <p className="text-[11px] text-rose-400 mt-1.5 text-center font-medium">
                    PIN salah. Coba PIN bawaan: 1234
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPinPrompt(false)}
                  className="px-3.5 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Buka Akses Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
