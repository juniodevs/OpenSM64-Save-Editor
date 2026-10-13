import React from 'react';
import { COURSE_NAMES, MAIN_COURSE_COUNT, NUM_SAVE_SLOTS } from '../core';
import type { SettingsData } from '../core';
import { useLanguage } from '../i18n';

interface SettingsTabProps {
  settings: SettingsData;
  onChangeSettings: (newSettings: SettingsData) => void;
  disabled?: boolean;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onChangeSettings,
  disabled
}) => {
  const { t } = useLanguage();

  const setSoundMode = (val: number) => {
    if (disabled) return;
    onChangeSettings({ ...settings, soundMode: val });
  };

  const setLanguage = (val: number) => {
    if (disabled) return;
    onChangeSettings({ ...settings, language: val });
  };

  const updateCoinAge = (courseIdx: number, slotIdx: number, val: number) => {
    if (disabled) return;
    const clamped = Math.max(0, Math.min(3, val));
    const nextAges = [...settings.coinScoreAges];
    const shift = courseIdx * 2;
    nextAges[slotIdx] &= ~(0x3 << shift);
    nextAges[slotIdx] |= (clamped << shift);
    onChangeSettings({ ...settings, coinScoreAges: nextAges });
  };

  const slotLabels = ['Mario A', 'Mario B', 'Mario C', 'Mario D'];

  return (
    <div className="n64-box" style={{ padding: '24px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#ffe600', fontFamily: 'var(--font-hud)' }}>
          {t.settingsTitle}
        </h2>
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
          {t.checksumLabel}: 0x{settings.checksum.toString(16).toUpperCase().padStart(4, '0')}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="n64-box" style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)' }}>
            {t.soundModeTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: t.soundStereo, value: 0 },
              { label: t.soundMono, value: 1 },
              { label: t.soundHeadset, value: 2 }
            ].map((item) => (
              <label key={item.label} className="checkbox-label">
                <input
                  type="radio"
                  name="soundMode"
                  checked={settings.soundMode === item.value}
                  onChange={() => setSoundMode(item.value)}
                  disabled={disabled}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="n64-box" style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)' }}>
            {t.languageTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: t.langEnglish, value: 0 },
              { label: t.langFrench, value: 1 },
              { label: t.langGerman, value: 2 }
            ].map((item) => (
              <label key={item.label} className="checkbox-label">
                <input
                  type="radio"
                  name="language"
                  checked={settings.language === item.value}
                  onChange={() => setLanguage(item.value)}
                  disabled={disabled}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)' }}>
          {t.coinRecordsTitle}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 16px 0' }}>
          {t.coinRecordsDesc}
        </p>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '580px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--bevel-dark)', color: '#ffe600', fontFamily: 'var(--font-hud)', fontSize: '0.85rem' }}>
                <th style={{ padding: '8px 6px', width: '36px' }}>{t.colNumber}</th>
                <th style={{ padding: '8px 12px' }}>{t.colCourse}</th>
                {slotLabels.map((lbl) => (
                  <th key={lbl} style={{ padding: '8px 8px', textAlign: 'center', width: '100px' }}>
                    {lbl}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: MAIN_COURSE_COUNT }).map((_, c) => {
                const shift = c * 2;

                return (
                  <tr
                    key={c}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: c % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <td style={{ padding: '8px 6px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                      {c + 1}
                    </td>
                    <td style={{ padding: '8px 12px', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>
                      {COURSE_NAMES[c]}
                    </td>
                    {Array.from({ length: NUM_SAVE_SLOTS }).map((__, s) => {
                      const ageVal = (settings.coinScoreAges[s] >> shift) & 0x3;

                      return (
                        <td key={s} style={{ padding: '6px 8px', textAlign: 'center' }}>
                          <input
                            type="number"
                            min="0"
                            max="3"
                            value={ageVal}
                            onChange={(e) => updateCoinAge(c, s, parseInt(e.target.value, 10))}
                            disabled={disabled}
                            aria-label={`Idade moedas ${COURSE_NAMES[c]} ${slotLabels[s]}`}
                            style={{
                              width: '54px',
                              textAlign: 'center',
                              padding: '4px 6px',
                              minHeight: '32px',
                              fontWeight: 700
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
