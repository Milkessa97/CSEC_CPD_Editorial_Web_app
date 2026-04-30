import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ContestEditorial } from "./components/ContestEditorial";
import { inject } from '@vercel/analytics';

// Initialize analytics
inject();
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-accent-primary/20 selection:text-accent-primary">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contest/:contestId" element={<ContestEditorial />} />
        </Routes>
      </div>
    </Router>
  );
}

