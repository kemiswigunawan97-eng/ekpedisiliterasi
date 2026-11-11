/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Sprout, Waves, Truck, Home, Sparkles } from 'lucide-react';

interface CoffeeTreeCanvasProps {
  progressPercent: number; // 0 to 100
  correctCount: number;
  totalAnswered: number;
  studentName: string;
  grade?: string;
}

export const CoffeeTreeCanvas: React.FC<CoffeeTreeCanvasProps> = ({
  progressPercent,
  correctCount,
  studentName,
  grade = 'Kelas VIII'
}) => {
  const isKelas7 = grade.includes('VII') || grade.includes('7');
  const isKelas9 = grade.includes('IX') || grade.includes('9');
  const stage = Math.min(5, Math.max(1, Math.floor(progressPercent / 20) + 1));

  // --- KELAS 7: CURUG LANDUNG & PRESERVATION ---
  if (isKelas7) {
    const purity = Math.min(100, Math.round(progressPercent * 0.9 + 10));
    return (
      <div className="relative rounded-2xl bg-gradient-to-b from-sky-950/80 via-stone-900 to-stone-950 border border-sky-500/25 p-4 overflow-hidden flex flex-col justify-between shadow-lg">
        {/* Header status */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Curug Landung · Kaki Gn. Ciremai</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-500/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Kelestarian: {purity}%</span>
          </div>
        </div>

        {/* SVG Canvas of Curug Landung Waterfall & Green Mossy Cliff */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-auto">
          <svg viewBox="0 0 240 200" className="w-full h-full max-w-[260px] drop-shadow-md select-none">
            {/* Dark Stone Cliff Wall */}
            <path d="M 30 10 L 80 180 L 10 180 L 10 10 Z" fill="#1c1917" />
            <path d="M 160 10 L 230 10 L 230 180 L 170 180 Z" fill="#1c1917" />
            {/* Green Moss On Cliffs (Lumut Hijau Subur) */}
            <path d="M 25 40 Q 50 60 35 110 Q 55 140 40 175" stroke="#15803d" strokeWidth="8" strokeLinecap="round" fill="none" opacity={0.6 + stage * 0.08} />
            <path d="M 175 35 Q 160 80 180 120 Q 165 150 178 175" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" fill="none" opacity={0.6 + stage * 0.08} />

            {/* Waterfall Stream (Air Terjun 30m) */}
            <g>
              {/* Crest at top */}
              <path d="M 85 10 Q 120 18 155 10 L 160 25 L 80 25 Z" fill="#38bdf8" opacity="0.8" />
              {/* Waterfall Sheets */}
              <path d="M 90 25 L 85 160 L 155 160 L 150 25 Z" fill="url(#waterfallGrad)" opacity="0.9" />
              {/* Foam Strands */}
              <line x1="102" y1="25" x2="100" y2="160" stroke="#f0f9ff" strokeWidth="2.5" opacity="0.85" strokeDasharray="12 4" />
              <line x1="118" y1="20" x2="120" y2="165" stroke="#ffffff" strokeWidth="3.5" opacity="0.95" strokeDasharray="16 6" />
              <line x1="136" y1="25" x2="138" y2="160" stroke="#bae6fd" strokeWidth="2.5" opacity="0.85" strokeDasharray="10 4" />
            </g>

            {/* Splash Mist at Base Pool */}
            <ellipse cx="120" cy="162" rx="42" ry="12" fill="#e0f2fe" opacity="0.75" />
            <circle cx="100" cy="158" r="7" fill="#ffffff" opacity="0.8" />
            <circle cx="122" cy="154" r="9" fill="#ffffff" opacity="0.9" />
            <circle cx="140" cy="158" r="8" fill="#ffffff" opacity="0.8" />

            {/* Placid Pool & Black Boulders (Bebatuan Hitam) */}
            <path d="M 10 168 Q 120 162 230 168 L 230 200 L 10 200 Z" fill="#0284c7" opacity="0.85" />
            {/* Black river stones */}
            <ellipse cx="48" cy="178" rx="20" ry="10" fill="#292524" />
            <ellipse cx="192" cy="180" rx="24" ry="11" fill="#1c1917" />
            <ellipse cx="88" cy="188" rx="14" ry="7" fill="#44403c" />

            {/* Preservation Wooden Board */}
            <g transform="translate(136, 142)">
              <rect x="0" y="0" width="94" height="26" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="12" y1="26" x2="12" y2="35" stroke="#ca8a04" strokeWidth="2" />
              <text x="6" y="11" fontSize="7" fontWeight="bold" fill="#713f12">
                CURUG LANDUNG 30M
              </text>
              <text x="6" y="21" fontSize="7.5" fontWeight="bold" fill="#15803d">
                {studentName ? studentName.slice(0, 14) : 'Pelajar Lestari'}
              </text>
            </g>

            <defs>
              <linearGradient id="waterfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-sky-950 text-xs flex items-center justify-between text-stone-400">
          <div>
            <span>Fase Alam: </span>
            <span className="font-semibold text-cyan-400">
              {stage === 1 && 'Hawa Pegunungan Sejuk'}
              {stage === 2 && 'Percikan Air Curug Dingin'}
              {stage === 3 && 'Tebing Lumut Hijau Asri'}
              {stage === 4 && 'Bebas Sampah Plastik'}
              {stage === 5 && 'Harmoni Wisata Palutungan'}
            </span>
          </div>
          <div className="font-mono text-cyan-300">
            Benar: <strong className="text-cyan-400">{correctCount}</strong> soal
          </div>
        </div>
      </div>
    );
  }

  // --- KELAS 9: RUMAH BAGUS HASIL KOPI & MOBIL ANGKUT BIBIT 4x4 ---
  if (isKelas9) {
    const fleetCapacity = Math.min(2000, Math.round(progressPercent * 20));
    return (
      <div className="relative rounded-2xl bg-gradient-to-b from-amber-950/70 via-stone-900 to-stone-950 border border-amber-500/30 p-4 overflow-hidden flex flex-col justify-between shadow-lg">
        {/* Header status */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <Home className="w-4 h-4 text-amber-400" />
            <span>Rumah Petani &amp; Mobil Idamanku 4x4</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40">
            <Truck className="w-3 h-3 text-amber-400" />
            <span>Kapasitas: {fleetCapacity} Bibit</span>
          </div>
        </div>

        {/* SVG Canvas of Modern Coffee House + 4x4 Seedling Utility Truck */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-auto">
          <svg viewBox="0 0 250 200" className="w-full h-full max-w-[270px] drop-shadow-md select-none">
            {/* Ground Road & Yard */}
            <rect x="0" y="165" width="250" height="35" fill="#292524" />
            <line x1="0" y1="182" x2="250" y2="182" stroke="#78716c" strokeWidth="2" strokeDasharray="14 10" />

            {/* Left: Modern 2-Storey Coffee Estate House (Rumah Bagus Petani Modern Pak Maman) */}
            <g transform="translate(10, 55)">
              {/* Base walls */}
              <rect x="0" y="50" width="88" height="60" fill="#f5f5f4" stroke="#44403c" strokeWidth="2" rx="2" />
              {/* 2nd floor balcony & modern geometric roof */}
              <path d="M -6 50 L 44 20 L 94 50 Z" fill="#78350f" />
              <rect x="8" y="28" width="72" height="22" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.5" />
              {/* Balcony Railing */}
              <line x1="6" y1="46" x2="82" y2="46" stroke="#b45309" strokeWidth="2" />
              {/* Windows with warm light */}
              <rect x="16" y="32" width="16" height="12" fill="#fef08a" stroke="#d97706" />
              <rect x="56" y="32" width="16" height="12" fill="#fef08a" stroke="#d97706" />
              {/* Modern Glass Entrance Door & Porch */}
              <rect x="34" y="75" width="20" height="35" fill="#0284c7" opacity="0.8" stroke="#0369a1" />
              <circle cx="50" cy="94" r="1.5" fill="#ffffff" />
              {/* Coffee drying greenhouse attached */}
              <path d="M 88 70 L 112 60 L 112 110 L 88 110 Z" fill="#38bdf8" opacity="0.4" stroke="#0284c7" />
              <line x1="88" y1="85" x2="112" y2="85" stroke="#0284c7" opacity="0.6" />
            </g>

            {/* Right: Rugged 4x4 Seedling Hauler Truck (Armada Mobil Tangguh Situgede) */}
            <g transform="translate(122, 100)">
              {/* Bed / Flatbed for coffee seedlings */}
              <rect x="0" y="28" width="62" height="30" fill="#b45309" stroke="#78350f" strokeWidth="2" rx="2" />
              {/* Racks of green coffee seedlings in polybags inside truck bed */}
              <g opacity={0.4 + stage * 0.15}>
                <rect x="4" y="20" width="12" height="10" fill="#15803d" rx="2" />
                <rect x="18" y="16" width="12" height="14" fill="#16a34a" rx="2" />
                <rect x="32" y="18" width="12" height="12" fill="#22c55e" rx="2" />
                <rect x="46" y="22" width="10" height="8" fill="#15803d" rx="2" />
                {/* Seedling green sprouts */}
                <circle cx="10" cy="18" r="3" fill="#4ade80" />
                <circle cx="24" cy="14" r="3.5" fill="#4ade80" />
                <circle cx="38" cy="16" r="3" fill="#4ade80" />
              </g>

              {/* Truck Cabin 4x4 */}
              <path d="M 62 58 L 62 25 L 82 25 L 105 40 L 115 48 L 115 58 Z" fill="#047857" stroke="#065f46" strokeWidth="2" />
              {/* Cabin Windshield & Window */}
              <path d="M 82 28 L 100 42 L 82 42 Z" fill="#bae6fd" opacity="0.9" />
              <rect x="65" y="28" width="14" height="14" fill="#bae6fd" opacity="0.9" />
              {/* Heavy Duty Bullbar Bumper & Headlight */}
              <rect x="114" y="46" width="6" height="12" fill="#fef08a" stroke="#ca8a04" />
              <path d="M 112 52 L 122 52 L 122 62" stroke="#44403c" strokeWidth="3" fill="none" />

              {/* Heavy Duty 4x4 Off-road Wheels */}
              <circle cx="22" cy="62" r="14" fill="#1c1917" stroke="#57534e" strokeWidth="2.5" />
              <circle cx="22" cy="62" r="6" fill="#a8a29e" />
              <circle cx="94" cy="62" r="14" fill="#1c1917" stroke="#57534e" strokeWidth="2.5" />
              <circle cx="94" cy="62" r="6" fill="#a8a29e" />
            </g>

            {/* Achievement Plate */}
            <g transform="translate(130, 25)">
              <rect x="0" y="0" width="108" height="24" rx="4" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="6" y="10" fontSize="7" fontWeight="bold" fill="#f59e0b">
                RUMAH &amp; MOBIL IDAMANKU
              </text>
              <text x="6" y="19" fontSize="7.5" fontWeight="bold" fill="#34d399">
                {studentName ? studentName.slice(0, 16) : 'Agropreneur IX'}
              </text>
            </g>
          </svg>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-stone-800 text-xs flex items-center justify-between text-stone-400">
          <div>
            <span>Status Agribisnis: </span>
            <span className="font-semibold text-amber-400">
              {stage === 1 && 'Panen Perdana 15 Ton'}
              {stage === 2 && 'Desain Rumah Modern Tropis'}
              {stage === 3 && 'Armada Pick-up 4x4 Siaga'}
              {stage === 4 && 'Galeri Seduh & Greenhouse'}
              {stage === 5 && 'Kemakmuran Petani Situgede'}
            </span>
          </div>
          <div className="font-mono text-amber-300">
            Benar: <strong className="text-amber-400">{correctCount}</strong> soal
          </div>
        </div>
      </div>
    );
  }

  // --- KELAS 8: KEBUN KOPI LERENG GUNUNG AJUNG (DEFAULT) ---
  const soilStability = Math.min(100, Math.round(progressPercent * 0.9 + 10));

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-4 overflow-hidden flex flex-col justify-between shadow-lg">
      {/* Header status */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <Sprout className="w-4 h-4" />
          <span>Bibit Kopi Lereng Anjung</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400 bg-stone-950/80 px-2 py-0.5 rounded-full border border-stone-800">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Stabilitas Lereng: {soilStability}%</span>
        </div>
      </div>

      {/* SVG Canvas of the growing Coffee Plant */}
      <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-auto">
        <svg viewBox="0 0 240 200" className="w-full h-full max-w-[260px] drop-shadow-md select-none">
          {/* Ground & Soil Slope */}
          <path d="M 10 180 Q 70 170 120 175 T 230 185 L 230 200 L 10 200 Z" fill="#3e2723" />
          <path d="M 20 175 Q 80 168 120 172 T 220 180" stroke="#5d4037" strokeWidth="3" fill="none" />

          {/* Deep Underground Roots */}
          <g opacity={Math.min(1, 0.4 + (progressPercent / 100) * 0.6)}>
            <path d="M 120 175 Q 110 188 95 196" stroke="#8d6e63" strokeWidth={stage >= 2 ? '3' : '1.5'} strokeLinecap="round" fill="none" />
            <path d="M 120 175 Q 130 186 145 195" stroke="#8d6e63" strokeWidth={stage >= 2 ? '3' : '1.5'} strokeLinecap="round" fill="none" />
            {stage >= 3 && (
              <>
                <path d="M 120 175 Q 120 190 120 199" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 105 185 Q 85 190 70 194" stroke="#a1887f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M 135 185 Q 155 190 170 194" stroke="#a1887f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>

          {/* Plant Stem & Trunk */}
          {stage === 1 && (
            <g>
              <path d="M 120 175 Q 118 160 120 148" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 120 148 Q 106 142 108 135 Q 118 138 120 148 Z" fill="#22c55e" />
              <path d="M 120 148 Q 134 142 132 135 Q 122 138 120 148 Z" fill="#16a34a" />
            </g>
          )}

          {stage >= 2 && (
            <g>
              <path d="M 120 175 Q 118 140 120 110" stroke="#6d4c41" strokeWidth={stage >= 4 ? '5' : '3.5'} strokeLinecap="round" fill="none" />
              <path d="M 119 150 Q 95 142 90 132 Q 108 135 119 148 Z" fill="#15803d" />
              <path d="M 121 146 Q 145 138 150 128 Q 132 131 121 144 Z" fill="#16a34a" />
            </g>
          )}

          {stage >= 3 && (
            <g>
              <path d="M 120 125 Q 90 112 78 100 Q 102 104 120 120 Z" fill="#16a34a" />
              <path d="M 120 120 Q 150 108 162 96 Q 138 100 120 115 Z" fill="#22c55e" />
              <circle cx="120" cy="98" r="16" fill="#15803d" opacity="0.9" />
              <circle cx="106" cy="105" r="14" fill="#16a34a" opacity="0.9" />
              <circle cx="134" cy="105" r="14" fill="#22c55e" opacity="0.9" />
              <circle cx="120" cy="85" r="15" fill="#4ade80" opacity="0.85" />
            </g>
          )}

          {stage >= 4 && (
            <g>
              <circle cx="120" cy="70" r="18" fill="#15803d" />
              <circle cx="95" cy="88" r="17" fill="#16a34a" />
              <circle cx="145" cy="88" r="17" fill="#15803d" />
              <circle cx="120" cy="55" r="15" fill="#22c55e" />

              {/* Red Coffee Cherries */}
              <circle cx="108" cy="102" r="3.5" fill="#dc2626" />
              <circle cx="114" cy="105" r="3.2" fill="#ef4444" />
              <circle cx="128" cy="104" r="3.5" fill="#b91c1c" />
              <circle cx="134" cy="100" r="3.2" fill="#dc2626" />
              <circle cx="118" cy="80" r="3" fill="#ef4444" />
              <circle cx="125" cy="78" r="3" fill="#dc2626" />
              <circle cx="100" cy="85" r="3.2" fill="#b91c1c" />
              <circle cx="140" cy="85" r="3.2" fill="#ef4444" />
            </g>
          )}

          {/* Student Name Wooden Tag */}
          <g transform="translate(140, 150)">
            <rect x="0" y="0" width="85" height="26" rx="4" fill="#d7ccc8" stroke="#8d6e63" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="12" y2="35" stroke="#8d6e63" strokeWidth="2" />
            <text x="6" y="11" fontSize="7.5" fontWeight="bold" fill="#3e2723">
              BIBIT LERENG ANJUNG
            </text>
            <text x="6" y="21" fontSize="8" fontWeight="bold" fill="#1b5e20">
              {studentName ? studentName.slice(0, 14) : 'Dimas (VIII)'}
            </text>
          </g>
        </svg>
      </div>

      {/* Footer Growth Status */}
      <div className="pt-2 border-t border-stone-800 text-xs flex items-center justify-between text-stone-400">
        <div>
          <span>Fase Tumbuh: </span>
          <span className="font-semibold text-emerald-400">
            {stage === 1 && 'Tunas Muda'}
            {stage === 2 && 'Bibit Berakar Kuat'}
            {stage === 3 && 'Pohon Muda Bertunas'}
            {stage === 4 && 'Pohon Berbuah Lebat'}
            {stage === 5 && 'Kebun Kopi Lestari'}
          </span>
        </div>
        <div className="font-mono text-stone-300">
          Benar: <strong className="text-emerald-400">{correctCount}</strong> soal
        </div>
      </div>
    </div>
  );
};
