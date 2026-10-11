import {
  COURSE_COUNT,
  MAIN_COURSE_COUNT,
  COURSE_STAR_COUNTS,
  COURSE_HAS_CANNON,
  COURSE_FLAG_CANNON_OPEN,
  SAVE_FLAG_COLLECTED_TOAD_STAR_1,
  SAVE_FLAG_COLLECTED_TOAD_STAR_2,
  SAVE_FLAG_COLLECTED_TOAD_STAR_3,
  SAVE_FLAG_COLLECTED_MIPS_STAR_1,
  SAVE_FLAG_COLLECTED_MIPS_STAR_2,
  FLAGS_100_PERCENT,
  SLOT_MAGIC,
  SETTINGS_MAGIC
} from './constants';
import type { SaveSlot, SettingsData } from './types';

export function countTotalStars(slot: SaveSlot): number {
  let count = 0;

  for (let c = 0; c < COURSE_COUNT; c++) {
    const starMax = COURSE_STAR_COUNTS[c];
    const byte = slot.courseData[c] ?? 0;
    for (let s = 0; s < starMax; s++) {
      if ((byte & (1 << s)) !== 0) {
        count++;
      }
    }
  }

  if ((slot.flags & SAVE_FLAG_COLLECTED_TOAD_STAR_1) !== 0) count++;
  if ((slot.flags & SAVE_FLAG_COLLECTED_TOAD_STAR_2) !== 0) count++;
  if ((slot.flags & SAVE_FLAG_COLLECTED_TOAD_STAR_3) !== 0) count++;
  if ((slot.flags & SAVE_FLAG_COLLECTED_MIPS_STAR_1) !== 0) count++;
  if ((slot.flags & SAVE_FLAG_COLLECTED_MIPS_STAR_2) !== 0) count++;

  return count;
}

export function createEmptySlot(): SaveSlot {
  return {
    capLevel: 0,
    capArea: 0,
    capPos: [0, 0, 0],
    flags: 0,
    courseData: new Uint8Array(COURSE_COUNT),
    unusedCourseData: 0,
    courseCoinScores: new Uint8Array(MAIN_COURSE_COUNT),
    magic: SLOT_MAGIC,
    checksum: 0,
    isValid: true
  };
}

export function cloneSlot(src: SaveSlot): SaveSlot {
  return {
    capLevel: src.capLevel,
    capArea: src.capArea,
    capPos: [...src.capPos],
    flags: src.flags,
    courseData: new Uint8Array(src.courseData),
    unusedCourseData: src.unusedCourseData,
    courseCoinScores: new Uint8Array(src.courseCoinScores),
    magic: src.magic,
    checksum: src.checksum,
    isValid: src.isValid
  };
}

export function completeSlot(): SaveSlot {
  const next = createEmptySlot();
  next.flags = FLAGS_100_PERCENT;

  for (let c = 0; c < COURSE_COUNT; c++) {
    let courseByte = 0;
    const starMax = COURSE_STAR_COUNTS[c];
    for (let s = 0; s < starMax; s++) {
      courseByte |= (1 << s);
    }
    if (COURSE_HAS_CANNON[c]) {
      courseByte |= COURSE_FLAG_CANNON_OPEN;
    }
    next.courseData[c] = courseByte;
  }

  for (let c = 0; c < MAIN_COURSE_COUNT; c++) {
    next.courseCoinScores[c] = 100;
  }

  next.magic = SLOT_MAGIC;
  return next;
}

export function clearSlot(): SaveSlot {
  return createEmptySlot();
}

export function createDefaultSettings(): SettingsData {
  return {
    coinScoreAges: [0, 0, 0, 0],
    soundMode: 0,
    language: 0,
    padding: new Uint8Array(8),
    magic: SETTINGS_MAGIC,
    checksum: 0,
    isValid: true
  };
}

export function cloneSettings(src: SettingsData): SettingsData {
  return {
    coinScoreAges: [...src.coinScoreAges],
    soundMode: src.soundMode,
    language: src.language,
    padding: new Uint8Array(src.padding),
    magic: src.magic,
    checksum: src.checksum,
    isValid: src.isValid
  };
}
