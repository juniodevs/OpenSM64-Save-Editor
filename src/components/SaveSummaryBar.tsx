import React from 'react';
import type { Endianness } from '../core';
import { useLanguage } from '../i18n';

interface SaveSummaryBarProps {
  fileName: string;
  endianness: Endianness;
  originalSize: number;
  warnings: string[];
  onDownload: () => void;
  onClose: () => void;
}

export const SaveSummaryBar: React.FC<SaveSummaryBarProps> = ({
  fileName,
  endianness,
  originalSize,
  warnings,
  onDownload,
  onClose
}) => {
  const { t } = useLanguage();

  return (
    <div style={{ marginBottom: '20px' }}>
      {warnings.length > 0 && (
        <div
          role="alert"
          className="n64-box"
          style={{
            padding: '12px 16px',
            marginBottom: '14px',
            borderColor: 'var(--color-yellow)'
          }}
        >
          <strong style={{ display: 'block', marginBottom: '4px', color: '#ffe600' }}>
            {t.repairWarnings}
          </strong>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="n64-box"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '14px 18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.5px' }}>
            {fileName}
          </span>
          <span className="n64-badge">
            {endianness === 'be' ? t.n64Format : t.pcFormat}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            ({originalSize} {t.bytesLabel})
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button type="button" className="n64-btn n64-btn-blue" onClick={onClose} style={{ fontSize: '0.85rem', padding: '8px 14px' }}>
            {t.switchFileBtn}
          </button>
          <button type="button" className="n64-btn n64-btn-green" onClick={onDownload} style={{ fontSize: '0.95rem', padding: '10px 20px' }}>
            {t.downloadSaveBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
