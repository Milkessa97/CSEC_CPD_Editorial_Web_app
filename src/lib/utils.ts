/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function formatCMSDate(dateStr: string) {
  try {
    if (!dateStr) return "TBA";
    
    // Normalize string: remove extra spaces
    const normalized = String(dateStr).trim();
    
    // Match Google Sheets gviz Date format: Date(YYYY, M, D)
    // GViz months are 0-indexed (0 = Jan, 1 = Feb, 2 = Mar, etc.)
    const gvizDateMatch = normalized.match(/^Date\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+,\s*\d+,\s*\d+)?\)$/);
    let d: Date;

    if (gvizDateMatch) {
      const year = parseInt(gvizDateMatch[1]);
      const month = parseInt(gvizDateMatch[2]);
      const day = parseInt(gvizDateMatch[3]);
      d = new Date(year, month, day);
    } else {
      // If it's already in a words format like "March 11, 2026", just return it
      if (/[a-zA-Z]/.test(normalized) && normalized.includes(',')) {
        return normalized;
      }
      
      d = new Date(normalized);

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
            if (p0 <= 12) {
              d = new Date(p2, p0 - 1, p1);
            } else {
              d = new Date(p2, p1 - 1, p0);
            }
          }
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
