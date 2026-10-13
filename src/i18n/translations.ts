export type Language = 'en' | 'pt';

export interface Translations {
  headerSubtitle: string;
  langEn: string;
  langPt: string;

  uploadTitle: string;
  uploadDescription: string;
  openFileBtn: string;
  orCreatePreset: string;
  preset100Pc: string;
  preset100N64: string;
  presetNewN64: string;

  n64Format: string;
  pcFormat: string;
  bytesLabel: string;
  switchFileBtn: string;
  downloadSaveBtn: string;
  repairWarnings: string;

  selectFileTitle: string;
  showBackupMirror: string;
  newSlotText: string;

  btn100All: string;
  btn100Title: string;
  btnCopy: string;
  btnCopyTitle: string;
  btnCopyConfirm: string;
  btnErase: string;
  btnEraseTitle: string;
  btnSound: string;
  btnSoundTitle: string;
  copyTargetPrompt: string;
  copyExecuteBtn: string;
  cancelBtn: string;
  fileExistsLabel: string;
  checksumLabel: string;

  unlockedDoorsTitle: string;
  marioCapsTitle: string;
  keysCastleTitle: string;
  castleStarsTitle: string;

  doors: {
    basement: string;
    wf: string;
    ccm: string;
    jrb: string;
    pss: string;
    bitdw: string;
    bitfs: string;
    upstairs: string;
    star50: string;
  };

  caps: {
    wing: string;
    metal: string;
    vanish: string;
    ground: string;
    klepto: string;
    ukiki: string;
    blizzard: string;
  };

  keys: {
    key1: string;
    key2: string;
    moat: string;
    ddd: string;
  };

  castleStars: {
    toad1: string;
    toad2: string;
    toad3: string;
    mips1: string;
    mips2: string;
  };

  coursesTitle: string;
  coursesSubtitle: string;
  colNumber: string;
  colCourse: string;
  colStars: string;
  col100Coins: string;
  colCannon: string;
  colMaxCoins: string;
  star100Label: string;

  settingsTitle: string;
  backToFilesBtn: string;
  soundModeTitle: string;
  soundStereo: string;
  soundMono: string;
  soundHeadset: string;
  languageTitle: string;
  langEnglish: string;
  langFrench: string;
  langGerman: string;
  coinRecordsTitle: string;
  coinRecordsDesc: string;

  errorLoad: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    headerSubtitle: "SAVE EDITOR",
    langEn: "EN",
    langPt: "PT",

    uploadTitle: "SELECT FILE",
    uploadDescription: "Drag your save file here (.eep, .sav, .bin, .srm) or click the button",
    openFileBtn: "Open Save File",
    orCreatePreset: "Or create a new save from scratch:",
    preset100Pc: "100% Save (PC)",
    preset100N64: "100% Save (N64)",
    presetNewN64: "New Save (N64)",

    n64Format: "Nintendo 64",
    pcFormat: "PC Port",
    bytesLabel: "bytes",
    switchFileBtn: "Switch File",
    downloadSaveBtn: "Download Save",
    repairWarnings: "File warnings:",

    selectFileTitle: "SELECT FILE",
    showBackupMirror: "Backup copy (mirror)",
    newSlotText: "NEW",

    btn100All: "100% ALL",
    btn100Title: "Fills all 120 stars and unlocks castle doors",
    btnCopy: "COPY",
    btnCopyTitle: "Copies this save slot to another slot",
    btnCopyConfirm: "Confirm Copy",
    btnErase: "ERASE",
    btnEraseTitle: "Clears all stars and progress from this slot",
    btnSound: "SOUND & OPTIONS",
    btnSoundTitle: "Configure sound and language options",
    copyTargetPrompt: "Copy to:",
    copyExecuteBtn: "Copy",
    cancelBtn: "Cancel",
    fileExistsLabel: "Active File (File Exists)",
    checksumLabel: "Checksum",

    unlockedDoorsTitle: "UNLOCKED DOORS",
    marioCapsTitle: "MARIO'S CAPS",
    keysCastleTitle: "KEYS & CASTLE",
    castleStarsTitle: "CASTLE SECRET STARS",

    doors: {
      basement: "Basement Door",
      wf: "Whomp's Fortress Door",
      ccm: "Cool, Cool Mountain Door",
      jrb: "Jolly Roger Bay Door",
      pss: "Princess's Secret Slide Door",
      bitdw: "Bowser in the Dark World Door",
      bitfs: "Bowser in the Fire Sea Door",
      upstairs: "Upstairs Key Door",
      star50: "50-Star Door"
    },

    caps: {
      wing: "Wing Cap",
      metal: "Metal Cap",
      vanish: "Vanish Cap",
      ground: "Cap on Ground",
      klepto: "Cap on Klepto",
      ukiki: "Cap on Ukiki",
      blizzard: "Cap on Mr. Blizzard"
    },

    keys: {
      key1: "Key 1 (Basement)",
      key2: "Key 2 (Upstairs)",
      moat: "Castle Moat Drained",
      ddd: "DDD Submarine Moved Back"
    },

    castleStars: {
      toad1: "Toad Star 1 (Basement)",
      toad2: "Toad Star 2 (Upstairs)",
      toad3: "Toad Star 3 (Top Floor)",
      mips1: "MIPS Rabbit Star 1 (15 Stars)",
      mips2: "MIPS Rabbit Star 2 (50 Stars)"
    },

