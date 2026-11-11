/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuestionType = 'pg' | 'pgk' | 'benar_salah' | 'isian' | 'uraian';

export type PosId = 'pos1' | 'pos2' | 'pos3' | 'bonus';

export interface BaseQuestion {
  id: number;
  pos: PosId;
  wacanaRef: 'wacana1' | 'wacana2' | 'keduanya';
  type: QuestionType;
  question: string;
  points: number;
}

export interface PGQuestion extends BaseQuestion {
  type: 'pg';
  options: { key: string; text: string }[];
  correctKey: string;
  explanation?: string;
}

export interface PGKQuestion extends BaseQuestion {
  type: 'pgk';
  options: { key: string; text: string }[];
  correctKeys: string[];
  explanation?: string;
}

export interface BenarSalahQuestion extends BaseQuestion {
  type: 'benar_salah';
  statement: string;
  correctAnswer: boolean;
  explanation?: string;
}

export interface IsianQuestion extends BaseQuestion {
  type: 'isian';
  prompt: string;
  acceptedAnswers: string[];
  explanation?: string;
}

export interface UraianQuestion extends BaseQuestion {
  type: 'uraian';
  prompt: string;
  sampleAnswer: string;
  rubric: string;
  maxScore: number;
}

export type QuizQuestion = PGQuestion | PGKQuestion | BenarSalahQuestion | IsianQuestion;

export type PlayMode = 'solo' | 'team';

export interface StudentProfile {
  mode: PlayMode;
  name: string;
  teamName?: string;
  teamMembers?: string[];
  school: string;
  grade: string;
}

export interface ClassScoreEntry {
  id: string;
  mode: PlayMode;
  displayName: string;
  teamMembers?: string[];
  school: string;
  grade: string;
  mainScore: number;
  bonusScore: number;
  totalScore: number;
  finalGrade: number;
  predicate: string;
  completedAt: string;
}

export interface UserAnswerState {
  pgAnswers: Record<number, string>; // question id -> selected key
  pgkAnswers: Record<number, string[]>; // question id -> array of selected keys
  benarSalahAnswers: Record<number, boolean | null>; // question id -> boolean
  isianAnswers: Record<number, string>; // question id -> typed string
  uraianAnswers: Record<number, { text: string; score: number; reviewed: boolean }>; // question id -> essay
}

export type GameStage = 'TITLE' | 'MAP_BRIEFING' | 'PLAYING' | 'VICTORY';
