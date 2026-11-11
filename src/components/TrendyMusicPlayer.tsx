/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, ChevronDown, Radio } from 'lucide-react';
import { sound, BGM_TRACKS, BgmTrackId } from '../utils/audio';

interface TrendyMusicPlayerProps {
  className?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TrendyMusicPlayer: React.FC<TrendyMusicPlayerProps> = ({
  className = '',
  isMuted,
  onToggleMute
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.getIsBgmPlaying());
  const [currentTrack, setCurrentTrack] = useState<BgmTrackId>(sound.getCurrentTrack());
  const [volume, setVolume] = useState<number>(sound.getBgmVolume());
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Keep internal state in sync
    const interval = setInterval(() => {
      setIsPlaying(sound.getIsBgmPlaying());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    sound.playClick();
    const nextState = sound.toggleBgm();
    setIsPlaying(nextState);
  };

  const handleSelectTrack = (trackId: BgmTrackId) => {
    sound.playClick();
    setCurrentTrack(trackId);
    sound.setTrack(trackId);
    if (!isPlaying) {
      sound.startBgm();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    sound.setBgmVolume(newVol);
  };

  const activeTrackInfo = BGM_TRACKS.find((t) => t.id === currentTrack) || BGM_TRACKS[0];

  return (
    <div className={`relative ${className}`}>
      {/* Mini Player Bar Button */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-900/90 border border-emerald-500/30 rounded-xl shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            isPlaying && !isMuted
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
              : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
          }`}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik Trendy SMP'}
        >
          {isPlaying && !isMuted ? (
            <>
              <Pause className="w-3.5 h-3.5 shrink-0" />
              {/* Equalizer animation bars */}
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-1 bg-white rounded-full animate-bounce duration-300" style={{ height: '70%' }} />
                <span className="w-1 bg-white rounded-full animate-bounce duration-500 delay-100" style={{ height: '100%' }} />
                <span className="w-1 bg-white rounded-full animate-bounce duration-400 delay-200" style={{ height: '50%' }} />
              </div>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <Music className="w-3.5 h-3.5 text-emerald-400" />
            </>
          )}

          <div className="text-left hidden sm:block">
            <span className="text-[11px] font-bold block leading-none">
              {isPlaying ? 'Musik Tren SMP Aktif' : 'Musik Tren SMP'}
            </span>
            <span className="text-[9px] font-normal text-emerald-200 block truncate max-w-[110px]">
              {activeTrackInfo.title}
            </span>
          </div>
        </button>

        {/* Quick Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title="Pilih Track Musik & Volume"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu Modal for Beat Selector & Volume Slider */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl z-50 text-stone-200 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Playlist Musik Anak SMP Masa Kini</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Track selection list */}
          <div className="space-y-1.5">
            {BGM_TRACKS.map((t) => {
              const isSelected = t.id === currentTrack;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTrack(t.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 shadow-sm'
                      : 'bg-stone-950/50 hover:bg-stone-800 border border-stone-800/80 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div>
                    <div className="font-bold text-stone-200 flex items-center gap-1.5">
                      <span>{t.title}</span>
                      {isSelected && isPlaying && !isMuted && (
                        <span className="text-[10px] text-emerald-400 animate-pulse">● Play</span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {t.genre} · {t.bpm} BPM
                    </div>
                  </div>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="pt-2 border-t border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span>Volume Beat:</span>
              <span className="font-mono text-emerald-400">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-stone-950 rounded-lg appearance-none"
            />
          </div>

          {/* Ambience & Mute quick toggle */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                sound.toggleAmbientWind();
              }}
              className="text-stone-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Desau Angin Gunung</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              className="text-stone-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
              <span>{isMuted ? 'Mute' : 'Audio On'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
