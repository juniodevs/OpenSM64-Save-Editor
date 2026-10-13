import React, { useState } from 'react';
import { SAVE_FLAG_FILE_EXISTS } from '../core';
import type { SaveSlot } from '../core';
import { useLanguage } from '../i18n';

interface SlotToolbarProps {
  currentSlotIndex: number;
  slot: SaveSlot;
  onCompleteSlot: () => void;
  onClearSlot: () => void;
  onCopySlot: (targetIndex: number) => void;
  onToggleFileExists: () => void;
  onOpenSettings: () => void;
  disabled?: boolean;
}

export const SlotToolbar: React.FC<SlotToolbarProps> = ({
  currentSlotIndex,
  slot,
  onCompleteSlot,
  onClearSlot,
  onCopySlot,
  onToggleFileExists,
  onOpenSettings,
  disabled
}) => {
  const { t } = useLanguage();
  const [targetSlot, setTargetSlot] = useState<number>((currentSlotIndex + 1) % 4);
  const [showCopySelect, setShowCopySelect] = useState<boolean>(false);
  const slotNames = ['Mario A', 'Mario B', 'Mario C', 'Mario D'];
  const fileExists = (slot.flags & SAVE_FLAG_FILE_EXISTS) !== 0;

  const handleCopyClick = () => {
    if (!showCopySelect) {
      setShowCopySelect(true);
    } else {
      onCopySlot(targetSlot);
      setShowCopySelect(false);
    }
  };

  return (
    <div
      className="n64-box"
      style={{
        padding: '16px 20px',
        marginBottom: '24px'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <button
          type="button"
          className="n64-btn n64-btn-green"
          onClick={onCompleteSlot}
          disabled={disabled}
          title={t.btn100Title}
        >
          {t.btn100All}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            type="button"
            className="n64-btn n64-btn-red"
            onClick={handleCopyClick}
            disabled={disabled}
            title={t.btnCopyTitle}
          >
            {showCopySelect ? t.btnCopyConfirm : t.btnCopy}
          </button>
        </div>

        <button
          type="button"
          className="n64-btn n64-btn-yellow"
          onClick={onClearSlot}
          disabled={disabled}
          title={t.btnEraseTitle}
        >
          {t.btnErase}
        </button>

        <button
          type="button"
          className="n64-btn n64-btn-magenta"
          onClick={onOpenSettings}
          disabled={disabled}
          title={t.btnSoundTitle}
        >
          {t.btnSound}
        </button>
      </div>

      {showCopySelect && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ fontSize: '0.9rem', color: '#ffe600', fontWeight: 700 }}>
            {t.copyTargetPrompt}
          </span>
          <select
            value={targetSlot}
            onChange={(e) => setTargetSlot(parseInt(e.target.value, 10))}
            disabled={disabled}
            aria-label="Slot de destino para cópia"
          >
            {slotNames.map((name, idx) => (
              idx !== currentSlotIndex && (
                <option key={name} value={idx}>
                  {name}
                </option>
              )
            ))}
          </select>
          <button
            type="button"
            className="n64-btn n64-btn-red"
            onClick={() => onCopySlot(targetSlot)}
            style={{ padding: '6px 14px', minHeight: '34px', fontSize: '0.85rem' }}
          >
            {t.copyExecuteBtn}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowCopySelect(false)}
            style={{ padding: '6px 12px', minHeight: '34px', fontSize: '0.85rem' }}
          >
            {t.cancelBtn}
          </button>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <label className="checkbox-label" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
          <input
            type="checkbox"
            checked={fileExists}
            onChange={onToggleFileExists}
            disabled={disabled}
          />
          {t.fileExistsLabel}
        </label>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            padding: '4px 8px',
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-sm)',
            borderTop: '2px solid var(--bevel-dark)',
            borderLeft: '2px solid var(--bevel-dark)',
            borderBottom: '2px solid var(--bevel-light)',
            borderRight: '2px solid var(--bevel-light)'
          }}
        >
          {t.checksumLabel}: 0x{slot.checksum.toString(16).toUpperCase().padStart(4, '0')}
        </span>
      </div>
    </div>
  );
};
