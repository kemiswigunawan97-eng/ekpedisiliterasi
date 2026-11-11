/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PosId } from '../types/game';
import { BookOpen, CheckCircle2, Users, ArrowLeft, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { PosInfoItem } from '../data/curriculum';
import { TrendyMusicPlayer } from './TrendyMusicPlayer';

interface PosMapNavProps {
  currentPos: PosId;
  onSelectPos: (pos: PosId) => void;
  posProgress: Record<PosId, { answered: number; total: number; score: number }>;
  posInfo: Record<PosId, PosInfoItem>;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenWacana: () => void;
  onOpenLeaderboard: () => void;
  onFinishGame: () => void;
  studentName: string;
  gradeBadge: string;
  onBackToTitle?: () => void;
  onOpenGuide?: () => void;
}

export const PosMapNav: React.FC<PosMapNavProps> = ({
  currentPos,
  onSelectPos,
  posProgress,
  posInfo,
  isMuted,
  onToggleMute,
  onOpenWacana,
  onOpenLeaderboard,
  onFinishGame,
  studentName,
  gradeBadge,
  onBackToTitle,
  onOpenGuide
}) => {
  const posOrder: PosId[] = ['pos1', 'pos2', 'pos3', 'bonus'];

  const totalMainScore = (posProgress.pos1?.score || 0) + (posProgress.pos2?.score || 0) + (posProgress.pos3?.score || 0);
  const bonusScore = posProgress.bonus?.score || 0;
  const totalAnswered =
    (posProgress.pos1?.answered || 0) +
    (posProgress.pos2?.answered || 0) +
    (posProgress.pos3?.answered || 0) +
    (posProgress.bonus?.answered || 0);

  return (
    <header className="w-full bg-stone-950/90 border-b border-stone-800 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Official School Logo */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onBackToTitle && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBackToTitle();
              }}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 text-xs transition-colors cursor-pointer"
              title="Ganti Kelas / Menu Utama"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* School Logo */}
          <div className="w-8 h-8 rounded-lg bg-stone-900 border border-emerald-500/30 p-0.5 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="Logo SMPN Satu Atap Situgede"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-wider text-emerald-400 uppercase">
                Spensit-Bersatu
              </span>
              <span className="text-stone-600">·</span>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-950/70 border border-amber-500/30 px-1.5 py-0.2 rounded">
                {gradeBadge}
              </span>
            </div>
            <div className="text-xs font-semibold text-stone-200 truncate max-w-[120px] sm:max-w-xs">
              {studentName}
            </div>
          </div>
        </div>

        {/* Pos Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {posOrder.map((pid) => {
            const isCurrent = currentPos === pid;
            const progress = posProgress[pid];
            const isCompleted = progress && progress.answered >= progress.total;
            const info = posInfo[pid];
            const shortLabel = pid === 'bonus' ? 'Misi Bonus' : `Pos ${pid.slice(3)}`;
            const shortSub = info ? info.title.split(':')[1]?.trim() || info.subtitle : '';

            return (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectPos(pid);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                    : isCompleted
                    ? 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-emerald-500/30'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="leading-tight text-[11px] sm:text-xs">{shortLabel}</span>
                  <span className={`text-[10px] font-normal hidden lg:inline max-w-[110px] truncate ${isCurrent ? 'text-emerald-100' : 'text-stone-400'}`}>
                    {shortSub}
                  </span>
                </div>

                {isCompleted ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-emerald-200' : 'text-emerald-400'}`} />
                ) : (
                  <span className="text-[10px] font-mono tabular-nums opacity-80">
                    {progress?.answered ?? 0}/{progress?.total ?? 0}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Trendy Music, Scores, Nilai Kelas, Wacana */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Trendy Music Player for SMP Students */}
          <TrendyMusicPlayer isMuted={isMuted} onToggleMute={onToggleMute} />

          {/* Score cluster */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-stone-900 rounded-xl border border-stone-800 text-xs">
            <div>
              <span className="text-stone-400 text-[10px] block">Pokok</span>
              <span className="font-mono tabular-nums font-bold text-emerald-400">{totalMainScore}</span>
              <span className="text-stone-500 font-mono text-[11px]">/45</span>
            </div>
            <div className="w-px h-6 bg-stone-800" />
            <div>
              <span className="text-stone-400 text-[10px] block">Bonus</span>
              <span className="font-mono tabular-nums font-bold text-amber-400">+{bonusScore}</span>
              <span className="text-stone-500 font-mono text-[11px]">/15</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            title="Lihat Rekap Nilai Kelas"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Nilai Kelas</span>
          </button>

          {onOpenGuide && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenGuide();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
              title="Lihat Petunjuk & Panduan Permainan"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Petunjuk</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenWacana();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            title="Buka Teks Wacana & Bacaan"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Teks Wacana</span>
          </button>

          {/* Selesai / Piagam CTA if 15+ questions answered */}
          {totalAnswered >= 15 && (
            <button
              type="button"
              onClick={() => {
                sound.playVictory();
                onFinishGame();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer animate-pulse"
              title="Klaim Nilai & Terbitkan Piagam Penghargaan"
            >
              <span>Piagam</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
