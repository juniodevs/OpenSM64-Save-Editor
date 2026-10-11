import {
  SAVE_DATA_SIZE,
  SAVE_SLOT_SIZE,
  SETTINGS_DATA_SIZE,
  NUM_SAVE_SLOTS,
  NUM_COPIES,
  COURSE_COUNT,
  MAIN_COURSE_COUNT,
  SLOT_NAMES
} from './constants';
import { computeSlotChecksum, computeSettingsChecksum } from './checksum';
import { cloneSlot, cloneSettings } from './slotUtils';
import type { Endianness, SaveSlot, SettingsData, ParsedSaveFile } from './types';

function detectEndianness(view: DataView): Endianness | null {
  for (let slot = 0; slot < NUM_SAVE_SLOTS; slot++) {
    for (let copy = 0; copy < NUM_COPIES; copy++) {
      const offset = (slot * NUM_COPIES + copy) * SAVE_SLOT_SIZE + 52;
      const b0 = view.getUint8(offset);
      const b1 = view.getUint8(offset + 1);

      if (b0 === 0x44 && b1 === 0x41) return 'be';
      if (b0 === 0x41 && b1 === 0x44) return 'le';
    }
  }

  const settingsBase = NUM_SAVE_SLOTS * NUM_COPIES * SAVE_SLOT_SIZE;
  for (let copy = 0; copy < NUM_COPIES; copy++) {
    const offset = settingsBase + copy * SETTINGS_DATA_SIZE + 28;
    const b0 = view.getUint8(offset);
    const b1 = view.getUint8(offset + 1);

    if (b0 === 0x48 && b1 === 0x49) return 'be';
    if (b0 === 0x49 && b1 === 0x48) return 'le';
  }

  return null;
}

function parseSlot(view: DataView, offset: number, isLittleEndian: boolean): SaveSlot {
  const capLevel = view.getUint8(offset + 0);
  const capArea = view.getUint8(offset + 1);
  const capPos: [number, number, number] = [
    view.getInt16(offset + 2, isLittleEndian),
    view.getInt16(offset + 4, isLittleEndian),
    view.getInt16(offset + 6, isLittleEndian)
  ];
  const flags = view.getUint32(offset + 8, isLittleEndian);

  const courseData = new Uint8Array(COURSE_COUNT);
  for (let i = 0; i < COURSE_COUNT; i++) {
    courseData[i] = view.getUint8(offset + 12 + i);
  }

  const unusedCourseData = view.getUint8(offset + 36);

  const courseCoinScores = new Uint8Array(MAIN_COURSE_COUNT);
  for (let i = 0; i < MAIN_COURSE_COUNT; i++) {
    courseCoinScores[i] = view.getUint8(offset + 37 + i);
  }

  const magic = view.getUint16(offset + 52, isLittleEndian);
  const checksum = view.getUint16(offset + 54, isLittleEndian);

  const slotRaw = new Uint8Array(view.buffer, view.byteOffset + offset, SAVE_SLOT_SIZE);
  const expectedChecksum = computeSlotChecksum(slotRaw);
  const isValid = checksum === expectedChecksum;

  return {
    capLevel,
    capArea,
    capPos,
    flags,
    courseData,
    unusedCourseData,
    courseCoinScores,
    magic,
    checksum,
    isValid
  };
}

function parseSettings(view: DataView, offset: number, isLittleEndian: boolean): SettingsData {
  const coinScoreAges: number[] = [
    view.getUint32(offset + 0, isLittleEndian),
    view.getUint32(offset + 4, isLittleEndian),
    view.getUint32(offset + 8, isLittleEndian),
    view.getUint32(offset + 12, isLittleEndian)
  ];
  const soundMode = view.getUint16(offset + 16, isLittleEndian);
  const language = view.getUint16(offset + 18, isLittleEndian);

  const padding = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    padding[i] = view.getUint8(offset + 20 + i);
  }

  const magic = view.getUint16(offset + 28, isLittleEndian);
  const checksum = view.getUint16(offset + 30, isLittleEndian);

  const settingsRaw = new Uint8Array(view.buffer, view.byteOffset + offset, SETTINGS_DATA_SIZE);
  const expectedChecksum = computeSettingsChecksum(settingsRaw);
  const isValid = checksum === expectedChecksum;

  return {
    coinScoreAges,
    soundMode,
    language,
    padding,
    magic,
    checksum,
    isValid
  };
}

export function parseSaveFile(buffer: ArrayBuffer): ParsedSaveFile {
  if (buffer.byteLength < SAVE_DATA_SIZE) {
    throw new Error(`O arquivo tem ${buffer.byteLength} bytes. Um save de Super Mario 64 precisa ter pelo menos 512 bytes.`);
  }

  const view = new DataView(buffer);
  const endianness = detectEndianness(view);

  if (!endianness) {
    throw new Error("O arquivo selecionado nao possui assinaturas validas de save do Super Mario 64.");
  }

  const isLittleEndian = endianness === 'le';
  const warnings: string[] = [];

  const slots: [SaveSlot, SaveSlot][] = [];
  for (let s = 0; s < NUM_SAVE_SLOTS; s++) {
    const primaryOffset = (s * NUM_COPIES + 0) * SAVE_SLOT_SIZE;
    const backupOffset = (s * NUM_COPIES + 1) * SAVE_SLOT_SIZE;

    const primarySlot = parseSlot(view, primaryOffset, isLittleEndian);
    const backupSlot = parseSlot(view, backupOffset, isLittleEndian);

    if (!primarySlot.isValid) {
      if (backupSlot.isValid) {
        const restored = cloneSlot(backupSlot);
        warnings.push(`Slot "${SLOT_NAMES[s]}" estava corrompido, mas os dados foram recuperados do backup.`);
        slots.push([restored, backupSlot]);
      } else {
        warnings.push(`Slot "${SLOT_NAMES[s]}" e seu backup estao corrompidos.`);
        slots.push([primarySlot, backupSlot]);
      }
    } else {
      if (!backupSlot.isValid) {
        const restoredBackup = cloneSlot(primarySlot);
        warnings.push(`Backup do slot "${SLOT_NAMES[s]}" estava corrompido e foi reparado a partir do principal.`);
        slots.push([primarySlot, restoredBackup]);
      } else {
        slots.push([primarySlot, backupSlot]);
      }
    }
  }

  const settingsBase = NUM_SAVE_SLOTS * NUM_COPIES * SAVE_SLOT_SIZE;
  const primarySettings = parseSettings(view, settingsBase, isLittleEndian);
  const backupSettings = parseSettings(view, settingsBase + SETTINGS_DATA_SIZE, isLittleEndian);

  let finalPrimarySettings = primarySettings;
  let finalBackupSettings = backupSettings;
  if (!primarySettings.isValid) {
    if (backupSettings.isValid) {
      finalPrimarySettings = cloneSettings(backupSettings);
      warnings.push("Configuracoes globais estavam corrompidas, mas foram recuperadas do backup.");
    } else {
      warnings.push("Configuracoes globais e seu backup estao corrompidos.");
    }
  } else if (!backupSettings.isValid) {
    finalBackupSettings = cloneSettings(primarySettings);
    warnings.push("Backup das configuracoes globais estava corrompido e foi reparado.");
  }

  const trailingPadding = buffer.byteLength > SAVE_DATA_SIZE
    ? new Uint8Array(buffer.slice(SAVE_DATA_SIZE))
    : new Uint8Array(0);

  return {
    endianness,
    slots,
    settings: [finalPrimarySettings, finalBackupSettings],
    originalSize: buffer.byteLength,
    trailingPadding,
    warnings
  };
}
