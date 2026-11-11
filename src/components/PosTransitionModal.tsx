/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Compass, Award, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { PosId } from '../types/game';
import { PosInfoItem } from '../data/curriculum';

interface PosTransitionModalProps {
  isOpen: boolean;
  completedPos: PosId;
  targetPos: PosId;
  posInfo: Record<PosId, PosInfoItem>;
  onProceed: () => void;
  gradeBadge: string;
}

export const PosTransitionModal: React.FC<PosTransitionModalProps> = ({
  isOpen,
  completedPos,
  targetPos,
  posInfo,
  onProceed,
  gradeBadge
}) => {
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (!isOpen) return;
    sound.playPosCleared();
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, completedPos, targetPos]);

  if (!isOpen) return null;

  const completedInfo = posInfo[completedPos];
  const targetInfo = posInfo[targetPos];

  const getPosName = (id: PosId) => {
    if (id === 'pos1') return 'Pos 1: Informasi Tersurat';
    if (id === 'pos2') return 'Pos 2: Memahami & Menyimpulkan';
    if (id === 'pos3') return 'Pos 3: Evaluasi & Refleksi Kritis';
    return 'Pos Bonus: 5 Misi Uraian Reflektif';
  };

  const getTargetThemeColor = (id: PosId) => {
    if (id === 'pos2') return { border: 'border-sky-500/40', text: 'text-sky-400', bg: 'bg-sky-950/60', badge: 'bg-sky-900/60 text-sky-200 border-sky-400/40' };
    if (id === 'pos3') return { border: 'border-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-950/60', badge: 'bg-amber-900/60 text-amber-200 border-amber-400/40' };
    return { border: 'border-rose-500/40', text: 'text-rose-400', bg: 'bg-rose-950/60', badge: 'bg-rose-900/60 text-rose-200 border-rose-400/40' };
  };

  const colors = getTargetThemeColor(targetPos);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className={`relative w-full max-w-lg bg-stone-900 border ${colors.border} rounded-2xl p-6 sm:p-7 shadow-2xl text-stone-100 flex flex-col gap-4 text-center`}>
        {/* Animated Celebration Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/60 animate-bounce duration-1000">
          <CheckCircle2 className="w-9 h-9 text-emerald-400" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{getPosName(completedPos).split(':')[0]} Selesai Tuntas!</span>
            <span>·</span>
            <span>{gradeBadge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading text-stone-100 leading-tight">
            Selamat! Kamu Siap Melangkah
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Kerja bagus! Seluruh tantangan pada <strong className="text-emerald-300">{completedInfo?.subtitle || completedPos}</strong> telah kamu selesaikan.
          </p>
        </div>

        {/* Transition Announcement Box */}
        <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} text-left space-y-2 mt-1 shadow-inner`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-black uppercase tracking-wider ${colors.text} flex items-center gap-1.5`}>
              <Compass className="w-3.5 h-3.5" />
              <span>PEMBERITAHUAN EKSPEDISI</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}>
              Berikutnya
            </span>
          </div>

          <div className="text-base font-bold text-stone-100">
            Anda akan masuk ke <span className={colors.text}>{getPosName(targetPos)}</span>
          </div>

          <div className="text-xs text-stone-300 leading-relaxed">
            {targetInfo?.description || 'Tantangan literasi berikutnya siap menguji kecakapan dan ketelitian membacamu.'}
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex items-center gap-2 text-[11px] text-stone-400">
            <BookOpen className="w-3.5 h-3.5 text-stone-300" />
            <span>Fokus Bacaan: <strong>{targetInfo?.wacanaName || 'Teks Sumber'}</strong></span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onProceed();
            }}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/80 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Masuk ke {targetPos === 'bonus' ? 'Pos Bonus' : `Pos ${targetPos.slice(3)}`} Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[11px] text-stone-400">
          Otomatis berpindah dalam <span className="font-mono font-bold text-amber-400">{countdown} detik</span> atau klik tombol di atas.
        </div>
      </div>
    </div>
  );
};
