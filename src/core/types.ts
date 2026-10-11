export type Endianness = 'be' | 'le';

export interface SaveSlot {
  capLevel: number;
  capArea: number;
  capPos: [number, number, number];
  flags: number;
  courseData: Uint8Array;
  unusedCourseData: number;
  courseCoinScores: Uint8Array;
  magic: number;
  checksum: number;
  isValid: boolean;
}

export interface SettingsData {
  coinScoreAges: number[];
  soundMode: number;
  language: number;
  padding: Uint8Array;
  magic: number;
  checksum: number;
  isValid: boolean;
}

export interface ParsedSaveFile {
  endianness: Endianness;
  slots: [SaveSlot, SaveSlot][];
  settings: [SettingsData, SettingsData];
  originalSize: number;
  trailingPadding: Uint8Array;
  warnings: string[];
}
