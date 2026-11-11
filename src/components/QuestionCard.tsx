/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QuizQuestion, PGQuestion, PGKQuestion, BenarSalahQuestion, IsianQuestion } from '../types/game';
import { Check, X, ArrowRight, ArrowLeft, Lightbulb, CheckSquare, Square, CornerDownLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalInPos: number;
  userAnswer: string | string[] | boolean | null;
  onAnswer: (questionId: number, answer: string | string[] | boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  nextPosLabel?: string;
  onJumpToWacana: (ref: 'wacana1' | 'wacana2' | 'keduanya') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalInPos,
  userAnswer,
  onAnswer,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  nextPosLabel,
  onJumpToWacana
}) => {
  const [typedInput, setTypedInput] = useState<string>('');
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Sync state when question changes
  useEffect(() => {
    setShowExplanation(false);
    if (question.type === 'isian') {
      setTypedInput(typeof userAnswer === 'string' ? userAnswer : '');
    } else if (question.type === 'pgk') {
      setSelectedMulti(Array.isArray(userAnswer) ? userAnswer : []);
    }
  }, [question.id, userAnswer, question.type]);

  // Keyboard shortcut listener for options (1->A, 2->B, 3->C, 4->D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (question.type === 'pg') {
        const keyMap: Record<string, string> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', a: 'A', b: 'B', c: 'C', d: 'D' };
        if (keyMap[e.key.toLowerCase()]) {
          handleSelectPG(keyMap[e.key.toLowerCase()]);
        }
      } else if (question.type === 'benar_salah') {
        if (e.key === '1' || e.key.toLowerCase() === 'b') {
          handleSelectBenarSalah(true);
        } else if (e.key === '2' || e.key.toLowerCase() === 's') {
          handleSelectBenarSalah(false);
        }
      }

      if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, hasNext, hasPrev, onNext, onPrev]);

  // Handlers
  const handleSelectPG = (key: string) => {
    const q = question as PGQuestion;
    const isCorrect = key === q.correctKey;
    if (isCorrect) sound.playCorrect();
    else sound.playWrong();
    onAnswer(question.id, key);
  };

  const handleToggleMulti = (key: string) => {
    sound.playClick();
    const updated = selectedMulti.includes(key)
      ? selectedMulti.filter((k) => k !== key)
      : [...selectedMulti, key];
    setSelectedMulti(updated);
  };

  const handleSubmitMulti = () => {
    const q = question as PGKQuestion;
    const isAllCorrect =
      q.correctKeys.length === selectedMulti.length &&
      q.correctKeys.every((k) => selectedMulti.includes(k));

    if (isAllCorrect) sound.playCorrect();
    else sound.playWrong();

    onAnswer(question.id, selectedMulti);
  };

  const handleSelectBenarSalah = (val: boolean) => {
    const q = question as BenarSalahQuestion;
    if (val === q.correctAnswer) sound.playCorrect();
    else sound.playWrong();
    onAnswer(question.id, val);
  };

  const handleSubmitIsian = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = typedInput.trim().toLowerCase();
    if (!clean) return;

    const q = question as IsianQuestion;
    const isCorrect = q.acceptedAnswers.some(
      (acc) => acc.trim().toLowerCase() === clean
    );

    if (isCorrect) sound.playCorrect();
    else sound.playWrong();

    onAnswer(question.id, typedInput.trim());
  };

  // Determine correctness for badge & styling
  let isAnswered = false;
  let isCorrect = false;

  if (question.type === 'pg') {
    isAnswered = typeof userAnswer === 'string' && !!userAnswer;
    isCorrect = userAnswer === (question as PGQuestion).correctKey;
  } else if (question.type === 'pgk') {
    isAnswered = Array.isArray(userAnswer) && userAnswer.length > 0;
    const q = question as PGKQuestion;
    isCorrect =
      Array.isArray(userAnswer) &&
      q.correctKeys.length === userAnswer.length &&
      q.correctKeys.every((k) => userAnswer.includes(k));
  } else if (question.type === 'benar_salah') {
    isAnswered = typeof userAnswer === 'boolean';
    isCorrect = userAnswer === (question as BenarSalahQuestion).correctAnswer;
  } else if (question.type === 'isian') {
    isAnswered = typeof userAnswer === 'string' && userAnswer.trim().length > 0;
    const q = question as IsianQuestion;
    isCorrect =
      typeof userAnswer === 'string' &&
      q.acceptedAnswers.some(
        (acc) => acc.trim().toLowerCase() === userAnswer.trim().toLowerCase()
      );
  }

  return (
    <div className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl flex flex-col justify-between">
      {/* Top Header of Card */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              Soal {question.id}
            </span>
            <span className="text-xs text-stone-400 font-medium capitalize">
              {question.type === 'pg' && 'Pilihan Ganda'}
              {question.type === 'pgk' && 'Pilihan Ganda Kompleks (Bisa > 1)'}
              {question.type === 'benar_salah' && 'Benar / Salah'}
              {question.type === 'isian' && 'Isian Singkat'}
            </span>
            <span className="text-stone-600">·</span>
            <span className="text-xs text-stone-400 font-mono">
              Bobot: {question.points} Poin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJumpToWacana(question.wacanaRef)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 cursor-pointer"
            >
              Lihat {question.wacanaRef === 'wacana1' ? 'Wacana 1' : question.wacanaRef === 'wacana2' ? 'Wacana 2' : 'Kedua Wacana'}
            </button>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-semibold text-stone-100 leading-relaxed mb-6 font-heading">
          {question.type === 'benar_salah' ? (
            <>
              <span className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                {question.question}
              </span>
              <span className="italic font-normal text-stone-200 block p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                &ldquo;{(question as BenarSalahQuestion).statement}&rdquo;
              </span>
            </>
          ) : question.type === 'isian' ? (
            <>
              <span className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                {question.question}
              </span>
              <span className="font-medium text-stone-200 block p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                {(question as IsianQuestion).prompt}
              </span>
            </>
          ) : (
            question.question
          )}
        </h3>

        {/* Answer interactive choices */}
        {/* TYPE 1: PG (Single Choice) */}
        {question.type === 'pg' && (
          <div className="space-y-2.5 mb-6">
            {(question as PGQuestion).options.map((opt, idx) => {
              const isSelected = userAnswer === opt.key;
              const isCorrectKey = opt.key === (question as PGQuestion).correctKey;
              const showResult = isAnswered;

              let btnStyle = 'bg-stone-950/70 border-stone-800 text-stone-200 hover:bg-stone-800/80 hover:border-stone-700';
              if (showResult) {
                if (isSelected && isCorrectKey) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrectKey) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                } else if (!isSelected && isCorrectKey) {
                  btnStyle = 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectPG(opt.key)}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-stone-900 border border-stone-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                  <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">[{idx + 1}]</span>
                </button>
              );
            })}
          </div>
        )}

        {/* TYPE 2: PGK (Multiple Choice Complex) */}
        {question.type === 'pgk' && (
          <div className="space-y-2.5 mb-6">
            <p className="text-xs text-stone-400 mb-1">
              Pilih satu atau lebih pilihan yang benar, lalu klik &quot;Kirim Pilihan&quot;:
            </p>
            {(question as PGKQuestion).options.map((opt) => {
              const isChecked = selectedMulti.includes(opt.key);
              const isAnsweredState = Array.isArray(userAnswer) && userAnswer.length > 0;
              const isCorrectKey = (question as PGKQuestion).correctKeys.includes(opt.key);

              let optionStyle = isChecked
                ? 'bg-stone-800/90 border-emerald-500/80 text-stone-100'
                : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-800/50';

              if (isAnsweredState) {
                if (isChecked && isCorrectKey) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                } else if (isChecked && !isCorrectKey) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else if (!isChecked && isCorrectKey) {
                  optionStyle = 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleToggleMulti(opt.key)}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-start gap-3 transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="mt-0.5 shrink-0 text-emerald-400">
                    {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-stone-600" />}
                  </div>
                  <span className="w-5 h-5 rounded bg-stone-900 border border-stone-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                </button>
              );
            })}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmitMulti}
                disabled={selectedMulti.length === 0}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Kirim Pilihan ({selectedMulti.length} dipilih)</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TYPE 3: BENAR / SALAH */}
        {question.type === 'benar_salah' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleSelectBenarSalah(true)}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                userAnswer === true
                  ? (question as BenarSalahQuestion).correctAnswer === true
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : 'bg-stone-950/70 border-stone-800 text-stone-200 hover:bg-stone-800/80'
              }`}
            >
              <Check className="w-6 h-6 text-emerald-400" />
              <span className="font-heading font-bold text-base">BENAR</span>
              <span className="text-[10px] font-mono text-stone-500">[Tekan 1 / B]</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectBenarSalah(false)}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                userAnswer === false
                  ? (question as BenarSalahQuestion).correctAnswer === false
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : 'bg-stone-950/70 border-stone-800 text-stone-200 hover:bg-stone-800/80'
              }`}
            >
              <X className="w-6 h-6 text-rose-400" />
              <span className="font-heading font-bold text-base">SALAH</span>
              <span className="text-[10px] font-mono text-stone-500">[Tekan 2 / S]</span>
            </button>
          </div>
        )}

        {/* TYPE 4: ISIAN SINGKAT */}
        {question.type === 'isian' && (
          <form onSubmit={handleSubmitIsian} className="space-y-3 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik jawabanmu di sini..."
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer shrink-0"
              >
                Kirim
              </button>
            </div>
            <div className="text-[11px] text-stone-400">
              Jawaban bersifat fleksibel (contoh: angka atau huruf, kata kunci sesuai wacana).
            </div>
          </form>
        )}

        {/* Feedback & Pembahasan Banner */}
        {isAnswered && (
          <div
            className={`p-3.5 rounded-xl mb-4 border transition-all ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="text-xs font-bold">
                  {isCorrect ? 'Jawaban Benar! (+ ' + question.points + ' Poin)' : 'Belum Tepat'}
                </span>
              </div>

              {question.explanation && (
                <button
                  type="button"
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showExplanation ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}</span>
                </button>
              )}
            </div>

            {showExplanation && question.explanation && (
              <p className="mt-2.5 pt-2 border-t border-stone-800 text-xs leading-relaxed text-stone-300">
                {question.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
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
          {currentIndex + 1} / {totalInPos}
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
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse"
          >
            <span>Selesai &amp; Masuk ke {nextPosLabel || 'Pos Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
