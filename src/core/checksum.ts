import { SAVE_SLOT_SIZE, SETTINGS_DATA_SIZE } from './constants';

export function computeSlotChecksum(bytes: Uint8Array): number {
  let sum = 0;
  const limit = SAVE_SLOT_SIZE - 2;
  for (let i = 0; i < limit; i++) {
    sum = (sum + bytes[i]) & 0xffff;
  }
  return sum;
}

export function computeSettingsChecksum(bytes: Uint8Array): number {
  let sum = 0;
  const limit = SETTINGS_DATA_SIZE - 2;
  for (let i = 0; i < limit; i++) {
    sum = (sum + bytes[i]) & 0xffff;
  }
  return sum;
}
