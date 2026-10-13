# OpenSM64 Save Editor

[English Version](README.md)

Editor de arquivos de save para Super Mario 64 que roda direto no navegador, compatível tanto com emuladores de Nintendo 64 quanto com os ports de PC.

Edite estrelas, canhões, portas do castelo, chapéus, recordes de moedas e opções de som sem precisar instalar nada.

---

## Formatos Suportados

- **Nintendo 64 (.eep, .srm, .bin)**: Formato Big-Endian usado no Project64, Mupen64Plus, RetroArch e cartuchos flashcard como EverDrive.
- **PC Port (.sav)**: Formato Little-Endian usado no sm64-port, sm64ex, Render96 e SM64 Coop DX.
- **Dumps de Bateria com Padding**: Preserva bytes extras de emuladores (como dumps SRM de 2KB ou saves de 32KB) sem alterar a memória não utilizada.

---

## O Que Você Pode Editar

- **4 Slots de Arquivo**: Edite Mario A, Mario B, Mario C e Mario D de forma independente.
- **Todas as 120 Estrelas**: Controle individual de cada estrela (1 a 6 e estrela de 100 moedas) nas 15 fases principais e nas 9 fases secretas.
- **Canhões e Moedas**: Destranque os canhões e configure o recorde de moedas (0 a 255) de cada fase.
- **Progresso no Castelo**: Libere portas do subsolo, andar superior, porta de 50 estrelas, chaves do Bowser, fosso drenado e chapéus (Asa, Metal e Invisível).
- **Opções Gerais**: Alterne o modo de áudio (Stereo, Mono, Fone de ouvido), idioma europeu e desempatadores de recordes de moedas.
- **Cálculo de Checksum**: Recalcula a soma de verificação de 16 bits de cada slot e das opções automaticamente ao salvar.
- **Recuperação Automática**: Corrige slots principais danificados usando a cópia de backup do próprio arquivo e vice-versa.
- **Visual Retrô**: Interface inspirada na tela clássica de seleção de arquivos do SM64, com fontes originais, ícones 3D e cursor de luva.
- **Bilingue**: Idioma em inglês por padrão, com botão para alternar para português a qualquer momento (EN / PT).

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm, pnpm ou yarn

### Instalação

```bash
git clone https://github.com/juniodevs/OpenSM64-Save-Editor.git
cd OpenSM64-Save-Editor
npm install
```

### Servidor de Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:5173/` no seu navegador.

### Rodar Testes

```bash
npm test
```

Executa a validação dos leitores binários, gravador, testes de integridade e checagem de padding de emuladores.

### Gerar Build de Produção

```bash
npm run build
```

Gera os arquivos estáticos prontos para publicação na pasta `dist/`.

---

## Como Publicar na Vercel

O projeto gera um build estático que roda 100% no navegador, sem precisar de servidor dedicado.

1. Suba o repositório para o seu GitHub.
2. Importe o projeto no painel da Vercel.
3. Framework preset: **Vite**.
4. Comando de build: `npm run build`.
5. Diretório de saída: `dist`.

---

## Agradecimentos e Créditos

- **Projeto Original em C++**: Agradecimento ao [MaikelChan](https://github.com/MaikelChan) pelo projeto desktop [SM64SaveEditor](https://github.com/MaikelChan/SM64SaveEditor), que serviu de referência para a estrutura binária dos saves.
- **Reimplementação Web**: Este repositório é uma recriação independente em TypeScript e React, escrita do zero para navegadores modernos.
- **Super Mario 64**: Marcas, fontes e elementos visuais pertencem à Nintendo. Este utilitário foi feito por fãs para a comunidade de mods e jogadores.

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
