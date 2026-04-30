/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="vite/client" />

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const CACHE: Record<string, any[]> = {};

/**
 * Robustly fetches data from a Google Sheet gviz endpoint.
 * Includes a simple retry mechanism and strict data normalization.
 */
export async function fetchSheetData(sheetName: string, retries = 2): Promise<any[] | null> {
  if (!SHEET_ID || SHEET_ID === "YOUR_SHEET_ID_HERE") {
    console.warn("VITE_GOOGLE_SHEET_ID is missing or using placeholder.");
    return null;
  }

  if (CACHE[sheetName]) {
    return CACHE[sheetName];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`[Algorithmia CMS] Fetching "${sheetName}" (Attempt ${attempt + 1})...`);
      const response = await fetch(url, { cache: 'no-store' });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Sheet not found (404). Check your Sheet ID.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      
      if (!text.includes('google.visualization.Query.setResponse')) {
        throw new Error("Invalid response format (not gviz).");
      }

      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      if (startIdx === -1 || endIdx === -1) throw new Error("JSON payload not found.");

      const json = JSON.parse(text.substring(startIdx, endIdx + 1));

      if (json.status !== 'ok') {
        const errorMsg = json.errors?.[0]?.detailed_message || json.status;
        throw new Error(`API Error: ${errorMsg}`);
      }

      const { cols, rows: tableRows } = json.table;
      
      // Determine column names. Prefer labels, fallback to A, B, C...
      // Normalize to lowercase for easier lookup
      const colNames = cols.map((c: any, i: number) => {
        const label = (c.label || "").trim().toLowerCase();
        return label || String.fromCharCode(97 + i); // fallback to a, b, c...
      });
      
      console.log(`[Algorithmia CMS] Normalized headers for "${sheetName}":`, colNames);

      const data = tableRows.map((row: any, rowIndex: number) => {
        const obj: Record<string, any> = { _rowidx: rowIndex };
        colNames.forEach((key: string, i: number) => {
          const cell = row.c?.[i];
          obj[key] = (cell && cell.v !== null) ? cell.v : "";
        });
        return obj;
      });

      console.log(`[Algorithmia CMS] Fetched ${data.length} rows from "${sheetName}"`);
      CACHE[sheetName] = data;
      return data;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      console.error(`Attempt ${attempt + 1} failed for "${sheetName}":`, error);
      
      if (isLastAttempt) {
        return [];
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 500));
    }
  }

  return [];
}
