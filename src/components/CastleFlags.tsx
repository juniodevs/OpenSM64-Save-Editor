import React from 'react';
import {
  SAVE_FLAG_HAVE_WING_CAP,
  SAVE_FLAG_HAVE_METAL_CAP,
  SAVE_FLAG_HAVE_VANISH_CAP,
  SAVE_FLAG_HAVE_KEY_1,
  SAVE_FLAG_HAVE_KEY_2,
  SAVE_FLAG_UNLOCKED_BASEMENT_DOOR,
  SAVE_FLAG_UNLOCKED_UPSTAIRS_DOOR,
  SAVE_FLAG_DDD_MOVED_BACK,
  SAVE_FLAG_MOAT_DRAINED,
  SAVE_FLAG_UNLOCKED_PSS_DOOR,
  SAVE_FLAG_UNLOCKED_WF_DOOR,
  SAVE_FLAG_UNLOCKED_CCM_DOOR,
  SAVE_FLAG_UNLOCKED_JRB_DOOR,
  SAVE_FLAG_UNLOCKED_BITDW_DOOR,
  SAVE_FLAG_UNLOCKED_BITFS_DOOR,
  SAVE_FLAG_CAP_ON_GROUND,
  SAVE_FLAG_CAP_ON_KLEPTO,
  SAVE_FLAG_CAP_ON_UKIKI,
  SAVE_FLAG_CAP_ON_MR_BLIZZARD,
  SAVE_FLAG_UNLOCKED_50_STAR_DOOR,
  SAVE_FLAG_COLLECTED_TOAD_STAR_1,
  SAVE_FLAG_COLLECTED_TOAD_STAR_2,
  SAVE_FLAG_COLLECTED_TOAD_STAR_3,
  SAVE_FLAG_COLLECTED_MIPS_STAR_1,
  SAVE_FLAG_COLLECTED_MIPS_STAR_2
} from '../core';
import type { SaveSlot } from '../core';
import { useLanguage } from '../i18n';

interface CastleFlagsProps {
  slot: SaveSlot;
  onChangeFlags: (newFlags: number) => void;
  disabled?: boolean;
}

export const CastleFlags: React.FC<CastleFlagsProps> = ({ slot, onChangeFlags, disabled }) => {
  const { t } = useLanguage();

  const toggleFlag = (mask: number) => {
    if (disabled) return;
    const has = (slot.flags & mask) !== 0;
    const next = has ? (slot.flags & ~mask) : (slot.flags | mask);
    onChangeFlags(next);
  };

  const doors = [
    { label: t.doors.basement, mask: SAVE_FLAG_UNLOCKED_BASEMENT_DOOR },
    { label: t.doors.wf, mask: SAVE_FLAG_UNLOCKED_WF_DOOR },
    { label: t.doors.ccm, mask: SAVE_FLAG_UNLOCKED_CCM_DOOR },
    { label: t.doors.jrb, mask: SAVE_FLAG_UNLOCKED_JRB_DOOR },
    { label: t.doors.pss, mask: SAVE_FLAG_UNLOCKED_PSS_DOOR },
    { label: t.doors.bitdw, mask: SAVE_FLAG_UNLOCKED_BITDW_DOOR },
    { label: t.doors.bitfs, mask: SAVE_FLAG_UNLOCKED_BITFS_DOOR },
    { label: t.doors.upstairs, mask: SAVE_FLAG_UNLOCKED_UPSTAIRS_DOOR },
    { label: t.doors.star50, mask: SAVE_FLAG_UNLOCKED_50_STAR_DOOR }
  ];

  const caps = [
    { label: t.caps.wing, mask: SAVE_FLAG_HAVE_WING_CAP },
    { label: t.caps.metal, mask: SAVE_FLAG_HAVE_METAL_CAP },
    { label: t.caps.vanish, mask: SAVE_FLAG_HAVE_VANISH_CAP },
    { label: t.caps.ground, mask: SAVE_FLAG_CAP_ON_GROUND },
    { label: t.caps.klepto, mask: SAVE_FLAG_CAP_ON_KLEPTO },
    { label: t.caps.ukiki, mask: SAVE_FLAG_CAP_ON_UKIKI },
    { label: t.caps.blizzard, mask: SAVE_FLAG_CAP_ON_MR_BLIZZARD }
  ];

  const misc = [
    { label: t.keys.key1, mask: SAVE_FLAG_HAVE_KEY_1 },
    { label: t.keys.key2, mask: SAVE_FLAG_HAVE_KEY_2 },
    { label: t.keys.moat, mask: SAVE_FLAG_MOAT_DRAINED },
    { label: t.keys.ddd, mask: SAVE_FLAG_DDD_MOVED_BACK }
  ];

  const castleStars = [
    { label: t.castleStars.toad1, mask: SAVE_FLAG_COLLECTED_TOAD_STAR_1 },
    { label: t.castleStars.toad2, mask: SAVE_FLAG_COLLECTED_TOAD_STAR_2 },
    { label: t.castleStars.toad3, mask: SAVE_FLAG_COLLECTED_TOAD_STAR_3 },
    { label: t.castleStars.mips1, mask: SAVE_FLAG_COLLECTED_MIPS_STAR_1 },
    { label: t.castleStars.mips2, mask: SAVE_FLAG_COLLECTED_MIPS_STAR_2 }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div className="n64-box" style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)', letterSpacing: '0.5px' }}>
          {t.unlockedDoorsTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {doors.map((item) => (
            <label key={item.label} className="checkbox-label">
              <input
                type="checkbox"
                checked={(slot.flags & item.mask) !== 0}
                onChange={() => toggleFlag(item.mask)}
                disabled={disabled}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className="n64-box" style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)', letterSpacing: '0.5px' }}>
          {t.marioCapsTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {caps.map((item) => (
            <label key={item.label} className="checkbox-label">
              <input
                type="checkbox"
                checked={(slot.flags & item.mask) !== 0}
                onChange={() => toggleFlag(item.mask)}
                disabled={disabled}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className="n64-box" style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)', letterSpacing: '0.5px' }}>
          {t.keysCastleTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
          {misc.map((item) => (
            <label key={item.label} className="checkbox-label">
              <input
                type="checkbox"
                checked={(slot.flags & item.mask) !== 0}
                onChange={() => toggleFlag(item.mask)}
                disabled={disabled}
              />
              {item.label}
            </label>
          ))}
        </div>

        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#ffe600', fontFamily: 'var(--font-hud)', letterSpacing: '0.5px' }}>
          {t.castleStarsTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {castleStars.map((item) => (
            <label key={item.label} className="checkbox-label">
              <input
                type="checkbox"
                checked={(slot.flags & item.mask) !== 0}
                onChange={() => toggleFlag(item.mask)}
                disabled={disabled}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
