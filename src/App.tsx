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
