/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { PosMapNav } from './components/PosMapNav';
import { QuestionCard } from './components/QuestionCard';
import { BonusUraianCard } from './components/BonusUraianCard';
import { WacanaReader } from './components/WacanaReader';
import { CoffeeTreeCanvas } from './components/CoffeeTreeCanvas';
import { VictoryScreen } from './components/VictoryScreen';
import { getCurriculum, GradeLevel } from './data/curriculum';
import {
  GameStage,
  PosId,
  StudentProfile,
  UserAnswerState,
  ClassScoreEntry
} from './types/game';
import { ClassLeaderboardModal } from './components/ClassLeaderboardModal';
import { PetunjukPermainanModal } from './components/PetunjukPermainanModal';
import { PosTransitionModal } from './components/PosTransitionModal';
import { sound } from './utils/audio';
import { BookOpen, Sprout, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<GameStage>('TITLE');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    mode: 'solo',
    name: 'Pelajar Cendekia',
    school: 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
    grade: 'Kelas VIII'
  });

  // Current active curriculum based on selected grade
  const curriculum = getCurriculum(studentProfile.grade);

  // Classroom Leaderboard Modal State & Persistence
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [classScores, setClassScores] = useState<ClassScoreEntry[]>(() => {
    try {
      const saved = localStorage.getItem('spensit_class_scores');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'init-1',
        mode: 'team',
        displayName: 'Tim Kopi Robusta',
        teamMembers: ['Dimas Aditya (Ketua)', 'Siti Rahma', 'Rizki Pratama', 'Alya Zahra'],
        school: 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: 'Kelas VIII',
        mainScore: 43,
        bonusScore: 14,
        totalScore: 57,
        finalGrade: 95,
        predicate: 'Pahlawan Ekologi Sangat Mahir',
        completedAt: '08:45 WIB'
      },
      {
        id: 'init-2',
        mode: 'solo',
        displayName: 'Ahmad Fauzan',
        school: 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: 'Kelas VIII',
        mainScore: 41,
        bonusScore: 12,
        totalScore: 53,
        finalGrade: 88,
        predicate: 'Duta Konservasi Cakap',
        completedAt: '09:12 WIB'
      },
      {
        id: 'init-3',
        mode: 'solo',
        displayName: 'Nadia Putri',
        school: 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: 'Kelas VII',
        mainScore: 44,
        bonusScore: 15,
        totalScore: 59,
        finalGrade: 98,
        predicate: 'Pahlawan Ekologi Sangat Mahir',
        completedAt: '09:30 WIB'
      },
      {
        id: 'init-4',
        mode: 'team',
        displayName: 'Agropreneur Muda Situgede',
        teamMembers: ['Maman Suparman (Ketua)', 'Budi Santoso', 'Cici Paramida'],
        school: 'SMPN Satu Atap Situgede (Spensit-Bersatu)',
        grade: 'Kelas IX',
        mainScore: 42,
        bonusScore: 14,
        totalScore: 56,
        finalGrade: 93,
        predicate: 'Pahlawan Ekologi Sangat Mahir',
        completedAt: '10:05 WIB'
      }
    ];
  });

  const handleRecordScore = (entry: ClassScoreEntry) => {
    setClassScores((prev) => {
      if (prev.some((p) => p.id === entry.id)) return prev;
      const updated = [entry, ...prev];
      try {
        localStorage.setItem('spensit_class_scores', JSON.stringify(updated));
      } catch {
        // silent
      }
      return updated;
    });
  };

  const handleClearScores = () => {
    setClassScores([]);
    try {
      localStorage.removeItem('spensit_class_scores');
    } catch {
      // silent
    }
  };

  // Current Pos & Question index
  const [currentPos, setCurrentPos] = useState<PosId>('pos1');
  const [questionIndexes, setQuestionIndexes] = useState<Record<PosId, number>>({
    pos1: 0,
    pos2: 0,
    pos3: 0,
    bonus: 0
  });

  // User answers
  const [userAnswers, setUserAnswers] = useState<UserAnswerState>({
    pgAnswers: {},
    pgkAnswers: {},
    benarSalahAnswers: {},
    isianAnswers: {},
    uraianAnswers: {}
  });

  // Right pane mode on desktop: 'tree' | 'wacana'
  const [rightPaneTab, setRightPaneTab] = useState<'tree' | 'wacana'>('tree');
  // Wacana drawer modal for mobile / explicit trigger
  const [isWacanaModalOpen, setIsWacanaModalOpen] = useState<boolean>(false);
  const [wacanaHighlightRef, setWacanaHighlightRef] = useState<'wacana1' | 'wacana2' | 'keduanya'>('wacana1');
  // In-game Petunjuk Permainan guide modal
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  // Automatic Pos Transition State & Notice
  const [posTransition, setPosTransition] = useState<{
    isOpen: boolean;
    completedPos: PosId;
    targetPos: PosId;
  }>({
    isOpen: false,
    completedPos: 'pos1',
    targetPos: 'pos2'
  });

  // Toggle Mute
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  // Start game handler
  const handleStartGame = (profile: StudentProfile) => {
    setStudentProfile(profile);
    // Reset answers when beginning new expedition with a chosen class
    setUserAnswers({
      pgAnswers: {},
      pgkAnswers: {},
      benarSalahAnswers: {},
      isianAnswers: {},
      uraianAnswers: {}
    });
    setQuestionIndexes({ pos1: 0, pos2: 0, pos3: 0, bonus: 0 });
    setCurrentPos('pos1');
    setWacanaHighlightRef('wacana1');
    setStage('PLAYING');
  };

  // Answer handler for standard questions
  const handleStandardAnswer = (questionId: number, answer: string | string[] | boolean) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      if (typeof answer === 'string') {
        const isPg = curriculum.allQuestions.find((q) => q.id === questionId)?.type === 'pg';
        if (isPg) {
          next.pgAnswers = { ...next.pgAnswers, [questionId]: answer };
        } else {
          next.isianAnswers = { ...next.isianAnswers, [questionId]: answer };
        }
      } else if (Array.isArray(answer)) {
        next.pgkAnswers = { ...next.pgkAnswers, [questionId]: answer };
      } else if (typeof answer === 'boolean') {
        next.benarSalahAnswers = { ...next.benarSalahAnswers, [questionId]: answer };
      }
      return next;
    });

    // Automatically notify user and transition when the last question of a Pos is answered
    if (activeIndex === currentQuestionList.length - 1) {
      const order: PosId[] = ['pos1', 'pos2', 'pos3', 'bonus'];
      const curIdx = order.indexOf(currentPos);
      if (curIdx < order.length - 1) {
        const nextPos = order[curIdx + 1];
        setTimeout(() => {
          setPosTransition({
            isOpen: true,
            completedPos: currentPos,
            targetPos: nextPos
          });
        }, 1200);
      }
    }
  };

  // Handler to proceed to the target Pos after notification
  const handleProceedPos = () => {
    const nextPos = posTransition.targetPos;
    setPosTransition((prev) => ({ ...prev, isOpen: false }));
    sound.playPosCleared();
    setCurrentPos(nextPos);
    setQuestionIndexes((prev) => ({ ...prev, [nextPos]: 0 }));
    if (nextPos === 'pos1') setWacanaHighlightRef('wacana1');
    else if (nextPos === 'pos2') setWacanaHighlightRef('wacana2');
    else setWacanaHighlightRef('keduanya');
  };

  const getNextPosLabel = (pos: PosId) => {
    if (pos === 'pos1') return 'Pos 2: Memahami & Menyimpulkan';
    if (pos === 'pos2') return 'Pos 3: Evaluasi & Refleksi';
    if (pos === 'pos3') return 'Misi Bonus Uraian';
    return 'Klaim Piagam';
  };

  // Answer handler for bonus essay
  const handleUraianAnswer = (questionId: number, text: string, score: number, reviewed: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      uraianAnswers: {
        ...prev.uraianAnswers,
        [questionId]: { text, score, reviewed }
      }
    }));
  };

  // Calculate Progress by Pos for Active Curriculum
  const getPosProgress = (posId: PosId) => {
    let answered = 0;
    let total = 0;
    let score = 0;

    let qList: any[] = [];
    if (posId === 'pos1') qList = curriculum.pos1Questions;
    else if (posId === 'pos2') qList = curriculum.pos2Questions;
    else if (posId === 'pos3') qList = curriculum.pos3Questions;
    else if (posId === 'bonus') qList = curriculum.bonusQuestions;

    total = qList.length;

    if (posId === 'bonus') {
      curriculum.bonusQuestions.forEach((bq) => {
        const item = userAnswers.uraianAnswers[bq.id];
        if (item && item.reviewed) {
          answered++;
          score += item.score || 0;
        }
      });
    } else {
      qList.forEach((q) => {
        if (q.type === 'pg') {
          if (userAnswers.pgAnswers[q.id]) {
            answered++;
            if (userAnswers.pgAnswers[q.id] === q.correctKey) score += q.points;
          }
        } else if (q.type === 'pgk') {
          const sel = userAnswers.pgkAnswers[q.id];
          if (sel && sel.length > 0) {
            answered++;
            if (q.correctKeys.length === sel.length && q.correctKeys.every((k: string) => sel.includes(k))) {
              score += q.points;
            }
          }
        } else if (q.type === 'benar_salah') {
          const ans = userAnswers.benarSalahAnswers[q.id];
          if (typeof ans === 'boolean') {
            answered++;
            if (ans === q.correctAnswer) score += q.points;
          }
        } else if (q.type === 'isian') {
          const text = userAnswers.isianAnswers[q.id];
          if (text && text.trim().length > 0) {
            answered++;
            if (q.acceptedAnswers.some((a: string) => a.trim().toLowerCase() === text.trim().toLowerCase())) {
              score += q.points;
            }
          }
        }
      });
    }

    return { answered, total, score };
  };

  const posProgressMap: Record<PosId, { answered: number; total: number; score: number }> = {
    pos1: getPosProgress('pos1'),
    pos2: getPosProgress('pos2'),
    pos3: getPosProgress('pos3'),
    bonus: getPosProgress('bonus')
  };

  // Total answers & overall progress percent
  const totalQuestionsCount = curriculum.allQuestions.length + curriculum.bonusQuestions.length;
  const totalAnswered =
    posProgressMap.pos1.answered +
    posProgressMap.pos2.answered +
    posProgressMap.pos3.answered +
    posProgressMap.bonus.answered;
  const totalProgressPercent = Math.round((totalAnswered / totalQuestionsCount) * 100);

  // Active question in current Pos
  const activeIndex = questionIndexes[currentPos] || 0;
  let currentQuestionList: any[] = [];
  if (currentPos === 'pos1') currentQuestionList = curriculum.pos1Questions;
  else if (currentPos === 'pos2') currentQuestionList = curriculum.pos2Questions;
  else if (currentPos === 'pos3') currentQuestionList = curriculum.pos3Questions;
  else if (currentPos === 'bonus') currentQuestionList = curriculum.bonusQuestions;

  const activeQuestion = currentQuestionList[activeIndex] || currentQuestionList[0];

  // Jump to Wacana Reader
  const handleJumpToWacana = (ref: 'wacana1' | 'wacana2' | 'keduanya') => {
    sound.playClick();
    setWacanaHighlightRef(ref);
    setRightPaneTab('wacana');
    setIsWacanaModalOpen(true);
  };

  // Next and Prev question inside current Pos
  const handleNextQuestion = () => {
    sound.playClick();
    if (activeIndex < currentQuestionList.length - 1) {
      setQuestionIndexes((prev) => ({ ...prev, [currentPos]: activeIndex + 1 }));
    } else {
      // Transition to next Pos with announcement notice
      const order: PosId[] = ['pos1', 'pos2', 'pos3', 'bonus'];
      const currentIndexInOrder = order.indexOf(currentPos);
      if (currentIndexInOrder < order.length - 1) {
        const nextPos = order[currentIndexInOrder + 1];
        setPosTransition({
          isOpen: true,
          completedPos: currentPos,
          targetPos: nextPos
        });
      } else {
        // Last question in bonus: Finish game and show victory screen
        sound.playVictory();
        setStage('VICTORY');
      }
    }
  };

  const handlePrevQuestion = () => {
    sound.playClick();
    if (activeIndex > 0) {
      setQuestionIndexes((prev) => ({ ...prev, [currentPos]: activeIndex - 1 }));
    }
  };

  // Restart expedition
  const handleRestart = () => {
    setUserAnswers({
      pgAnswers: {},
      pgkAnswers: {},
      benarSalahAnswers: {},
      isianAnswers: {},
      uraianAnswers: {}
    });
    setQuestionIndexes({ pos1: 0, pos2: 0, pos3: 0, bonus: 0 });
    setCurrentPos('pos1');
    setStage('TITLE');
  };

  // Highlight keywords generator per grade
  const getKeywordsForGrade = () => {
    const g = studentProfile.grade;
    if (g.includes('VII') || g.includes('7')) {
      return [
        'Curug Landung',
        'Palutungan',
        'Cigugur',
        '30 meter',
        'Gunung Ciremai',
        'lumut hijau',
        'sampah plastik',
        'Bait',
        'selasih',
        'melati',
        'santun dan damai',
        'sampiran',
        'isi',
        'nasihat'
      ];
    }
    if (g.includes('IX') || g.includes('9')) {
      return [
        'Pak Maman',
        '15 ton',
        'rumah megah',
        'arsitektur modern tropis',
        'green-house',
        'galeri edukasi seduh',
        'CV Situgede Bersatu',
        'Mobil Idamanku',
        'pick-up double cabin 4x4',
        '2.000 polibag',
        'potongan tarif sewa 25%',
        '0813-9999-8888',
        'Situgede'
      ];
    }
    return [
      '300 pelajar',
      '1.000 bibit',
      'seribu bibit',
      'Gunung Anjung',
      'arabika, robusta, dan liberika',
      'menahan tanah',
      'Rahmawati',
      'Dimas',
      'GRATIS',
      'diskon 20%',
      'Sinapeul',
      'Situgede'
    ];
  };

  // If in TITLE stage
  if (stage === 'TITLE') {
    return (
      <>
        <TitleScreen
          onStart={handleStartGame}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          savedScoresCount={classScores.length}
          initialGrade={(studentProfile.grade as GradeLevel) || 'Kelas VIII'}
        />
        <ClassLeaderboardModal
          isOpen={isLeaderboardOpen}
          onClose={() => setIsLeaderboardOpen(false)}
          scores={classScores}
          onClearScores={handleClearScores}
        />
      </>
    );
  }

  // If in VICTORY stage
  if (stage === 'VICTORY') {
    return (
      <>
        <VictoryScreen
          profile={studentProfile}
          userAnswers={userAnswers}
          curriculum={curriculum}
          onRestart={handleRestart}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onRecordScore={handleRecordScore}
        />
        <ClassLeaderboardModal
          isOpen={isLeaderboardOpen}
          onClose={() => setIsLeaderboardOpen(false)}
          scores={classScores}
          onClearScores={handleClearScores}
        />
      </>
    );
  }

  // PLAYING STAGE
  const currentPosInfo = curriculum.posInfo[currentPos] || curriculum.posInfo.pos1;

  // Helper to check question status for quick jump chips
  const getQuestionStatus = (q: any) => {
    if (q.type === 'pg') {
      const ans = userAnswers.pgAnswers[q.id];
      if (!ans) return 'unanswered';
      return ans === q.correctKey ? 'correct' : 'wrong';
    }
    if (q.type === 'pgk') {
      const ans = userAnswers.pgkAnswers[q.id];
      if (!ans || ans.length === 0) return 'unanswered';
      return q.correctKeys.length === ans.length && q.correctKeys.every((k: string) => ans.includes(k))
        ? 'correct'
        : 'wrong';
    }
    if (q.type === 'benar_salah') {
      const ans = userAnswers.benarSalahAnswers[q.id];
      if (typeof ans !== 'boolean') return 'unanswered';
      return ans === q.correctAnswer ? 'correct' : 'wrong';
    }
    if (q.type === 'isian') {
      const ans = userAnswers.isianAnswers[q.id];
      if (!ans || ans.trim().length === 0) return 'unanswered';
      return q.acceptedAnswers.some((a: string) => a.trim().toLowerCase() === ans.trim().toLowerCase())
        ? 'correct'
        : 'wrong';
    }
    if (q.type === 'uraian') {
      const item = userAnswers.uraianAnswers[q.id];
      if (!item || !item.reviewed) return 'unanswered';
      return 'reviewed';
    }
    return 'unanswered';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top HUD & Navigation Map */}
      <PosMapNav
        currentPos={currentPos}
        onSelectPos={(pos) => {
          setCurrentPos(pos);
          if (pos === 'pos1') setWacanaHighlightRef('wacana1');
          else if (pos === 'pos2') setWacanaHighlightRef('wacana2');
          else setWacanaHighlightRef('keduanya');
        }}
        posProgress={posProgressMap}
        posInfo={curriculum.posInfo}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenWacana={() => {
          setWacanaHighlightRef(
            currentPos === 'pos1' ? 'wacana1' : currentPos === 'pos2' ? 'wacana2' : 'keduanya'
          );
          setIsWacanaModalOpen(true);
        }}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onFinishGame={() => setStage('VICTORY')}
        studentName={
          studentProfile.mode === 'team'
            ? `${studentProfile.teamName || studentProfile.name} (Tim)`
            : studentProfile.name
        }
        gradeBadge={curriculum.gradeBadge}
        onBackToTitle={() => setStage('TITLE')}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Main Playfield: Responsive 2-Zone Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Question Stage & Quick Jump Navigator) - 7 cols on desktop */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Pos Banner Header */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {currentPosInfo.title}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-xs text-stone-400 font-medium">
                  {currentPosInfo.wacanaName}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/70 border border-amber-500/30 px-1.5 py-0.2 rounded">
                  {curriculum.gradeBadge}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-stone-200 mt-0.5 font-heading">
                {currentPosInfo.subtitle}
              </h2>
              {studentProfile.mode === 'team' && (
                <p className="text-[11px] text-amber-300/90 font-medium mt-1">
                  Tim: {studentProfile.teamName} · Anggota: {studentProfile.teamMembers?.join(', ')}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleJumpToWacana(
                currentPos === 'pos1' ? 'wacana1' : currentPos === 'pos2' ? 'wacana2' : 'keduanya'
              )}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Buka Wacana</span>
            </button>
          </div>

          {/* Quick Jump Question Chips Bar */}
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider px-1 shrink-0">
              Daftar Soal:
            </span>
            {currentQuestionList.map((q, idx) => {
              const isSelected = idx === activeIndex;
              const status = getQuestionStatus(q);

              let chipStyle = 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200';
              if (isSelected) {
                chipStyle = 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/50';
              } else if (status === 'correct' || status === 'reviewed') {
                chipStyle = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
              } else if (status === 'wrong') {
                chipStyle = 'bg-rose-950/80 text-rose-300 border-rose-500/40';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setQuestionIndexes((prev) => ({ ...prev, [currentPos]: idx }));
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border transition-all cursor-pointer ${chipStyle}`}
                  title={`Soal ${q.id} (${status})`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          {/* Active Question Display */}
          {currentPos === 'bonus' ? (
            <BonusUraianCard
              question={activeQuestion}
              currentIndex={activeIndex}
              totalInPos={currentQuestionList.length}
              userState={userAnswers.uraianAnswers[activeQuestion.id]}
              onSaveAnswer={handleUraianAnswer}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              hasPrev={activeIndex > 0}
              hasNext={activeIndex < currentQuestionList.length - 1}
              onJumpToWacana={handleJumpToWacana}
            />
          ) : (
            <QuestionCard
              question={activeQuestion}
              currentIndex={activeIndex}
              totalInPos={currentQuestionList.length}
              userAnswer={
                activeQuestion.type === 'pg'
                  ? userAnswers.pgAnswers[activeQuestion.id]
                  : activeQuestion.type === 'pgk'
                  ? userAnswers.pgkAnswers[activeQuestion.id]
                  : activeQuestion.type === 'benar_salah'
                  ? userAnswers.benarSalahAnswers[activeQuestion.id]
                  : userAnswers.isianAnswers[activeQuestion.id]
              }
              onAnswer={handleStandardAnswer}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              hasPrev={activeIndex > 0}
              hasNext={activeIndex < currentQuestionList.length - 1}
              nextPosLabel={getNextPosLabel(currentPos)}
              onJumpToWacana={handleJumpToWacana}
            />
          )}
        </div>

        {/* Right Column (Side-by-Side Companion: Visual Stage & Wacana Reader) - 5 cols on desktop */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Companion Segmented Tab Controller */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRightPaneTab('tree');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                rightPaneTab === 'tree'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>
                {studentProfile.grade.includes('VII')
                  ? 'Curug Landung'
                  : studentProfile.grade.includes('IX')
                  ? 'Rumah & Mobil Kopi'
                  : 'Bibit & Pohon Kopi'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRightPaneTab('wacana');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                rightPaneTab === 'wacana'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lembar Bacaan Wacana</span>
            </button>
          </div>

          {/* Right Pane Contents */}
          {rightPaneTab === 'tree' ? (
            <div className="space-y-4">
              <CoffeeTreeCanvas
                progressPercent={totalProgressPercent}
                correctCount={
                  posProgressMap.pos1.score +
                  posProgressMap.pos2.score +
                  posProgressMap.pos3.score
                }
                totalAnswered={totalAnswered}
                studentName={
                  studentProfile.mode === 'team'
                    ? (studentProfile.teamName || studentProfile.name)
                    : studentProfile.name
                }
                grade={studentProfile.grade}
              />

              {/* Progress Summary Card */}
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-300">Kemajuan Ekspedisi {curriculum.gradeBadge}</span>
                  <span className="font-mono tabular-nums text-emerald-400 font-bold">
                    {totalAnswered} / {totalQuestionsCount} Soal ({totalProgressPercent}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalProgressPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Terjawab: <strong className="text-stone-200">{totalAnswered}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className="w-3.5 h-3.5 text-stone-500" />
                    <span>Sisa: <strong className="text-stone-200">{totalQuestionsCount - totalAnswered}</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setRightPaneTab('wacana');
                    }}
                    className="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Buka Teks Wacana &amp; Alat Analisis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[520px]">
              <WacanaReader
                wacana1={curriculum.wacana1}
                wacana2={curriculum.wacana2}
                activeTab={wacanaHighlightRef}
                highlightKeywords={getKeywordsForGrade()}
                gradeBadge={curriculum.gradeBadge}
              />
            </div>
          )}
        </div>
      </main>

      {/* Quiet Footer with Developer & School Identity */}
      <footer className="py-2.5 px-4 text-center text-[11px] text-stone-500 border-t border-stone-800/60 bg-stone-950/60">
        <span className="font-semibold text-emerald-400">Spensit-Bersatu</span> · Pengembang: <span className="text-amber-400 font-medium">Kemis Wigunawan</span> · SMPN Satu Atap Situgede, Kab. Kuningan
      </footer>

      {/* Floating / Full Wacana Reader Modal (Accessible anytime) */}
      {isWacanaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl h-[90vh] bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Pusat Referensi Bacaan Wacana 1 &amp; Wacana 2 ({curriculum.gradeBadge})
              </span>
              <button
                type="button"
                onClick={() => setIsWacanaModalOpen(false)}
                className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Tutup [X]
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <WacanaReader
                wacana1={curriculum.wacana1}
                wacana2={curriculum.wacana2}
                activeTab={wacanaHighlightRef}
                highlightKeywords={getKeywordsForGrade()}
                gradeBadge={curriculum.gradeBadge}
              />
            </div>
          </div>
        </div>
      )}

      {/* Classroom Leaderboard Modal */}
      <ClassLeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        scores={classScores}
        onClearScores={handleClearScores}
      />

      {/* Petunjuk Permainan Modal (Dapat dibuka sewaktu-waktu dari tombol navigasi) */}
      <PetunjukPermainanModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        profile={studentProfile}
        selectedGrade={studentProfile.grade as GradeLevel}
        isPreGameBriefing={false}
      />

      {/* Automatic Pos Transition Notice Modal */}
      <PosTransitionModal
        isOpen={posTransition.isOpen}
        completedPos={posTransition.completedPos}
        targetPos={posTransition.targetPos}
        posInfo={curriculum.posInfo}
        onProceed={handleProceedPos}
        gradeBadge={curriculum.gradeBadge}
      />
    </div>
  );
}
