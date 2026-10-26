# University of Exeter — Better ELE 2

A modern, fast, offline-first client for the **University of Exeter Learning Environment (ELE 2)**, featuring intelligent organization, automated past exam paper discovery, and a custom in-app slide reader.

---

## ✨ Features

- **🏛️ Exeter Library Exam Papers Archive Integration**: Automatically discovers and indexes 7+ years of past exam papers directly from `library.exeter.ac.uk/exampapers` using predictable endpoints. No Moodle login required for past papers.
- **👓 Exeter Reader (In-App PDF Viewer)**:
  - **OLED Dark Mode Inverter**: Inverts bright white lecture slides into high-contrast dark mode reading for night-time study.
  - **Slide Deck Mode vs Document Mode**: Keyboard-driven slide presentations (`←`/`→`/`Space`) or continuous multi-page reading.
  - **Side-by-Side Split View**: Open an Exam Question Paper on the left and its Worked Solutions / Mark Scheme on the right simultaneously.
- **📂 Virtual Filesystem & Smart Pairing**:
  - Automatically pairs **Problem Sheet $N$** with **Solution Sheet $N$**.
  - **Slide Combiner**: One-click stitching of weekly PDF slide decks into a single comprehensive term booklet.
- **⚡ Offline-First Architecture**: Cached course trees and PDFs load instantaneously even with zero campus Wi-Fi.
- **🔍 Spotlight Search (`Ctrl + K`)**: Millisecond navigation across all modules, notes, and past papers.
- **🛡️ Academic Safety Boundary**: Reading, organizing, and studying are handled client-side; official coursework submissions and quizzes link directly to official university portals.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/SamuelSmthSmth/University-of-Exeter-Better-ELE.git
cd University-of-Exeter-Better-ELE

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5174` in your browser.

---

## 🎨 Design System

Styled with Exeter's exact visual identity:
- Primary Dark: `#003C3C`
- Exeter Teal Accent: `#00A693` / `#00C4AD`
- Exeter Gold Secondary: `#C8A96E`
- OLED Dark Background: `#051414` / `#082020`
