# 🩻 DICOM Viewer (React + Cornerstone)

A powerful and responsive **multi-panel DICOM viewer** built using **React**, **Tailwind CSS**, and the **Cornerstone DICOM rendering stack**. This project allows radiologists, researchers, or engineers to load, inspect, and interact with DICOM image series with rich tools like zooming, scrolling, inversion, panning, and a grid-based layout for side-by-side comparisons.

## 🌐 Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/bac37078-0dfa-430a-b43b-597deda85ef1/deploy-status)](https://pacs-dicom-viewer.netlify.app/)


## 🚀 Features

### 🧭 Viewer Grid System
- **Main viewer + up to 3 additional panels**.
- Smart layout:
  - 1 viewer → centered and large.
  - 2 viewers → main left, smaller right.
  - 3 viewers → main left, two stacked on the right.
  - 4 viewers → 2x2 grid with main viewer emphasized.

### 🎛️ Viewer Tools (per viewer)
- Scroll through image slices (mouse wheel or trackpad).
- Pinch-to-zoom (or Ctrl+scroll).
- Pan when zoomed in (drag to move image).
- Invert grayscale toggle (with button highlight).
- Reset view (zoom and pan reset).

### 📸 Screenshot Support
- Press `⌘ Cmd + Shift + S` to:
  - Capture the **entire viewer grid**.
  - Automatically **copy screenshot to clipboard**.
  - Toast notification for success or error.

### 🔄 Viewer Persistence
- Viewer scroll, zoom, and pan states are preserved.
- Adding/removing a viewer does **not reset** others.

### 🧠 Sidebar Series Panel
- Preview thumbnails for each DICOM series.
- Click to load into main viewer grid.

---

## 🧩 Tech Stack

| Purpose                 | Library / Tool                                |
|-------------------------|-----------------------------------------------|
| ⚛ UI Framework          | [React](https://react.dev/)                  |
| 💅 Styling              | [Tailwind CSS](https://tailwindcss.com/)     |
| 🧠 DICOM Engine         | `cornerstone-core`                            |
| 📚 Tools & Interactions | `cornerstone-tools`                           |
| 📂 DICOM Loader         | `cornerstone-wado-image-loader`              |
| 🗂 Parser               | `dicom-parser`                                |
| 🤏 Gesture Support      | `hammerjs`                                    |
| 📷 Screenshot Utility   | [`html2canvas`](https://html2canvas.hertzen.com/) |
| 📋 Clipboard API        | Native `navigator.clipboard`                 |
| 🔧 Build Tool           | [Vite](https://vitejs.dev/)                  |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── DicomViewer.jsx        # Viewer logic with tools and state
│   ├── ViewerGrid.jsx         # Layout manager for 1–4 viewers
│   ├── SeriesPanel.jsx        # Sidebar with preview thumbnails
│   ├── FolderSelector.jsx     # File system folder picker
│   ├── ViewerToolbar.jsx      # Toolbar with Invert and Reset
├── utils/
│   └── cornerstoneSetup.js    # External configuration and initialization
├── App.jsx                    # Main layout and grid management
└── main.jsx                   # Vite entrypoint
```

---

## 🧪 Getting Started

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. ▶️ Run the dev server

```bash
npm run dev
```

### 3. 📁 Load DICOM Series

Click the `Choose Folder` button and select a folder that contains `.dcm` files.

```
Selected Folder/
|
├── Brain/                    ^ Series name
│   ├── IMG_4323.dicom        │
│   ├── IMG_4353.dicom        │ 
│   ├── IMG_4333.dicom        │ dicom images
│   ├── IMG_4363.dicom        │ 
│   ├── IMG_4321.dicom        │ 
│
├── Lungs Infection/          ^ Series name
│   ├── IMG_5323.dicom        │ 
│   ├── IMG_5353.dicom        │ 
│   ├── IMG_5333.dicom        │ dicom images
│   ├── IMG_5363.dicom        │ 
│   ├── IMG_5321.dicom        │
│
├── Chest/                    ^ Series name
│   ├── IMG_6323.dicom        │ 
│   ├── IMG_6353.dicom        │ 
│   ├── IMG_6333.dicom        │ dicom images
│   ├── IMG_6363.dicom        │ 
│   ├── IMG_6321.dicom        │ 
```

Each folder inside the selected folder is treated as a series.

---

## 🎮 Keyboard Shortcuts

| Keys                       | Action                                     |
|----------------------------|--------------------------------------------|
| ⌘ Cmd + Shift + S         | 📸 Capture full viewer panel screenshot     |

---

## 📸 Screenshots

| Viewers | Layout Example |
|--------|-----------------|
| 1       | Centered main viewer |
| 2       | Main left, small right |
| 3       | Main left, 2 stacked right |
| 4       | Grid: 2x2 layout |
---

## ✅ Functional Highlights

- 🔄 Persistent zoom/scroll state across viewers.
- 👆 Independent interaction per panel.
- 🔔 Visual feedback via toasts for screenshot status.
- 💡 Flexible layout for dynamic viewer panel addition/removal.

---

## 📎 Known Improvements

- [ ] Drag-and-drop file/folder support
- [ ] Synchronize scrolling between viewers
- [ ] Export screenshot as downloadable file
- [ ] Add zoom/pan mini-map
- [ ] Add unit/integration tests

---

## 🤝 Acknowledgements

Thanks to the incredible open-source stack:

- [CornerstoneJS](https://docs.cornerstonejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [html2canvas](https://html2canvas.hertzen.com/)
- [Vite](https://vitejs.dev/)

---

## 🛡 License

MIT © 2025 — Built for educational and diagnostic prototyping use.