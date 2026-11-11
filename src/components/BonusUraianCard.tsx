/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UraianQuestion } from '../types/game';
import { Award, CheckCircle, FileText, ArrowRight, ArrowLeft, Send, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface BonusUraianCardProps {
  question: UraianQuestion;
  currentIndex: number;
  totalInPos: number;
  userState?: { text: string; score: number; reviewed: boolean };
  onSaveAnswer: (questionId: number, text: string, score: number, reviewed: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onJumpToWacana: (ref: 'wacana1' | 'wacana2' | 'keduanya') => void;
}

export const BonusUraianCard: React.FC<BonusUraianCardProps> = ({
  question,
  currentIndex,
  totalInPos,
  userState,
  onSaveAnswer,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  onJumpToWacana
}) => {
  const [text, setText] = useState<string>(userState?.text || '');
  const [score, setScore] = useState<number>(userState?.score ?? (userState?.text ? 2 : 3));
  const [isRubricOpen, setIsRubricOpen] = useState<boolean>(userState?.reviewed || false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(userState?.reviewed || false);

  // Sync state if question changes
  React.useEffect(() => {
    setText(userState?.text || '');
    setScore(userState?.score ?? (userState?.text ? 2 : 3));
    setIsRubricOpen(userState?.reviewed || false);
    setIsSubmitted(userState?.reviewed || false);
  }, [question.id, userState]);

  const handleOpenRubric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sound.playSelect();
    setIsRubricOpen(true);
  };

  const handleSelectScore = (newScore: number) => {
    sound.playClick();
    setScore(newScore);
  };

  const handleKirimNilaiMandiri = () => {
    if (!text.trim()) return;
    sound.playCorrect();
    setIsSubmitted(true);
    onSaveAnswer(question.id, text, score, true);
  };

  const handleEditSubmission = () => {
    sound.playClick();
    setIsSubmitted(false);
  };

  return (
    <div className="w-full bg-stone-900 border border-amber-500/30 rounded-2xl p-5 sm:p-7 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-400">
              Soal Uraian {question.id}
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              Misi Konservasi (0–3 Poin)
            </span>
          </div>

          <button
            type="button"
            onClick={() => onJumpToWacana(question.wacanaRef)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 cursor-pointer"
          >
            Lihat {question.wacanaRef === 'wacana1' ? 'Wacana 1' : question.wacanaRef === 'wacana2' ? 'Wacana 2' : 'Kedua Wacana'}
          </button>
        </div>

        {/* Prompt */}
        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-bold text-stone-100 leading-relaxed font-heading mb-3">
            {question.prompt}
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Tuliskan uraian pemikiranmu secara terperinci. Setelah menulis, buka pedoman rubrik untuk memeriksa contoh jawaban acuan, lalu kirim nilai mandiri menurut pertimbanganmu sendiri.
          </p>
        </div>

        {/* Student Text Area Input */}
        <form onSubmit={handleOpenRubric} className="space-y-3 mb-5">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (isSubmitted) setIsSubmitted(false);
            }}
            placeholder="Tuliskan uraian jawaban lengkapmu di sini..."
            className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 leading-relaxed"
          />

          {!isRubricOpen && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!text.trim()}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Periksa Pedoman Rubrik &amp; Tentukan Nilai</span>
              </button>
            </div>
          )}
        </form>

        {/* Rubric and Self-Scoring Section */}
        {isRubricOpen && (
          <div className="space-y-4 pt-4 border-t border-stone-800 animate-fade-in">
            {/* Model Answer Box */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Contoh Jawaban Acuan:</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line font-normal">
                {question.sampleAnswer}
              </p>
            </div>

            {/* Rubric Guide Box */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Pedoman Penskoran:</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed whitespace-pre-line">
                {question.rubric}
              </p>

              {/* Self-Score Selection */}
              <div className="mt-4 pt-3 border-t border-stone-800/80">
                <label className="block text-xs font-bold text-amber-300 mb-2">
                  Tentukan nilai menurut penilaian dirimu sendiri (0 – 3 Poin):
                </label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[0, 1, 2, 3].map((pt) => {
                    const isSelected = score === pt;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => handleSelectScore(pt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md ring-2 ring-amber-400/50'
                            : 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <span className="text-sm font-mono font-black">{pt} Poin</span>
                        <span className="text-[10px] font-normal opacity-80 mt-0.5">
                          {pt === 3 && 'Sempurna'}
                          {pt === 2 && 'Cukup Lengkap'}
                          {pt === 1 && 'Sebagian'}
                          {pt === 0 && 'Belum Sesuai'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* THE "KIRIM" BUTTON & CONFIRMATION AFTER SELF-SCORING */}
                <div className="pt-2">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleKirimNilaiMandiri}
                      disabled={!text.trim()}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-950/70 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Jawaban &amp; Nilai Mandiri ({score} Poin)</span>
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-emerald-300 block">
                            Terkirim! Nilai Mandiri: {score} Poin
                          </span>
                          <span className="text-[11px] text-stone-400">
                            Jawaban dan skor menurut pertimbanganmu berhasil disimpan.
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleEditSubmission}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 self-end sm:self-center"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Ubah Nilai</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-stone-800 flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs font-mono text-stone-500">
          Uraian {currentIndex + 1} / {totalInPos}
        </span>

        {hasNext ? (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Berikutnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-black shadow-lg shadow-amber-950/70 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse"
          >
            <span>Selesai Ekspedisi &amp; Klaim Piagam 🏆</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
