# 🚀 SKOUZA POINTERMASTER

A premium, interactive platform designed to demystify C pointers through visual simulation and AI-powered tutoring. Built for students and developers who want to master memory management in C.

![Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ Features

- **Visual Memory Simulator**: A real-time RAM/Stack visualizer that shows how variables and pointers interact as you execute C-like code.
- **AI Tutor (Gemini API)**: A dedicated chat interface powered by Google Gemini to answer complex questions about pointers, arrays, and memory.
- **Interactive Analogy**: A visual "Mailbox Analogy" to help builders understand addresses vs. values.
- **Common Pitfalls**: A curated list of dangerous pointer behaviors (Segfaults, Dangling Pointers, Memory Leaks) with detailed solutions.
- **Modern UI/UX**: A sleek, dark-mode professional interface built with Tailwind CSS and glassmorphism.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Engine**: [Google Gemini Pro](https://ai.google.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/) (Recommended)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd pointermaster-c
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your Google Gemini API Key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`.

## 📜 Development Commands

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the application for production.
- `pnpm preview`: Previews the production build locally.

## 🎨 Design System

The project uses a custom design system defined in `index.html` and `vite.config.ts`, featuring:

- **Primary Color**: Blue (`#3b82f6`) for actions and highlights.
- **Accent Color**: Amber (`#f59e0b`) for pointers and warnings.
- **Typography**: Inter for interface, Fira Code for syntax.

---

Built with ❤️ for C Programmers.
