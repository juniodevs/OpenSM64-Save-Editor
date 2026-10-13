import React from 'react';
import { countTotalStars, SAVE_FLAG_FILE_EXISTS } from '../core';
import type { SaveSlot } from '../core';
import { useLanguage } from '../i18n';

interface SlotTabsProps {
  activeTab: number;
  onSelectTab: (index: number) => void;
  slots: [SaveSlot, SaveSlot][];
  showBackup: boolean;
  onToggleBackup: () => void;
}

export const SlotTabs: React.FC<SlotTabsProps> = ({
  activeTab,
  onSelectTab,
  slots,
  showBackup,
  onToggleBackup
}) => {
  const { t } = useLanguage();
  const slotLabels = ['MARIO A', 'MARIO B', 'MARIO C', 'MARIO D'];

  return (
    <section aria-label="Selecao de arquivo" style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '1.4rem',
            margin: 0,
            color: '#ffe600',
            textShadow: '2px 2px 0 #000, 3px 3px 0 #001254',
            letterSpacing: '2px'
          }}
        >
          {t.selectFileTitle}
        </h2>

        <label className="checkbox-label" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <input
            type="checkbox"
            checked={showBackup}
            onChange={onToggleBackup}
          />
          {t.showBackupMirror}
        </label>
      </div>

      <div
        role="tablist"
        className="sm64-file-grid"
        style={{
          marginBottom: '20px'
        }}
      >
        {slotLabels.map((label, idx) => {
          const currentSlot = slots[idx][showBackup ? 1 : 0];
          const starCount = countTotalStars(currentSlot);
          const hasFile = (currentSlot.flags & SAVE_FLAG_FILE_EXISTS) !== 0 || starCount > 0;
          const isActive = activeTab === idx;

          return (
            <div key={label} style={{ position: 'relative' }}>
              <div
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '1.05rem',
                  color: isActive ? '#ffe600' : '#ffffff',
                  textShadow: '2px 2px 0 #000',
                  marginBottom: '6px',
                  letterSpacing: '1px',
                  paddingLeft: '4px'
                }}
              >
                {label}
              </div>

              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: '56px',
                    top: '20px',
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}
                  className="sm64-glove-float"
                >
                  <img
                    src="/cursors/mario-normal.png"
                    alt="Selecionado"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.8))'
                    }}
                  />
                </div>
              )}

              <button
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelectTab(idx)}
                className={`n64-file-card ${isActive ? 'n64-file-card-active' : ''}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '88px'
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <img
                    src="/rostomario.png"
                    alt="Mario 64"
                    className="sm64-slot-face"
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {hasFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src="/starmario.png"
                        alt="Estrela"
                        className="sm64-slot-star"
                      />
                      <span className="sm64-star-count">
                        {starCount}
                      </span>
                    </div>
                  ) : (
                    <span className="sm64-new-text">
                      {t.newSlotText}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
