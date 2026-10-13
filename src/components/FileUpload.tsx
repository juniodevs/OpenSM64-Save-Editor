import React, { useRef, useState } from 'react';
import {
  createEmptySlot,
  completeSlot,
  createDefaultSettings,
  SAVE_DATA_SIZE
} from '../core';
import type { ParsedSaveFile, Endianness } from '../core';
import { useLanguage } from '../i18n';

interface FileUploadProps {
  onLoadFile: (buffer: ArrayBuffer, fileName: string) => void;
  onLoadParsed: (parsed: ParsedSaveFile, fileName: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onLoadFile, onLoadParsed }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (buffer) {
        onLoadFile(buffer, file.name);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const createSample = (endianness: Endianness, isCompleted: boolean) => {
    const slot0 = isCompleted ? completeSlot() : createEmptySlot();
    const sample: ParsedSaveFile = {
      endianness,
      slots: [
        [slot0, createEmptySlot()],
        [createEmptySlot(), createEmptySlot()],
        [createEmptySlot(), createEmptySlot()],
        [createEmptySlot(), createEmptySlot()]
      ],
      settings: [createDefaultSettings(), createDefaultSettings()],
      originalSize: SAVE_DATA_SIZE,
      trailingPadding: new Uint8Array(0),
      warnings: []
    };
    const name = endianness === 'le' ? 'sm64_save_pc.sav' : 'sm64_save_n64.eep';
    onLoadParsed(sample, name);
  };

  return (
    <section
      aria-label="Carregamento de arquivo de save"
      className="n64-file-card-box"
      style={{
        padding: '36px 24px',
        textAlign: 'center',
        maxWidth: '680px',
        margin: '0 auto 24px auto',
        boxShadow: isDragging ? '0 0 24px rgba(255, 230, 0, 0.6)' : undefined
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".eep,.sav,.bin,.srm,*/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      <div style={{ marginBottom: '16px' }}>
        <img
          src="/starmario.png"
          alt="Estrela Super Mario 64"
          style={{
            width: '94px',
            height: '94px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 18px rgba(255,230,0,0.65))'
          }}
        />
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-hud)',
          fontSize: '1.6rem',
          margin: '0 0 8px 0',
          color: '#ffe600',
          textShadow: '2px 2px 0 #000, 3px 3px 0 #001f66',
          letterSpacing: '2px'
        }}
      >
        {t.uploadTitle}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: '0 0 24px 0' }}>
        {t.uploadDescription}
      </p>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="n64-btn n64-btn-yellow"
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '14px 32px', fontSize: '1.1rem' }}
        >
          {t.openFileBtn}
        </button>
      </div>

      <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '2px solid rgba(255, 255, 255, 0.12)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '14px' }}>
          {t.orCreatePreset}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="n64-btn n64-btn-green"
            onClick={() => createSample('le', true)}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            {t.preset100Pc}
          </button>
          <button
            type="button"
            className="n64-btn n64-btn-green"
            onClick={() => createSample('be', true)}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            {t.preset100N64}
          </button>
          <button
            type="button"
            className="n64-btn n64-btn-blue"
            onClick={() => createSample('be', false)}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            {t.presetNewN64}
          </button>
        </div>
      </div>
    </section>
  );
};
