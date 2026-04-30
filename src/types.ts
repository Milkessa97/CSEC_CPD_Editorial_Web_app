/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert" | string;

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  explanation: string;
  intuition: string;
  approach: string[];
  optimizedSolution: string;
  code: string;
  safeKey: string; // Guaranteed unique key for React
}

export interface Contest {
  id: string;
  name: string;
  description: string;
  date: string;
  stats: {
    problemCount: number;
    participants: number;
    difficultyRange: string;
  };
  problems: Problem[];
}
