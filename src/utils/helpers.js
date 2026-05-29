// ===== Helper Functions =====


/**
 * Truncate text to a maximum length and add '...'
 * Used for movie overviews that might be too long.
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum number of characters
 * @returns {string} Truncated text with '...' if needed
 */
export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Extract the year from a date string like '2024-05-15'
 *
 * @param {string} dateString - A date string in 'YYYY-MM-DD' format
 * @returns {string} The year portion, or empty string
 */
export function extractYear(dateString) {
  if (!dateString) return '';
  return dateString.split('-')[0];
}

/**
 * Format movie runtime from minutes to 'Xh Ym' format.
 * Example: 142 => '2h 22m'
 *
 * @param {number} minutes - Runtime in minutes
 * @returns {string} Formatted runtime string
 */
export function formatRuntime(minutes) {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Format a large number to a short string with M/K suffix.
 * Example: 1500000 => '$2M'
 *
 * @param {number} amount - The amount in dollars
 * @returns {string} Formatted string like '$150M'
 */
export function formatCurrency(amount) {
  if (!amount || amount <= 0) return '';
  return `$${(amount / 1000000).toFixed(0)}M`;
}

/**
 * Format vote average to one decimal place.
 *
 * @param {number} vote - The vote average (e.g., 7.856)
 * @returns {string} Formatted rating (e.g., '7.9') or 'N/A'
 */
export function formatRating(vote) {
  if (!vote) return 'N/A';
  return vote.toFixed(1);
}
