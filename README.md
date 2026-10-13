# OpenSM64 Save Editor

[Versão em Português](README_PT.md)

**Live Demo:** [https://opensm64.vercel.app/](https://opensm64.vercel.app/)

A web-based save file editor for Super Mario 64, supporting both Nintendo 64 emulator saves and PC Port releases.

Edit stars, cannons, castle doors, caps, coin records, and sound settings directly in the browser.

---

## Supported Formats

- **Nintendo 64 (.eep, .srm, .bin)**: Big-Endian format used by Project64, Mupen64Plus, RetroArch, and EverDrive flashcarts.
- **PC Port (.sav)**: Little-Endian format used by sm64-port, sm64ex, Render96, and SM64 Coop DX.
- **Padded Battery Dumps**: Automatically preserves trailing padding from emulator dumps (e.g., 2KB SRM or 32KB saves) without altering unused memory.

---

## Features

- **4 Save Slots**: Edit Mario A, Mario B, Mario C, and Mario D independently.
- **All 120 Stars**: Individual toggles for stars 1 to 6 and 100-coin stars across all 15 main courses and 9 secret courses.
- **Cannons and Coins**: Open cannons and set coin high scores (0 to 255) per course.
- **Castle Progression**: Unlock basement and upstairs doors, 50-star door, keys, drained moat, and caps (Wing, Metal, Vanish).
- **Global Settings**: Configure stereo/mono sound mode, language (European/Shindou releases), and coin score tie-breaker ages.
- **Checksum Integrity**: Automatically recalculates 16-bit checksums for slots and settings upon export.
- **Auto-Recovery**: Recovers corrupted primary slots from backup mirrors and vice versa.
- **Retro Theme**: Visual styling based on the original SM64 file select screen, complete with authentic fonts, 3D icons, and glove cursors.
- **Bilingual Interface**: English by default, with instant switching to Portuguese (EN / PT).

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/juniodevs/OpenSM64-Save-Editor.git
cd OpenSM64-Save-Editor
npm install
```

### Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Run Tests

```bash
npm test
```

Runs the binary parser, serializer, round-trip tests, and emulator padding checks.

### Production Build

```bash
npm run build
```

Outputs the static production bundle to `dist/`, ready for deployment on Vercel, Netlify, or GitHub Pages.

---

## Deployment to Vercel

This app is a static client-side build with zero backend requirements.

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

---

## Credits and Acknowledgments

- **Original C++ Save Editor**: Big thanks to [MaikelChan](https://github.com/MaikelChan) for the original desktop [SM64SaveEditor](https://github.com/MaikelChan/SM64SaveEditor) project, which served as the primary reference for SM64 save file structures.
- **Web Reimplementation**: This repository is an independent clean-room reimplementation in TypeScript and React, rewritten from the ground up for modern browsers.
- **Super Mario 64**: Assets, logos, and fonts are properties of Nintendo. This tool is a fan-made utility for educational and modding purposes.

---

## License

MIT License. See [LICENSE](LICENSE) for details.
