/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  WACANA_1 as WACANA_1_K8,
  WACANA_2 as WACANA_2_K8,
  POS_INFO as POS_INFO_K8,
  POS1_QUESTIONS as POS1_K8,
  POS2_QUESTIONS as POS2_K8,
  POS3_QUESTIONS as POS3_K8,
  BONUS_QUESTIONS as BONUS_K8,
  ALL_QUESTIONS as ALL_K8
} from './soalData';

import {
  WACANA_1_KELAS7,
  WACANA_2_KELAS7,
  POS_INFO_KELAS7,
  POS1_QUESTIONS_KELAS7,
  POS2_QUESTIONS_KELAS7,
  POS3_QUESTIONS_KELAS7,
  BONUS_QUESTIONS_KELAS7
} from './soalKelas7';

import {
  WACANA_1_KELAS9,
  WACANA_2_KELAS9,
  POS_INFO_KELAS9,
  POS1_QUESTIONS_KELAS9,
  POS2_QUESTIONS_KELAS9,
  POS3_QUESTIONS_KELAS9,
  BONUS_QUESTIONS_KELAS9
} from './soalKelas9';

import {
  PosId,
  QuizQuestion,
  UraianQuestion
} from '../types/game';

export type GradeLevel = 'Kelas VII' | 'Kelas VIII' | 'Kelas IX';

export interface PosInfoItem {
  id: PosId;
  title: string;
  subtitle: string;
  wacanaName: string;
  description: string;
  targetQuestions: number;
}

export interface CurriculumData {
  grade: GradeLevel;
  gradeBadge: string;
  themeTitle: string;
  themeSubtitle: string;
  tagline: string;
  heroImage: string;
  badgeImage: string;
  wacana1: {
    id: string;
    type: string;
    title: string;
    paragraphs: { num: number; text: string }[];
  };
  wacana2: {
    id: string;
    type: string;
    title: string;
    tagline?: string;
    headline?: string;
    body?: string;
    promo?: string;
    contact?: string;
    baits?: { num: number; lines: string[] }[];
  };
  posInfo: Record<PosId, PosInfoItem>;
  pos1Questions: QuizQuestion[];
  pos2Questions: QuizQuestion[];
  pos3Questions: QuizQuestion[];
  bonusQuestions: UraianQuestion[];
  allQuestions: QuizQuestion[];
}

export const CURRICULA: Record<GradeLevel, CurriculumData> = {
  'Kelas VII': {
    grade: 'Kelas VII',
    gradeBadge: 'Fase D · Kelas VII',
    themeTitle: 'EKSPEDISI CURUG LANDUNG',
    themeSubtitle: 'Keindahan Alam & Kesejukan Wisata Curug Landung Palutungan · Kaki Gunung Ciremai',
    tagline: 'Literasi Teks Deskripsi & Pantun Nasihat Lingkungan Asri Kuningan',
    heroImage: '/src/assets/images/curug-landung.jpg',
    badgeImage: '/src/assets/images/badge.jpg',
    wacana1: WACANA_1_KELAS7,
    wacana2: WACANA_2_KELAS7,
    posInfo: POS_INFO_KELAS7 as Record<PosId, PosInfoItem>,
    pos1Questions: POS1_QUESTIONS_KELAS7,
    pos2Questions: POS2_QUESTIONS_KELAS7,
    pos3Questions: POS3_QUESTIONS_KELAS7,
    bonusQuestions: BONUS_QUESTIONS_KELAS7,
    allQuestions: [...POS1_QUESTIONS_KELAS7, ...POS2_QUESTIONS_KELAS7, ...POS3_QUESTIONS_KELAS7]
  },
  'Kelas VIII': {
    grade: 'Kelas VIII',
    gradeBadge: 'Fase D · Kelas VIII',
    themeTitle: 'EKSPEDISI LERENG ANJUNG',
    themeSubtitle: 'Gerakan Sekolah Cinta Kopi: Penanaman Seribu Bibit di Lereng Gunung Anjung',
    tagline: 'Literasi Teks Berita Reboisasi & Iklan Komersial Kopi Sinapeul',
    heroImage: '/src/assets/images/hero-ajung.jpg',
    badgeImage: '/src/assets/images/badge.jpg',
    wacana1: WACANA_1_K8,
    wacana2: WACANA_2_K8,
    posInfo: POS_INFO_K8 as Record<PosId, PosInfoItem>,
    pos1Questions: POS1_K8,
    pos2Questions: POS2_K8,
    pos3Questions: POS3_K8,
    bonusQuestions: BONUS_K8,
    allQuestions: ALL_K8
  },
  'Kelas IX': {
    grade: 'Kelas IX',
    gradeBadge: 'Fase D · Kelas IX',
    themeTitle: 'EKSPEDISI AGRIBISNIS KOPI',
    themeSubtitle: 'Rumah Megah Petani Makmur & Armada Mobil Idamanku Angkut Bibit Lereng Anjung',
    tagline: 'Literasi Laporan Observasi Rumah Petani & Iklan Logistik Mobil Idamanku 4x4',
    heroImage: '/src/assets/images/mobil-kopi.jpg',
    badgeImage: '/src/assets/images/badge.jpg',
    wacana1: WACANA_1_KELAS9,
    wacana2: WACANA_2_KELAS9,
    posInfo: POS_INFO_KELAS9 as Record<PosId, PosInfoItem>,
    pos1Questions: POS1_QUESTIONS_KELAS9,
    pos2Questions: POS2_QUESTIONS_KELAS9,
    pos3Questions: POS3_QUESTIONS_KELAS9,
    bonusQuestions: BONUS_QUESTIONS_KELAS9,
    allQuestions: [...POS1_QUESTIONS_KELAS9, ...POS2_QUESTIONS_KELAS9, ...POS3_QUESTIONS_KELAS9]
  }
};

export function getCurriculum(grade: string): CurriculumData {
  if (grade.includes('VII') || grade.includes('7')) {
    return CURRICULA['Kelas VII'];
  }
  if (grade.includes('IX') || grade.includes('9')) {
    return CURRICULA['Kelas IX'];
  }
  return CURRICULA['Kelas VIII'];
}