    coursesTitle: "COURSES & STARS",
    coursesSubtitle: "Hover over stars to view the mission name",
    colNumber: "#",
    colCourse: "COURSE",
    colStars: "STARS 1 TO 6",
    col100Coins: "100 COINS",
    colCannon: "CANNON",
    colMaxCoins: "MAX COINS",
    star100Label: "100 Coins Star",

    settingsTitle: "SOUND & LANGUAGE OPTIONS",
    backToFilesBtn: "Back to Files",
    soundModeTitle: "SOUND MODE",
    soundStereo: "Stereo",
    soundMono: "Mono",
    soundHeadset: "Headset (Headphones)",
    languageTitle: "LANGUAGE (EUROPE / SHINDOU)",
    langEnglish: "English",
    langFrench: "French",
    langGerman: "German",
    coinRecordsTitle: "COIN RECORDS (TIE-BREAKERS)",
    coinRecordsDesc: "Values from 0 to 3 used by the game to break ties between files on the high score screen.",

    errorLoad: "Failed to open save file:"
  },

  pt: {
    headerSubtitle: "SAVE EDITOR",
    langEn: "EN",
    langPt: "PT",

    uploadTitle: "SELECT FILE",
    uploadDescription: "Arraste o seu save aqui (.eep, .sav, .bin, .srm) ou clique no botão",
    openFileBtn: "Abrir Arquivo",
    orCreatePreset: "Ou crie um arquivo novo do zero:",
    preset100Pc: "Save 100% (PC)",
    preset100N64: "Save 100% (N64)",
    presetNewN64: "Save Novo (N64)",

    n64Format: "Nintendo 64",
    pcFormat: "PC Port",
    bytesLabel: "bytes",
    switchFileBtn: "Trocar Arquivo",
    downloadSaveBtn: "Baixar Save",
    repairWarnings: "Avisos do arquivo:",

    selectFileTitle: "SELECT FILE",
    showBackupMirror: "Cópia de backup (espelho)",
    newSlotText: "NEW",

    btn100All: "100% TUDO",
    btn100Title: "Preenche todas as 120 estrelas e destranca o castelo",
    btnCopy: "COPIAR",
    btnCopyTitle: "Copia este arquivo para outro slot",
    btnCopyConfirm: "Confirmar Cópia",
    btnErase: "APAGAR",
    btnEraseTitle: "Zera todas as estrelas e dados deste slot",
    btnSound: "SOM & IDIOMA",
    btnSoundTitle: "Configurações de som e idioma",
    copyTargetPrompt: "Copiar para:",
    copyExecuteBtn: "Executar",
    cancelBtn: "Cancelar",
    fileExistsLabel: "Arquivo Ativo (File Exists)",
    checksumLabel: "Checksum",

    unlockedDoorsTitle: "PORTAS DESTRANCADAS",
    marioCapsTitle: "CHAPEUS DO MARIO",
    keysCastleTitle: "CHAVES E CASTELO",
    castleStarsTitle: "ESTRELAS DO CASTELO",

    doors: {
      basement: "Porta do Subsolo",
      wf: "Porta WF",
      ccm: "Porta CCM",
      jrb: "Porta JRB",
      pss: "Porta PSS",
      bitdw: "Porta BITDW",
      bitfs: "Porta BITFS",
      upstairs: "Porta do Andar Superior",
      star50: "Porta das 50 Estrelas"
    },

    caps: {
      wing: "Wing Cap (Chapéu de Asa)",
      metal: "Metal Cap (Chapéu de Metal)",
      vanish: "Vanish Cap (Chapéu Invisível)",
      ground: "Chapéu no Chão",
      klepto: "Chapéu com Klepto",
      ukiki: "Chapéu com Ukiki",
      blizzard: "Chapéu com Mr. Blizzard"
    },

    keys: {
      key1: "Chave 1 (Subsolo)",
      key2: "Chave 2 (Andar Superior)",
      moat: "Fosso do Castelo Drenado",
      ddd: "Submarino DDD Recuado"
    },

    castleStars: {
      toad1: "Estrela do Toad 1",
      toad2: "Estrela do Toad 2",
      toad3: "Estrela do Toad 3",
      mips1: "Estrela do Coelho MIPS 1",
      mips2: "Estrela do Coelho MIPS 2"
    },

    coursesTitle: "FASES E ESTRELAS",
    coursesSubtitle: "Passe o cursor sobre as estrelas para ver o nome da missão",
    colNumber: "#",
    colCourse: "FASE",
    colStars: "ESTRELAS 1 A 6",
    col100Coins: "100 MOEDAS",
    colCannon: "CANHÃO",
    colMaxCoins: "MOEDAS MAX",
    star100Label: "Estrela de 100 Moedas",

    settingsTitle: "CONFIGURAÇÕES DE SOM E IDIOMA",
    backToFilesBtn: "Voltar aos Arquivos",
    soundModeTitle: "MODO DE SOM",
    soundStereo: "Stereo",
    soundMono: "Mono",
    soundHeadset: "Headset (Fone)",
    languageTitle: "IDIOMA (EUROPA / SHINDOU)",
    langEnglish: "Inglês (English)",
    langFrench: "Francês (French)",
    langGerman: "Alemão (German)",
    coinRecordsTitle: "RECORDES DE MOEDAS (TIE-BREAKERS)",
    coinRecordsDesc: "Valores de 0 a 3 usados pelo jogo para desempatar pontuações iguais de moedas entre os arquivos.",

    errorLoad: "Erro ao abrir arquivo:"
  }
};
