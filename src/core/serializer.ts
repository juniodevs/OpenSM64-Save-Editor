import {
  SAVE_DATA_SIZE,
  SAVE_SLOT_SIZE,
  SETTINGS_DATA_SIZE,
  NUM_SAVE_SLOTS,
  NUM_COPIES,
  COURSE_COUNT,
  MAIN_COURSE_COUNT,
  SLOT_MAGIC,
  SETTINGS_MAGIC
} from './constants';
import { computeSlotChecksum, computeSettingsChecksum } from './checksum';
import type { SaveSlot, SettingsData, ParsedSaveFile } from './types';

function writeSlot(
  view: DataView,
  offset: number,
  slot: SaveSlot,
  isLittleEndian: boolean,
  magic: number
): void {
  view.setUint8(offset + 0, slot.capLevel);
  view.setUint8(offset + 1, slot.capArea);
  view.setInt16(offset + 2, slot.capPos[0], isLittleEndian);
  view.setInt16(offset + 4, slot.capPos[1], isLittleEndian);
  view.setInt16(offset + 6, slot.capPos[2], isLittleEndian);
  view.setUint32(offset + 8, slot.flags, isLittleEndian);

  for (let i = 0; i < COURSE_COUNT; i++) {
    view.setUint8(offset + 12 + i, slot.courseData[i] ?? 0);
  }

  view.setUint8(offset + 36, slot.unusedCourseData ?? 0);

  for (let i = 0; i < MAIN_COURSE_COUNT; i++) {
    view.setUint8(offset + 37 + i, slot.courseCoinScores[i] ?? 0);
  }

  view.setUint16(offset + 52, magic, isLittleEndian);

  const slotRaw = new Uint8Array(view.buffer, view.byteOffset + offset, SAVE_SLOT_SIZE);
  const checksum = computeSlotChecksum(slotRaw);
  view.setUint16(offset + 54, checksum, isLittleEndian);

  slot.magic = magic;
  slot.checksum = checksum;
  slot.isValid = true;
}

function writeSettings(
  view: DataView,
  offset: number,
  settings: SettingsData,
  isLittleEndian: boolean,
  magic: number
): void {
  for (let i = 0; i < 4; i++) {
    view.setUint32(offset + i * 4, settings.coinScoreAges[i] ?? 0, isLittleEndian);
  }

  view.setUint16(offset + 16, settings.soundMode, isLittleEndian);
  view.setUint16(offset + 18, settings.language, isLittleEndian);

  for (let i = 0; i < 8; i++) {
    view.setUint8(offset + 20 + i, settings.padding[i] ?? 0);
  }

  view.setUint16(offset + 28, magic, isLittleEndian);

  const settingsRaw = new Uint8Array(view.buffer, view.byteOffset + offset, SETTINGS_DATA_SIZE);
  const checksum = computeSettingsChecksum(settingsRaw);
  view.setUint16(offset + 30, checksum, isLittleEndian);

  settings.magic = magic;
  settings.checksum = checksum;
  settings.isValid = true;
}

export function serializeSaveFile(parsed: ParsedSaveFile): Uint8Array {
  const isLittleEndian = parsed.endianness === 'le';

  const totalLength = Math.max(SAVE_DATA_SIZE, SAVE_DATA_SIZE + parsed.trailingPadding.length);
  const buffer = new ArrayBuffer(totalLength);
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);

  for (let s = 0; s < NUM_SAVE_SLOTS; s++) {
    const primarySlot = parsed.slots[s][0];
    const primaryOffset = (s * NUM_COPIES + 0) * SAVE_SLOT_SIZE;
    const backupOffset = (s * NUM_COPIES + 1) * SAVE_SLOT_SIZE;

    writeSlot(view, primaryOffset, primarySlot, isLittleEndian, SLOT_MAGIC);
    writeSlot(view, backupOffset, primarySlot, isLittleEndian, SLOT_MAGIC);
  }

  const settingsBase = NUM_SAVE_SLOTS * NUM_COPIES * SAVE_SLOT_SIZE;
  const primarySettings = parsed.settings[0];
  writeSettings(view, settingsBase, primarySettings, isLittleEndian, SETTINGS_MAGIC);
  writeSettings(view, settingsBase + SETTINGS_DATA_SIZE, primarySettings, isLittleEndian, SETTINGS_MAGIC);

  if (parsed.trailingPadding.length > 0) {
    uint8.set(parsed.trailingPadding, SAVE_DATA_SIZE);
  }

  return uint8;
}
