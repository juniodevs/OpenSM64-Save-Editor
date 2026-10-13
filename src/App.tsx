import { useState } from 'react';
import {
  parseSaveFile,
  serializeSaveFile,
  completeSlot,
  clearSlot,
  cloneSlot,
  SAVE_FLAG_FILE_EXISTS
} from './core';
import type { ParsedSaveFile, SaveSlot, SettingsData } from './core';

import { LanguageProvider, useLanguage } from './i18n';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { SlotTabs } from './components/SlotTabs';
import { SlotToolbar } from './components/SlotToolbar';
import { CastleFlags } from './components/CastleFlags';
import { CourseTable } from './components/CourseTable';
import { SettingsTab } from './components/SettingsTab';
import { SaveSummaryBar } from './components/SaveSummaryBar';

function AppEditor() {
  const { t } = useLanguage();
  const [parsedFile, setParsedFile] = useState<ParsedSaveFile | null>(null);
  const [fileName, setFileName] = useState<string>('sm64_save.eep');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showBackup, setShowBackup] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadFile = (buffer: ArrayBuffer, name: string) => {
    try {
      setError(null);
      const parsed = parseSaveFile(buffer);
      setParsedFile(parsed);
      setFileName(name);
      setActiveTab(0);
      setShowBackup(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to parse save file.');
      }
    }
  };

  const handleLoadParsed = (parsed: ParsedSaveFile, name: string) => {
    setError(null);
    setParsedFile(parsed);
    setFileName(name);
    setActiveTab(0);
    setShowBackup(false);
  };

  const handleClose = () => {
    setParsedFile(null);
    setError(null);
  };

  const updateCurrentSlot = (mutator: (slot: SaveSlot) => void) => {
    if (!parsedFile || activeTab < 0 || activeTab >= 4) return;
    const copyIdx = showBackup ? 1 : 0;
    const current = parsedFile.slots[activeTab][copyIdx];
    const cloned = cloneSlot(current);
    mutator(cloned);

    const nextSlots = parsedFile.slots.map((pair, idx) => {
      if (idx === activeTab) {
        const nextPair: [SaveSlot, SaveSlot] = [...pair];
        nextPair[copyIdx] = cloned;
        return nextPair;
      }
      return pair;
    }) as [SaveSlot, SaveSlot][];

    setParsedFile({
      ...parsedFile,
      slots: nextSlots
    });
  };

  const handleCompleteSlot = () => {
    updateCurrentSlot((slot) => {
      const completed = completeSlot();
      Object.assign(slot, completed);
    });
  };

  const handleClearSlot = () => {
    updateCurrentSlot((slot) => {
      const cleared = clearSlot();
      Object.assign(slot, cleared);
    });
  };

  const handleCopySlot = (targetIdx: number) => {
    if (!parsedFile || targetIdx === activeTab) return;
    const sourceSlot = parsedFile.slots[activeTab][showBackup ? 1 : 0];
    const copied = cloneSlot(sourceSlot);

    const nextSlots = parsedFile.slots.map((pair, idx) => {
      if (idx === targetIdx) {
        const nextPair: [SaveSlot, SaveSlot] = [...pair];
        nextPair[0] = cloneSlot(copied);
        nextPair[1] = cloneSlot(copied);
        return nextPair;
      }
      return pair;
    }) as [SaveSlot, SaveSlot][];

    setParsedFile({
      ...parsedFile,
      slots: nextSlots
    });
  };

  const handleToggleFileExists = () => {
    updateCurrentSlot((slot) => {
      const has = (slot.flags & SAVE_FLAG_FILE_EXISTS) !== 0;
      slot.flags = has ? (slot.flags & ~SAVE_FLAG_FILE_EXISTS) : (slot.flags | SAVE_FLAG_FILE_EXISTS);
    });
  };

  const handleChangeFlags = (newFlags: number) => {
    updateCurrentSlot((slot) => {
      slot.flags = newFlags;
    });
  };

  const handleChangeCourseData = (newCourseData: Uint8Array) => {
    updateCurrentSlot((slot) => {
      slot.courseData = newCourseData;
    });
  };

  const handleChangeCoinScore = (courseIdx: number, score: number) => {
    updateCurrentSlot((slot) => {
      slot.courseCoinScores[courseIdx] = score;
    });
  };

  const handleChangeSettings = (newSettings: SettingsData) => {
    if (!parsedFile) return;
    const copyIdx = showBackup ? 1 : 0;
    const nextSettingsPair: [SettingsData, SettingsData] = [...parsedFile.settings];
    nextSettingsPair[copyIdx] = newSettings;

    setParsedFile({
      ...parsedFile,
      settings: nextSettingsPair
    });
  };

  const handleDownload = () => {
    if (!parsedFile) return;
    const bytes = serializeSaveFile(parsedFile);
    const blob = new Blob([bytes as BlobPart], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentSlot = parsedFile && activeTab < 4
    ? parsedFile.slots[activeTab][showBackup ? 1 : 0]
    : null;

  return (
    <div className="container">
      <div className="sm64-screen-frame">
        <Header />

        {error && (
          <div
            role="alert"
            className="n64-box"
            style={{
              padding: '14px 18px',
              marginBottom: '20px',
              borderColor: 'var(--color-red)'
            }}
          >
            <strong style={{ color: '#ff6e6e' }}>{t.errorLoad}</strong> {error}
          </div>
        )}

        {!parsedFile ? (
          <FileUpload onLoadFile={handleLoadFile} onLoadParsed={handleLoadParsed} />
        ) : (
          <main>
            <SaveSummaryBar
              fileName={fileName}
              endianness={parsedFile.endianness}
              originalSize={parsedFile.originalSize}
              warnings={parsedFile.warnings}
              onDownload={handleDownload}
              onClose={handleClose}
            />

            <SlotTabs
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              slots={parsedFile.slots}
              showBackup={showBackup}
              onToggleBackup={() => setShowBackup(!showBackup)}
            />

            {activeTab < 4 && currentSlot && (
              <div>
                <SlotToolbar
                  currentSlotIndex={activeTab}
                  slot={currentSlot}
                  onCompleteSlot={handleCompleteSlot}
                  onClearSlot={handleClearSlot}
                  onCopySlot={handleCopySlot}
                  onToggleFileExists={handleToggleFileExists}
                  onOpenSettings={() => setActiveTab(4)}
                  disabled={showBackup}
                />

                <CastleFlags
                  slot={currentSlot}
                  onChangeFlags={handleChangeFlags}
                  disabled={showBackup}
                />

                <CourseTable
                  slot={currentSlot}
                  onChangeCourseData={handleChangeCourseData}
                  onChangeCoinScore={handleChangeCoinScore}
                  disabled={showBackup}
                />
              </div>
            )}

            {activeTab === 4 && (
              <div>
                <div style={{ marginBottom: '14px' }}>
                  <button
                    type="button"
                    className="n64-btn n64-btn-blue"
                    onClick={() => setActiveTab(0)}
                    style={{ fontSize: '0.85rem', padding: '6px 14px' }}
                  >
                    {t.backToFilesBtn}
                  </button>
                </div>
                <SettingsTab
                  settings={parsedFile.settings[showBackup ? 1 : 0]}
                  onChangeSettings={handleChangeSettings}
                  disabled={showBackup}
                />
              </div>
            )}
          </main>
        )}

        <footer style={{ marginTop: '28px', paddingTop: '16px', borderTop: '2px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
          <a
            href="https://github.com/juniodevs/OpenSM64-Save-Editor"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffe600',
              textDecoration: 'none',
              fontFamily: 'var(--font-hud)',
              fontSize: '0.92rem',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 230, 0, 0.3)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {t.footerSourceCode}
          </a>
        </footer>
      </div>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppEditor />
    </LanguageProvider>
  );
}

export default App;
