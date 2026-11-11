/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Newspaper, Sparkles, Volume2, Highlighter, Search, Phone, MapPin, Tag, Feather, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface ParagraphItem {
  num: number;
  text: string;
}

interface BaitItem {
  num: number;
  lines: string[];
}

export interface Wacana1Data {
  id: string;
  type: string;
  title: string;
  paragraphs: ParagraphItem[];
}

export interface Wacana2Data {
  id: string;
  type: string;
  title: string;
  tagline?: string;
  headline?: string;
  body?: string;
  promo?: string;
  contact?: string;
  baits?: BaitItem[];
}

interface WacanaReaderProps {
  wacana1: Wacana1Data;
  wacana2: Wacana2Data;
  activeTab?: 'wacana1' | 'wacana2' | 'keduanya';
  highlightKeywords?: string[];
  className?: string;
  onClose?: () => void;
  gradeBadge?: string;
}

export const WacanaReader: React.FC<WacanaReaderProps> = ({
  wacana1,
  wacana2,
  activeTab = 'wacana1',
  highlightKeywords = [],
  className = '',
  gradeBadge = 'Fase D'
}) => {
  const [currentTab, setCurrentTab] = useState<'wacana1' | 'wacana2' | 'keduanya'>(activeTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHighlightOn, setIsHighlightOn] = useState(true);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const isPantun = Boolean(wacana2.baits && wacana2.baits.length > 0);

  const handleReadAloud = (textToRead: string) => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
        return;
      }
      sound.playClick();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const renderHighlightedText = (content: string) => {
    if (!isHighlightOn && !searchTerm) return content;
    const searchRegexPart = searchTerm ? searchTerm.trim() : '';
    const allTerms = [
      ...highlightKeywords,
      searchRegexPart
    ].filter(Boolean);

    if (allTerms.length === 0) return content;

    const pattern = new RegExp(`(${allTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = content.split(pattern);

    return parts.map((part, i) => {
      const isMatch = allTerms.some((t) => t.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <mark key={i} className="bg-amber-300 text-stone-900 px-1 py-0.5 rounded font-medium">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col h-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* Top Bar with Tabs and Tools */}
      <div className="p-3 bg-stone-950/80 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        {/* Functional Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800/80">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCurrentTab('wacana1');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === 'wacana1'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Wacana 1 ({wacana1.type.split(' ')[0]})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCurrentTab('wacana2');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === 'wacana2'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {isPantun ? <Feather className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Wacana 2 ({isPantun ? 'Pantun' : 'Iklan'})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCurrentTab('keduanya');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === 'keduanya'
                ? 'bg-stone-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Bandingkan</span>
          </button>
        </div>

        {/* Search & Tool controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Cari kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-2.5 py-1 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 w-28 sm:w-36"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsHighlightOn(!isHighlightOn)}
            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              isHighlightOn
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900 text-stone-400 border-stone-800'
            }`}
            title="Sorot kata kunci otomatis"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* Render Wacana 1 */}
        {(currentTab === 'wacana1' || currentTab === 'keduanya') && (
          <article className="p-5 sm:p-6 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-200 relative">
            <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {wacana1.type}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-[11px] text-stone-400">{gradeBadge}</span>
                <span className="text-stone-600">·</span>
                <span className="text-[11px] text-stone-400">Kuningan</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleReadAloud(
                    `${wacana1.title}. ${wacana1.paragraphs.map((p) => p.text).join(' ')}`
                  )
                }
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                title="Dengarkan pembacaan teks wacana 1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isReadingAloud ? 'Hentikan' : 'Bacakan'}</span>
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-100 leading-snug mb-4">
              {wacana1.title}
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-stone-300 font-normal">
              {wacana1.paragraphs.map((p) => (
                <div key={p.num} className="relative pl-6 sm:pl-7 group">
                  <span className="absolute left-0 top-0.5 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded px-1.5 py-0.5">
                    P{p.num}
                  </span>
                  <p>{renderHighlightedText(p.text)}</p>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Render Wacana 2: Either Pantun or Iklan */}
        {(currentTab === 'wacana2' || currentTab === 'keduanya') && (
          <article className="p-5 sm:p-6 rounded-xl bg-stone-950/80 border border-amber-500/30 text-stone-200 relative overflow-hidden shadow-lg">
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {wacana2.type}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-[11px] text-stone-400">
                  {isPantun ? 'Pola Rima a-b-a-b' : 'Informasi & Penawaran'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isPantun && wacana2.baits) {
                    const pantunSpeech = wacana2.baits
                      .map((b) => `Bait ke-${b.num}. ${b.lines.join('. ')}`)
                      .join('. ');
                    handleReadAloud(`${wacana2.title}. ${pantunSpeech}`);
                  } else {
                    handleReadAloud(
                      `${wacana2.title}. ${wacana2.tagline || ''}. ${wacana2.headline || ''}. ${wacana2.body || ''}. ${wacana2.promo || ''}. ${wacana2.contact || ''}`
                    );
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                title="Dengarkan pembacaan Wacana 2"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isReadingAloud ? 'Hentikan' : isPantun ? 'Dendangkan Pantun' : 'Bacakan Iklan'}</span>
              </button>
            </div>

            {/* IF PANTUN: Render structured stanzas (Bait 1, Bait 2, Bait 3) */}
            {isPantun && wacana2.baits ? (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Feather className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl sm:text-2xl font-black font-heading tracking-wide text-amber-400">
                    {wacana2.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {wacana2.baits.map((b) => (
                    <div
                      key={b.num}
                      className="p-4 rounded-xl bg-stone-900/80 border border-amber-500/25 relative flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-800">
                        <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                          Bait {b.num}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">Rima: a-b-a-b</span>
                      </div>

                      {/* Stanza lines */}
                      <div className="space-y-1.5 text-sm text-stone-200">
                        {/* Sampiran */}
                        <div className="pb-2 mb-2 border-b border-stone-800/60 space-y-1">
                          <div className="text-[10px] uppercase font-semibold text-stone-400 flex items-center gap-1">
                            <span>Baris 1 &amp; 2: Sampiran</span>
                          </div>
                          <p className="italic text-stone-300 pl-2 border-l-2 border-emerald-500/40">
                            {renderHighlightedText(b.lines[0])}
                          </p>
                          <p className="italic text-stone-300 pl-2 border-l-2 border-emerald-500/40">
                            {renderHighlightedText(b.lines[1])}
                          </p>
                        </div>

                        {/* Isi */}
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase font-semibold text-amber-400 flex items-center gap-1">
                            <span>Baris 3 &amp; 4: Isi (Pesan/Nasihat)</span>
                          </div>
                          <p className="font-medium text-stone-100 pl-2 border-l-2 border-amber-500">
                            {renderHighlightedText(b.lines[2])}
                          </p>
                          <p className="font-medium text-stone-100 pl-2 border-l-2 border-amber-500">
                            {renderHighlightedText(b.lines[3])}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-400 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Catatan Sastra:</strong> Pantun terdiri atas 4 baris per bait. Baris 1–2 merupakan sampiran pembayang rima, sedangkan baris 3–4 memuat inti nasihat budi pekerti dan kelestarian alam.
                  </span>
                </div>
              </div>
            ) : (
              /* IF IKLAN: Render commercial advertisement */
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Product/Armada Image */}
                <div className="w-full sm:w-44 h-36 sm:h-44 shrink-0 rounded-xl overflow-hidden border border-amber-500/25 relative group">
                  <img
                    src={
                      wacana2.title.includes('ARMADA')
                        ? '/src/assets/images/mobil-kopi.jpg'
                        : '/src/assets/images/bibit-kopi.jpg'
                    }
                    alt={wacana2.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-xs text-[10px] text-amber-300 font-medium text-center">
                    {wacana2.title.includes('ARMADA') || wacana2.title.includes('IDAMAN') ? 'Mobil Idamanku 4x4' : 'Bibit Unggul 6 Bulan'}
                  </div>
                </div>

                {/* Textual Ad Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading tracking-wide text-amber-400">
                      {wacana2.title}
                    </h3>
                    {wacana2.tagline && (
                      <p className="text-xs italic text-stone-400 mt-0.5">
                        {wacana2.tagline}
                      </p>
                    )}
                  </div>

                  {wacana2.headline && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-bold tracking-wide">
                      {wacana2.headline}
                    </div>
                  )}

                  {wacana2.body && (
                    <p className="text-sm leading-relaxed text-stone-300">
                      {renderHighlightedText(wacana2.body)}
                    </p>
                  )}

                  {/* Promo Strip */}
                  {wacana2.promo && (
                    <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-start gap-2">
                      <Tag className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <div>{renderHighlightedText(wacana2.promo)}</div>
                    </div>
                  )}

                  {/* Contact Box */}
                  {wacana2.contact && (
                    <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 space-y-1">
                      <div className="font-semibold text-stone-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{wacana2.contact.split('·')[0]}</span>
                      </div>
                      {wacana2.contact.includes('·') && (
                        <div className="flex items-center gap-1.5 text-stone-400">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{wacana2.contact.split('·')[1].trim()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
};
