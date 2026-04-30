/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function formatCMSDate(dateStr: string) {
  try {
    if (!dateStr) return "TBA";
    
    // Normalize string: remove extra spaces
    const normalized = dateStr.trim();
    
    // If it's already in a words format like "March 11, 2026", just return it
    if (/[a-zA-Z]/.test(normalized) && normalized.includes(',')) {
      return normalized;
    }

    let d = new Date(normalized);

    // If it's a number (Excel/Google Sheets date serial - unlikely via our current fetch, but possible)
    if (!isNaN(Number(normalized))) {
       // This is a complex conversion from Excel base date 1899-12-30
       // But usually fetcher converts it to string.
    }

    if (isNaN(d.getTime())) {
      // Try parsing common formats manually
      // Format: DD/MM/YYYY or MM/DD/YYYY
      const parts = normalized.split(/[./-]/);
      if (parts.length === 3) {
        const p0 = parseInt(parts[0]);
        const p1 = parseInt(parts[1]);
        const p2 = parseInt(parts[2]);

        if (p0 > 1000) { // YYYY-MM-DD
           d = new Date(p0, p1 - 1, p2);
        } else if (p2 > 1000) { 
           // DD/MM/YYYY or MM/DD/YYYY? 
           // Let's assume MM/DD/YYYY if p0 <= 12, but this is ambiguous.
           // Usually CP contests use YYYY-MM-DD or standard US format.
           // Let's try MM first
           if (p0 <= 12) {
             d = new Date(p2, p0 - 1, p1);
           } else {
             d = new Date(p2, p1 - 1, p0);
           }
        }
      }
    } else {
      // If valid Date but might have UTC shift
      if (!normalized.includes(':') && !normalized.includes('T')) {
        const parts = normalized.split(/[./-]/);
        if (parts.length === 3 && parts[0].length === 4) {
          const year = parseInt(parts[0]);
          const month = parseInt(parts[1]);
          const day = parseInt(parts[2]);
          d = new Date(year, month - 1, day);
        }
      }
    }

    if (isNaN(d.getTime())) return dateStr;

    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(d);
  } catch {
    return dateStr;
  }
}
