/**
 * LPG Cylinder Test-Due Code Interpreter
 * Format: [A-D][-]?[YY]
 *   A = Jan–Mar (Q1)
 *   B = Apr–Jun (Q2)
 *   C = Jul–Sep (Q3)
 *   D = Oct–Dec (Q4)
 */

const QUARTER_MAP = {
  A: { start: 0, end: 2 },  // Jan, Feb, Mar
  B: { start: 3, end: 5 },  // Apr, May, Jun
  C: { start: 6, end: 8 },  // Jul, Aug, Sep
  D: { start: 9, end: 11 }, // Oct, Nov, Dec
};

const QUARTER_LABELS = {
  A: 'January – March',
  B: 'April – June',
  C: 'July – September',
  D: 'October – December',
};

/**
 * Extract cylinder code from OCR text.
 * Returns the normalized code string or null.
 */
export const extractCylinderCode = (rawText) => {
  if (!rawText) return null;
  const match = rawText.toUpperCase().match(/\b([ABCD])[\s\-]?(\d{2})\b/);
  if (!match) return null;
  return `${match[1]}-${match[2]}`;
};

/**
 * Parse the code and compute expiry date.
 * Returns { letter, year, quarterLabel, validUntil } or null for invalid codes.
 */
export const parseCylinderCode = (code) => {
  if (!code) return null;
  const match = code.toUpperCase().trim().match(/^([ABCD])[\s\-]?(\d{2})$/);
  if (!match) return null;

  const letter = match[1];
  const yearShort = parseInt(match[2], 10);
  const fullYear = 2000 + yearShort;
  const { end } = QUARTER_MAP[letter];

  // Valid until last day of the quarter's last month
  const validUntil = new Date(fullYear, end + 1, 0, 23, 59, 59); // last ms of last day

  return {
    letter,
    year: fullYear,
    quarterLabel: QUARTER_LABELS[letter],
    validUntil,
  };
};

/**
 * Check if cylinder is currently valid.
 * Returns 'valid' | 'expired' | 'invalid'
 */
export const getCylinderStatus = (code) => {
  const parsed = parseCylinderCode(code);
  if (!parsed) return 'invalid';
  const now = new Date();
  return now <= parsed.validUntil ? 'valid' : 'expired';
};

/**
 * Format a Date as "Month YYYY"
 */
export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};
