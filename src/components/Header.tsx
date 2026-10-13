import React from 'react';
import { useLanguage } from '../i18n';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header style={{ marginBottom: '20px', position: 'relative', textAlign: 'center' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '4px 6px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        <button
          type="button"
          onClick={() => setLanguage('en')}
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '0.85rem',
            padding: '4px 8px',
            minHeight: '28px',
            backgroundColor: language === 'en' ? '#ffe600' : 'transparent',
            color: language === 'en' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          aria-label="Switch language to English"
        >
          {t.langEn}
        </button>

        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>|</span>

        <button
          type="button"
          onClick={() => setLanguage('pt')}
          style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '0.85rem',
            padding: '4px 8px',
            minHeight: '28px',
            backgroundColor: language === 'pt' ? '#ffe600' : 'transparent',
            color: language === 'pt' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          aria-label="Mudar idioma para Português"
        >
          {t.langPt}
        </button>
      </div>

      <div style={{ display: 'inline-block' }}>
        <h1 className="sm64-logo-title" aria-label="SUPER MARIO 64">
          <span className="sm64-letter-blue">S</span>
          <span className="sm64-letter-red">U</span>
          <span className="sm64-letter-green">P</span>
          <span className="sm64-letter-yellow">E</span>
          <span className="sm64-letter-red">R</span>
          <span className="sm64-letter-space"> </span>
          <span className="sm64-letter-blue">M</span>
          <span className="sm64-letter-yellow">A</span>
          <span className="sm64-letter-red">R</span>
          <span className="sm64-letter-blue">I</span>
          <span className="sm64-letter-green">O</span>
          <span className="sm64-letter-space"> </span>
          <span className="sm64-letter-red">6</span>
          <span className="sm64-letter-yellow">4</span>
        </h1>

        <div className="sm64-subtitle">
          <span className="sm64-letter-green">S</span>
          <span className="sm64-letter-yellow">A</span>
          <span className="sm64-letter-red">V</span>
          <span className="sm64-letter-magenta">E</span>
          <span className="sm64-letter-space"> </span>
          <span className="sm64-letter-cyan">E</span>
          <span className="sm64-letter-yellow">D</span>
          <span className="sm64-letter-magenta">I</span>
          <span className="sm64-letter-cyan">T</span>
          <span className="sm64-letter-orange">O</span>
          <span className="sm64-letter-green">R</span>
        </div>
      </div>
    </header>
  );
};
