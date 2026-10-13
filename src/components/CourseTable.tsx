import React from 'react';
import {
  COURSE_COUNT,
  MAIN_COURSE_COUNT,
  COURSE_NAMES,
  COURSE_STAR_COUNTS,
  COURSE_HAS_CANNON,
  COURSE_STAR_NAMES,
  COURSE_FLAG_CANNON_OPEN
} from '../core';
import type { SaveSlot } from '../core';
import { useLanguage } from '../i18n';

interface CourseTableProps {
  slot: SaveSlot;
  onChangeCourseData: (newCourseData: Uint8Array) => void;
  onChangeCoinScore: (courseIdx: number, score: number) => void;
  disabled?: boolean;
}

export const CourseTable: React.FC<CourseTableProps> = ({
  slot,
  onChangeCourseData,
  onChangeCoinScore,
  disabled
}) => {
  const { t } = useLanguage();

  const toggleStar = (courseIdx: number, starIdx: number) => {
    if (disabled) return;
    const next = new Uint8Array(slot.courseData);
    const mask = 1 << starIdx;
    const current = next[courseIdx] ?? 0;
    next[courseIdx] = (current & mask) !== 0 ? (current & ~mask) : (current | mask);
    onChangeCourseData(next);
  };

  const toggleCannon = (courseIdx: number) => {
    if (disabled) return;
    const next = new Uint8Array(slot.courseData);
    const mask = COURSE_FLAG_CANNON_OPEN;
    const current = next[courseIdx] ?? 0;
    next[courseIdx] = (current & mask) !== 0 ? (current & ~mask) : (current | mask);
    onChangeCourseData(next);
  };

  const handleCoinChange = (courseIdx: number, val: string) => {
    if (disabled) return;
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      onChangeCoinScore(courseIdx, 0);
    } else {
      const clamped = Math.max(0, Math.min(255, num));
      onChangeCoinScore(courseIdx, clamped);
    }
  };

  return (
    <div className="n64-box" style={{ padding: '20px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-hud)', color: '#ffe600' }}>
          {t.coursesTitle}
        </h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {t.coursesSubtitle}
        </span>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
          <thead>
            <tr style={{ borderBottom: '3px solid var(--bevel-dark)', color: '#ffe600', fontFamily: 'var(--font-hud)', fontSize: '0.85rem' }}>
              <th style={{ padding: '10px 6px', width: '36px' }}>{t.colNumber}</th>
              <th style={{ padding: '10px 12px' }}>{t.colCourse}</th>
              <th style={{ padding: '10px 8px', textAlign: 'center' }}>{t.colStars}</th>
              <th style={{ padding: '10px 8px', textAlign: 'center', width: '90px' }}>{t.col100Coins}</th>
              <th style={{ padding: '10px 8px', textAlign: 'center', width: '80px' }}>{t.colCannon}</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', width: '100px' }}>{t.colMaxCoins}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: COURSE_COUNT }).map((_, c) => {
              const name = COURSE_NAMES[c];
              const starTotal = COURSE_STAR_COUNTS[c];
              const starNames = COURSE_STAR_NAMES[c];
              const courseByte = slot.courseData[c] ?? 0;
              const hasCannon = COURSE_HAS_CANNON[c];
              const isMainCourse = c < MAIN_COURSE_COUNT;

              return (
                <tr
                  key={name}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: c % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <td style={{ padding: '10px 6px', color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 700 }}>
                    {c + 1}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                    {name}
                  </td>

                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}>
                      {Array.from({ length: Math.min(6, starTotal) }).map((__, s) => {
                        const isCollected = (courseByte & (1 << s)) !== 0;
                        const starName = starNames[s] || `Star ${s + 1}`;

                        return (
                          <button
                            key={s}
                            type="button"
                            title={starName}
                            aria-label={`${name}: ${starName}`}
                            disabled={disabled}
                            onClick={() => toggleStar(c, s)}
                            style={{
                              width: '32px',
                              height: '32px',
                              minHeight: '32px',
                              padding: 0,
                              borderRadius: '3px',
                              backgroundColor: isCollected ? '#0a1d5c' : '#040d2e',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderTop: `2px solid ${isCollected ? '#ffe600' : '#14296b'}`,
                              borderLeft: `2px solid ${isCollected ? '#ffe600' : '#14296b'}`,
                              borderBottom: `2px solid ${isCollected ? '#b38600' : '#010517'}`,
                              borderRight: `2px solid ${isCollected ? '#b38600' : '#010517'}`,
                              boxShadow: isCollected ? '0 0 10px rgba(255,230,0,0.6)' : 'none',
                              cursor: disabled ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {isCollected ? (
                              <img src="/starmario.png" alt="★" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                            ) : (
                              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1rem' }}>★</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    {starTotal === 7 ? (
                      <button
                        type="button"
                        title={t.star100Label}
                        aria-label={`${name}: ${t.star100Label}`}
                        disabled={disabled}
                        onClick={() => toggleStar(c, 6)}
                        style={{
                          width: '38px',
                          height: '32px',
                          minHeight: '32px',
                          padding: 0,
                          borderRadius: '3px',
                          backgroundColor: (courseByte & (1 << 6)) !== 0 ? '#0a1d5c' : '#040d2e',
                          color: (courseByte & (1 << 6)) !== 0 ? '#ffe600' : 'rgba(255,255,255,0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          borderTop: `2px solid ${(courseByte & (1 << 6)) !== 0 ? '#ffe600' : '#14296b'}`,
                          borderLeft: `2px solid ${(courseByte & (1 << 6)) !== 0 ? '#ffe600' : '#14296b'}`,
                          borderBottom: `2px solid ${(courseByte & (1 << 6)) !== 0 ? '#b38600' : '#010517'}`,
                          borderRight: `2px solid ${(courseByte & (1 << 6)) !== 0 ? '#b38600' : '#010517'}`,
                          boxShadow: (courseByte & (1 << 6)) !== 0 ? '0 0 10px rgba(255,230,0,0.6)' : 'none',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-hud)',
                          fontWeight: 'normal',
                          cursor: disabled ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {(courseByte & (1 << 6)) !== 0 ? (
                          <img src="/starmario.png" alt="100 Moedas" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                        ) : (
                          '100'
                        )}
                      </button>
                    ) : (
                      <span style={{ color: 'var(--text-dim)' }}>-</span>
                    )}
                  </td>

                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    {hasCannon ? (
                      <label className="checkbox-label" style={{ minHeight: 'auto', justifyContent: 'center' }}>
                        <input
                          type="checkbox"
                          checked={(courseByte & COURSE_FLAG_CANNON_OPEN) !== 0}
                          onChange={() => toggleCannon(c)}
                          disabled={disabled}
                          aria-label={`Canhao em ${name}`}
                        />
                      </label>
                    ) : (
                      <span style={{ color: 'var(--text-dim)' }}>-</span>
                    )}
                  </td>

                  <td style={{ padding: '6px 12px', textAlign: 'right' }}>
                    {isMainCourse ? (
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={slot.courseCoinScores[c] ?? 0}
                        onChange={(e) => handleCoinChange(c, e.target.value)}
                        disabled={disabled}
                        aria-label={`Moedas maximas em ${name}`}
                        style={{
                          width: '64px',
                          textAlign: 'center',
                          padding: '4px 6px',
                          minHeight: '32px',
                          fontWeight: 700
                        }}
                      />
                    ) : (
                      <span style={{ color: 'var(--text-dim)' }}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
