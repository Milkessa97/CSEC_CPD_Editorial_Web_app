<div align="center">

  <img src="public/CSEC ASTU.png" alt="CSEC ASTU Logo" width="120" />

  <h1>CSEC ASTU — CPD Editorial Archive</h1>

  <p>
    <strong>Your single source of truth for every CPD contest, problem, and editorial.</strong>
  </p>

  <p>
    <a href="https://csec-cpd-editorials.vercel.app/">
      <img src="https://img.shields.io/badge/🌐_Live_Demo-csec--cpd--editorials.vercel.app-fda92c?style=for-the-badge" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-12-ff0055?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  </p>

</div>

<br />

---

## 🧩 The Problem

Within the **CSEC ASTU Competitive Programming Development (CPD) Division**, we run frequent contests to sharpen skills and simulate real competitive environments.

But over time, a major issue became impossible to ignore:

> **❌ Contest materials were scattered everywhere.**

<table>
  <tr>
    <td>😵 Problems buried in old chats</td>
    <td>📄 Editorials lost in random documents</td>
  </tr>
  <tr>
    <td>🔗 Solutions hidden in expired links</td>
    <td>🆕 New members unable to access past resources</td>
  </tr>
</table>

This fragmentation made it impossible to revisit past contests, learn from editorials, track progress, or build a consistent learning culture.

---

## 💡 The Solution

This project creates a **centralized, structured, and permanent archive** for everything CPD-related.

<table>
  <tr>
    <td align="center" width="25%">
      <h3>📚</h3>
      <strong>Contest Archive</strong><br/>
      <sub>Every contest in one place, organized and easy to browse</sub>
    </td>
    <td align="center" width="25%">
      <h3>🧠</h3>
      <strong>Detailed Editorials</strong><br/>
      <sub>Deep explanations to understand problem-solving approaches</sub>
    </td>
    <td align="center" width="25%">
      <h3>💻</h3>
      <strong>Optimal Solutions</strong><br/>
      <sub>Clean, well-written code for learning best practices</sub>
    </td>
    <td align="center" width="25%">
      <h3>📊</h3>
      <strong>Difficulty Insights</strong><br/>
      <sub>Helping members choose problems based on skill level</sub>
    </td>
  </tr>
</table>

---

## ✨ Key Features

- 🏠 **Premium Landing Page** — Snap-scroll sections with animated hero, grid backgrounds, and gradient text
- 🔮 **Upcoming Contests** — Auto-detected from the CMS with floating card animations and Google Calendar integration
- 🔍 **Smart Search** — Multi-word fuzzy matching across contest names and descriptions
- ♾️ **Infinite Scroll** — Past contests load in batches of 6 for blazing-fast performance
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🎨 **Glassmorphism UI** — Premium cards, ambient glows, and micro-animations throughout
- 🔗 **Social Preview Cards** — Rich OG meta tags with branded imagery for Telegram, Discord & Twitter
- 📝 **Spoiler Code Blocks** — Challenge yourself before revealing the optimal solution
- 📋 **CMS-Powered** — Everything managed through a simple Google Sheet — zero backend required

---

## 🏗️ Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌────────────────┐
│              │     │                  │     │                │
│  Google      │────▶│  Vite + React    │────▶│  Vercel        │
│  Sheets CMS  │     │  SPA Frontend    │     │  Deployment    │
│              │     │                  │     │                │
└──────────────┘     └──────────────────┘     └────────────────┘
     Data               UI + Logic              Hosting (Free)
```

> **Zero-cost infrastructure** — Google Sheets as the database, Vite for the build, Vercel for hosting. No servers. No databases. No maintenance.

---

## 🎯 Why This Matters

This isn't just a website — it's **infrastructure for learning**.

| | |
|---|---|
| 🟢 New members can **start strong** | 🔵 Experienced members can **review and refine** |
| 🟡 Knowledge is **never lost again** | 🟣 The club builds **institutional memory** |

> 📌 *From scattered resources → to a permanent knowledge base.*

---

## ⚡ Built in Half a Day (With AI)

Yes — this entire platform was built in **just half a day** using **AI Agentic Coding**.

<details>
<summary><strong>🤖 How AI accelerated the development</strong></summary>

<br />

- ⚡ Rapid UI and component generation
- 🎨 Faster layout and design decisions
- 🔧 Reduced boilerplate and repetitive work
- 🚀 Accelerated development workflow

This allowed us to **move fast**, **maintain quality**, and **deliver on time**.

> A practical example of how **AI + focused execution = high-speed development**.

</details>

---

## 🛠️ Run Locally

<details>
<summary><strong>📦 Prerequisites</strong></summary>

<br />

- [Node.js](https://nodejs.org/) v18+ installed
- A Google Sheet ID configured (see `.env.example`)

</details>

### 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Milkessa97/CSEC_CPD_Editorial_Web_app.git
cd CSEC_CPD_Editorial_Web_app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your VITE_GOOGLE_SHEET_ID to the .env file

# 4. Start the development server
npm run dev
```

The app will be running at **`http://localhost:3000`** 🎉

---

## 📂 Project Structure

```
src/
├── components/          # UI Components
│   ├── LandingPage.tsx  # Main landing with hero + contests
│   ├── ContestCard.tsx  # Past contest cards
│   ├── UpcomingContestCard.tsx  # Animated upcoming cards
│   ├── ProblemCard.tsx  # Expandable problem editorial
│   ├── StatsSection.tsx # Contest statistics
│   ├── Hero.tsx         # Editorial page hero
│   ├── CodeBlock.tsx    # Syntax-highlighted code
│   └── Footer.tsx       # Site footer
├── hooks/
│   └── useContent.ts    # CMS data fetching & mapping
├── lib/
│   ├── googleSheets.ts  # Google Sheets API integration
│   └── utils.ts         # Utility functions
├── types.ts             # TypeScript interfaces
├── App.tsx              # Router & layout
└── index.css            # Design system & theme
```

---

<div align="center">

  <br />

  **Built with ❤️ by the CSEC ASTU CPD Division**

  <br />

  <a href="https://csec-cpd-editorials.vercel.app/">
    <img src="https://img.shields.io/badge/Visit_the_Live_Site-→-fda92c?style=for-the-badge" alt="Visit" />
  </a>

</div>