/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Compass, Award, Users, User, Plus, Trash2, ChevronRight, Waves, Home, Truck, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { StudentProfile } from '../types/game';
import { GradeLevel, CURRICULA } from '../data/curriculum';
import { TrendyMusicPlayer } from './TrendyMusicPlayer';
import { PetunjukPermainanModal } from './PetunjukPermainanModal';

interface TitleScreenProps {
  onStart: (profile: StudentProfile) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenLeaderboard: () => void;
  savedScoresCount: number;
  initialGrade?: GradeLevel;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  isMuted,
  onToggleMute,
  onOpenLeaderboard,
  savedScoresCount,
  initialGrade = 'Kelas VIII'
}) => {
  const [playMode, setPlayMode] = useState<'solo' | 'team'>('solo');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('Tim Literasi Spensit');
  const [teamMembers, setTeamMembers] = useState<string[]>(['Siti Rahma', 'Rizki Pratama']);
  const [school, setSchool] = useState('SMPN Satu Atap Situgede (Spensit-Bersatu)');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<StudentProfile | null>(null);

  const activeCurriculum = CURRICULA[selectedGrade];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !showProfileModal && (document.activeElement?.tagName !== 'INPUT')) {
        sound.playSelect();
        setShowProfileModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showProfileModal]);

  const handleAddMember = () => {
    if (teamMembers.length < 5) {
      sound.playClick();
      setTeamMembers([...teamMembers, '']);
    }
  };

  const handleRemoveMember = (idx: number) => {
    sound.playClick();
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleMemberChange = (idx: number, val: string) => {
    const updated = [...teamMembers];
    updated[idx] = val;
    setTeamMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();

    let prof: StudentProfile;
    if (playMode === 'team') {
      const leaderName = name.trim() || 'Dimas (Ketua Tim)';
      const validMembers = teamMembers.map((m) => m.trim()).filter(Boolean);
      const allMembers = [leaderName, ...validMembers];

      prof = {
        mode: 'team',
        name: leaderName,
        teamName: teamName.trim() || 'Tim Literasi Spensit',
        teamMembers: allMembers,
        school: school.trim() || 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: selectedGrade
      };
    } else {
      const finalName = name.trim() || 'Pelajar Cendekia';
      prof = {
        mode: 'solo',
        name: finalName,
        school: school.trim() || 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: selectedGrade
      };
    }

    // Direct user to Game Guide Briefing before entering the game
    setPendingProfile(prof);
    setShowProfileModal(false);
    setShowGuideModal(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-stone-950 text-stone-100 select-none">
      {/* Background Hero Layer according to selected Grade */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeCurriculum.heroImage}
          alt={activeCurriculum.themeTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[14000ms] opacity-40 filter brightness-90 contrast-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/60 to-stone-950/90" />
      </div>

      {/* Top Header & Official School Logo */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Official SMPN SATU ATAP SITUGEDE Logo */}
          <div className="w-12 h-12 rounded-xl bg-stone-900/90 border border-emerald-500/40 p-1 flex items-center justify-center shadow-lg shrink-0">
            <img
              src="/logo.png"
              alt="Logo Resmi SMPN Satu Atap Situgede"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wider text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Spensit-Bersatu
              </span>
              <span className="text-stone-600 hidden sm:inline">·</span>
              <span className="text-xs text-amber-400 font-semibold">
                Pengembang: Kemis Wigunawan
              </span>
            </div>
            <div className="text-xs text-stone-300 font-medium mt-0.5">
              SMPN Satu Atap Situgede · Kabupaten Kuningan
            </div>
          </div>
        </div>

        {/* Music Player & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Trendy Music Player Component */}
          <TrendyMusicPlayer isMuted={isMuted} onToggleMute={onToggleMute} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col items-center text-center my-auto">
        {/* Class Level Selector Bar (Bebas Memilih Kelas 7, 8, 9) */}
        <div className="mb-5 w-full max-w-2xl">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span>PILIH TINGKAT KELAS KAMU:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-950/90 rounded-2xl border border-stone-800 shadow-xl backdrop-blur-md">
            {/* Kelas 7 Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedGrade('Kelas VII');
              }}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedGrade === 'Kelas VII'
                  ? 'bg-sky-900/70 border border-sky-400 text-white shadow-lg'
                  : 'bg-stone-900/50 hover:bg-stone-800/80 border border-transparent text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black text-sky-400">KELAS VII</span>
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-[11px] font-semibold text-stone-200 mt-1 leading-snug">
                Curug Landung
              </div>
              <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                Deskripsi &amp; Pantun
              </div>
            </button>

            {/* Kelas 8 Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedGrade('Kelas VIII');
              }}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedGrade === 'Kelas VIII'
                  ? 'bg-emerald-900/70 border border-emerald-400 text-white shadow-lg'
                  : 'bg-stone-900/50 hover:bg-stone-800/80 border border-transparent text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black text-emerald-400">KELAS VIII</span>
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-[11px] font-semibold text-stone-200 mt-1 leading-snug">
                Lereng Anjung
              </div>
              <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                Berita &amp; Iklan Sinapeul
              </div>
            </button>

            {/* Kelas 9 Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedGrade('Kelas IX');
              }}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedGrade === 'Kelas IX'
                  ? 'bg-amber-900/70 border border-amber-400 text-white shadow-lg'
                  : 'bg-stone-900/50 hover:bg-stone-800/80 border border-transparent text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black text-amber-400">KELAS IX</span>
                <Truck className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-[11px] font-semibold text-stone-200 mt-1 leading-snug">
                Mobil Idamanku
              </div>
              <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                Rumah &amp; Mobil 4x4
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Title Lockup with School Logo Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium mb-3">
          <img
            src="/logo.png"
            alt="Emblem Situgede"
            referrerPolicy="no-referrer"
            className="w-4 h-4 object-contain inline-block"
          />
          <span>Identitas: Spensit-Bersatu</span>
          <span>·</span>
          <span>{activeCurriculum.gradeBadge}</span>
          <span>·</span>
          <span>35 Tantangan Literasi</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-heading text-stone-100 max-w-4xl leading-[1.1] mb-3">
          {activeCurriculum.themeTitle}
        </h1>
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl font-normal leading-relaxed mb-6">
          {activeCurriculum.themeSubtitle}
        </p>

        {/* Action Buttons: Solo/Team CTA + Petunjuk Permainan + Class Leaderboard */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              setShowProfileModal(true);
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Petualangan {selectedGrade}</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setPendingProfile(null);
              setShowGuideModal(true);
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Petunjuk Permainan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Papan Rekap Nilai ({savedScoresCount})</span>
          </button>
        </div>

        {/* 3 Pos Cards Preview for Active Curriculum */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 w-full max-w-3xl text-left">
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{activeCurriculum.posInfo.pos1.title.split(':')[0]}</span>
            </div>
            <div className="text-xs font-semibold text-stone-200 mb-0.5">
              {activeCurriculum.posInfo.pos1.subtitle}
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
              {activeCurriculum.posInfo.pos1.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{activeCurriculum.posInfo.pos2.title.split(':')[0]}</span>
            </div>
            <div className="text-xs font-semibold text-stone-200 mb-0.5">
              {activeCurriculum.posInfo.pos2.subtitle}
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
              {activeCurriculum.posInfo.pos2.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-1">
              <Award className="w-4 h-4 shrink-0" />
              <span>{activeCurriculum.posInfo.pos3.title.split(':')[0]} &amp; Bonus</span>
            </div>
            <div className="text-xs font-semibold text-stone-200 mb-0.5">
              {activeCurriculum.posInfo.pos3.subtitle}
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
              Sintesis kedua wacana dan 5 soal uraian dengan rubrik penskoran mandiri (0–3).
            </p>
          </div>
        </div>
      </main>

      {/* Flat Control Hints Footer */}
      <footer className="relative z-10 w-full py-3.5 border-t border-stone-800/70 bg-stone-950/85 text-stone-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-stone-300">Kontrol Cepat:</span>
            <span className="font-mono bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800 text-stone-300 text-[11px]">Space/Enter</span>
            <span>Mulai</span>
            <span className="text-stone-700">·</span>
            <span className="font-mono bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800 text-stone-300 text-[11px]">1–4</span>
            <span>Pilih Opsi</span>
            <span className="text-stone-700">·</span>
            <span className="font-mono bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800 text-stone-300 text-[11px]">Tab Wacana</span>
            <span>Baca Teks</span>
          </div>
          <div className="text-stone-300 flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              referrerPolicy="no-referrer"
              className="w-4 h-4 object-contain inline-block"
            />
            <span>
              <strong className="text-emerald-400">Spensit-Bersatu</strong> · Pengembang: <span className="text-amber-400 font-semibold">Kemis Wigunawan</span> · Kuningan © 2026
            </span>
          </div>
        </div>
      </footer>

      {/* Modal Masuk Petualang (Student / Team Profile) */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-700 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Logo SMPN Satu Atap Situgede"
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 object-contain"
                />
                <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-100">
                  Pendaftaran Petualang Literasi
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {selectedGrade}
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-4">
              Pilih mode bermain: mandiri atau bersama tim kelompok gotong royong (2–5 siswa).
            </p>

            {/* Play Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800 mb-4">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPlayMode('solo');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'solo'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Individu (1 Siswa)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPlayMode('team');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'team'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Tim Gotong Royong (2–5)</span>
              </button>
            </div>

            {/* Grade Selection inside Modal */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Tingkat Kelas (Bebas Memilih)
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Kelas VII">Kelas VII · Curug Landung (Deskripsi &amp; Pantun)</option>
                <option value="Kelas VIII">Kelas VIII · Lereng Anjung (Berita &amp; Iklan Kopi)</option>
                <option value="Kelas IX">Kelas IX · Agribisnis Kopi (Rumah Megah &amp; Mobil Idamanku 4x4)</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {playMode === 'solo' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Nama Lengkap Siswa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dimas Aditya Pratama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                      Nama Kelompok / Tim
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tim Rajawali Spensit"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-500"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Nama Ketua Tim
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Dimas Aditya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                        Anggota Kelompok Lainnya
                      </label>
                      {teamMembers.length < 5 && (
                        <button
                          type="button"
                          onClick={handleAddMember}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Anggota</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {teamMembers.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            required
                            placeholder={`Anggota ${idx + 2} (misal: Siti Nurhaliza)`}
                            value={member}
                            onChange={(e) => handleMemberChange(idx, e.target.value)}
                            className="flex-1 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-emerald-500"
                          />
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(idx)}
                              className="p-2 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Hapus anggota"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Nama semua anggota kelompok akan dicetak lengkap di Piagam Penghargaan.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                  Nama Satuan Pendidikan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMPN Satu Atap Situgede (Spensit-Bersatu)"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-sm font-medium transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Lanjut ke Petunjuk &amp; Pos 1 →</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Petunjuk Permainan Modal (Game Instructions Briefing) */}
      <PetunjukPermainanModal
        isOpen={showGuideModal}
        onClose={() => {
          setShowGuideModal(false);
          // If cancelled during pre-game briefing, return user to profile modal
          if (pendingProfile) {
            setShowProfileModal(true);
          }
        }}
        onConfirmStart={() => {
          if (pendingProfile) {
            onStart(pendingProfile);
          } else {
            setShowGuideModal(false);
            setShowProfileModal(true);
          }
        }}
        profile={pendingProfile}
        selectedGrade={selectedGrade}
        isPreGameBriefing={Boolean(pendingProfile)}
      />
    </div>
  );
};
