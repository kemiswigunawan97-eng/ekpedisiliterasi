/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Table, Copy, Check, ExternalLink, Send, Download, HelpCircle, X, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';
import { ClassScoreEntry } from '../types/game';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ClassScoreEntry[];
  currentStudentEntry?: ClassScoreEntry;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
  scores,
  currentStudentEntry
}) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('spensit_gsheet_webhook') || '';
    } catch {
      return '';
    }
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isScriptCopied, setIsScriptCopied] = useState<boolean>(false);
  const [showScriptGuide, setShowScriptGuide] = useState<boolean>(false);

  useEffect(() => {
    if (webhookUrl.trim()) {
      try {
        localStorage.setItem('spensit_gsheet_webhook', webhookUrl.trim());
      } catch {
        // silent
      }
    }
  }, [webhookUrl]);

  if (!isOpen) return null;

  const datasetToSync = currentStudentEntry ? [currentStudentEntry] : scores;

  // Copy as TSV (Tab Separated Values) for direct Ctrl+V paste into Google Sheets
  const handleCopyForGoogleSheets = () => {
    sound.playSelect();
    const headers = [
      'No',
      'Waktu',
      'Mode',
      'Nama Siswa / Kelompok',
      'Anggota Tim',
      'Kelas',
      'Satuan Pendidikan',
      'Skor Pokok (Max 45)',
      'Bonus Uraian (Max 15)',
      'Total Skor (Max 60)',
      'Nilai (100)',
      'Predikat'
    ];

    const rows = datasetToSync.map((s, idx) => [
      idx + 1,
      s.completedAt,
      s.mode === 'team' ? 'Tim' : 'Individu',
      s.displayName,
      (s.teamMembers || []).join(', '),
      s.grade,
      s.school,
      s.mainScore,
      s.bonusScore,
      s.totalScore,
      s.finalGrade,
      s.predicate
    ]);

    const tsv = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsv).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  // Trigger POST Webhook sync to Google Apps Script
  const handleSyncToWebhook = async () => {
    if (!webhookUrl.trim()) {
      setSyncStatus({
        type: 'error',
        message: 'Masukkan URL Webhook Google Apps Script terlebih dahulu.'
      });
      return;
    }

    setIsSyncing(true);
    setSyncStatus({ type: null, message: '' });
    sound.playSelect();

    try {
      const payload = {
        app: 'Spensit-Bersatu Literasi',
        source: 'Ekspedisi Lereng Anjung / Curug Landung / Agribisnis',
        timestamp: new Date().toISOString(),
        totalEntries: datasetToSync.length,
        scores: datasetToSync
      };

      // mode: 'no-cors' allows posting to Google Apps Script Web Apps without CORS blocking
      await fetch(webhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      sound.playCorrect();
      setSyncStatus({
        type: 'success',
        message: `✓ Permintaan sinkronisasi ${datasetToSync.length} data nilai terkirim ke Google Sheets!`
      });
    } catch (err: any) {
      setSyncStatus({
        type: 'error',
        message: 'Gagal mengirim data. Pastikan URL Webhook benar dan koneksi internet stabil.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Google Apps Script sample template
  const appsScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var payload = JSON.parse(e.postData.contents);
  var list = payload.scores || (Array.isArray(payload) ? payload : [payload]);
  
  // Menambahkan baris ke Google Sheets
  list.forEach(function(s) {
    sheet.appendRow([
      new Date(),
      s.displayName || s.name,
      s.mode,
      s.grade,
      s.school,
      s.mainScore,
      s.bonusScore,
      s.totalScore,
      s.finalGrade,
      s.predicate
    ]);
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  const handleCopyScript = () => {
    sound.playClick();
    navigator.clipboard.writeText(appsScriptCode).then(() => {
      setIsScriptCopied(true);
      setTimeout(() => setIsScriptCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col gap-4 text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Table className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-stone-100">
                Sinkronisasi Nilai ke Google Sheets
              </h3>
              <p className="text-xs text-stone-400">
                Simpan &amp; rekapitulasi data nilai siswa/kelompok ke Google Spreadsheet secara terpusat.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method 1: Webhook Google Apps Script */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Metode 1: Webhook Otomatis (Google Apps Script)</span>
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              Direkomendasikan
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Tempelkan URL Web App Google Apps Script dari spreadsheet Anda di bawah. Nilai dapat dikirim otomatis maupun berkala.
          </p>

          <div className="space-y-1.5">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleSyncToWebhook}
              disabled={isSyncing || datasetToSync.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Kirim {datasetToSync.length} Data ke Google Sheets</span>
            </button>

            <button
              type="button"
              onClick={() => setShowScriptGuide(!showScriptGuide)}
              className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{showScriptGuide ? 'Tutup Panduan Script' : 'Cara Buat Webhook Gratis (1 Menit)'}</span>
            </button>
          </div>

          {syncStatus.message && (
            <div
              className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                syncStatus.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
              }`}
            >
              {syncStatus.message}
            </div>
          )}
        </div>

        {/* Script Guide Accordion */}
        {showScriptGuide && (
          <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/30 space-y-2.5 text-xs text-stone-300 animate-fade-in">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Panduan 3 Langkah Memasang di Google Spreadsheet:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-stone-300 pl-1">
              <li>Buka spreadsheet baru di Google Drive (atau ketik <strong className="text-white">sheets.new</strong>).</li>
              <li>Klik menu <strong className="text-emerald-300">Ekstensi &gt; Apps Script</strong>.</li>
              <li>Hapus kode bawaan, tempelkan skrip di bawah ini, lalu klik tombol <strong className="text-emerald-300">Deploy (Terapkan) &gt; New deployment</strong>, pilih tipe <strong className="text-emerald-300">Web app</strong>, atur Who has access: <strong className="text-emerald-300">Anyone (Siapa saja)</strong>.</li>
              <li>Salin Web App URL yang diberikan dan tempelkan ke kolom URL di atas.</li>
            </ol>

            <div className="pt-2">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-mono text-stone-400">Kode Google Apps Script:</span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {isScriptCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isScriptCopied ? 'Tersalin!' : 'Salin Kode Skrip'}</span>
                </button>
              </div>
              <pre className="p-3 bg-stone-900 rounded-lg text-[11px] font-mono text-stone-300 overflow-x-auto max-h-36 border border-stone-800">
                {appsScriptCode}
              </pre>
            </div>
          </div>
        )}

        {/* Method 2: Instant 1-Click Copy Table (Ctrl+V into Google Sheets) */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Copy className="w-3.5 h-3.5" />
              <span>Metode 2: Salin Tabel Langsung (Ctrl + V di Google Sheets)</span>
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Klik tombol di bawah untuk menyalin seluruh baris tabel nilai, kemudian buka Google Sheets dan tekan <strong className="text-white">Ctrl + V</strong> (atau Paste). Seluruh kolom (Nama, Mode, Kelas, Skor, Predikat) akan terisi otomatis dan rapi!
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyForGoogleSheets}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? '✓ Format Google Sheets Tersalin!' : 'Salin Tabel Google Sheets (Clipboard)'}</span>
            </button>

            <a
              href="https://sheets.new"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Buka Google Sheets Baru</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-stone-800">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Selesai / Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
