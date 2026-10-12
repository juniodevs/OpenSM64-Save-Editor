import {
  parseSaveFile,
  serializeSaveFile,
  createEmptySlot,
  completeSlot,
  countTotalStars,
  createDefaultSettings,
  SAVE_DATA_SIZE,
  TOTAL_STARS,
  SAVE_FLAG_FILE_EXISTS,
  COURSE_COUNT,
  MAIN_COURSE_COUNT,
  COURSE_FLAG_CANNON_OPEN
} from '../src/core';
import type { ParsedSaveFile } from '../src/core';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`FAIL: ${msg}`);
  }
}

console.log("Iniciando bateria de testes da ETAPA 4: Compatibilidade e Casos Extremos...");

console.log("- Teste 1: N64 Real / Project64 (512 bytes Big-Endian)");
const n64Parsed: ParsedSaveFile = {
  endianness: 'be',
  slots: [
    [completeSlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()]
  ],
  settings: [createDefaultSettings(), createDefaultSettings()],
  originalSize: SAVE_DATA_SIZE,
  trailingPadding: new Uint8Array(0),
  warnings: []
};

const n64Serialized = serializeSaveFile(n64Parsed);
assert(n64Serialized.length === 512, "Tamanho N64 deve ser exatamente 512 bytes");
const n64Reparsed = parseSaveFile(n64Serialized.buffer as ArrayBuffer);
assert(n64Reparsed.endianness === 'be', "Deve detectar Big-Endian");
assert(n64Reparsed.slots[0][0].isValid, "Slot 0 deve ter checksum valido");
assert(countTotalStars(n64Reparsed.slots[0][0]) === TOTAL_STARS, "Slot 0 deve ter 120 estrelas");

console.log("- Teste 2: RetroArch SRM com Padding (2048 bytes)");
const retroArchBuffer = new Uint8Array(2048);
retroArchBuffer.set(n64Serialized, 0);
for (let i = 512; i < 2048; i++) {
  retroArchBuffer[i] = (i * 7 + 13) & 0xff;
}

const srmParsed = parseSaveFile(retroArchBuffer.buffer as ArrayBuffer);
assert(srmParsed.endianness === 'be', "Deve detectar Big-Endian no SRM");
assert(srmParsed.originalSize === 2048, "Deve registrar tamanho original de 2048 bytes");
assert(srmParsed.trailingPadding.length === 1536, "Deve reter 1536 bytes de padding");

const srmReserialized = serializeSaveFile(srmParsed);
assert(srmReserialized.length === 2048, "Arquivo exportado deve manter exatamente 2048 bytes");
for (let i = 512; i < 2048; i++) {
  assert(srmReserialized[i] === retroArchBuffer[i], `Byte de padding ${i} deve ser identico`);
}

console.log("- Teste 3: Emuladores com dumps de 32KB (32768 bytes)");
const dump32k = new Uint8Array(32768);
dump32k.set(n64Serialized, 0);
dump32k[10000] = 0xfa;
dump32k[32767] = 0xce;

const dumpParsed = parseSaveFile(dump32k.buffer as ArrayBuffer);
assert(dumpParsed.originalSize === 32768, "Deve reconhecer 32KB");
const dumpReserialized = serializeSaveFile(dumpParsed);
assert(dumpReserialized.length === 32768, "Deve reexportar com 32KB");
assert(dumpReserialized[10000] === 0xfa, "Byte 10000 do dump preservado");
assert(dumpReserialized[32767] === 0xce, "Ultimo byte do dump preservado");

console.log("- Teste 4: PC Port / SM64 Coop DX (Little-Endian)");
const pcParsed: ParsedSaveFile = {
  endianness: 'le',
  slots: [
    [completeSlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()]
  ],
  settings: [createDefaultSettings(), createDefaultSettings()],
  originalSize: SAVE_DATA_SIZE,
  trailingPadding: new Uint8Array(0),
  warnings: []
};

pcParsed.settings[0].soundMode = 2;
pcParsed.settings[0].coinScoreAges[0] = 0x55;

const pcSerialized = serializeSaveFile(pcParsed);
assert(pcSerialized.length === 512, "Tamanho PC Port deve ser 512 bytes");
const pcReparsed = parseSaveFile(pcSerialized.buffer as ArrayBuffer);
assert(pcReparsed.endianness === 'le', "Deve detectar Little-Endian");
assert(pcReparsed.settings[0].soundMode === 2, "Modo de som Headset preservado");
assert(pcReparsed.settings[0].coinScoreAges[0] === 0x55, "Recordes de moedas preservados");

console.log("- Teste 5: Fases, canhoes e recordes de moedas");
const customSlot = createEmptySlot();
customSlot.flags |= SAVE_FLAG_FILE_EXISTS;
customSlot.courseData[0] = 0x1f | COURSE_FLAG_CANNON_OPEN;
customSlot.courseCoinScores[0] = 150;

customSlot.courseData[14] = (1 << 6);
customSlot.courseCoinScores[14] = 120;

const customParsed: ParsedSaveFile = {
  endianness: 'be',
  slots: [
    [customSlot, createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()],
    [createEmptySlot(), createEmptySlot()]
  ],
  settings: [createDefaultSettings(), createDefaultSettings()],
  originalSize: SAVE_DATA_SIZE,
  trailingPadding: new Uint8Array(0),
  warnings: []
};

const customSerialized = serializeSaveFile(customParsed);
const customReparsed = parseSaveFile(customSerialized.buffer as ArrayBuffer);

const slot0 = customReparsed.slots[0][0];
assert((slot0.courseData[0] & 0x1f) === 0x1f, "5 estrelas da fase 0 preservadas");
assert((slot0.courseData[0] & COURSE_FLAG_CANNON_OPEN) !== 0, "Canhao aberto da fase 0 preservado");
assert(slot0.courseCoinScores[0] === 150, "150 moedas da fase 0 preservadas");
assert((slot0.courseData[14] & (1 << 6)) !== 0, "Estrela de 100 moedas da fase 14 preservada");
assert(slot0.courseCoinScores[14] === 120, "120 moedas da fase 14 preservadas");

console.log("- Teste 6: Auto-recuperacao de corrupcao via mirror de backup");
const bufferDanoPrimario = customSerialized.slice();
for (let i = 15; i < 20; i++) {
  bufferDanoPrimario[i] ^= 0xaa;
}
const reparsedDano = parseSaveFile(bufferDanoPrimario.buffer as ArrayBuffer);
assert(reparsedDano.warnings.length > 0, "Deve gerar warning de recuperacao");
assert(reparsedDano.slots[0][0].isValid, "Slot 0 deve ter sido restaurado com sucesso");
assert(reparsedDano.slots[0][0].courseCoinScores[0] === 150, "Dados restaurados do mirror devem ser exatos");

console.log("- Teste 7: Mirror de backup corrompido -> restaurado pelo primario");
const bufferDanoBackup = customSerialized.slice();
for (let i = 56 + 10; i < 56 + 15; i++) {
  bufferDanoBackup[i] ^= 0x55;
}
const reparsedDanoBackup = parseSaveFile(bufferDanoBackup.buffer as ArrayBuffer);
assert(reparsedDanoBackup.warnings.length > 0, "Deve acusar warning de backup corrompido");
assert(reparsedDanoBackup.slots[0][1].isValid, "Backup deve ter sido restaurado a partir do primario");
assert(reparsedDanoBackup.slots[0][1].courseCoinScores[0] === 150, "Dados do backup restaurados perfeitamente");

console.log("SUCESSO: Todos os testes de compatibilidade e casos extremos passaram!");
