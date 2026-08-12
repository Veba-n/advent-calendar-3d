# Advent Calendar 3D 🎄✨

An interactive, immersive 3D holiday countdown experience built with **React**, **Three.js**, **@react-three/fiber**, and **@react-three/drei**. Explore a cozy low-poly winter village house, open 24 interactive windows, and discover inspirational holiday notes each day.

![Advent Calendar Preview](https://raw.githubusercontent.com/Veba-n/advent-calendar-3d/main/preview.png)

---

## ✨ Features

- **Interactive 3D House Scene**: 24 animated bifold windows arranged on a procedural brick lodge surrounded by a snowy pine forest, a glowing moon, dynamic clouds, and falling snow.
- **Smooth Cinematic Camera Transitions**: Seamless damping camera transitions focusing directly on selected day windows with custom zoom calculations.
- **Physics-based Animated Windows**: Realistic bifold door hinges powered by `@react-spring/three`.
- **Persistent State**: Window states are automatically saved to `localStorage` via Zustand middleware, tracking opened days across sessions.
- **Performance Optimized**:
  - Instanced particle buffers and memoized geometries.
  - Zero-allocation render loop preventing garbage collection stutter.
  - Selective post-processing Bloom effects.
  - Responsive camera rig adapting field-of-view and zoom for mobile & desktop.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **3D Engine**: Three.js
- **Fiber / Drei**: `@react-three/fiber`, `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing`
- **Animation**: `@react-spring/three`, `maath`
- **State Management**: Zustand with persistent storage
- **Styling**: Tailwind CSS + Glassmorphism

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Veba-n/advent-calendar-3d.git

# Navigate into project directory
cd advent-calendar-3d

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
advent-calendar/
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── House.tsx          # 3D House structure and chimney
│   │   │   ├── Window.tsx         # Bifold animated window with glass material
│   │   │   ├── Note.tsx           # 3D In-window parchment note card
│   │   │   ├── Scene.tsx          # Main Canvas scene, lights, and camera rig
│   │   │   ├── Snow.tsx           # Procedural snowfall particle system
│   │   │   ├── Smoke.tsx          # Chimney particle smoke
│   │   │   ├── Snowman.tsx        # Low-poly snowman companion
│   │   │   ├── Tree.tsx           # Low-poly pine trees
│   │   │   └── Moon.tsx           # Glowing emissive moon
│   │   └── ui/
│   │       └── UI.tsx             # Modern glassmorphism HUD and navigation
│   ├── data/
│   │   └── calendarData.json      # 24-day countdown messages & quotes
│   ├── store/
│   │   └── calendarStore.ts       # Zustand store with persistent storage
│   ├── utils/
│   │   ├── grid.ts                # Window coordinate math
│   │   └── textureGenerator.ts    # Procedural canvas textures (bricks, fabric, noise)
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

---

## ⚙️ Customization

You can customize the daily messages by modifying `src/data/calendarData.json`:

```json
[
  {
    "day": 1,
    "content": "Custom message for Day 1"
  }
]
```

---

## 📄 License

MIT License. Free for personal and commercial use.
