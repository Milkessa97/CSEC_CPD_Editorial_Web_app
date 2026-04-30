/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { fetchSheetData } from "../lib/googleSheets";
import { Contest, Problem } from "../types";

export function useCMSData() {
  const [data, setData] = useState<{ contests: Contest[]; problems: Problem[]; rawProblems: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [contestRowsRaw, problemRowsRaw] = await Promise.all([
          fetchSheetData("contests"),
          fetchSheetData("problems")
        ]);

        if (!isMounted) return;

        if (!contestRowsRaw) {
          setError("CONFIG_REQUIRED");
          return;
        }

        const contestRows = Array.isArray(contestRowsRaw) ? contestRowsRaw : [];
        const problemRows = Array.isArray(problemRowsRaw) ? problemRowsRaw : [];

        // Map contests
        const contests: Contest[] = contestRows.map((row: any) => {
          const id = String(row.id || "").trim();
          const pForContest = problemRows.filter((p: any) => 
            String(p.contestId || p.contestid || "").trim() === id
          );
          
          return {
            id,
            name: String(row.title || row.name || "CPD Contest"),
            description: String(row.description || ""),
            date: String(row.date || ""),
            contestLink: row.contestlink || row.contestLink ? String(row.contestlink || row.contestLink) : undefined,
            stats: {
              problemCount: pForContest.length,
              participants: parseInt(row.participants) || 0,
              difficultyRange: String(row.difficultyRange || row.difficultyrange || "TBA")
            },
            problems: [] // We'll filter these dynamically or store them here
          };
        });

        setData({ contests, problems: [], rawProblems: problemRows });
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to sync with CMS");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}

export function useContest(contestId: string | undefined) {
  const { data, loading, error } = useCMSData();
  const [contest, setContest] = useState<Contest | null>(null);

  useEffect(() => {
    if (data && contestId) {
      const foundContest = data.contests.find(c => c.id === contestId);
      if (foundContest) {
        const problems = data.rawProblems
          .filter((p: any) => String(p.contestId || p.contestid || "").trim() === contestId)
          .map((row: any, index: number) => {
            const id = String(row.id || "").trim();
            const title = String(row.title || "Untitled").trim();
            return {
              id: id || "!",
              title: title || "Untitled Problem",
              difficulty: String(row.difficulty || "Medium"),
              tags: row.tags ? String(row.tags).split(",").map((t: string) => t.trim()).filter(Boolean) : [],
              explanation: String(row.explanation || "No explanation provided."),
              intuition: String(row.intuition || "TBA"),
              approach: (row.approach || "").split("\n").filter((s: string) => s.trim()),
              optimizedSolution: String(row.optimizedsolution || row.optimizedSolution || "O(N)"),
              code: String(row.solution || row.code || "").replace(/\\n/g, "\n"),
              safeKey: `problem-${id}-${index}-${title.substring(0, 5)}`
            };
          });
        
        setContest({ ...foundContest, problems });
      }
    }
  }, [data, contestId]);

  return { contest, loading, error };
}
